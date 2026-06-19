import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { meQueryOptions } from '@/features/auth/lib/query-options'
import { ErrorPage } from '@/shared/components/error-page'
import type { ErrorResponse } from '@/shared/types/api.type'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context, location }) => {
    const token = localStorage.getItem('accessToken')
    if (!token)
      throw redirect({
        to: '/login',
        search: { redirect: location.href, reason: 'unauthorized' },
      })

    try {
      const currentUser =
        await context.queryClient.ensureQueryData(meQueryOptions())

      return {
        currentUser,
      }
    } catch (error) {
      const apiError = error as ErrorResponse
      if (apiError.error?.code === 'UNAUTHORIZED') {
        localStorage.removeItem('accessToken')

        throw redirect({
          to: '/login',
          search: { redirect: location.href, reason: 'session_expired' },
        })
      }

      throw error
    }
  },
  component: ProtectedLayout,
  errorComponent: ErrorPage,
})

function ProtectedLayout() {
  return <Outlet />
}
