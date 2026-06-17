import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Current password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .max(20, 'Password is too long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters'),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
