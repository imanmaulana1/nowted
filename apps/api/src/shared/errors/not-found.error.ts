import type { ErrorParams } from '#/shared/types/error.type.js';
import { AppError } from './app.error.js';

export class NotFoundError extends AppError {
  constructor({ code, message }: ErrorParams) {
    super({
      statusCode: 404,
      code: code || 'RESOURCE_NOT_FOUND',
      message: message || 'Not found error',
    });
  }
}
