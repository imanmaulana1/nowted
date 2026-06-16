import { apiClient } from '@/shared/lib/api-client'

import type { NoteMutationResponse } from '../types/notes-response.type'

export const restoreNote = async (slug: string) => {
  const { data } = await apiClient.patch<NoteMutationResponse>(
    `/notes/${slug}/restore`
  )

  return data.data
}
