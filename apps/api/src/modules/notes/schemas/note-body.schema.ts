import { z } from 'zod';

import type { Prisma } from '#/generated/prisma/client.js';

export const noteBodySchema = z.object({
  title: z.string().trim().default('Untitled'),
  content: z
    .looseObject({
      type: z.literal('doc'),
      content: z.array(z.any()).optional(),
    })
    .optional() as unknown as z.ZodType<Prisma.InputJsonValue>,
  plainText: z.string().trim().default(''),
  folderId: z.uuid().nullable().optional(),
});

export type NoteRequestBody = z.infer<typeof noteBodySchema>;
