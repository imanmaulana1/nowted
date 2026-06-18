import { useQuery } from '@tanstack/react-query'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/shared/components/ui/sidebar'

import { foldersQueryOptions } from '../lib/query-options'
import { FolderAddAction } from './folder-add-action'
import { FolderList } from './folder-list'

export function FolderSection() {
  const { data: folders, isPending } = useQuery(foldersQueryOptions())

  return (
    <SidebarGroup>
      <div className='mb-1 flex items-center justify-between'>
        <SidebarGroupLabel className='text-muted-foreground/90 flex-1 text-[11px] font-semibold tracking-widest uppercase'>
          Folders
        </SidebarGroupLabel>
        <FolderAddAction totalFolders={folders?.length} />
      </div>
      <SidebarGroupContent className='scroll-smooth'>
        <FolderList folders={folders} isLoading={isPending} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
