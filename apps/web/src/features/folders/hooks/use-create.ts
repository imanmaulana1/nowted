import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authQueryKeys } from '@/features/auth/lib/query-keys'

import { createFolder } from '../api/create-folder.api'
import { foldersQueryKeys } from '../lib/query-keys'

export const useCreateFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFolder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: foldersQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me() })

      toast.success('Folder Created', {
        description: `"${data.name}" has been created successfully`,
      })
    },
    onError: () => {
      toast.error('Failed to Create Folder', {
        description: 'Could not create folder. Please try again later',
      })
    },
  })
}
