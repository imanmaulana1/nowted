import { SidebarMenuSkeleton } from '@/shared/components/ui/sidebar'

type FavoriteListSkeletonProps = {
  length?: number
}

export function FavoriteListSkeleton({
  length = 3,
}: FavoriteListSkeletonProps) {
  return (
    <div className='flex flex-col gap-1 px-1 py-1'>
      {Array.from({ length }).map((_, index) => (
        <SidebarMenuSkeleton key={index} showIcon />
      ))}
    </div>
  )
}
