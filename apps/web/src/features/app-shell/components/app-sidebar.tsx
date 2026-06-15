import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { Logo } from '@/shared/components/logo'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/shared/components/ui/sidebar'

import { mainNav } from '../constants/main-nav'
import { UserMenu } from './user-menu'

export function AppSidebar() {
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader className='gap-3 py-3'>
        <div className='flex items-center justify-between px-2'>
          <Link to='/app/notes' onClick={() => setOpenMobile(false)}>
            <Logo />
          </Link>
          <ThemeToggle />
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground w-full justify-center shadow-sm transition-all duration-200 active:translate-y-px'
              onClick={() => setOpenMobile(false)}
              render={<Link to='/app/notes/create' />}>
              <Plus className='size-4 shrink-0' />
              <span className='font-medium'>New Note</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {mainNav.map((data, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuButton
                onClick={() => setOpenMobile(false)}
                render={
                  <Link
                    to={data.href}
                    search={{}}
                    activeProps={{
                      className:
                        'bg-sidebar-accent text-sidebar-accent-foreground font-semibold',
                    }}
                  />
                }>
                <data.icon className='size-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100' />
                <span className='flex-1 truncate'>{data.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className='mx-auto' />
      <SidebarContent></SidebarContent>
      <SidebarSeparator className='mx-auto' />
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
