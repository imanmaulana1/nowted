import type { ErrorParams } from '#/shared/types/error.type.js';
import { AppError } from './app.error.js';

export class TooManyRequestsError extends AppError {
  constructor({ code, message }: ErrorParams) {
    super({
      statusCode: 429,
      code: code || 'RATE_LIMIT_EXCEEDED',
      message: message || 'Too many requests error',
    });
  }
}
