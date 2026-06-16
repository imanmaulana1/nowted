import { apiClient } from '@/shared/lib/api-client'

import type { NoteMutationResponse } from '../types/notes-response.type'

export const unarchiveNote = async (slug: string) => {
  const { data } = await apiClient.patch<NoteMutationResponse>(
    `/notes/${slug}/unarchive`
  )

  return data.data
}
