import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

type ValidateTarget = 'body' | 'query' | 'params';

export const validateRequest = (
  schema: ZodType,
  target: ValidateTarget = 'body'
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.validated ??= {};
    req.validated[target] = schema.parse(req[target]);

    next();
  };
};
