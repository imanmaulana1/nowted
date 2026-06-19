import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { cn } from '../lib/utils'
import { DotBackground } from './dot-background'
import { buttonVariants } from './ui/button'

export function NotFoundPage() {
  const [isLoggedIn] = useState(
    () => typeof window !== 'undefined' && !!localStorage.getItem('accessToken')
  )

  return (
    <DotBackground>
      <main className='relative z-20 flex flex-1 flex-col items-center justify-center p-4'>
        <div className='flex flex-col items-center text-center'>
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

            <rect
              x='55'
              y='25'
              width='70'
              height='90'
              rx='8'
              fill='white'
              stroke='#E2E8F0'
              strokeWidth='2'
              className='drop-shadow-xs dark:fill-zinc-900 dark:stroke-zinc-800'
            />

            <circle
              cx='70'
              cy='45'
              r='4'
              fill='none'
              stroke='#3B82F6'
              strokeWidth='1.5'
            />
            <line
              x1='82'
              y1='45'
              x2='112'
              y2='45'
              stroke='#E2E8F0'
              strokeWidth='2'
              strokeLinecap='round'
              className='dark:stroke-zinc-700'
            />

            <circle
              cx='70'
              cy='65'
              r='4'
              fill='none'
              stroke='#3B82F6'
              strokeWidth='1.5'
            />
            <line
              x1='82'
              y1='65'
              x2='105'
              y2='65'
              stroke='#E2E8F0'
              strokeWidth='2'
              strokeLinecap='round'
              className='dark:stroke-zinc-700'
            />

            <circle
              cx='70'
              cy='85'
              r='4'
              fill='none'
              stroke='#3B82F6'
              strokeWidth='1.5'
            />
            <line
              x1='82'
              y1='85'
              x2='110'
              y2='85'
              stroke='#E2E8F0'
              strokeWidth='2'
              strokeLinecap='round'
              className='dark:stroke-zinc-700'
            />

            <circle
              cx='70'
              cy='100'
              r='4'
              fill='none'
              stroke='#3B82F6'
              strokeWidth='1.5'
            />
            <line
              x1='82'
              y1='100'
              x2='100'
              y2='100'
              stroke='#E2E8F0'
              strokeWidth='2'
              strokeLinecap='round'
              className='dark:stroke-zinc-700'
            />

            <g transform='translate(100, 35)'>
              <circle
                cx='35'
                cy='35'
                r='22'
                fill='white'
                stroke='#1E293B'
                strokeWidth='3.5'
                className='dark:fill-zinc-900 dark:stroke-zinc-100'
              />
              <circle cx='35' cy='35' r='18' fill='rgba(59, 130, 246, 0.05)' />
              <line
                x1='50.5'
                y1='50.5'
                x2='68'
                y2='68'
                stroke='#1E293B'
                strokeWidth='4.5'
                strokeLinecap='round'
                className='dark:stroke-zinc-100'
              />
              <path
                d='M24 35C24 28.9249 28.9249 24 35 24'
                stroke='rgba(59, 130, 246, 0.3)'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </g>
          </svg>

          <h1 className='mb-2 text-4xl font-extrabold tracking-tight text-blue-600 md:text-5xl'>
            404
          </h1>
          <h2 className='mb-2 text-xl font-bold text-zinc-900 md:text-2xl dark:text-zinc-50'>
            Oops! We lost this page
          </h2>
          <p className='mx-auto mb-6 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
            {isLoggedIn
              ? "The page you are looking for doesn't exist, was deleted, or moved. Let's get you back to your notes"
              : "The page you are looking for doesn't exist, was deleted, or moved. Let's get you back to the home page"}
          </p>

          <Link
            to={isLoggedIn ? '/app/notes' : '/'}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'bg-primary text-primary-foreground hover:bg-primary/80 h-9 px-6 text-xs font-semibold shadow-sm transition-colors duration-150'
            )}>
            {isLoggedIn ? 'Back to Dashboard' : 'Back to Home'}
          </Link>
        </div>
      </main>
    </DotBackground>
  )
}
