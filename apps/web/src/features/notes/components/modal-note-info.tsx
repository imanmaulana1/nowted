import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Separator } from '@/shared/components/ui/separator'
import { formattedDate } from '@/shared/lib/utils'

import type { NoteSummary } from '../types/note.type'

type ModalNoteInfoProps = {
  note: NoteSummary
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ModalNoteInfo({
  note,
  open,
  onOpenChange,
}: ModalNoteInfoProps) {
  const noteStatus = note.trashedAt
    ? 'In Trash'
    : note.archivedAt
      ? 'Archived'
      : 'Active'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Note Information</DialogTitle>
          <DialogDescription>Details about your note.</DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-4 py-4'>
          <div className='flex flex-col gap-1'>
            <span className='text-muted-foreground text-sm font-medium'>
              Title
            </span>
            <span className='text-sm font-semibold'>{note.title}</span>
          </div>

          <Separator />

          <div className='flex flex-col gap-1'>
            <span className='text-muted-foreground text-sm font-medium'>
              Folder
            </span>
            <span className='text-sm'>
              {note.folder?.name ?? 'No folder yet'}
            </span>
          </div>

          <Separator />

          <div className='flex flex-col gap-1'>
            <span className='text-muted-foreground text-sm font-medium'>
              Status
            </span>
            <span className='text-sm'>{noteStatus}</span>
          </div>

          <Separator />

          <div className='flex flex-col gap-1'>
            <span className='text-muted-foreground text-sm font-medium'>
              Created At
            </span>
            <span className='text-sm'>
              {formattedDate(note.createdAt, 'dd MMM yyyy, HH:mm a')}
            </span>
          </div>

          <Separator />

          <div className='flex flex-col gap-1'>
            <span className='text-muted-foreground text-sm font-medium'>
              Last Edited
            </span>
            <span className='text-sm'>
              {formattedDate(note.updatedAt, 'dd MMM yyyy, HH:mm a')}
            </span>
          </div>

          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  )
}
