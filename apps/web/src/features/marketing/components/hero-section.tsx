import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

export function HeroSection() {
  return (
    <section
      id='home'
      className='flex w-full flex-col items-center gap-6 text-center'>
      <h1 className='text-foreground max-w-4xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl md:text-6xl'>
        Boost your productivity with our{' '}
        <span className='font-kaushan-script mr-1 text-amber-600 italic dark:text-[#ffd343]'>
          streamlined
        </span>{' '}
        <span className='font-kaushan-script mr-2.5 text-amber-600 italic dark:text-[#ffd343]'>
          note-taking
        </span>{' '}
        solution
      </h1>

      <p className='text-muted-foreground max-w-2xl text-base leading-relaxed font-light sm:text-lg md:text-xl'>
        Effortlessly access your notes from any device with our convenient
        cloud-based solution.
      </p>

      <div className='mt-4'>
        <Link to='/register'>
          <Button className='group inline-flex h-12 items-center gap-2 rounded-lg border-0 bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500'>
            Try For Free
            <ArrowRight className='transition-transform group-hover:translate-x-1' />
          </Button>
        </Link>
      </div>

      <div className='mt-14 w-full max-w-5xl md:mt-20'>
        <picture>
          <source srcSet='/hero.webp' type='image/webp' />
          <img
            src='/hero.png'
            alt='Nowted Dashboard Preview'
            className='pointer-events-none h-auto w-full object-cover'
            loading='eager'
            fetchPriority='high'
          />
        </picture>
      </div>
    </section>
  )
}
