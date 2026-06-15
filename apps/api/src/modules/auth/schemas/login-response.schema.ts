import { z } from 'zod';

import { authUserResponseSchema } from './auth-response.schema.js';

export const loginResponseSchema = z.object({
  user: authUserResponseSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
