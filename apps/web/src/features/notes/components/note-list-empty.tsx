type NoteListEmptyProps = {
  title: string
  description: string
}

export function NoteListEmpty({ title, description }: NoteListEmptyProps) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center'>
      <p className='text-foreground/60 text-sm font-medium'>{title}</p>
      <p className='text-muted-foreground text-xs leading-relaxed'>
        {description}
      </p>
    </div>
  )
}
