import axios from 'axios'

import type { ErrorResponse } from '@/shared/types/api.type'

export interface ParsedApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

export function parseApiError(error: unknown): ParsedApiError {
  let code = 'UNKNOWN_ERROR'
  let message = 'An unexpected error occurred. Please try again later.'
  let details: Record<string, string[]> | undefined

  if (axios.isAxiosError(error)) {
    const apiData = error.response?.data as ErrorResponse | undefined
    if (apiData?.error) {
      code = apiData.error.code || code
      message = apiData.error.message || message
      details = apiData.error.details
    } else if (error.code === 'ERR_NETWORK') {
      code = 'NETWORK_ERROR'
      message =
        'Unable to connect to server. Please check your internet connection.'
    } else if (error.message) {
      message = error.message
    }
  } else if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object') {
    if ('error' in error && error.error && typeof error.error === 'object') {
      const apiError = error as ErrorResponse
      code = apiError.error.code || code
      message = apiError.error.message || message
      details = apiError.error.details
    }
  }

  return { code, message, details }
}
