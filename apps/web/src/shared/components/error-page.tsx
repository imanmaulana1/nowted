import { useRouter } from '@tanstack/react-router'

import { cn } from '../lib/utils'
import { DotBackground } from './dot-background'
import { buttonVariants } from './ui/button'

function NetworkErrorSvg() {
  return (
    <svg
      width='200'
      height='150'
      viewBox='0 0 200 150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='mb-6'>
      <circle
        cx='100'
        cy='75'
        r='50'
        fill='rgba(59, 130, 246, 0.08)'
        filter='blur(10px)'
      />
      <path
        d='M70 95C60.6112 95 53 87.3888 53 78C53 69.4589 59.2789 62.3813 67.5312 61.1685C70.6276 50.1171 80.7593 42 92.75 42C106.315 42 117.659 52.0125 119.539 65.045C129.431 65.5901 137.25 73.8824 137.25 84C137.25 94.4934 128.743 103 118.25 103L70 95'
        stroke='#E2E8F0'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='dark:stroke-zinc-800'
      />
      <g transform='translate(85, 60)'>
        <circle
          cx='15'
          cy='15'
          r='25'
          fill='white'
          className='dark:fill-zinc-900'
        />
        <path
          d='M1 1L29 29'
          stroke='#EF4444'
          strokeWidth='3.5'
          strokeLinecap='round'
        />
        <path
          d='M8.5 12.5C10.2 10.5 12.7 9.5 15 9.5C17.3 9.5 19.8 10.5 21.5 12.5'
          stroke='#94A3B8'
          strokeWidth='2.5'
          strokeLinecap='round'
        />
        <path
          d='M4.5 8.5C7.3 5.5 11.1 4 15 4C18.9 4 22.7 5.5 25.5 8.5'
          stroke='#94A3B8'
          strokeWidth='2.5'
          strokeLinecap='round'
        />
        <circle cx='15' cy='21' r='2.5' fill='#94A3B8' />
      </g>
    </svg>
  )
}

function ServerErrorSvg() {
  return (
    <svg
      width='200'
      height='150'
      viewBox='0 0 200 150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='mb-6'>
      <circle
        cx='100'
        cy='75'
        r='50'
        fill='rgba(249, 115, 22, 0.08)'
        filter='blur(10px)'
      />

      <rect
        x='75'
        y='70'
        width='8'
        height='40'
        rx='2'
        fill='#94A3B8'
        className='dark:fill-zinc-700'
      />
      <rect
        x='117'
        y='70'
        width='8'
        height='40'
        rx='2'
        fill='#94A3B8'
        className='dark:fill-zinc-700'
      />
      <path
        d='M70 110H88'
        stroke='#94A3B8'
        strokeWidth='3'
        strokeLinecap='round'
        className='dark:stroke-zinc-700'
      />
      <path
        d='M112 110H130'
        stroke='#94A3B8'
        strokeWidth='3'
        strokeLinecap='round'
        className='dark:stroke-zinc-700'
      />

      <rect
        x='60'
        y='55'
        width='80'
        height='20'
        rx='3'
        fill='#E2E8F0'
        stroke='#CBD5E1'
        strokeWidth='1.5'
        className='dark:fill-zinc-800 dark:stroke-zinc-700'
      />
      <path
        d='M65 55L75 75'
        stroke='#F97316'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path
        d='M80 55L90 75'
        stroke='#F97316'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path
        d='M95 55L105 75'
        stroke='#F97316'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path
        d='M110 55L120 75'
        stroke='#F97316'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path
        d='M125 55L135 75'
        stroke='#F97316'
        strokeWidth='4'
        strokeLinecap='round'
      />

      <g transform='translate(62, 28)'>
        <path d='M10 25L17 5H21L28 25' fill='#F97316' />
        <rect x='6' y='24' width='26' height='3' rx='1.5' fill='#F97316' />
        <path d='M13.5 15H24.5L26 20H12L13.5 15Z' fill='white' />
      </g>

      <g transform='translate(115, 15)'>
        <rect
          x='13.5'
          y='20'
          width='3'
          height='30'
          fill='#64748B'
          className='dark:fill-zinc-600'
        />
        <rect
          x='1'
          y='5'
          width='28'
          height='28'
          rx='4'
          transform='rotate(45 15 19)'
          fill='#F97316'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M15 11V20'
          stroke='white'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <circle cx='15' cy='25' r='2' fill='white' />
      </g>
    </svg>
  )
}

function GeneralErrorSvg() {
  return (
    <svg
      width='200'
      height='150'
      viewBox='0 0 200 150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='mb-6'>
      <circle
        cx='100'
        cy='75'
        r='50'
        fill='rgba(245, 158, 11, 0.08)'
        filter='blur(10px)'
      />
      <path
        d='M100 35L145 55V85C145 110 125 125 100 133C75 125 55 110 55 85V55L100 35Z'
        fill='white'
        stroke='#E2E8F0'
        strokeWidth='2'
        className='dark:fill-zinc-900 dark:stroke-zinc-800'
      />
      <g transform='translate(80, 52)'>
        <path
          d='M20 2L38 34C39 36 38 38 36 38H4C2 38 1 36 2 34L20 2Z'
          fill='#F59E0B'
        />
        <path
          d='M20 12V24'
          stroke='white'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <circle cx='20' cy='30' r='2' fill='white' />
      </g>
    </svg>
  )
}

export function ErrorPage({
  error,
  reset,
}: {
  error: unknown
  reset: () => void
}) {
  const router = useRouter()

  const handleTryAgain = () => {
    reset()
    router.navigate({ to: '/app' })
  }

  let isNetworkError = false
  let isServerError = false
  let errorMessage = 'An unexpected error occurred. Please try again later'
  let errorTitle = 'Something went wrong'

  const apiError = error as { error?: { code?: string; message?: string } }

  if (apiError?.error?.code) {
    const code = apiError.error.code
    switch (code) {
      case 'NETWORK_ERROR':
        isNetworkError = true
        errorTitle = 'Unable to reach the server'
        errorMessage =
          "We couldn't connect to our servers. Please try again in a moment"
        break
      case 'INTERNAL_SERVER_ERROR':
        isServerError = true
        errorTitle = 'System is down for Maintenance'
        errorMessage =
          'We hit an unexpected problem. We promise, we will be right back!'
        break
      default:
        errorTitle = 'Something went wrong'
        errorMessage = apiError.error.message || errorMessage
        break
    }
  } else if (error instanceof Error) {
    if (
      error.message.toLowerCase().includes('network error') ||
      (typeof navigator !== 'undefined' && !navigator.onLine)
    ) {
      isNetworkError = true
      errorTitle = 'No Internet Connection'
      errorMessage = 'Please check your internet connection and try again'
    } else {
      errorMessage = error.message
    }
  }

  return (
    <DotBackground>
      <main className='relative z-20 flex flex-1 flex-col items-center justify-center p-4'>
        <div className='flex flex-col items-center text-center'>
          {isNetworkError ? (
            <NetworkErrorSvg />
          ) : isServerError ? (
            <ServerErrorSvg />
          ) : (
            <GeneralErrorSvg />
          )}

          <h2 className='mb-2 text-xl font-bold text-zinc-900 md:text-2xl dark:text-zinc-50'>
            {errorTitle}
          </h2>
          <p className='mx-auto mb-6 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
            {errorMessage}
          </p>

          <button
            onClick={handleTryAgain}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'bg-primary text-primary-foreground hover:bg-primary/80 h-9 px-6 text-xs font-semibold shadow-sm transition-colors duration-150'
            )}>
            Try again
          </button>
        </div>
      </main>
    </DotBackground>
  )
}
