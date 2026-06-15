import { apiClient } from '@/shared/lib/api-client'

import type { CurrentUserResponse } from '../types/current-user-response.type'

export const getCurrentUser = async () => {
  const { data } = await apiClient.get<CurrentUserResponse>('/auth/me')

  return data.data
}
