import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/app/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/app/settings/profile"!</div>
}
