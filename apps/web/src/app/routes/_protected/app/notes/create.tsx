import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/app/notes/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/app/notes/create"!</div>
}
