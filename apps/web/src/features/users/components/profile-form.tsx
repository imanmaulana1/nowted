import { useForm } from '@tanstack/react-form'
import { Camera, Mail, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import type { AuthUser } from '@/features/auth/types/auth.type'
import { Button } from '@/shared/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Separator } from '@/shared/components/ui/separator'
import { Spinner } from '@/shared/components/ui/spinner'

import { useUpdateProfile } from '../hooks/use-update-profile'
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from '../schemas/profile.schema'

type ProfileFormProps = {
  user: AuthUser
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatarUrl
  )
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { mutate: updateProfile, isPending } = useUpdateProfile()

  const form = useForm({
    defaultValues: {
      fullName: user.fullName,
      avatarUrl: user.avatarUrl || '',
    } as UpdateProfileInput,
    validators: {
      onSubmit: updateProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const hasChanges =
        value.fullName !== user.fullName ||
        value.avatarUrl !== (user.avatarUrl || '')

      if (!hasChanges) {
        toast.info('No changes made', {
          description: 'Your profile details are already up to date.',
        })
        return
      }

      const formData = new FormData()

      if (value.fullName !== user.fullName) {
        formData.append('fullName', value.fullName)
      }

      if (avatarFile) {
        formData.append('avatar', avatarFile)
      } else if (!value.avatarUrl && user.avatarUrl) {
        formData.append('removeAvatar', 'true')
      }

      updateProfile(formData)
    },
  })

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size too large', {
          description: 'Maximum avatar file size is 2MB',
        })
        return
      }

      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setAvatarPreview(base64String)
        form.setFieldValue('avatarUrl', base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-6' noValidate>
      <div className='flex flex-col items-center gap-6 pb-2 sm:flex-row'>
        <div
          className='group relative cursor-pointer'
          onClick={handleAvatarClick}>
          <div className='border-border group-hover:border-primary bg-muted relative flex size-24 items-center justify-center overflow-hidden rounded-full border-2 transition-all duration-300'>
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt={user.fullName}
                className='size-full object-cover transition-opacity group-hover:opacity-80'
              />
            ) : (
              <User className='text-muted-foreground size-10' />
            )}
            {/* Hover overlay */}
            <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              <Camera className='size-6 text-white' />
            </div>
          </div>
          <Input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='image/*'
            className='hidden'
          />
        </div>
        <div className='flex-1 space-y-1.5 text-center sm:text-left'>
          <h3 className='text-sm font-medium'>Profile Picture</h3>
          <p className='text-muted-foreground max-w-sm text-xs'>
            PNG, JPG, WEBP or AVIF formats. Maximum size of 2MB. Click on the
            avatar to upload
          </p>
          {avatarPreview && (
            <Button
              type='button'
              variant='outline'
              size='xs'
              className='h-8 text-xs'
              onClick={() => {
                setAvatarPreview(null)
                setAvatarFile(null)
                form.setFieldValue('avatarUrl', '')
              }}>
              Remove Picture
            </Button>
          )}
        </div>
      </div>

      <Separator className='bg-muted/40' />

      <FieldGroup className='w-full space-y-4 md:max-w-sm'>
        <Field>
          <FieldLabel>Email Address</FieldLabel>
          <div className='relative flex items-center'>
            <Mail className='text-muted-foreground/80 pointer-events-none absolute left-3 size-4' />
            <Input
              type='email'
              value={user.email}
              disabled
              className='bg-muted/30 border-muted text-muted-foreground cursor-not-allowed pl-9 select-none'
            />
          </div>
          <p className='text-2xs text-muted-foreground/80 mt-1 pl-1'>
            Email addresses are tied to account authentication and cannot be
            changed
          </p>
        </Field>

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
                <div className='relative flex items-center'>
                  <User className='text-muted-foreground/80 pointer-events-none absolute left-3 size-4' />
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={handleChange}
                    className='pl-9'
                    aria-invalid={isInvalid}
                    placeholder='Your full name'
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <div className='flex justify-end pt-2 md:max-w-sm md:justify-start'>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => {
            const isLoading = isSubmitting || isPending

            return (
              <Button
                type='submit'
                disabled={!canSubmit || isLoading}
                className='w-full md:w-auto md:min-w-32'>
                {isLoading && <Spinner />}
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            )
          }}
        />
      </div>
    </form>
  )
}
