import { AppProvider } from '@/app/providers/app-provider.tsx'
import { queryClient } from '@/app/query-client'
import { router } from '@/app/router'
import '@/app/styles/globals.css'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider
        router={router}
        context={{
          queryClient,
        }}
      />
    </AppProvider>
  </StrictMode>
)
