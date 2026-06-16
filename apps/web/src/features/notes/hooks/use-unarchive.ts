import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { unarchiveNote } from '../api/unarchive-note.api'
import { notesQueryKeys } from '../lib/query-keys'

export const useUnarchive = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: unarchiveNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      })

      toast.success('Note Unarchived', {
        description: `"${data.title}" has been restored to your active notes list`,
      })
    },
    onError: () => {
      toast.error('Restoration Failed', {
        description: 'Could not restore note from archive. Please try again',
      })
    },
  })

  return mutation
}
