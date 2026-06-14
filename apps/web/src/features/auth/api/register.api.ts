import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'

import { apiClient } from '@/shared/lib/api-client'

import type { RegisterInput } from '../schemas/register.schema'
import type { RegisterResponse } from '../types/register-response.type'

export const registerApi = async (payload: RegisterInput) => {
  const { data } = await apiClient.post<RegisterResponse>(
    '/auth/register',
    payload,
    {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig
  )

  return data.data
}
