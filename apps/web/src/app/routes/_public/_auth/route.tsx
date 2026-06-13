import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return <div>Hello "/_public/_auth"!</div>
}
