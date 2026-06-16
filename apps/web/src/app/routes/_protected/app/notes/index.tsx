import { createFileRoute } from '@tanstack/react-router'
import { FileText } from 'lucide-react'

import { EmptyState } from '@/shared/components/empty-state'

export const Route = createFileRoute('/_protected/app/notes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex h-full items-center justify-center'>
      <EmptyState
        icon={FileText}
        title='Select a note to view'
        description='Choose a note from the left sidebar to start editing, or create a brand new one to capture your thoughts'
      />
    </div>
  )
}
