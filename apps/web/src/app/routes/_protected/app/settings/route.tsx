import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ChevronLeft, ShieldAlert, UserRound } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

export const Route = createFileRoute('/_protected/app/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  return (
    <div className='bg-background flex flex-1 flex-col overflow-hidden'>
      <header className='flex h-14 shrink-0 items-center gap-2 border-b px-4 lg:px-6'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => navigate({ to: '/app/notes' })}
          className='-ml-2 size-8 lg:hidden'>
          <ChevronLeft className='size-5' />
        </Button>
        <h1 className='text-foreground text-lg font-semibold tracking-tight'>
          Settings
        </h1>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        <aside className='bg-muted/10 hidden w-64 shrink-0 space-y-1 border-r p-4 lg:block'>
          <nav className='space-y-1'>
            <Link
              to='/app/settings/profile'
              activeProps={{
                className:
                  'bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-sm',
              }}
              className='hover:bg-sidebar-accent/50 text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200'>
              <UserRound className='size-4' />
              <span>Profile Settings</span>
            </Link>
            <Link
              to='/app/settings/account'
              activeProps={{
                className:
                  'bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-sm',
              }}
              className='hover:bg-sidebar-accent/50 text-muted-foreground hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200'>
              <ShieldAlert className='size-4' />
              <span>Account & Security</span>
            </Link>
          </nav>
        </aside>

        <div className='bg-background/50 flex-1 overflow-y-auto p-6 lg:p-8'>
          <div className='mx-auto max-w-2xl'>
            <div className='mb-6 flex gap-2 border-b pb-4 lg:hidden'>
              <Link
                to='/app/settings/profile'
                activeProps={{
                  className: 'bg-primary text-primary-foreground font-medium',
                }}
                className='bg-muted text-muted-foreground flex-1 rounded-md py-2 text-center text-xs font-medium transition-colors'>
                Profile
              </Link>
              <Link
                to='/app/settings/account'
                activeProps={{
                  className: 'bg-primary text-primary-foreground font-medium',
                }}
                className='bg-muted text-muted-foreground flex-1 rounded-md py-2 text-center text-xs font-medium transition-colors'>
                Security
              </Link>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
