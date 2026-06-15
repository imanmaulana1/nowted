import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  beforeLoad: () => {
    const token = localStorage.getItem('accessToken')
    if (token) throw redirect({ to: '/app/notes' })
  },
  component: PublicLayout,
})

function PublicLayout() {
  return <Outlet />
}
