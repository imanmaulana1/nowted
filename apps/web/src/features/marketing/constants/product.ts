import { Archive, FileText, FolderClosed, Star } from 'lucide-react'

import type { ProductFeature } from '../types/marketing.type'

export const productFeatures: ProductFeature[] = [
  {
    title: 'Rich Text Editor',
    description:
      'Our custom-tuned Tiptap editor features Markdown support, inline highlights, blockquote styling, and clear focus modes to keep your writing seamless.',
    icon: FileText,
  },
  {
    title: 'Intuitive Folders',
    description:
      'Keep your notes cleanly categorized. Add, rename, and manage folders with ease from a hierarchical sidebar explorer.',
    icon: FolderClosed,
  },
  {
    title: 'Favorites Collection',
    description:
      'Pin your most critical thoughts. Toggle any note as a favorite to keep it instantly accessible from the pinned section on the sidebar.',
    icon: Star,
  },
  {
    title: 'Archive & Trash',
    description:
      'Safely hide completed drafts in the Archive, or move items to the Trash with full recovery and permanent deletion controls.',
    icon: Archive,
  },
]
