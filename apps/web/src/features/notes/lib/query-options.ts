import { queryOptions } from '@tanstack/react-query'

import { getNote } from '../api/get-note.api'
import { getNotes } from '../api/get-notes.api'
import type { GetNotesParams } from '../types/note.type'
import { notesQueryKeys } from './query-keys'

export const notesQueryOptions = (params: GetNotesParams) => {
  return queryOptions({
    queryKey: notesQueryKeys.list(params),
    queryFn: () => getNotes(params),
  })
}

export const noteQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: notesQueryKeys.detail(slug),
    queryFn: () => getNote(slug),
  })
}
