import { apiClient } from '@/shared/lib/api-client'

import type { Profile } from '../types/profile.type'

export const updateProfileApi = async (formData: FormData) => {
  const { data } = await apiClient.patch<{ data: Profile }>(
    '/users/profile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return data.data
}
