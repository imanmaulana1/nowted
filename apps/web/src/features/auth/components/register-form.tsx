import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { InputPassword } from '@/shared/components/ui/input-password'
import { Spinner } from '@/shared/components/ui/spinner'

import { registerSchema, type RegisterInput } from '../schemas/register.schema'

export function RegisterForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    } as RegisterInput,
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      form.reset()
      toast.success('Account created successfully', {
        description: 'Please sign in to continue',
      })
      console.log(value)
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return (
    <form
      id='register-form'
      className='w-full'
      noValidate
      onSubmit={handleSubmit}>
      <FieldGroup>
        <form.Field
          name='fullName'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              field.handleChange(e.target.value)
            }

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={handleChange}
                  aria-invalid={isInvalid}
                  placeholder='John Doe'
                  autoComplete='name'
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='email'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              field.handleChange(e.target.value)
            }

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={handleChange}
                  aria-invalid={isInvalid}
                  placeholder='john.doe@gmail.com'
                  autoComplete='email'
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='password'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              field.handleChange(e.target.value)
            }

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <InputPassword
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={handleChange}
                  aria-invalid={isInvalid}
                  placeholder='********'
                  autoComplete='new-password'
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
      <div className='mt-6'>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type='submit'
              disabled={!canSubmit || isSubmitting}
              className='w-full'>
              {isSubmitting && <Spinner />}
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </Button>
          )}
        />
      </div>
    </form>
  )
}
