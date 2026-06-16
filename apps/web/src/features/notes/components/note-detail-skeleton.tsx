import { Skeleton } from '@/shared/components/ui/skeleton'

export function NoteDetailSkeleton() {
  return (
    <div className='flex h-full flex-col'>
      <header className='border-border/50 flex items-center justify-between border-b p-3'>
        {/* Left Side: Breadcrumb / Meta */}
        <div className='flex items-center gap-2'>
          <Skeleton className='size-4' />
          <Skeleton className='h-4 w-16' />
          <span className='text-border text-sm'>/</span>
          <Skeleton className='h-4 w-32' />
        </div>

        {/* Right Side: Actions Toolbar */}
        <div className='flex items-center gap-1.5'>
          <Skeleton className='size-8 rounded-md' />
          <Skeleton className='size-8 rounded-md' />
          <Skeleton className='size-8 rounded-md' />
          <Skeleton className='size-8 rounded-md' />
          <Skeleton className='size-8 rounded-md' />
        </div>
      </header>

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
