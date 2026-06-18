import { apiClient } from '@/shared/lib/api-client'

import type { DeleteFolderResponse } from '../types/folder-response.type'

export const deleteFolder = async (slug: string) => {
  const { data } = await apiClient.delete<DeleteFolderResponse>(
    `/folders/${slug}`
  )

  return data.data
}
