import {
  Check,
  ChevronDown,
  FolderClosed,
  FolderOpen,
  Maximize,
  Minimize,
} from 'lucide-react'

import type { FolderWithNotes } from '@/features/folders/types/folder.type'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Separator } from '@/shared/components/ui/separator'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { Spinner } from '@/shared/components/ui/spinner'

import { NoteAction } from './note-action'

type ToolbarCreateOrUpdateProps = {
  isLoading: boolean
  isFullscreen: boolean
  onFullscreen: () => void
  onClose: () => void
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  submitLabel: string
  folderId?: string | null
  folders: FolderWithNotes[]
  onFolderChange: (id: string | null) => void
}

export function ToolbarCreateOrUpdate({
  isLoading,
  isFullscreen,
  onClose,
  onSubmit,
  onFullscreen,
  submitLabel,
  folderId,
  folders,
  onFolderChange,
}: ToolbarCreateOrUpdateProps) {
  const selectedFolder = folders.find((folder) => folder.id === folderId)

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-2 hidden size-8 md:flex lg:hidden' />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant='ghost'
                size='sm'
                className='group text-muted-foreground hover:text-foreground hover:bg-accent/50 flex h-8 items-center gap-1.5 px-2 text-sm font-medium shadow-none'
              />
            }>
            <FolderClosed className='text-muted-foreground size-4 group-data-popup-open:hidden' />
            <FolderOpen className='text-muted-foreground hidden size-4 group-data-popup-open:block' />

            <span className='text-foreground'>
              {selectedFolder ? selectedFolder.name : 'Select Folder'}
            </span>
            <ChevronDown className='size-3 opacity-60 transition-transform duration-200 group-data-popup-open:-rotate-90' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-48'>
            <DropdownMenuItem onClick={() => onFolderChange(null)}>
              <span className='flex-1'>No Folder</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {folders.map((folder) => (
              <DropdownMenuItem
                key={folder.id}
                onClick={() => onFolderChange(folder.id)}
                className='flex items-center justify-between'>
                <span>{folder.name}</span>
                {folder.id === folderId && (
                  <Check className='text-primary size-4' />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex items-center gap-1.5'>
        <Button
          variant='ghost'
          size='sm'
          onClick={onClose}
          className='text-muted-foreground hover:text-foreground h-8 px-3'>
          Cancel
        </Button>

        <Button
          size='sm'
          id='note-form'
          type='submit'
          onClick={onSubmit}
          className='h-8 px-3'>
          {isLoading && <Spinner />}
          {submitLabel}
        </Button>
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
        </div>
      </div>
    </div>
  )
}
