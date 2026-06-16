import {
  Download,
  Info,
  Maximize,
  Minimize,
  Trash2,
  Undo2,
  X,
} from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu'
import { Separator } from '@/shared/components/ui/separator'

import { NoteAction } from './note-action'
import { NoteMoreActions } from './note-more-actions'

type ToolbarTrashProps = {
  isFullscreen: boolean
  onRestore: () => void
  onDelete: () => void
  onExport: () => void
  onShowInfo: () => void
  onFullscreen: () => void
  onClose: () => void
}

export function ToolbarTrash({
  isFullscreen,
  onRestore,
  onDelete,
  onExport,
  onShowInfo,
  onFullscreen,
  onClose,
}: ToolbarTrashProps) {
  return (
    <div className='flex items-center gap-1.5'>
      <NoteAction
        Icon={Undo2}
        label='Restore note'
        renderAction={
          <Button
            variant='ghost'
            size='icon'
            className='size-8'
            onClick={onRestore}
          />
        }
      />

      <NoteAction
        Icon={Trash2}
        label='Delete permanently'
        renderAction={
          <Button
            variant='ghost'
            size='icon'
            className='text-destructive hover:bg-destructive/10 hover:text-destructive size-8'
            onClick={onDelete}
          />
        }
      />

      <NoteMoreActions>
        <DropdownMenuItem onClick={onExport} closeOnClick>
          <Download className='mr-2 size-4' />
          Export Note
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onShowInfo} closeOnClick>
          <Info className='mr-2 size-4' />
          Note Info
        </DropdownMenuItem>
      </NoteMoreActions>

      <div className='hidden items-center gap-1.5 lg:flex'>
        <Separator orientation='vertical' className='my-auto h-5' />

        <NoteAction
          Icon={isFullscreen ? Minimize : Maximize}
          label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          renderAction={
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              onClick={onFullscreen}
            />
          }
        />

        <NoteAction
          Icon={X}
          label='Close note'
          renderAction={
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              onClick={onClose}
            />
          }
        />
      </div>
    </div>
  )
}
