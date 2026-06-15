import type { NextFunction, Request, Response } from 'express';

import { NotFoundError } from '#/shared/errors/not-found.error.js';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  _next: NextFunction
) => {
  throw new NotFoundError({
    message: `The requested resource '${req.method} : ${req.url}' could not be found`,
  });
};
