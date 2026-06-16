import { createFileRoute, Outlet } from '@tanstack/react-router'

import { NoteListLayout } from '@/features/notes/components/note-list-layout'
import { fullscreenQuerySchema } from '@/shared/schemas/fullscreen-query.schema'

export const Route = createFileRoute('/_protected/app/archive')({
  validateSearch: fullscreenQuerySchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { fullscreen } = Route.useSearch()
  const isFullscreen = !!fullscreen

  return (
    <NoteListLayout
      status='archive'
      to='/app/archive/$noteSlug'
      isFullscreen={isFullscreen}
      basePath='/app/archive'
      title='Archive'>
      <Outlet />
    </NoteListLayout>
  )
}
