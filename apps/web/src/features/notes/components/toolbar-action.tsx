import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

type ToolbarActionProps = {
  title: string
  onClick: () => void
  className?: string
  children: React.ReactNode
}

export function ToolbarAction({
  title,
  onClick,
  className,
  children,
}: ToolbarActionProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={cn(
        className,
        'size-8 border border-transparent shadow-none transition-all'
      )}
      title={title}
      onClick={onClick}>
      {children}
      <span className='sr-only'>{title}</span>
    </Button>
  )
}
