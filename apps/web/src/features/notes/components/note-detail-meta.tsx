import { FolderOpen } from 'lucide-react'

import { Spinner } from '@/shared/components/ui/spinner'
import { formattedDate } from '@/shared/lib/utils'

type NoteDetailMetaProps = {
  folderName?: string
  updatedAt: string
  isLoading: boolean
}

export function NoteDetailMeta({
  folderName,
  updatedAt,
  isLoading,
}: NoteDetailMetaProps) {
  return (
    <div className='text-muted-foreground hidden items-center gap-1.5 text-xs md:flex lg:gap-2 lg:text-sm'>
      <FolderOpen className='size-3.5 shrink-0 lg:size-4' />
      <span className='max-w-25 truncate lg:max-w-50'>
        {folderName ?? 'No folder'}
      </span>
      <span className='text-border shrink-0'>/</span>
      <span className='truncate'>
        Last edited {formattedDate(updatedAt, 'MMM d, yyyy')}
      </span>
      {isLoading && (
        <Spinner className='text-muted-foreground ml-1 size-3 shrink-0' />
      )}
    </div>
  )
}
