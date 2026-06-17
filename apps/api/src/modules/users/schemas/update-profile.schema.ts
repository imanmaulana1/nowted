import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name cannot exceed 50 characters')
    .optional(),
  removeAvatar: z.stringbool().optional(),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
