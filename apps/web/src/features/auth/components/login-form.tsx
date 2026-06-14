import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'

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

import { useLogin } from '../hooks/use-login'
import { loginSchema, type LoginInput } from '../schemas/login.schema'

export function LoginForm() {
  const { mutate, isPending } = useLogin()

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginInput,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          form.reset()
          navigate({ to: '/app' })
        },
      })
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return (
    <form id='login-form' className='w-full' noValidate onSubmit={handleSubmit}>
      <FieldGroup>
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
                  autoComplete='current-password'
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
          children={([canSubmit, isSubmitting]) => {
            const isLoading = isSubmitting || isPending

            return (
              <Button
                type='submit'
                disabled={!canSubmit || isLoading}
                className='w-full'>
                {isLoading && <Spinner />}
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            )
          }}
        />
      </div>
    </form>
  )
}
