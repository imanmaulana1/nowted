import { z } from 'zod';

export const noteQuerySchema = z.object({
  status: z.enum(['active', 'archive', 'trash']).default('active'),
  favorite: z.stringbool().optional(),
  search: z.string().optional(),
  orderBy: z
    .enum(['createdAt', 'updatedAt', 'favoriteAt', 'archivedAt', 'trashedAt'])
    .default('updatedAt'),
});

export type NoteRequestQuery = z.infer<typeof noteQuerySchema>;
