import type { Request } from 'express';

import { UnauthorizedError } from '#/shared/errors/index.js';

export const getAuthenticatedUser = (req: Request) => {
  if (!req.user)
    throw new UnauthorizedError({
      message: 'User not authenticated',
    });

  return req.user;
};
