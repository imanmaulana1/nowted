import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authQueryKeys } from '@/features/auth/lib/query-keys'

import { deleteNote } from '../api/delete-note.api'
import { notesQueryKeys } from '../lib/query-keys'

export const useDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: (_data, noteSlug) => {
      queryClient.removeQueries({
        queryKey: notesQueryKeys.detail(noteSlug),
      })

      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: authQueryKeys.me(),
      })

      toast.success('Note Deleted', {
        description: `Note has been removed and can’t be restored`,
      })
    },
    onError: () => {
      toast.error('Delete Failed', {
        description: 'Could not delete note. Please try again later',
      })
    },
  })
}
