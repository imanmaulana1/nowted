import { createFileRoute } from '@tanstack/react-router'

import { ContactSection } from '@/features/marketing/components/contact-section'
import { HeroSection } from '@/features/marketing/components/hero-section'
import { ProductSection } from '@/features/marketing/components/product-section'
import { SupportSection } from '@/features/marketing/components/support-section'

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
