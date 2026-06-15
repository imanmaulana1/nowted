import { z } from 'zod';

export const noteParamsSchema = z.object({
  noteSlug: z.string(),
});

export type NoteRequestParams = z.infer<typeof noteParamsSchema>;
