import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { trashNote } from '../api/trash-note.api'
import { notesQueryKeys } from '../lib/query-keys'
import type { Note } from '../types/note.type'

export const useTrash = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: trashNote,
    onSuccess: (data, noteSlug) => {
      queryClient.setQueryData<Note>(notesQueryKeys.detail(noteSlug), (old) => {
        if (!old) return old
        return {
          ...old,
          ...data,
        }
      })

      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.lists(),
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
}
