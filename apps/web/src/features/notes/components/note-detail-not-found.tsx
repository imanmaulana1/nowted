import { FileQuestionMark } from 'lucide-react'

import { EmptyState } from '@/shared/components/empty-state'

export function NoteDetailNotFound() {
  return (
    <div className='flex h-full items-center justify-center'>
      <EmptyState
        title={`We couldn't find the note you're looking for`}
        description={`Please select another note from the list`}
        icon={FileQuestionMark}
      />
    </div>
  )
}
