import { Link } from '@tanstack/react-router'
import { ChevronsUpDown, Lock, LogOut, User } from 'lucide-react'

import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { useLogout } from '@/features/auth/hooks/use-logout'
import { AvatarUser } from '@/shared/components/avatar-user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/sidebar'

export function NavUser() {
  const { isMobile, setOpenMobile } = useSidebar()
  const { data: user } = useCurrentUser()
  const { mutate: logout, isPending } = useLogout()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
              />
            }>
            <AvatarUser user={user} />
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>{user.fullName}</span>
              <span className='truncate text-xs'>
                {user.totalNotes} notes · {user.totalFolders} folders
              </span>
            </div>
            <ChevronsUpDown className='ml-auto size-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            side={isMobile ? 'top' : 'right'}
            sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className='p-0'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <AvatarUser user={user} />
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>
                      {user.fullName}
                    </span>
                    <span className='truncate text-xs'>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem
                render={
                  <Link
                    to='/app/settings/profile'
                    onClick={() => setOpenMobile(false)}
                    className='w-full cursor-pointer'
                  />
                }>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <User className='size-4' />
                  <span>Profile</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    to='/app/settings/account'
                    onClick={() => setOpenMobile(false)}
                    className='w-full cursor-pointer'
                  />
                }>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Lock className='size-4' />
                  <span>Security</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                variant='destructive'
                disabled={isPending}
                onClick={() => logout()}
                className='cursor-pointer'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <LogOut className='size-4' />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
