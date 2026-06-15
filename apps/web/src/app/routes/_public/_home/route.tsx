import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Footer } from '@/features/marketing/components/footer'
import { Header } from '@/features/marketing/components/header'
import { DotBackground } from '@/shared/components/dot-background'

export const Route = createFileRoute('/_public/_home')({
  component: HomeLayout,
})

function HomeLayout() {
  return (
    <DotBackground>
      <Header />
      <main className='relative z-10 flex flex-1 flex-col'>
        <Outlet />
      </main>
      <Footer />
    </DotBackground>
  )
}
