import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'

import { apiClient } from '@/shared/lib/api-client'

export const logoutApi = async () => {
  return await apiClient.post('/auth/logout', {}, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig)
}
