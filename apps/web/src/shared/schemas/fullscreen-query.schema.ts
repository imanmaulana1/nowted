import { z } from 'zod'

export const fullscreenQuerySchema = z.object({
  fullscreen: z.boolean().optional(),
})

export type FullscreenQuery = z.infer<typeof fullscreenQuerySchema>
