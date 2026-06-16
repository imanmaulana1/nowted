import type { LucideIcon } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <Empty className='flex-none gap-5 border-none p-0'>
      <EmptyMedia className='mb-0'>
        <Icon className='text-muted-foreground/20 size-12' />
      </EmptyMedia>

      <EmptyHeader className='gap-1.5'>
        <EmptyTitle className='text-foreground/60 text-lg font-medium'>
          {title}
        </EmptyTitle>
        <EmptyDescription className='text-muted-foreground text-sm leading-relaxed'>
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
