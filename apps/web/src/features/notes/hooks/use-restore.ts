import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { restoreNote } from '../api/restore-note.api'
import { notesQueryKeys } from '../lib/query-keys'

export const useRestore = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: restoreNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      })

      toast.success('Note Restored', {
        description: `"${data.title}" has been restored to your active notes list.`,
      })
    },
    onError: () => {
      toast.error('Restoration Failed', {
        description: 'Could not restore note from Trash. Please try again',
      })
    },
  })

  return mutation
}
