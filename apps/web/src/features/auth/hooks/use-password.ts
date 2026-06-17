import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { parseApiError } from '@/shared/lib/error-parser'
import { changePasswordApi } from '../api/change-password.api'
import type { ChangePasswordInput } from '../schemas/change-password.schema'

export function usePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => changePasswordApi(data),
    onSuccess: () => {
      toast.success('Password updated successfully', {
        description:
          'Your account is now more secure. Use your new password the next time you sign in',
      })
    },
    onError: (error) => {
      const { code, message } = parseApiError(error)

      switch (code) {
        case 'BAD_REQUEST':
          toast.error('Incorrect current password', {
            description: 'The current password you entered is incorrect. Please try again',
          })
          break
        case 'NETWORK_ERROR':
          toast.error('Connection failed', {
            description:
              'Unable to reach the server. Please check your internet connection',
          })
          break
        default:
          toast.error('Failed to update password', {
            description: message,
          })
          break
      }
    },
  })
}
