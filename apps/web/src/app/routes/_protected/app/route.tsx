import { createFileRoute, Outlet } from '@tanstack/react-router'

import { AppSidebar } from '@/features/app-shell/components/app-sidebar'
import { SidebarProvider } from '@/shared/components/ui/sidebar'

export const Route = createFileRoute('/_protected/app')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <SidebarProvider className='h-svh overflow-hidden'>
      <AppSidebar />
      <main className='flex-1 overflow-auto'>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
