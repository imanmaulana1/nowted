import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'

import { NoteDetailError } from '@/features/notes/components/note-detail-error'
import { NoteDetailLayout } from '@/features/notes/components/note-detail-layout'
import { NoteDetailNotFound } from '@/features/notes/components/note-detail-not-found'
import { NoteDetailSkeleton } from '@/features/notes/components/note-detail-skeleton'
import { ToolbarArchive } from '@/features/notes/components/toolbar-archive'
import { NOTE_MODAL_CONFIRMATION_PROPS } from '@/features/notes/constants/note-modal'
import { noteQueryOptions } from '@/features/notes/lib/query-options'
import { ModalConfirmation } from '@/shared/components/modal-confirmation'
import { parseApiError } from '@/shared/lib/error-parser'

export const Route = createFileRoute('/_protected/app/archive/$noteSlug')({
  loader: async ({ context, params }) => {
    try {
      const note = await context.queryClient.ensureQueryData(
        noteQueryOptions(params.noteSlug)
      )

      if (!note || note.archivedAt === null || note.trashedAt !== null) {
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
  errorComponent: ({ error, reset }) => (
    <NoteDetailError error={error as Error} onRetry={reset} />
  ),
})

function RouteComponent() {
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [openUnarchiveModal, setOpenUnarchiveModal] = useState(false)
  const [openTrashModal, setOpenTrashModal] = useState(false)

  const { noteSlug } = Route.useParams()
  const { fullscreen } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data: note, isPending: isLoading } = useSuspenseQuery(
    noteQueryOptions(noteSlug)
  )

  const isFullscreen = !!fullscreen

  const handleBack = () => {
    navigate({
      to: '/app/archive',
    })
  }

  const toggleFullscreen = () => {
    navigate({
      search: (prev) => {
        const { fullscreen, ...rest } = prev

        return {
          ...rest,
          ...(fullscreen ? {} : { fullscreen: true }),
        }
      },
    })
  }

  const exitFullscreen = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        fullscreen: undefined,
      }),
      to: '/app/archive',
    })
  }

  const toolbarProps = {
    isFullscreen,
    onFullscreen: toggleFullscreen,
    onClose: exitFullscreen,
    onUnarchive: () => setOpenUnarchiveModal(true),
    onTrash: () => setOpenTrashModal(true),
    onShowInfo: () => setOpenInfoModal(true),
    onExport: () => {},
  } satisfies React.ComponentProps<typeof ToolbarArchive>

  return (
    <NoteDetailLayout
      note={note}
      isLoading={isLoading}
      onBack={handleBack}
      toolbar={<ToolbarArchive {...toolbarProps} />}
      showInfo={openInfoModal}
      setShowInfo={setOpenInfoModal}>
      <ModalConfirmation
        open={openUnarchiveModal}
        onOpenChange={setOpenUnarchiveModal}
        onConfirm={() => {}}
        {...NOTE_MODAL_CONFIRMATION_PROPS.UNARCHIVE}
      />
      <ModalConfirmation
        open={openTrashModal}
        onOpenChange={setOpenTrashModal}
        onConfirm={() => {}}
        {...NOTE_MODAL_CONFIRMATION_PROPS.TRASH}
      />
    </NoteDetailLayout>
  )
}
