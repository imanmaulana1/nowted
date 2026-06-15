import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { AlertTriangle, ServerCrash, WifiOff } from 'lucide-react'

import { meQueryOptions } from '@/features/auth/lib/query-options'
import { DotBackground } from '@/shared/components/dot-background'
import { Button } from '@/shared/components/ui/button'
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
  errorComponent: ProtectedError,
})

function ProtectedLayout() {
  return <Outlet />
}

function ProtectedError({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  const handleTryAgain = () => {
    reset()
    router.navigate({ to: '/app' })
  }

  let isNetworkError = false
  let isServerError = false
  let errorMessage = 'An unexpected error occurred. Please try again later.'
  let errorTitle = 'Something went wrong'

  const apiError = error as Partial<ErrorResponse>

  if (apiError?.error?.code) {
    const code = apiError.error.code
    switch (code) {
      case 'NETWORK_ERROR':
        isNetworkError = true
        errorTitle = 'Unable to reach the server'
        errorMessage = `We couldn't connect to our servers. Please try again in a moment.`
        break
      case 'INTERNAL_SERVER_ERROR':
        isServerError = true
        errorTitle = 'Something went wrong on our end'
        errorMessage = 'We hit an unexpected problem. Please try again shortly.'
        break
      default:
        errorTitle = 'Something went wrong'
        errorMessage = apiError.error.message || errorMessage
        break
    }
  } else if (error instanceof Error) {
    if (
      error.message.toLowerCase().includes('network error') ||
      !navigator.onLine
    ) {
      isNetworkError = true
      errorTitle = 'No Internet Connection'
      errorMessage = 'Please check your internet connection and try again.'
    } else {
      errorMessage = error.message
    }
  }

  return (
    <DotBackground>
      <div className='flex flex-1 flex-col items-center justify-center p-4 text-center'>
        <div className='bg-card relative z-20 flex max-w-md flex-col items-center justify-center space-y-6 rounded-2xl border p-8 shadow-sm'>
          <div className='bg-muted/50 flex size-20 items-center justify-center rounded-full'>
            {isNetworkError ? (
              <WifiOff className='text-muted-foreground size-10' />
            ) : isServerError ? (
              <ServerCrash className='text-destructive size-10' />
            ) : (
              <AlertTriangle className='size-10 text-amber-500' />
            )}
          </div>

          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              {errorTitle}
            </h2>
            <p className='text-muted-foreground text-sm'>{errorMessage}</p>
          </div>

          <Button onClick={handleTryAgain} className='min-w-32' size='lg'>
            Try again
          </Button>
        </div>
      </div>
    </DotBackground>
  )
}
