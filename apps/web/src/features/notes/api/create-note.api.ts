import { apiClient } from '@/shared/lib/api-client'

import type { NoteInput } from '../schemas/note-input.schema'
import type { CreateNoteResponse } from '../types/notes-response.type'

export const createNoteApi = async (payload: NoteInput) => {
  const { data } = await apiClient.post<CreateNoteResponse>('/notes', payload)

  return data.data
}
