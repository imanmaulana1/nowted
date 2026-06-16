import { AlertCircle } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty'
import { parseApiError } from '@/shared/lib/error-parser'

type NoteDetailErrorProps = {
  title?: string
  error: unknown
}

export function NoteDetailError({
  title = 'Something went wrong',
  error,
}: NoteDetailErrorProps) {
  const { message } = parseApiError(error)
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
          {message}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
