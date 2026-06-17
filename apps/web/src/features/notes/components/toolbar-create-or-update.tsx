import { Maximize, Minimize } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { Spinner } from '@/shared/components/ui/spinner'

import { NoteAction } from './note-action'

type ToolbarCreateOrUpdateProps = {
  isLoading: boolean
  isFullscreen: boolean
  onFullscreen: () => void
  onClose: () => void
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  submitLabel: string
}

export function ToolbarCreateOrUpdate({
  isLoading,
  isFullscreen,
  onClose,
  onSubmit,
  onFullscreen,
  submitLabel,
}: ToolbarCreateOrUpdateProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-2 hidden size-8 md:flex lg:hidden' />
      </div>
      <div className='flex items-center gap-1.5'>
        <Button
          variant='ghost'
          size='sm'
          onClick={onClose}
          className='text-muted-foreground hover:text-foreground h-8 px-3'>
          Cancel
        </Button>

        <Button
          size='sm'
          id='note-form'
          type='submit'
          onClick={onSubmit}
          className='h-8 px-3'>
          {isLoading && <Spinner />}
          {submitLabel}
        </Button>
        <div className='hidden items-center gap-1.5 lg:flex'>
          <Separator orientation='vertical' className='my-auto h-5' />
          <NoteAction
            Icon={isFullscreen ? Minimize : Maximize}
            label={isFullscreen ? 'Exit fullscreen' : 'Enter Fullscreen'}
            renderAction={
              <Button
                variant='ghost'
                size='icon'
                className='size-8'
                onClick={onFullscreen}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}
