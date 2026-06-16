import { createFileRoute } from '@tanstack/react-router'
import { Trash2 } from 'lucide-react'

import { EmptyState } from '@/shared/components/empty-state'

export const Route = createFileRoute('/_protected/app/trash/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex h-full items-center justify-center'>
      <EmptyState
        icon={Trash2}
        title='Select a trashed note to view'
        description='Choose a trashed note from the list to view its contents, restore it to your active collection, or delete it permanently'
      />
    </div>
  )
}
