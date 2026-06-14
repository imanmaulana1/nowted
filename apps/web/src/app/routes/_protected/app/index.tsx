import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useLogout } from '@/features/auth/hooks/use-logout'
import { Button } from '@/shared/components/ui/button'

export const Route = createFileRoute('/_protected/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate } = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate({ to: '/' })
      },
    })
  }

  return <Button onClick={handleLogout}>Logout</Button>
}
