import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/app/archive/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/app/archive/"!</div>
}
