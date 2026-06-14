import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

import { Logo } from '@/shared/components/logo'
import { Button } from '@/shared/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'

export function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='text-foreground border-border/20 size-8 border'
          />
        }>
        <Menu className='size-5' />
      </SheetTrigger>
      <SheetContent
        side='right'
        className='bg-background border-border w-70 border-l p-6'>
        <div className='flex h-full flex-col gap-6'>
          <SheetHeader className='p-0 text-left'>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <nav className='flex flex-col gap-4'>
            <SheetClose
              render={
                <Link
                  to='/'
                  className='text-foreground hover:text-foreground/80 py-2 text-lg font-medium transition-colors'
                />
              }>
              Home
            </SheetClose>
            <SheetClose
              render={
                <a
                  href='#product'
                  className='text-muted-foreground hover:text-foreground py-2 text-lg font-medium transition-colors'
                />
              }>
              Product
            </SheetClose>
            <SheetClose
              render={
                <a
                  href='#support'
                  className='text-muted-foreground hover:text-foreground py-2 text-lg font-medium transition-colors'
                />
              }>
              Support
            </SheetClose>
            <SheetClose
              render={
                <a
                  href='#contact'
                  className='text-muted-foreground hover:text-foreground py-2 text-lg font-medium transition-colors'
                />
              }>
              Contact Us
            </SheetClose>
          </nav>

          <div>
            <SheetClose
              render={<Link to='/login' className='inline-block w-full' />}>
              <Button
                variant='outline'
                size='lg'
                className='w-full text-base font-semibold'>
                Login
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
