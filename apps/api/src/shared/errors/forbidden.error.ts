import type { ErrorParams } from '#/shared/types/error.type.js';
import { AppError } from './app.error.js';

export class ForbiddenError extends AppError {
  constructor({ code, message }: ErrorParams) {
    super({
      statusCode: 403,
      code: code || 'FORBIDDEN_ACCESS',
      message: message || 'Forbidden error',
    });
  }
}
