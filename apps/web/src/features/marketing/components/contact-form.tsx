import { useForm } from '@tanstack/react-form'
import { Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Spinner } from '@/shared/components/ui/spinner'
import { Textarea } from '@/shared/components/ui/textarea'

import { contactSchema, type Contact } from '../schemas/contact.schema'

export function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    } as Contact,
    validators: {
      onChange: contactSchema,
    },
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      form.reset()
      toast.success('Thank you! Your message has been sent successfully')
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 md:col-span-7'
      noValidate>
      <FieldGroup>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <form.Field
            name='name'
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                field.handleChange(e.target.value)
              }

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={handleChange}
                    aria-invalid={isInvalid}
                    placeholder='Your name'
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
                    type='email'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={handleChange}
                    aria-invalid={isInvalid}
                    placeholder='your@email.com'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </div>

        <form.Field
          name='message'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const handleChange = (
              e: React.ChangeEvent<HTMLTextAreaElement>
            ) => {
              field.handleChange(e.target.value)
            }

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={handleChange}
                  aria-invalid={isInvalid}
                  placeholder='How can we help you?'
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <div className='mt-2'>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type='submit'
              disabled={!canSubmit || isSubmitting}
              className='inline-flex h-10 w-full items-center gap-2 rounded-lg border-0 bg-indigo-600 px-6 text-sm font-semibold text-white transition-all hover:bg-indigo-500 sm:w-auto'>
              {isSubmitting ? <Spinner /> : <Send className='size-4' />}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          )}
        />
      </div>
    </form>
  )
}
