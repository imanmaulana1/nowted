import { z } from 'zod'

export const loginSearchSchema = z.object({
  redirect: z.string().optional(),
  reason: z.enum(['session_expired', 'unauthorized']).optional(),
})

export type LoginSearchQuery = z.infer<typeof loginSearchSchema>
