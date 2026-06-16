import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'

type NoteListSkeletonProps = {
  length?: number
}

export function NoteListSkeleton({ length = 5 }: NoteListSkeletonProps) {
  return (
    <div className='flex-1 overflow-y-auto scroll-smooth'>
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'group block w-full px-4 py-3 text-left transition-colors duration-100',
            'border-border/50 border-b'
          )}>
          <div className='flex items-start gap-3'>
            <Skeleton className='mt-0.5 size-4 shrink-0 rounded-sm' />
            <div className='flex min-w-0 flex-1 flex-col gap-2'>
              <Skeleton className='h-4 w-3/4' />
              <div className='space-y-1.5'>
                <Skeleton className='h-3 w-full' />
                <Skeleton className='h-3 w-4/5' />
              </div>
              <Skeleton className='mt-1 h-2.5 w-1/4' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
