import { Archive, FileText, Trash } from 'lucide-react'

import type { MainNav } from '../types/app-shell.type'

export const mainNav: MainNav[] = [
  {
    label: 'Notes',
    href: '/app/notes',
    icon: FileText,
  },
  {
    label: 'Archive',
    href: '/app/archive',
    icon: Archive,
  },
  {
    label: 'Trash',
    href: '/app/trash',
    icon: Trash,
  },
]
