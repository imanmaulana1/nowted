import type { ErrorParams } from '#/shared/types/error.type.js';
import { AppError } from './app.error.js';

export class UnauthorizedError extends AppError {
  constructor({ code, message }: ErrorParams) {
    super({
      statusCode: 401,
      code: code || 'UNAUTHORIZED',
      message: message || 'Unauthorized error',
    });
  }
}
