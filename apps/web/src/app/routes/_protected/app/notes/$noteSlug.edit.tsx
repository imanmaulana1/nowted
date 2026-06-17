import { NoteForm } from '@/features/notes/components/note-form'
import { useUpdate } from '@/features/notes/hooks/use-update'
import { noteQueryOptions } from '@/features/notes/lib/query-options'
import type { NoteInput } from '@/features/notes/schemas/note-input.schema'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/app/notes/$noteSlug/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { noteSlug } = Route.useParams()
  const { fullscreen } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data: note } = useSuspenseQuery(noteQueryOptions(noteSlug))

  const { mutate: updateNote, isPending: isSaving } = useUpdate(noteSlug)

  const isFullscreen = !!fullscreen

  const handleToggleFullscreen = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        fullscreen: prev.fullscreen ? undefined : true,
      }),
    })
  }

  const handleSubmit = (values: NoteInput) => {
    updateNote(values, {
      onSuccess: (data) => {
        navigate({
          to: '/app/notes/$noteSlug',
          params: { noteSlug: data.slug },
        })
      },
    })
  }

  return (
    <NoteForm
      mode='update'
      defaultValues={note}
      onSubmit={handleSubmit}
      onCancel={() => {
        navigate({
          to: '/app/notes/$noteSlug',
          params: { noteSlug },
        })
      }}
      isFullscreen={isFullscreen}
      isLoading={isSaving}
      onFullscreen={handleToggleFullscreen}
    />
  )
}
