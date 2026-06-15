import type { NextFunction, Request, Response } from 'express';

import { verifyAccessToken } from '#/modules/auth/utils/token.helper.js';
import { UnauthorizedError } from '#/shared/errors/index.js';

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthorizedError({
      message: 'Invalid token or expired',
    });

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token)
    throw new UnauthorizedError({
      message: 'Invalid token or expired',
    });

  const decodedToken = await verifyAccessToken(token);
  if (!decodedToken || !decodedToken.sub)
    throw new UnauthorizedError({
      message: 'Invalid token or expired',
    });

  req.user = { id: decodedToken.sub };
  next();
};
