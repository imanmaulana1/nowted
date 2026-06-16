import type { GetNotesParams } from '../types/note.type'

export const notesQueryKeys = {
  all: ['notes'] as const,
  lists: () => [...notesQueryKeys.all, 'list'] as const,
  list: (params: GetNotesParams) =>
    [...notesQueryKeys.lists(), params] as const,
  details: () => [...notesQueryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...notesQueryKeys.details(), slug] as const,
}
