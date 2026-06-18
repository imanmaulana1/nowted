import { SidebarMenu } from '@/shared/components/ui/sidebar'

import type { FolderWithNotes } from '../types/folder.type'
import { FolderItem } from './folder-item'
import { FolderListEmpty } from './folder-list-empty'
import { FolderListSkeleton } from './folder-list-skeleton'

type FolderListProps = {
  folders?: FolderWithNotes[]
  isLoading: boolean
}

export function FolderList({ folders, isLoading }: FolderListProps) {
  if (isLoading) return <FolderListSkeleton />

  if (!folders || folders.length === 0) return <FolderListEmpty />

  return (
    <SidebarMenu>
      {folders.map((folder) => (
        <FolderItem key={folder.id} folder={folder} />
      ))}
    </SidebarMenu>
  )
}
