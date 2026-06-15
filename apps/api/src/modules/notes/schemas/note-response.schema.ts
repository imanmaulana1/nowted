import type { Prisma } from '#/generated/prisma/client.js';
import { z } from 'zod';

const folderRelationSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export const noteSummaryResponseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  isFavorite: z.boolean(),
  favoriteAt: z.coerce.date().nullable(),
  archivedAt: z.coerce.date().nullable(),
  trashedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  folder: folderRelationSchema.nullable(),
});

export const noteDetailResponseSchema = noteSummaryResponseSchema.extend({
  content: z
    .looseObject({
      type: z.literal('doc'),
      content: z.array(z.any()).optional(),
    })
    .optional() as unknown as z.ZodType<Prisma.InputJsonValue>,
  plainText: z.string(),
});

export const noteDeleteResponseSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
});

export const noteStatusResponseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  slug: z.string(),
  isFavorite: z.boolean(),
  favoriteAt: z.coerce.date().nullable(),
  archivedAt: z.coerce.date().nullable(),
  trashedAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date(),
});

export type NoteSummaryResponse = z.infer<typeof noteSummaryResponseSchema>;
export type NoteDetailResponse = z.infer<typeof noteDetailResponseSchema>;
export type NoteDeleteResponse = z.infer<typeof noteDeleteResponseSchema>;
export type NoteStatusResponse = z.infer<typeof noteStatusResponseSchema>;
