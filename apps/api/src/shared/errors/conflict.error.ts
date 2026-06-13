import type { ErrorParams } from '#/shared/types/error.type.js';
import { AppError } from './app.error.js';

export class ConflictError extends AppError {
  constructor({ code, message }: ErrorParams) {
    super({
      statusCode: 409,
      code: code || 'CONFLICT',
      message: message || 'Conflict error',
    });
  }
}
