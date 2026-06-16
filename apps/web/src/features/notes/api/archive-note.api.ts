import { apiClient } from '@/shared/lib/api-client'

import type { NoteMutationResponse } from '../types/notes-response.type'

export const archiveNote = async (slug: string) => {
  const { data } = await apiClient.patch<NoteMutationResponse>(
    `/notes/${slug}/archive`
  )

  return data.data
}
