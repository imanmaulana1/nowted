import { apiClient } from '@/shared/lib/api-client'

import type { DeleteNoteResponse } from '../types/notes-response.type'

export const deleteNote = async (slug: string) => {
  const { data } = await apiClient.delete<DeleteNoteResponse>(`/notes/${slug}`)

  return data.data
}
