import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export type RegisterInput = z.infer<typeof registerSchema>
