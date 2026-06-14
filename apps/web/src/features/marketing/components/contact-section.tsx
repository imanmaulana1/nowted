import { Mail, MapPin } from 'lucide-react'

import { ContactForm } from './contact-form'
import { SectionHeader } from './section-header'

export function ContactSection() {
  return (
    <section
      id='contact'
      className='flex w-full scroll-mt-20 flex-col items-center gap-12 pt-24 text-left md:pt-36'>
      <SectionHeader
        title='Get in touch'
        description="Have questions, feedback, or suggestions? We'd love to hear from you."
      />

      <div className='bg-card/20 border-border/60 grid w-full max-w-5xl grid-cols-1 gap-8 rounded-2xl border p-6 sm:p-10 md:grid-cols-12'>
        <div className='flex flex-col justify-between gap-8 md:col-span-5'>
          <div className='space-y-4'>
            <h3 className='text-foreground text-xl font-bold'>
              Contact Information
            </h3>
            <p className='text-muted-foreground text-sm leading-relaxed font-light'>
              Reach out to us via email or drop a message using the form. Our
              support team typically replies within 24 hours.
            </p>
          </div>

          <div className='space-y-4'>
            <div className='text-muted-foreground flex items-center gap-3 text-sm'>
              <Mail className='size-5 text-indigo-500' />
              <span>support@nowted.app</span>
            </div>
            <div className='text-muted-foreground flex items-center gap-3 text-sm'>
              <MapPin className='size-5 text-indigo-500' />
              <span>Central Jakarta, Indonesia</span>
            </div>
          </div>

          <div className='text-muted-foreground border-border/40 border-t pt-4 text-xs font-light'>
            Follow our development logs directly on our open GitHub
            repositories.
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
