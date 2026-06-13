import type { ErrorParams } from '#/shared/types/error.type.js';
import { AppError } from './app.error.js';

export class UnprocessableEntityError extends AppError {
  constructor({ code, message }: ErrorParams) {
    super({
      statusCode: 422,
      code: code || 'UNPROCESSABLE_ENTITY',
      message: message || 'Unprocessable entity',
    });
  }
}
