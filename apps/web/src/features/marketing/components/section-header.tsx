interface SectionHeaderProps {
  title: string
  description: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className='max-w-3xl space-y-4 text-center'>
      <h2 className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl'>
        {title}
      </h2>
      <p className='text-muted-foreground text-base font-light sm:text-lg'>
        {description}
      </p>
    </div>
  )
}
