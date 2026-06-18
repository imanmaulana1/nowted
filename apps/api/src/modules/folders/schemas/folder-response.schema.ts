import { z } from 'zod';

export const folderSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const noteInFolderSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  slug: z.string(),
  isFavorite: z.boolean(),
  updatedAt: z.coerce.date(),
  status: z.enum(['active', 'archive', 'trash']),
});

export const folderWithNotesSchema = folderSchema.extend({
  notes: z.array(noteInFolderSchema),
});

export type FolderResponse = z.infer<typeof folderSchema>;
export type FolderWithNotesResponse = z.infer<typeof folderWithNotesSchema>;
