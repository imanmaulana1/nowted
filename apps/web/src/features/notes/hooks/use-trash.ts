import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { trashNote } from '../api/trash-note.api'
import { notesQueryKeys } from '../lib/query-keys'

export const useTrash = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: trashNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      })

      toast.success('Moved to Trash', {
        description: `"${data.title}" has been moved to the Trash bin`,
      })
    },
    onError: () => {
      toast.error('Action Failed', {
        description: 'Could not move note to the Trash. Please try again',
      })
    },
  })

  return mutation
}
