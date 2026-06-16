import { ErrorState } from '@/shared/components/error-state'
import { ScrollArea } from '@/shared/components/ui/scroll-area'

import type { NoteStatus, NoteSummary } from '../types/note.type'
import { NoteItem } from './note-item'
import { NoteListEmpty } from './note-list-empty'
import { NoteListSkeleton } from './note-list-skeleton'

type NoteListProps = {
  notes?: NoteSummary[]
  status: NoteStatus
  to: '/app/notes/$noteSlug' | '/app/archive/$noteSlug' | '/app/trash/$noteSlug'
  search?: string | undefined
  isLoading: boolean
  isError: boolean
  onRetry?: () => void
}

export function NoteList({
  notes,
  status,
  to,
  search,
  isLoading,
  isError,
  onRetry,
}: NoteListProps) {
  const emptyTitle =
    status === 'active'
      ? 'No notes yet'
      : status === 'archive'
        ? 'Your archive is empty'
        : 'Trash is clean'

  const emptyDescription =
    status === 'active'
      ? 'Create your first note to get started'
      : status === 'archive'
        ? `Archive notes you've finished to keep your main list clean`
        : 'Discarded notes will stay here in case you need to restore them'

  if (isLoading) return <NoteListSkeleton />

  if (isError || !notes)
    return (
      <ErrorState
        title={`We couldn't load your notes`}
        description='Please check your internet connection and try again'
        onRetry={onRetry}
      />
    )

  if (notes.length === 0 && search)
    return (
      <NoteListEmpty
        title='No results'
        description='No notes match your search criteria'
      />
    )

  if (notes.length === 0)
    return <NoteListEmpty title={emptyTitle} description={emptyDescription} />

  return (
    <ScrollArea className='min-h-0 flex-1 bg-transparent'>
      {notes?.map((note) => (
        <NoteItem key={note.id} note={note} to={to} />
      ))}
    </ScrollArea>
  )
}
