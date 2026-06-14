import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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
    onError: () => {
      toast.error('Invalid credentials', {
        description: 'Please check your credentials and try again',
      })
    },
  })
}
