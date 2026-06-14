import { cn } from '../lib/utils'

type DotBackgroundProps = {
  children: React.ReactNode
}

export function DotBackground({ children }: DotBackgroundProps) {
  return (
    <div className='bg-background relative flex min-h-screen w-full flex-col'>
      {/* Isolated background container with overflow-hidden */}
      <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <div
          className={cn(
            'absolute inset-0',
            'bg-size-[20px_20px]',
            'bg-[radial-gradient(var(--color-dot)_1px,transparent_1px)]'
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className='bg-background absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]' />
      </div>
      <div className='relative z-20 flex flex-1 flex-col'>{children}</div>
    </div>
  )
}
