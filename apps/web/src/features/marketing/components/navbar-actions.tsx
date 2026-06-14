import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/components/ui/button'

export function NavbarActions() {
  return (
    <div className='hidden items-center gap-4 lg:flex'>
      <Link to='/login'>
        <Button variant='outline' className='px-5 text-sm'>
          Login
        </Button>
      </Link>
    </div>
  )
}
