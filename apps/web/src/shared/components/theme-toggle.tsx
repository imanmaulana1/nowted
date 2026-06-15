import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/app/providers/theme-provider'
import { Button } from '@/shared/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant='outline'
            size='icon-sm'
            onClick={toggleTheme}
            className='group relative transition-all duration-500'
            aria-label='Theme toggle'
          />
        }>
        <Sun
          size={16}
          className='scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:-rotate-90'
        />
        <Moon
          size={16}
          className='absolute scale-0 rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0'
        />
        <span className='sr-only'>Theme toggle</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</p>
      </TooltipContent>
    </Tooltip>
  )
}
