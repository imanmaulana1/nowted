import { z } from 'zod';

const authUserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.email(),
  avatarUrl: z.string().nullable(),
  createdAt: z.date(),
  totalNotes: z.number(),
  totalFolders: z.number(),
});

export const loginResponseSchema = z.object({
  user: authUserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
