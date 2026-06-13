import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return <div>Hello "/_public/_auth/register"!</div>
}
