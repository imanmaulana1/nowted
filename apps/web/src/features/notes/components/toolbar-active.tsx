import { Link } from '@tanstack/react-router'
import {
  Archive,
  Download,
  Edit2,
  Info,
  Maximize,
  Minimize,
  Star,
  Trash2,
  X,
} from 'lucide-react'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu'
import { Separator } from '@/shared/components/ui/separator'
import { Toggle } from '@/shared/components/ui/toggle'
import { cn } from '@/shared/lib/utils'

import { NoteAction } from './note-action'
import { NoteMoreActions } from './note-more-actions'

type ToolbarActiveProps = {
  noteSlug: string
  isFullscreen: boolean
  isFavorite: boolean
  onToggleFavorite: () => void
  onTrash: () => void
  onFullscreen: () => void
  onClose: () => void
  onArchive: () => void
  onExport: () => void
  onShowInfo: () => void
}

export function ToolbarActive({
  noteSlug,
  isFullscreen,
  isFavorite,
  onToggleFavorite,
  onTrash,
  onFullscreen,
  onClose,
  onArchive,
  onExport,
  onShowInfo,
}: ToolbarActiveProps) {
  return (
    <div className='flex items-center gap-1.5'>
      <NoteAction
        Icon={Star}
        label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        isFavorite={isFavorite}
        renderAction={
          <Toggle
            size='sm'
            aria-label='Toggle favorite'
            pressed={isFavorite}
            onPressedChange={onToggleFavorite}
            className='data-[state=on]:hover:bg-muted aria-pressed:hover:bg-muted aria-pressed:bg-transparent data-[state=on]:bg-transparent'
          />
        }
      />

      <NoteAction
        Icon={Edit2}
        label='Edit note'
        renderAction={
          <Link
            to='/app/notes/$noteSlug/edit'
            params={{
              noteSlug,
            }}
            search={isFullscreen ? { fullscreen: true } : undefined}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'size-8'
            )}
          />
        }
      />

      <NoteAction
        Icon={Trash2}
        label='Move to trash'
        renderAction={
          <Button
            variant='ghost'
            size='icon'
            className='text-destructive hover:bg-destructive/10 hover:text-destructive size-8'
            onClick={onTrash}
          />
        }
      />

      <NoteMoreActions>
        <DropdownMenuItem onClick={onExport} closeOnClick>
          <Download className='mr-2 size-4' />
          Export Note
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onArchive} closeOnClick>
          <Archive className='mr-2 size-4' />
          Archive Note
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
          label={isFullscreen ? 'Exit fullscreen' : 'Enter Fullscreen'}
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
