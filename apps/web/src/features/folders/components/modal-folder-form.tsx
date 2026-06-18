import { useForm } from '@tanstack/react-form'

import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Spinner } from '@/shared/components/ui/spinner'

import { folderInputSchema, type FolderInput } from '../schemas/folder.schema'

type ModalFolderFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'update'
  defaultValues?: FolderInput
  onSubmit: (
    values: FolderInput,
    callbacks?: {
      onSuccess?: () => void
    }
  ) => void
  isLoading: boolean
}

export function ModalFormFolder({
  open,
  onOpenChange,
  mode,
  defaultValues = { name: '' },
  onSubmit,
  isLoading,
}: ModalFolderFormProps) {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: folderInputSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value, {
        onSuccess: () => {
          form.reset()
        },
      })
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className='gap-6'>
        <DialogHeader className='gap-1.5'>
          <DialogTitle>
            {mode === 'create' ? 'Create Folder' : 'Edit Folder'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Enter a name for your new folder.'
              : 'Edit the name of your folder.'}
          </DialogDescription>
        </DialogHeader>

        <form
          id='folder-form'
          onSubmit={handleSubmit}
          className='flex flex-col gap-6'>
          <FieldGroup>
            <form.Field
              name='name'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                const handleChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  field.handleChange(e.target.value)
                }

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Folder Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={handleChange}
                      aria-invalid={isInvalid}
                      placeholder='Development'
                      autoComplete='off'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant='outline' onClick={() => {}} />}>
            Cancel
          </DialogClose>
          <Button form='folder-form' type='submit' disabled={isLoading}>
            {isLoading && <Spinner />}
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
