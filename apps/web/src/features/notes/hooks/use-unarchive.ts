import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { unarchiveNote } from '../api/unarchive-note.api'
import { notesQueryKeys } from '../lib/query-keys'
import type { Note } from '../types/note.type'

export const useUnarchive = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unarchiveNote,
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
}
