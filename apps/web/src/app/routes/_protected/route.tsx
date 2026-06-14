import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const token = localStorage.getItem('accessToken')
    if (!token) throw redirect({ to: '/', search: { redirect: location.href } })
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <Outlet />
}
