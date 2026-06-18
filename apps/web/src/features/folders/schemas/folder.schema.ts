import { z } from 'zod'

export const folderInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Folder name must be at least 3 characters')
    .max(50, 'Folder name is too long'),
})

export type FolderInput = z.infer<typeof folderInputSchema>
