import { Link } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { FileText } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

import type { NoteSummary } from '../types/note.type'

type NoteItemProps = {
  note: NoteSummary
  to: '/app/notes/$noteSlug' | '/app/archive/$noteSlug' | '/app/trash/$noteSlug'
}

export function NoteItem({ note, to }: NoteItemProps) {
  return (
    <Link
      to={to}
      params={{ noteSlug: note.slug }}
      className={cn(
        'group block w-full px-4 py-3 text-left transition-colors duration-100',
        'border-border/50 border-b',
        'text-muted-foreground/90 group-hover:text-foreground hover:bg-muted/60'
      )}
      activeProps={{
        className: 'bg-muted/80 text-foreground is-active',
      }}
      activeOptions={{ exact: true }}>
      <div className='flex items-start gap-3'>
        <FileText
          className={cn(
            'mt-0.5 size-4 shrink-0 transition-opacity',
            'text-muted-foreground/70 group-hover:text-foreground opacity-80 group-hover:opacity-100',
            'group-[.is-active]:text-foreground group-[.is-active]:opacity-100'
          )}
        />
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <span
            className={cn(
              'truncate text-sm leading-snug font-medium transition-all',
              'group-hover:text-foreground',
              'group-[.is-active]:text-foreground group-[.is-active]:font-semibold'
            )}>
            {note.title}
          </span>
          <span className='text-muted-foreground/80 mb-2 line-clamp-2 text-xs leading-relaxed'>
            {note.excerpt}
          </span>
          <span className='text-muted-foreground/70 text-[11px]'>
            {formatDistanceToNow(new Date(note.updatedAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </Link>
  )
}
