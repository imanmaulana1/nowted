import type { JSONContent } from '@tiptap/react'

export type NoteStatus = 'active' | 'archive' | 'trash'

export type OrderBy =
  | 'createdAt'
  | 'updatedAt'
  | 'favoriteAt'
  | 'archivedAt'
  | 'trashedAt'

export interface GetNotesParams {
  status?: NoteStatus
  search?: string
  favorite?: boolean
  orderBy?: OrderBy
}

export interface NoteSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  isFavorite: boolean
  favoriteAt: string | null
  archivedAt: string | null
  trashedAt: string | null
  updatedAt: string
  createdAt: string
  folder: {
    id: string
    name: never
    slug: string
  } | null
}

export interface Note extends NoteSummary {
  content: JSONContent
  plainText: string
}

export interface NoteState {
  id: string
  title: string
  slug: string
  isFavorite: boolean
  favoriteAt: string | null
  archivedAt: string | null
  trashedAt: string | null
  updatedAt: string
}
