import { apiClient } from '@/shared/lib/api-client'

import type { GetFoldersResponse } from '../types/folder-response.type'

export const getFolders = async () => {
  const { data } = await apiClient.get<GetFoldersResponse>('/folders')

  return data.data
}
