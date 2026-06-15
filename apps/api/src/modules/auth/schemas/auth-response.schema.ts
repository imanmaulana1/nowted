import { z } from 'zod';

export const authUserResponseSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.email(),
  avatarUrl: z.string().nullable(),
  createdAt: z.date(),
  totalNotes: z.number(),
  totalFolders: z.number(),
});

export type AuthUserResponse = z.infer<typeof authUserResponseSchema>;
