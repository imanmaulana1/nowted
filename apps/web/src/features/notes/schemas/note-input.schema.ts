import type { JSONContent } from '@tiptap/react'
import { z } from 'zod'

export const noteInputSchema = z.object({
  title: z.string().trim(),
  content: z.custom<JSONContent>(),
  plainText: z.string().trim(),
  folderId: z.uuid().nullable().optional(),
})

export type NoteInput = z.infer<typeof noteInputSchema>
