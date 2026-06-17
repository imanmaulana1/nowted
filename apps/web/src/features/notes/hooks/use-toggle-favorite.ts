import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toggleFavoriteNote } from '../api/toggle-favorite-note.api'
import { notesQueryKeys } from '../lib/query-keys'
import { type Note, type NoteSummary } from '../types/note.type'

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleFavoriteNote,
    onMutate: async (noteSlug) => {
      await queryClient.cancelQueries({
        queryKey: notesQueryKeys.all,
      })

      const previousNote = queryClient.getQueryData<Note>(
        notesQueryKeys.detail(noteSlug)
      )

      const previousLists = queryClient.getQueriesData<NoteSummary[]>({
        queryKey: notesQueryKeys.lists(),
      })

      queryClient.setQueryData<Note>(notesQueryKeys.detail(noteSlug), (old) => {
        if (!old) return old
        return {
          ...old,
          isFavorite: !old.isFavorite,
          favoriteAt: !old.isFavorite ? new Date().toISOString() : null,
        }
      })

      queryClient.setQueriesData<NoteSummary[]>(
        { queryKey: notesQueryKeys.lists() },
        (old) => {
          if (!old) return old
          return old.map((note) =>
            note.slug === noteSlug
              ? {
                  ...note,
                  isFavorite: !note.isFavorite,
                  favoriteAt: !note.isFavorite
                    ? new Date().toISOString()
                    : null,
                }
              : note
          )
        }
      )

      return { previousNote, previousLists }
    },
    onSuccess: (data) => {
      const isFav = data.isFavorite

      toast.success(isFav ? 'Added to Favorites' : 'Removed from Favorites', {
        description: `"${data.title}" has been ${isFav ? 'pinned to' : 'removed from'} your favorites list`,
      })
    },
    onError: (_err, noteSlug, context) => {
      if (context?.previousNote) {
        queryClient.setQueryData(
          notesQueryKeys.detail(noteSlug),
          context.previousNote
        )
      }

      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData)
        })
      }

      toast.error('Connection Error', {
        description:
          'Could not update favorite status for note. Please check your connection',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      })
    },
  })
}
