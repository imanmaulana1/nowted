import { queryClient } from '@/app/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

type QueryProviderProps = {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
