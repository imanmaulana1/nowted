import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_home/')({
  component: LandingPage,
})

function LandingPage() {
  return <div>Hello "/_public/_home/"!</div>
}
