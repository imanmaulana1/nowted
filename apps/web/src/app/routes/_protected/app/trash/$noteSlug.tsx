import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'

import { NoteDetailError } from '@/features/notes/components/note-detail-error'
import { NoteDetailLayout } from '@/features/notes/components/note-detail-layout'
import { NoteDetailNotFound } from '@/features/notes/components/note-detail-not-found'
import { NoteDetailSkeleton } from '@/features/notes/components/note-detail-skeleton'
import { ToolbarTrash } from '@/features/notes/components/toolbar-trash'
import { NOTE_MODAL_CONFIRMATION_PROPS } from '@/features/notes/constants/note-modal'
import { useDelete } from '@/features/notes/hooks/use-delete'
import { useRestore } from '@/features/notes/hooks/use-restore'
import { noteQueryOptions } from '@/features/notes/lib/query-options'
import { ModalConfirmation } from '@/shared/components/modal-confirmation'
import { parseApiError } from '@/shared/lib/error-parser'

export const Route = createFileRoute('/_protected/app/trash/$noteSlug')({
  loader: async ({ context, params }) => {
    try {
      const note = await context.queryClient.ensureQueryData(
        noteQueryOptions(params.noteSlug)
      )

      if (!note || note.trashedAt === null) {
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
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [openRestoreModal, setOpenRestoreModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { noteSlug } = Route.useParams()
  const { fullscreen } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data: note, isPending: isLoading } = useSuspenseQuery(
    noteQueryOptions(noteSlug)
  )

  const { mutate: restoreNote, isPending: isRestoring } = useRestore()
  const { mutate: deleteNote, isPending: isDeleting } = useDelete()

  const isFullscreen = !!fullscreen

  const handleBack = () => {
    navigate({
      to: '/app/trash',
    })
  }

  const toggleFullscreen = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        fullscreen: prev.fullscreen ? undefined : true,
      }),
    })
  }

  const exitFullscreen = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        fullscreen: undefined,
      }),
      to: '/app/trash',
    })
  }

  const handleRestore = () => {
    restoreNote(noteSlug, {
      onSuccess: () => {
        setOpenRestoreModal(false)
        navigate({
          to: '/app/trash',
        })
      },
    })
  }

  const handleDelete = () => {
    deleteNote(noteSlug, {
      onSuccess: () => {
        setOpenDeleteModal(false)
        navigate({
          to: '/app/trash',
        })
      },
    })
  }

  const toolbarProps = {
    isFullscreen,
    onFullscreen: toggleFullscreen,
    onClose: exitFullscreen,
    onRestore: () => setOpenRestoreModal(true),
    onDelete: () => setOpenDeleteModal(true),
    onShowInfo: () => setOpenInfoModal(true),
    onExport: () => {},
  } satisfies React.ComponentProps<typeof ToolbarTrash>

  return (
    <NoteDetailLayout
      note={note}
      isLoading={isLoading}
      onBack={handleBack}
      toolbar={<ToolbarTrash {...toolbarProps} />}
      showInfo={openInfoModal}
      setShowInfo={setOpenInfoModal}>
      <ModalConfirmation
        open={openRestoreModal}
        onOpenChange={setOpenRestoreModal}
        onConfirm={handleRestore}
        isConfirming={isRestoring}
        {...NOTE_MODAL_CONFIRMATION_PROPS.RESTORE}
      />
      <ModalConfirmation
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
        {...NOTE_MODAL_CONFIRMATION_PROPS.DELETE}
      />
    </NoteDetailLayout>
  )
}
