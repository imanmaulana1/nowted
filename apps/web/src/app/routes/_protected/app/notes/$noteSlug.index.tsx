import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { NoteDetailLayout } from '@/features/notes/components/note-detail-layout'
import { ToolbarActive } from '@/features/notes/components/toolbar-active'
import { NOTE_MODAL_CONFIRMATION_PROPS } from '@/features/notes/constants/note-modal'
import { useArchive } from '@/features/notes/hooks/use-archive'
import { useToggleFavorite } from '@/features/notes/hooks/use-toggle-favorite'
import { useTrash } from '@/features/notes/hooks/use-trash'
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

  const { mutate: toggleFavorite } = useToggleFavorite()
  const { mutate: archiveNote, isPending: isArchiving } = useArchive()
  const { mutate: trashNote, isPending: isTrashing } = useTrash()

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

  const handleArchive = () => {
    archiveNote(noteSlug, {
      onSuccess: () => {
        setOpenArchiveModal(false)
        navigate({
          to: '/app/notes',
        })
      },
    })
  }

  const handleTrash = () => {
    trashNote(noteSlug, {
      onSuccess: () => {
        setOpenTrashModal(false)
        navigate({
          to: '/app/notes',
        })
      },
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
    onToggleFavorite: () => toggleFavorite(noteSlug),
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
        onConfirm={handleTrash}
        isConfirming={isTrashing}
        {...NOTE_MODAL_CONFIRMATION_PROPS.TRASH}
      />
      <ModalConfirmation
        open={openArchiveModal}
        onOpenChange={setOpenArchiveModal}
        onConfirm={handleArchive}
        isConfirming={isArchiving}
        {...NOTE_MODAL_CONFIRMATION_PROPS.ARCHIVE}
      />
    </NoteDetailLayout>
  )
}
