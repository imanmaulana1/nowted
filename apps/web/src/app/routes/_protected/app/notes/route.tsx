import { createFileRoute, Outlet } from '@tanstack/react-router'

import { NoteListLayout } from '@/features/notes/components/note-list-layout'
import { fullscreenQuerySchema } from '@/shared/schemas/fullscreen-query.schema'

export const Route = createFileRoute('/_protected/app/notes')({
  validateSearch: fullscreenQuerySchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { fullscreen } = Route.useSearch()
  const isFullscreen = !!fullscreen

  return (
    <NoteListLayout
      status='active'
      to='/app/notes/$noteSlug'
      isFullscreen={isFullscreen}
      basePath='/app/notes'
      title='All Notes'>
      <Outlet />
    </NoteListLayout>
  )
}
