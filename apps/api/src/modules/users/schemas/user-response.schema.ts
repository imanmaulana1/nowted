import { z } from 'zod';

export const updateProfileResponseSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().nullable(),
  updatedAt: z.coerce.date(),
});

export type UpdateProfileResponse = z.infer<typeof updateProfileResponseSchema>;
