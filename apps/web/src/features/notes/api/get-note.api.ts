import { apiClient } from '@/shared/lib/api-client'

import type { GetNoteResponse } from '../types/notes-response.type'

export const getNote = async (slug: string) => {
  const { data } = await apiClient.get<GetNoteResponse>(`/notes/${slug}`)

  return data.data
}
