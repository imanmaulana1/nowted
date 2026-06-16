import { createFileRoute, Outlet } from '@tanstack/react-router'

import { NoteListLayout } from '@/features/notes/components/note-list-layout'
import { fullscreenQuerySchema } from '@/shared/schemas/fullscreen-query.schema'

export const Route = createFileRoute('/_protected/app/trash')({
  validateSearch: fullscreenQuerySchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { fullscreen } = Route.useSearch()
  const isFullscreen = !!fullscreen

  return (
    <NoteListLayout
      status='trash'
      to='/app/trash/$noteSlug'
      isFullscreen={isFullscreen}
      basePath='/app/trash'
      title='Trash'>
      <Outlet />
    </NoteListLayout>
  )
}
