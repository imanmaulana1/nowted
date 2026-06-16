import { createFileRoute } from '@tanstack/react-router'
import { Archive } from 'lucide-react'

import { EmptyState } from '@/shared/components/empty-state'

export const Route = createFileRoute('/_protected/app/archive/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex h-full items-center justify-center'>
      <EmptyState
        icon={Archive}
        title='Select an archived note to view'
        description='Choose an archived note from the list to view its contents. You can restore it back to your active notes anytime'
      />
    </div>
  )
}
