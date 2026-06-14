import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { logoutApi } from '../api/logout.api'

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem('accessToken')

      toast.success("You've been logged out", {
        description: 'See you next time! 👋',
      })
    },
  })
}
