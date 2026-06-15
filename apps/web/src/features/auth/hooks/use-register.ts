import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { parseApiError } from '@/shared/lib/error-parser'
import { registerApi } from '../api/register.api'
import type { RegisterInput } from '../schemas/register.schema'

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerApi(data),
    onSuccess: () => {
      toast.success('Account created successfully', {
        description: 'Please sign in to continue',
      })
    },
    onError: (error) => {
      const { code, message } = parseApiError(error)

      switch (code) {
        case 'EMAIL_ALREADY_EXISTS':
          toast.error('Email already in use', {
            description:
              'An account with this email already exists. Please sign in instead',
          })
          break
        case 'NETWORK_ERROR':
          toast.error('Connection failed', {
            description:
              'Unable to reach the server. Please check your internet connection',
          })
          break
        default:
          toast.error('Registration failed', {
            description: message,
          })
          break
      }
    },
  })
}
