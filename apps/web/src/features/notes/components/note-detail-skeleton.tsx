import { Skeleton } from '@/shared/components/ui/skeleton'

export function NoteDetailSkeleton() {
  return (
    <div className='flex h-full flex-col'>
      {/* Note Content Area */}
      <div className='flex-1 p-6'>
        <Skeleton className='mb-4 h-9 w-3/4' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>
      </div>
    </div>
  )
}
