import { z } from 'zod';

export const authUserResponseSchema = z.object({
  id: z.uuid(),
  fullName: z.string(),
  email: z.email(),
  avatarUrl: z.string().nullable(),
  updatedAt: z.coerce.date(),
  totalNotes: z.number(),
  totalFolders: z.number(),
});

export const registerResponseSchema = z.object({
  id: z.uuid(),
  fullName: z.string(),
  email: z.email(),
  avatarUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
});

export const loginResponseSchema = z.object({
  user: authUserResponseSchema,
  accessToken: z.string(),
});

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
});

export type RefreshResponse = z.infer<typeof refreshResponseSchema>;

export type AuthUserResponse = z.infer<typeof authUserResponseSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
