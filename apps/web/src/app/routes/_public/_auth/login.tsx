import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return <div>Hello "/_public/_auth/login"!</div>
}
