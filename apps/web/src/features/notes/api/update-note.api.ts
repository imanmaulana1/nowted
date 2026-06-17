import { apiClient } from '@/shared/lib/api-client'

import type { NoteInput } from '../schemas/note-input.schema'
import type { UpdateNoteResponse } from '../types/notes-response.type'

export const updateNoteApi = async (slug: string, payload: NoteInput) => {
  const { data } = await apiClient.patch<UpdateNoteResponse>(
    `/notes/${slug}`,
    payload
  )

  return data.data
}
