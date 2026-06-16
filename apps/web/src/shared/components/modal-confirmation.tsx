import { type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Spinner } from '@/shared/components/ui/spinner'
import { cn } from '@/shared/lib/utils'

type ModalConfirmationProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: React.ReactNode
  icon?: LucideIcon
  confirmText?: string
  cancelText?: string
  onConfirm: () => void | Promise<void>
  isConfirming?: boolean
  confirmVariant?: VariantProps<typeof buttonVariants>['variant']
}

export function ModalConfirmation({
  open,
  onOpenChange,
  title,
  description,
  icon: Icon,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isConfirming = false,
  confirmVariant = 'default',
}: ModalConfirmationProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className='gap-6'>
        <DialogHeader
          className={cn(
            'flex flex-col items-center text-center',
            Icon ? 'gap-4' : 'gap-1.5'
          )}>
          {Icon && (
            <div
              className={cn(
                'flex size-12 shrink-0 items-center justify-center rounded-full',
                confirmVariant === 'destructive'
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-muted/60 text-muted-foreground'
              )}>
              <Icon className='size-6' />
            </div>
          )}
          <div className='flex flex-col gap-1.5'>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className='sm:justify-center'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isConfirming}>
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isConfirming}>
            {isConfirming && <Spinner />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
