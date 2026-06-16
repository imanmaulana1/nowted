import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { NoteDetailLayout } from '@/features/notes/components/note-detail-layout'
import { ToolbarActive } from '@/features/notes/components/toolbar-active'
import { NOTE_MODAL_CONFIRMATION_PROPS } from '@/features/notes/constants/note-modal'
import { noteQueryOptions } from '@/features/notes/lib/query-options'
import { ModalConfirmation } from '@/shared/components/modal-confirmation'

export const Route = createFileRoute('/_protected/app/notes/$noteSlug/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [openArchiveModal, setOpenArchiveModal] = useState(false)
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
      to: '/app/notes',
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
      to: '/app/notes',
    })
  }

  const toolbarProps = {
    isFullscreen,
    noteSlug,
    isFavorite: note.isFavorite,
    onFullscreen: toggleFullscreen,
    onClose: exitFullscreen,
    onArchive: () => setOpenArchiveModal(true),
    onTrash: () => setOpenTrashModal(true),
    onShowInfo: () => setOpenInfoModal(true),
    onToggleFavorite: () => {},
    onExport: () => {},
  } satisfies React.ComponentProps<typeof ToolbarActive>

  return (
    <NoteDetailLayout
      note={note}
      isLoading={isLoading}
      onBack={handleBack}
      toolbar={<ToolbarActive {...toolbarProps} />}
      showInfo={openInfoModal}
      setShowInfo={setOpenInfoModal}>
      <ModalConfirmation
        open={openTrashModal}
        onOpenChange={setOpenTrashModal}
        onConfirm={() => {}}
        {...NOTE_MODAL_CONFIRMATION_PROPS.TRASH}
      />
      <ModalConfirmation
        open={openArchiveModal}
        onOpenChange={setOpenArchiveModal}
        onConfirm={() => {}}
        {...NOTE_MODAL_CONFIRMATION_PROPS.ARCHIVE}
      />
    </NoteDetailLayout>
  )
}
