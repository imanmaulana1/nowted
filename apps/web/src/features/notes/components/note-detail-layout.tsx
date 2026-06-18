import { ChevronLeft } from 'lucide-react'
import { lazy, Suspense } from 'react'

import { Button } from '@/shared/components/ui/button'

import type { Note } from '../types/note.type'
import { ModalNoteInfo } from './modal-note-info'
import { NoteDetailMeta } from './note-detail-meta'
import { NoteDetailSkeleton } from './note-detail-skeleton'

const NoteDetail = lazy(() =>
  import('./note-detail').then((m) => ({ default: m.NoteDetail }))
)

type NoteDetailLayoutProps = {
  note: Note
  isLoading: boolean
  onBack: () => void
  toolbar: React.ReactNode
  children: React.ReactNode
  showInfo: boolean
  setShowInfo: (open: boolean) => void
}

export function NoteDetailLayout({
  note,
  isLoading,
  onBack,
  toolbar,
  children,
  showInfo,
  setShowInfo,
}: NoteDetailLayoutProps) {
  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <header className='border-border/50 flex items-center justify-between border-b p-3'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={onBack}
            className='-ml-2 size-8 lg:hidden'>
            <ChevronLeft className='size-5' />
          </Button>
          <NoteDetailMeta
            folderName={note.folder?.name}
            updatedAt={note.updatedAt}
            isLoading={isLoading}
          />
        </div>
        {toolbar}
      </header>

      <Suspense fallback={<NoteDetailSkeleton />}>
        <NoteDetail content={note.content} />
      </Suspense>

      <ModalNoteInfo note={note} open={showInfo} onOpenChange={setShowInfo} />
      {children}
    </div>
  )
}
