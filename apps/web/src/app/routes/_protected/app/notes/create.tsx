import { NoteForm } from '@/features/notes/components/note-form'
import { useCreate } from '@/features/notes/hooks/use-create'
import type { NoteInput } from '@/features/notes/schemas/note-input.schema'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/app/notes/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const { fullscreen } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { mutate: createNote, isPending: isCreating } = useCreate()

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
    createNote(values, {
      onSuccess: () => {
        navigate({
          to: '/app/notes',
        })
      },
    })
  }

  return (
    <NoteForm
      mode='create'
      onSubmit={handleSubmit}
      onCancel={() => {
        navigate({
          to: '/app/notes',
        })
      }}
      isFullscreen={isFullscreen}
      isLoading={isCreating}
      onFullscreen={handleToggleFullscreen}
    />
  )
}
