import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

type NoteMoreActionsProps = {
  children: React.ReactNode
}

export function NoteMoreActions({ children }: NoteMoreActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant='ghost' size='icon' className='size-8' />}>
        <MoreHorizontal className='size-4' />
        <span className='sr-only'>More actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
