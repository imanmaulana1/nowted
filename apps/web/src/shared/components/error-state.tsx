import { AlertCircle, RefreshCw } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty'

type ErrorStateProps = {
  title: string
  description: string
  error?: Error
  onRetry?: () => void
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <Empty className='h-full gap-5 border-none'>
      <EmptyMedia className='bg-destructive/10 mb-0 rounded-full p-3'>
        <AlertCircle className='text-destructive size-8' />
      </EmptyMedia>
      <EmptyHeader className='gap-2'>
        <EmptyTitle className='text-foreground text-xl font-semibold tracking-tight'>
          {title}
        </EmptyTitle>
        <EmptyDescription className='text-muted-foreground text-sm leading-relaxed'>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      {onRetry && (
        <EmptyContent className='mt-2'>
          <Button variant='outline' onClick={onRetry}>
            <RefreshCw className='mr-2 size-4' />
            Try again
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
