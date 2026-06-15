import { queryOptions } from '@tanstack/react-query'

import { getCurrentUser } from '../api/get-current-user.api'
import { authQueryKeys } from './query-keys'

export const meQueryOptions = () =>
  queryOptions({
    queryKey: authQueryKeys.me(),
    queryFn: getCurrentUser,
  })
