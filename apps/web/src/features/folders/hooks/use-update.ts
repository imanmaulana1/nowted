import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateFolder } from '../api/update-folder.api'
import { foldersQueryKeys } from '../lib/query-keys'

export const useUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFolder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: foldersQueryKeys.lists() })

      toast.success('Folder Renamed', {
        description: `Folder has been renamed to "${data.name}"`,
      })
    },
    onError: () => {
      toast.error('Failed to Rename Folder', {
        description: 'Could not rename folder. Please try again later',
      })
    },
  })
}
