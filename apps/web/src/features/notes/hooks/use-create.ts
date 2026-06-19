import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { foldersQueryKeys } from '@/features/folders/lib/query-keys'

import { createNoteApi } from '../api/create-note.api'
import { notesQueryKeys } from '../lib/query-keys'
import type { Note } from '../types/note.type'

export const useCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createNoteApi,
    onSuccess: (data) => {
      queryClient.setQueryData<Note>(notesQueryKeys.detail(data.slug), data)

      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: foldersQueryKeys.all,
      })

      toast.success('Note Created', {
        description: `"${data.title}" has been successfully created`,
      })
    },
    onError: () => {
      toast.error('Creation Failed', {
        description: 'Could not create note. Please try again',
      })
    },
  })
}
