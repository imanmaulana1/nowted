import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import { Skeleton } from '@/shared/components/ui/skeleton'

type FolderListSkeletonProps = {
  length?: number
}

export function FolderListSkeleton({ length = 5 }: FolderListSkeletonProps) {
  return (
    <div className='flex flex-col gap-1'>
      {Array.from({ length }).map((_, i) => (
        <SidebarMenu key={i} className='gap-0'>
          <SidebarMenuItem>
            <SidebarMenuButton disabled className='gap-3'>
              <Skeleton className='size-4 shrink-0 rounded-sm' />
              <Skeleton className='h-4 w-3/4 rounded-sm' />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      ))}
    </div>
  )
}
