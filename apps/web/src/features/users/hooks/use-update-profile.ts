import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authQueryKeys } from '@/features/auth/lib/query-keys'
import type { AuthUser } from '@/features/auth/types/auth.type'
import { parseApiError } from '@/shared/lib/error-parser'

import { updateProfileApi } from '../api/update-profile.api'

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => updateProfileApi(formData),
    onSuccess: (data) => {
      queryClient.setQueryData<AuthUser>(authQueryKeys.me(), (old) => {
        if (!old) return old
        return {
          ...old,
          fullName: data.fullName,
          avatarUrl: data.avatarUrl,
          email: data.email,
          updatedAt: data.updatedAt,
        }
      })

      toast.success('Profile updated successfully', {
        description: 'Your profile details have been saved.',
      })
    },
    onError: (error) => {
      const { code, message } = parseApiError(error)

      switch (code) {
        case 'BAD_REQUEST':
          toast.error('Validation error', {
            description: message,
          })
          break
        case 'NETWORK_ERROR':
          toast.error('Connection failed', {
            description:
              'Unable to reach the server. Please check your internet connection',
          })
          break
        default:
          toast.error('Failed to update profile', {
            description: message,
          })
          break
      }
    },
  })
}
