import { z } from 'zod';

export const registerResponseSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.email(),
  avatarUrl: z.string().nullable(),
  createdAt: z.date(),
});

export type RegisterResponse = z.infer<typeof registerResponseSchema>;
