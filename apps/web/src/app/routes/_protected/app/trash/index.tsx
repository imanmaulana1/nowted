import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/app/trash/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/app/trash/"!</div>
}
