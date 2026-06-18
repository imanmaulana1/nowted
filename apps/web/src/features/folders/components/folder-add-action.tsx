import { FolderPlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { SidebarGroupAction } from '@/shared/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

import { useCreateFolder } from '../hooks/use-create'
import type { FolderInput } from '../schemas/folder.schema'
import { ModalFormFolder } from './modal-folder-form'

export type FolderAddActionProps = {
  totalFolders: number | undefined
}

export function FolderAddAction({ totalFolders }: FolderAddActionProps) {
  const [open, setOpen] = useState(false)
  const { mutate: createFolder, isPending } = useCreateFolder()

  const handleOpenModal = () => {
    if (totalFolders && totalFolders >= 5) {
      toast.error('Folder limit reached', {
        description: 'Maximum of 5 folders allowed.',
      })
      return
    }
    setOpen(true)
  }

  const handleCreate = (
    values: FolderInput,
    callbacks?: {
      onSuccess?: () => void
    }
  ) => {
    createFolder(values, {
      onSuccess: () => {
        callbacks?.onSuccess?.()
        setOpen(false)
      },
    })
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={<SidebarGroupAction onClick={handleOpenModal} />}>
          <FolderPlus className='size-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100' />
          <span className='sr-only'>Add Folder</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Folder</p>
        </TooltipContent>
      </Tooltip>

      <ModalFormFolder
        open={open}
        onOpenChange={setOpen}
        mode='create'
        onSubmit={handleCreate}
        isLoading={isPending}
      />
    </>
  )
}
