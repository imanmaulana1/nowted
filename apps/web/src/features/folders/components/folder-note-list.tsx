import { Link } from '@tanstack/react-router'
import { FileText } from 'lucide-react'

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/sidebar'

import type { NoteInFolder } from '../types/folder.type'

type FolderNoteListProps = {
  notes: NoteInFolder[]
}

export function FolderNoteList({ notes }: FolderNoteListProps) {
  const { setOpenMobile } = useSidebar()

  return (
    <ul className='flex flex-col gap-0.5 px-1 pt-0.5 pb-1'>
      {notes.map((note) => (
        <SidebarMenuItem key={note.id}>
          <SidebarMenuButton
            tooltip={note.title}
            onClick={() => setOpenMobile(false)}
            className='text-muted-foreground/50 hover:text-sidebar-foreground flex items-center gap-2 py-1.5 pl-7 text-xs transition-colors duration-100'
            render={
              <Link
                to={
                  note.status === 'archive'
                    ? `/app/archive/$noteSlug`
                    : note.status === 'trash'
                      ? '/app/trash/$noteSlug'
                      : '/app/notes/$noteSlug'
                }
                params={{ noteSlug: note.slug }}
                activeProps={{
                  className: 'text-sidebar-foreground font-semibold is-active',
                }}
              />
            }>
            <FileText className='size-3.5 shrink-0 opacity-40 transition-opacity group-hover/menu-button:opacity-70 group-[.is-active]/menu-button:opacity-100' />
            <span className='flex-1 truncate text-xs'>{note.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </ul>
  )
}
