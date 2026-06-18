import { z } from 'zod';

export const folderParamsSchema = z.object({
  folderSlug: z.string().trim().min(1, 'Folder slug is required'),
});

export type FolderParams = z.infer<typeof folderParamsSchema>;
