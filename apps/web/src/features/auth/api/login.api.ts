import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'

import type { LoginInput } from '../schemas/login.schema'
import { apiClient } from '@/shared/lib/api-client'

import type { LoginResponse } from '../types/login-response.type'

export const loginApi = async (payload: LoginInput) => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig)

  return data.data
}
