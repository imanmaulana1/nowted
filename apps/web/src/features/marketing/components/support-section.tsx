import { ChevronDown } from 'lucide-react'

import { faqItems } from '../constants/support'
import { SectionHeader } from './section-header'

export function SupportSection() {
  return (
    <section
      id='support'
      className='flex w-full scroll-mt-20 flex-col items-center gap-12 pt-24 text-left md:pt-36'>
      <SectionHeader
        title='Frequently Asked Questions'
        description='Everything you need to know about setting up and using Nowted.'
      />

      <div className='flex w-full max-w-3xl flex-col gap-4'>
        {faqItems.map((item) => {
          const Icon = item.icon
          return (
            <details
              key={item.question}
              className='group border-border/60 bg-card/20 hover:bg-card/40 rounded-xl border transition-all duration-300 [&_summary::-webkit-details-marker]:hidden'>
              <summary className='text-foreground flex cursor-pointer items-center justify-between p-5 font-semibold select-none'>
                <div className='flex items-center gap-3'>
                  <Icon className='size-5 shrink-0 text-indigo-500' />
                  <span>{item.question}</span>
                </div>
                <ChevronDown className='size-4 transition-transform group-open:rotate-180' />
              </summary>
              <div className='border-border/30 text-muted-foreground border-t px-5 pt-1 pb-5 text-sm leading-relaxed font-light'>
                {item.answer}
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}
