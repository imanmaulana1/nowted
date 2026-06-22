import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error: any) => {
        const statusCode = error?.response?.status || error?.status
        const errorCode = error?.error?.code

        if (statusCode && statusCode >= 400 && statusCode < 500) {
          return false
        }

        if (
          errorCode === 'NOTE_NOT_FOUND' ||
          errorCode === 'RESOURCE_NOT_FOUND' ||
          errorCode === 'UNAUTHORIZED' ||
          errorCode === 'FORBIDDEN' ||
          errorCode === 'VALIDATION_ERROR'
        ) {
          return false
        }

        return failureCount < 3
      },
    },
  },
})
