import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateNoteApi } from '../api/update-note.api'
import { notesQueryKeys } from '../lib/query-keys'
import type { NoteInput } from '../schemas/note-input.schema'
import type { Note } from '../types/note.type'

export const useUpdate = (slug: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: NoteInput) => updateNoteApi(slug, payload),
    onSuccess: (data) => {
      queryClient.setQueryData<Note>(notesQueryKeys.detail(data.slug), data)

      if (data.slug !== slug) {
        queryClient.removeQueries({
          queryKey: notesQueryKeys.detail(slug),
        })
      }

      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.lists(),
      })

      toast.success('Note Saved', {
        description: `"${data.title}" has been successfully updated`,
      })
    },
    onError: () => {
      toast.error('Update Failed', {
        description: 'Could not update note. Please try again',
      })
    },
  })
}
