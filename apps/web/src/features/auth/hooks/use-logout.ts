import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { logoutApi } from '../api/logout.api'

export function useLogout() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem('accessToken')

      toast.success("You've been logged out", {
        description: 'See you next time! 👋',
      })

      navigate({
        to: '/login',
      })
    },
  })
}
