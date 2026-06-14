import {
  ContactSection,
  HeroSection,
  ProductSection,
  SupportSection,
} from '@/features/marketing'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_home/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className='relative z-10 flex w-full flex-1 flex-col items-center justify-center py-20 md:py-28'>
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8'>
        <HeroSection />
        <ProductSection />
        <SupportSection />
        <ContactSection />
      </div>
    </div>
  )
}
