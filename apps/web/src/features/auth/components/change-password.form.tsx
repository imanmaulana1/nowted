import { useForm } from '@tanstack/react-form'
import { KeyRound, Lock } from 'lucide-react'

import { usePassword } from '@/features/auth/hooks/use-password'
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from '@/features/auth/schemas/change-password.schema'
import { Button } from '@/shared/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { InputPassword } from '@/shared/components/ui/input-password'
import { Spinner } from '@/shared/components/ui/spinner'

export function ChangePasswordForm() {
  const { mutate: changePassword, isPending } = usePassword()

  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    } as ChangePasswordInput,
    validators: {
      onSubmit: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      changePassword(value, {
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
    <form
      onSubmit={handleSubmit}
      className='w-full space-y-6 md:max-w-md'
      noValidate>
      <FieldGroup className='space-y-4'>
        <form.Field
          name='currentPassword'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              field.handleChange(e.target.value)
            }

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                <div className='relative flex items-center'>
                  <Lock className='text-muted-foreground/80 pointer-events-none absolute left-3 size-4' />
                  <InputPassword
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={handleChange}
                    className='pl-9'
                    aria-invalid={isInvalid}
                    placeholder='Enter current password'
                    autoComplete='current-password'
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='newPassword'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              field.handleChange(e.target.value)
            }

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <div className='relative flex items-center'>
                  <KeyRound className='text-muted-foreground/80 pointer-events-none absolute left-3 size-4' />
                  <InputPassword
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={handleChange}
                    className='pl-9'
                    aria-invalid={isInvalid}
                    placeholder='At least 8 characters'
                    autoComplete='new-password'
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='confirmPassword'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              field.handleChange(e.target.value)
            }

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Confirm New Password
                </FieldLabel>
                <div className='relative flex items-center'>
                  <KeyRound className='text-muted-foreground/80 pointer-events-none absolute left-3 size-4' />
                  <InputPassword
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={handleChange}
                    className='pl-9'
                    aria-invalid={isInvalid}
                    placeholder='Repeat new password'
                    autoComplete='new-password'
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <div className='flex justify-end pt-2 md:justify-start'>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => {
            const isLoading = isPending || isSubmitting

            return (
              <Button
                type='submit'
                disabled={!canSubmit || isLoading}
                className='w-full md:w-auto md:min-w-32'>
                {isLoading && <Spinner />}
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            )
          }}
        />
      </div>
    </form>
  )
}
