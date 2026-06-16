import type { LucideIcon } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/utils'

type NoteActionProps = {
  renderAction: React.ReactElement
  Icon: LucideIcon
  label: string
  isFavorite?: boolean
}

export function NoteAction({
  renderAction,
  Icon,
  label,
  isFavorite,
}: NoteActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={renderAction}>
        <Icon
          className={cn('size-4', {
            'fill-yellow-400 text-yellow-400': isFavorite,
          })}
        />
        <span className='sr-only'>{label}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
