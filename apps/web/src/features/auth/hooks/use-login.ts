import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { parseApiError } from '@/shared/lib/error-parser'
import { loginApi } from '../api/login.api'
import { authQueryKeys } from '../lib/query-keys'
import type { LoginInput } from '../schemas/login.schema'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginInput) => loginApi(data),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken)

      queryClient.setQueryData(authQueryKeys.me(), data.user)

      toast.success(`Welcome back, ${data.user.fullName}! 👋`, {
        description: 'Ready to pick up where you left off',
      })
    },
    onError: (error) => {
      const { code, message } = parseApiError(error)

      switch (code) {
        case 'UNAUTHORIZED':
          toast.error('Invalid credentials', {
            description: 'Please check your email and password, then try again',
          })
          break
        case 'NETWORK_ERROR':
          toast.error('Connection failed', {
            description:
              'Unable to reach the server. Please check your internet connection',
          })
          break
        default:
          toast.error('Failed to sign in', {
            description: message,
          })
          break
      }
    },
  })
}
