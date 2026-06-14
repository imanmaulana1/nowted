import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ErrorResponse } from '@/shared/types/api.type'

import { registerApi } from '../api/register.api'
import type { RegisterInput } from '../schemas/register.schema'

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerApi(data),
    onSuccess: () => {
      toast.success('Account created successfully', {
        description: 'Please sign in to continue.',
      })
    },
    onError: (error) => {
      const apiError = error as unknown as ErrorResponse | undefined
      const err = error as Error | undefined

      const message =
        apiError?.error?.message ||
        err?.message ||
        'An unexpected error occurred. Please try again'

      toast.error('Registration failed', {
        description: message,
      })
    },
  })
}
