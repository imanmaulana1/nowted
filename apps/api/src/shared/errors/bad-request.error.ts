import type { ErrorParams } from '#/shared/types/error.type.js';
import { AppError } from './app.error.js';

export class BadRequestError extends AppError {
  constructor({ code, message, details }: ErrorParams) {
    super({
      statusCode: 400,
      code: code || 'BAD_REQUEST',
      message: message || 'Bad request error',
      details,
    });
  }
}
