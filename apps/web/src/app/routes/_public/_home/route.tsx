import { Footer, Header } from '@/features/marketing'
import { DotBackground } from '@/shared/components/dot-background'
import { createFileRoute, Outlet } from '@tanstack/react-router'

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
