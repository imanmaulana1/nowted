import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authQueryKeys } from '@/features/auth/lib/query-keys'

import { deleteFolder } from '../api/delete-folder.api'
import { foldersQueryKeys } from '../lib/query-keys'

export const useDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: foldersQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me() })

      toast.success('Folder Deleted', {
        description: `"${data.name}" and all its notes have been deleted`,
      })
    },
    onError: () => {
      toast.error('Failed to Delete Folder', {
        description: 'Could not delete folder. Please try again later',
      })
    },
  })
}
