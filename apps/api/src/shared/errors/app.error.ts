import type { ErrorParams } from '#/shared/types/error.type.js';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: Record<string, string[]> | undefined;

  constructor({
    statusCode = 500,
    code = 'INTERNAL_SERVER_ERROR',
    message,
    details,
  }: ErrorParams) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
