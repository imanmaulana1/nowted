import { Link } from '@tanstack/react-router'

import { Logo } from '@/shared/components/logo'

import { Navbar } from './navbar'
import { NavbarActions } from './navbar-actions'
import { NavbarMobile } from './navbar-mobile'

export function Header() {
  return (
    <header className='border-border/40 bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link to='/' className='flex items-center gap-2'>
          <Logo />
        </Link>
        <Navbar />
        <NavbarActions />
        <div className='flex items-center gap-2 lg:hidden'>
          <NavbarMobile />
        </div>
      </div>
    </header>
  )
}
