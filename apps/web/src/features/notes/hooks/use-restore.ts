import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { restoreNote } from '../api/restore-note.api'
import { notesQueryKeys } from '../lib/query-keys'
import type { Note } from '../types/note.type'

export const useRestore = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: restoreNote,
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
}
