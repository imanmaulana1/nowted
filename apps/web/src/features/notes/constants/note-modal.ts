import type { ModalConfirmation } from '@/shared/components/modal-confirmation'
import { Archive, ArchiveRestore, RotateCcw, Trash2 } from 'lucide-react'

export const NOTE_MODAL_CONFIRMATION_PROPS = {
  ARCHIVE: {
    title: 'Archive this note?',
    description: 'It will be moved to Archive. You can restore it later.',
    icon: Archive,
    confirmText: 'Archive',
  } satisfies Omit<
    React.ComponentProps<typeof ModalConfirmation>,
    'open' | 'onOpenChange' | 'onConfirm'
  >,
  UNARCHIVE: {
    title: 'Unarchive this note?',
    description: 'It will be moved back to your Notes list.',
    icon: ArchiveRestore,
    confirmText: 'Unarchive',
  } satisfies Omit<
    React.ComponentProps<typeof ModalConfirmation>,
    'open' | 'onOpenChange' | 'onConfirm'
  >,
  RESTORE: {
    title: 'Restore this note?',
    description: 'It will go back to your Notes list.',
    icon: RotateCcw,
    confirmText: 'Restore',
  } satisfies Omit<
    React.ComponentProps<typeof ModalConfirmation>,
    'open' | 'onOpenChange' | 'onConfirm'
  >,
  TRASH: {
    title: 'Move to Trash?',
    description: 'You can restore it later from Trash.',
    icon: Trash2,
    confirmText: 'Move to Trash',
    confirmVariant: 'destructive',
  } satisfies Omit<
    React.ComponentProps<typeof ModalConfirmation>,
    'open' | 'onOpenChange' | 'onConfirm'
  >,
  DELETE: {
    title: 'Delete permanently?',
    description: `This note will be deleted permanently and can't be restored.`,
    icon: Trash2,
    confirmText: 'Delete',
    confirmVariant: 'destructive',
  } satisfies Omit<
    React.ComponentProps<typeof ModalConfirmation>,
    'open' | 'onOpenChange' | 'onConfirm'
  >,
}
