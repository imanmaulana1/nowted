import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { archiveNote } from '../api/archive-note.api'
import { notesQueryKeys } from '../lib/query-keys'

export const useArchive = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: archiveNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      })

      toast.success('Note Archived', {
        description: `"${data.title}" has been successfully moved to the Archive`,
      })
    },
    onError: () => {
      toast.error('Archive Failed', {
        description: 'Could not archive note. Please try again later',
      })
    },
  })

  return mutation
}
