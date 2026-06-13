import { Toaster } from '@/shared/components/ui/sonner'
import { TooltipProvider } from '@/shared/components/ui/tooltip'
import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

type AppProviderProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryProvider>
        <TooltipProvider delay={200}>
          {children}
          <Toaster />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
