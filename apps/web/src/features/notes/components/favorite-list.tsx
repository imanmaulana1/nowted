import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'

import { ScrollArea } from '@/shared/components/ui/scroll-area'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'

import { notesQueryOptions } from '../lib/query-options'
import { FavoriteListSkeleton } from './favorite-list-skeleton'

export function FavoriteList() {
  const {
    data: favorites,
    isPending,
    isError,
  } = useQuery(
    notesQueryOptions({
      favorite: true,
      orderBy: 'favoriteAt',
    })
  )

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='text-muted-foreground/60 px-2 text-[11px] font-bold tracking-wider uppercase'>
        Favorites
      </div>

      {isPending ? (
        <FavoriteListSkeleton />
      ) : isError || !favorites ? (
        <p className='text-destructive px-2 py-1.5 text-xs italic'>
          Failed to load favorites
        </p>
      ) : favorites.length === 0 ? (
        <p className='text-muted-foreground/50 px-2 py-1.5 text-xs italic'>
          No favorite notes yet
        </p>
      ) : (
        <ScrollArea className='max-h-35 pr-1' data-slot='favorite-scroll-area'>
          <SidebarMenu>
            {favorites.map((note) => (
              <SidebarMenuItem key={note.id}>
                <SidebarMenuButton
                  className='hover:bg-sidebar-accent/50 transition-colors duration-100'
                  render={
                    <Link
                      to='/app/notes/$noteSlug'
                      params={{ noteSlug: note.slug }}
                      activeProps={{
                        className:
                          'bg-sidebar-accent text-sidebar-accent-foreground font-semibold hover:bg-sidebar-accent is-active',
                      }}
                    />
                  }>
                  <Star className='size-4 shrink-0 fill-yellow-400 text-yellow-400 opacity-40 transition-opacity group-hover:opacity-70 group-hover/menu-button:opacity-100 group-[.is-active]/menu-button:opacity-100' />
                  <span className='flex-1 truncate text-xs'>{note.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      )}
    </div>
  )
}
