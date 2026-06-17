import { z } from 'zod'

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name cannot exceed 50 characters'),
  avatarUrl: z.url('Invalid URL format').or(z.literal('')),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
