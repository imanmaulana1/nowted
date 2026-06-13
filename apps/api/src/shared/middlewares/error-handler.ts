import { AppError } from '#/shared/errors/app.error.js';
import { formatZodError } from '#/shared/utils/format-zod.js';
import { errorResponse } from '#/shared/utils/http-response.js';
import type { NextFunction, Request, Response } from 'express';
import { JOSEError, JWTExpired } from 'jose/errors';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError)
    return res.status(400).json(
      errorResponse({
        code: 'VALIDATION_ERROR',
        message: 'Please check your input details and try again',
        details: formatZodError(err),
        ...(err.stack && { stack: err.stack }),
      })
    );

  if (err instanceof JWTExpired)
    return res.status(401).json(
      errorResponse({
        code: 'TOKEN_EXPIRED',
        message: 'Invalid token or expired',
        ...(err.stack && { stack: err.stack }),
      })
    );

  if (err instanceof JOSEError)
    return res.status(401).json(
      errorResponse({
        code: 'INVALID_TOKEN',
        message: 'Invalid token or expired',
        ...(err.stack && { stack: err.stack }),
      })
    );

  if (err instanceof AppError)
    return res.status(err.statusCode).json(
      errorResponse({
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
        ...(err.stack && { stack: err.stack }),
      })
    );

  return res.status(500).json(
    errorResponse({
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      ...(err.stack && { stack: err.stack }),
    })
  );
};
