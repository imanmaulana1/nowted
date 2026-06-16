import { apiClient } from '@/shared/lib/api-client'

import type { GetNotesParams } from '../types/note.type'
import type { GetNotesResponse } from '../types/notes-response.type'

export const getNotes = async ({
  status,
  favorite,
  search,
  orderBy,
}: GetNotesParams) => {
  const { data } = await apiClient.get<GetNotesResponse>('/notes', {
    params: { status, favorite, search: search || undefined, orderBy },
  })

  return data.data
}
