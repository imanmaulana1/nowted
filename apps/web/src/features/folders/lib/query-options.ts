import { queryOptions } from '@tanstack/react-query'

import { getFolders } from '../api/get-folders.api'
import { foldersQueryKeys } from './query-keys'

export const foldersQueryOptions = () =>
  queryOptions({
    queryKey: foldersQueryKeys.lists(),
    queryFn: getFolders,
  })
