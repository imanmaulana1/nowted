import { useSuspenseQuery } from '@tanstack/react-query'

import { meQueryOptions } from '../lib/query-options'

export function useCurrentUser() {
  return useSuspenseQuery(meQueryOptions())
}
