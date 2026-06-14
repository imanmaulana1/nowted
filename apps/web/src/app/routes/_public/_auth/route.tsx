import { createFileRoute, Outlet } from '@tanstack/react-router'

import { DotBackground } from '@/shared/components/dot-background'

export const Route = createFileRoute('/_public/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <DotBackground>
      <main className='relative z-20 flex flex-1 flex-col items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <Outlet />
        </div>
      </main>
    </DotBackground>
  )
}
