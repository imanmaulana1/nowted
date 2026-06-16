import { Button } from '@/shared/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import type { Note } from '../types/note.type'
import { ModalNoteInfo } from './modal-note-info'
import { NoteDetail } from './note-detail'
import { NoteDetailMeta } from './note-detail-meta'

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

      <NoteDetail content={note.content} />

      <ModalNoteInfo note={note} open={showInfo} onOpenChange={setShowInfo} />
      {children}
    </div>
  )
}
