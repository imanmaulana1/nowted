import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_home')({
  component: HomeLayout,
})

function HomeLayout() {
  return <div>Hello "/_public/_home"!</div>
}
