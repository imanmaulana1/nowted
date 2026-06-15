import axios, { AxiosError } from 'axios'
import { createAuthRefresh } from 'axios-auth-refresh'

import { router } from '@/app/router'
import type { ErrorResponse, SuccessResponse } from '@/shared/types/api.type'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  try {
    const response = await axios.post<SuccessResponse<{ accessToken: string }>>(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    )

    const { accessToken } = response.data.data
    localStorage.setItem('accessToken', accessToken)

    if (failedRequest.response) {
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`
    }

    return Promise.resolve()
  } catch (error) {
    localStorage.removeItem('accessToken')

    router.navigate({
      to: '/login',
    })
    return Promise.reject(error)
  }
}

createAuthRefresh(apiClient, refreshAuthLogic, {
  statusCodes: [401],
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return Promise.reject(error)
    }

    if (axios.isAxiosError<ErrorResponse>(error)) {
      if (error.response?.data) {
        return Promise.reject(error.response.data)
      }

      return Promise.reject({
        error: {
          code: 'NETWORK_ERROR',
          message: 'Unable to connect to server',
        },
      })
    }

    return Promise.reject({
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'Unexpected error',
      },
    })
  }
)
