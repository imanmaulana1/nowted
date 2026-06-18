import { apiClient } from '@/shared/lib/api-client'

import type { FolderInput } from '../schemas/folder.schema'
import type { CreateFolderResponse } from '../types/folder-response.type'

export const createFolder = async (payload: FolderInput) => {
  const { data } = await apiClient.post<CreateFolderResponse>(
    '/folders',
    payload
  )

  return data.data
}
