import { productFeatures } from '../constants/product'
import { SectionHeader } from './section-header'

export function ProductSection() {
  return (
    <section
      id='product'
      className='flex w-full scroll-mt-20 flex-col items-center gap-12 pt-24 text-left md:pt-36'>
      <SectionHeader
        title='A minimalist workspace built for focus'
        description='Nowted eliminates the clutter of traditional note tools, leaving only what you need to create your best work.'
      />

      <div className='grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2'>
        {productFeatures.map((product) => {
          const Icon = product.icon
          return (
            <div
              key={product.title}
              className='bg-card/40 border-border/60 hover:border-border hover:bg-card/60 flex gap-4 rounded-xl border p-6 transition-all'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-600/10 p-3 text-indigo-600 dark:text-indigo-400'>
                <Icon className='size-6' />
              </div>
              <div className='space-y-2'>
                <h3 className='text-foreground text-lg font-semibold'>
                  {product.title}
                </h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {product.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
