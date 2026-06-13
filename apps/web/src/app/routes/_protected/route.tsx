import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const token = localStorage.getItem('accessToken')
    if (!token)
      throw redirect({ to: '/login', search: { redirect: location.href } })
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <div>Hello "/_protected"!</div>
}
