import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { archiveNote } from '../api/archive-note.api'
import { notesQueryKeys } from '../lib/query-keys'
import type { Note } from '../types/note.type'

export const useArchive = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: archiveNote,
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
}
