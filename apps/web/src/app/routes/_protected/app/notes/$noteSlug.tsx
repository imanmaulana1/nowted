import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'

import { NoteDetailError } from '@/features/notes/components/note-detail-error'
import { NoteDetailNotFound } from '@/features/notes/components/note-detail-not-found'
import { NoteDetailSkeleton } from '@/features/notes/components/note-detail-skeleton'
import { noteQueryOptions } from '@/features/notes/lib/query-options'
import { parseApiError } from '@/shared/lib/error-parser'

export const Route = createFileRoute('/_protected/app/notes/$noteSlug')({
  loader: async ({ context, params }) => {
    try {
      const note = await context.queryClient.ensureQueryData(
        noteQueryOptions(params.noteSlug)
      )

      if (!note || note.archivedAt !== null || note.trashedAt !== null) {
        throw notFound()
      }
    } catch (error) {
      const { code } = parseApiError(error)

      if (code === 'NOTE_NOT_FOUND' || code === 'RESOURCE_NOT_FOUND')
        throw notFound()

      throw error
    }
  },
  component: RouteComponent,
  pendingComponent: NoteDetailSkeleton,
  notFoundComponent: NoteDetailNotFound,
  errorComponent: ({ error }) => <NoteDetailError error={error} />,
})

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
