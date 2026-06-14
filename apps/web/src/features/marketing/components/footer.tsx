export function Footer() {
  return (
    <footer className='border-border/40 bg-muted/10 text-muted-foreground relative z-10 scroll-mt-20 border-t py-8 text-center text-xs'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8'>
        <p>© {new Date().getFullYear()} Nowted. All rights reserved.</p>
        <div className='flex gap-6'>
          <a href='#privacy' className='hover:underline'>
            Privacy Policy
          </a>
          <a href='#terms' className='hover:underline'>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
