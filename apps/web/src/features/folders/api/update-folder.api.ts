import { apiClient } from '@/shared/lib/api-client'

import type { FolderInput } from '../schemas/folder.schema'
import type { UpdateFolderResponse } from '../types/folder-response.type'

export const updateFolder = async ({
  slug,
  payload,
}: {
  slug: string
  payload: FolderInput
}) => {
  const { data } = await apiClient.patch<UpdateFolderResponse>(
    `/folders/${slug}`,
    payload
  )

  return data.data
}
