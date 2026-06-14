import { Pencil } from 'lucide-react'

export function Logo() {
  return (
    <div className='flex gap-2'>
      <span className='font-kaushan-script text-foreground text-3xl'>
        Nowted
      </span>
      <Pencil className='text-foreground size-5' />
    </div>
  )
}
