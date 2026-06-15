import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Current password must be at least 8 characters long'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long'),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    error: 'New password cannot be the same as current password',
    path: ['newPassword'],
  });

export type ChangePasswordBody = z.infer<typeof changePasswordSchema>;
