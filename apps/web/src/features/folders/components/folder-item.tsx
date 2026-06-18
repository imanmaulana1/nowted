import {
  ChevronRight,
  Edit2,
  FolderIcon,
  FolderOpen,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import { ModalConfirmation } from '@/shared/components/modal-confirmation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import { cn } from '@/shared/lib/utils'

import { useDelete } from '../hooks/use-delete'
import { useUpdate } from '../hooks/use-update'
import type { FolderInput } from '../schemas/folder.schema'
import type { FolderWithNotes } from '../types/folder.type'
import { FolderNoteEmpty } from './folder-note-empty'
import { FolderNoteList } from './folder-note-list'
import { ModalFormFolder } from './modal-folder-form'

type FolderItemProps = {
  folder: FolderWithNotes
}

export function FolderItem({ folder }: FolderItemProps) {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const { mutate: updateFolder, isPending: isUpdating } = useUpdate()
  const { mutate: deleteFolder, isPending: isDeleting } = useDelete()

  const handleUpdate = (
    values: FolderInput,
    callbacks?: {
      onSuccess?: () => void
    }
  ) => {
    updateFolder(
      {
        slug: folder.slug,
        payload: values,
      },
      {
        onSuccess: () => {
          callbacks?.onSuccess?.()
          setEditOpen(false)
        },
      }
    )
  }

  const handleDelete = () => {
    deleteFolder(folder.slug, {
      onSuccess: () => setDeleteOpen(false),
    })
  }

  return (
    <>
      <SidebarMenuItem>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            render={
              <SidebarMenuButton
                tooltip={folder.name}
                className={cn(
                  'group/folder hover:bg-sidebar-accent/50 w-full transition-colors duration-100',
                  open &&
                    'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent font-medium'
                )}
              />
            }>
            <ChevronRight
              className={cn(
                'size-3 shrink-0 opacity-40 transition-transform duration-150 group-hover:opacity-70',
                open && 'rotate-90 opacity-100 group-hover:opacity-100'
              )}
            />
            {open ? (
              <FolderOpen className='size-4 shrink-0 opacity-100 transition-opacity' />
            ) : (
              <FolderIcon className='size-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-70' />
            )}
            <span className='flex-1 truncate text-sm'>{folder.name}</span>
          </CollapsibleTrigger>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuAction showOnHover className='bg-sidebar'>
                  <MoreHorizontal className='size-4' />
                  <span className='sr-only'>Folder actions</span>
                </SidebarMenuAction>
              }
            />
            <DropdownMenuContent align='start' className='w-40'>
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <Edit2 className='mr-2 size-4' />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant='destructive'
                onClick={() => setDeleteOpen(true)}>
                <Trash2 className='mr-2 size-4' />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CollapsibleContent>
            {folder.notes.length === 0 ? (
              <FolderNoteEmpty />
            ) : (
              <FolderNoteList notes={folder.notes} />
            )}
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>

      <ModalFormFolder
        open={editOpen}
        onOpenChange={setEditOpen}
        mode='update'
        defaultValues={{ name: folder.name }}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
      />

      <ModalConfirmation
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title='Delete Folder'
        description='Are you sure you want to delete this folder? The notes inside will not be deleted'
        icon={Trash2}
        confirmText='Delete'
        confirmVariant='destructive'
        onConfirm={handleDelete}
        isConfirming={isDeleting}
      />
    </>
  )
}
