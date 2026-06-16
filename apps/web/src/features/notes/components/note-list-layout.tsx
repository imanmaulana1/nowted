import { queryOptions, useQuery } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/shared/components/ui/input'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { cn } from '@/shared/lib/utils'

import { notesQueryOptions } from '../lib/query-options'
import type { NoteStatus } from '../types/note.type'
import { NoteList } from './note-list'

type NoteListLayoutProps = {
  title: string
  status: NoteStatus
  basePath: string
  to?:
    | '/app/notes/$noteSlug'
    | '/app/archive/$noteSlug'
    | '/app/trash/$noteSlug'
  isFullscreen: boolean
  children: React.ReactNode
}

export function NoteListLayout({
  title,
  status,
  basePath,
  to = '/app/notes/$noteSlug',
  isFullscreen,
  children,
}: NoteListLayoutProps) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const {
    data: notes,
    isPending: isLoading,
    refetch,
    isError,
  } = useQuery(
    queryOptions(
      notesQueryOptions({
        status: status,
        search: debouncedSearch,
      })
    )
  )

  const location = useLocation()
  const isDetailView =
    location.pathname !== basePath && location.pathname !== `${basePath}/`

  return (
    <div className='flex h-full w-full min-w-0 overflow-hidden'>
      <div
        className={cn(
          'bg-muted/30 dark:bg-muted/10 border-border/50 flex h-full min-w-0 shrink-0 flex-col border-r transition-all duration-200',
          {
            'pointer-events-none w-0 overflow-hidden border-r-0 opacity-0':
              isFullscreen,
            'w-full lg:w-72 lg:overflow-hidden xl:w-80 2xl:w-96': !isFullscreen,
            'hidden lg:flex': isDetailView && !isFullscreen,
          }
        )}>
        <div className='border-border/50 sticky top-0 z-10 flex flex-col gap-2.5 border-b bg-transparent px-4 py-3.5'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-2 h-7 w-7 lg:hidden' />
            <h2 className='text-muted-foreground/90 text-xs font-semibold tracking-widest uppercase'>
              {title}
            </h2>
          </div>

          <div className='relative w-full'>
            <Search className='text-muted-foreground/70 absolute top-1/2 left-3 size-3.5 -translate-y-1/2' />
            <Input
              type='text'
              placeholder='Search notes...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='bg-background focus:bg-background border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-primary/20 h-8 w-full rounded-md border pr-8 pl-9 text-xs shadow-sm transition-all duration-200 outline-none focus:ring-2'
            />
            {search !== '' && (
              <button
                type='button'
                onClick={() => setSearch('')}
                className='text-muted-foreground/70 hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-0.5 transition-colors'>
                <X className='size-3.5' />
                <span className='sr-only'>Reset Input</span>
              </button>
            )}
          </div>
        </div>
        <NoteList
          notes={notes}
          status={status}
          to={to}
          search={search}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
        />
      </div>
      <div
        className={cn(
          'border-border/50 flex h-full min-w-0 flex-1 flex-col border-r',
          {
            'hidden lg:flex': !isDetailView,
          }
        )}>
        {children}
      </div>
    </div>
  )
}
