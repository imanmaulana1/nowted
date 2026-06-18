import { FolderIcon } from 'lucide-react'

export function FolderListEmpty() {
  return (
    <div className='flex flex-col items-center gap-1.5 px-2 py-4 text-center'>
      <FolderIcon className='text-muted-foreground/40 size-6' />
      <p className='text-muted-foreground/60 text-xs'>No folders yet</p>
    </div>
  )
}
