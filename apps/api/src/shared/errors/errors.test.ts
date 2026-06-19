import { describe, expect, it } from 'vitest';
import {
  AppError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
} from './index.js';

describe('Custom App Errors', () => {
  it('AppError', () => {
    const error = new AppError({
      statusCode: 500,
      code: 'INTERNAL_ERROR',
      message: 'Something went wrong',
      details: { foo: ['bar'] },
    });
    expect(error.statusCode).toBe(500);
    expect(error.code).toBe('INTERNAL_ERROR');
    expect(error.message).toBe('Something went wrong');
    expect(error.details).toEqual({ foo: ['bar'] });
  });

  it('BadRequestError', () => {
    const error = new BadRequestError({
      code: 'BAD_REQUEST',
      message: 'Bad request',
    });
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('BAD_REQUEST');
    expect(error.message).toBe('Bad request');

    const defaultError = new BadRequestError({});
    expect(defaultError.code).toBe('BAD_REQUEST');
    expect(defaultError.message).toBe('Bad request error');
  });

  it('ConflictError', () => {
    const error = new ConflictError({
      code: 'CONFLICT',
      message: 'Conflict',
    });
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe('CONFLICT');
    expect(error.message).toBe('Conflict');

    const defaultError = new ConflictError({});
    expect(defaultError.code).toBe('CONFLICT');
    expect(defaultError.message).toBe('Conflict error');
  });

  it('ForbiddenError', () => {
    const error = new ForbiddenError({
      code: 'FORBIDDEN',
      message: 'Forbidden',
    });
    expect(error.statusCode).toBe(403);
    expect(error.code).toBe('FORBIDDEN');
    expect(error.message).toBe('Forbidden');

    const defaultError = new ForbiddenError({});
    expect(defaultError.code).toBe('FORBIDDEN_ACCESS');
    expect(defaultError.message).toBe('Forbidden error');
  });

  it('NotFoundError', () => {
    const error = new NotFoundError({
      code: 'NOT_FOUND',
      message: 'Not found',
    });
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.message).toBe('Not found');

    const defaultError = new NotFoundError({});
    expect(defaultError.code).toBe('RESOURCE_NOT_FOUND');
    expect(defaultError.message).toBe('Not found error');
  });

  it('TooManyRequestsError', () => {
    const error = new TooManyRequestsError({
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests',
    });
    expect(error.statusCode).toBe(429);
    expect(error.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(error.message).toBe('Too many requests');

    const defaultError = new TooManyRequestsError({});
    expect(defaultError.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(defaultError.message).toBe('Too many requests error');
  });

  it('UnauthorizedError', () => {
    const error = new UnauthorizedError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
    expect(error.statusCode).toBe(401);
    expect(error.code).toBe('UNAUTHORIZED');
    expect(error.message).toBe('Unauthorized');

    const defaultError = new UnauthorizedError({});
    expect(defaultError.code).toBe('UNAUTHORIZED');
    expect(defaultError.message).toBe('Unauthorized error');
  });

  it('UnprocessableEntityError', () => {
    const error = new UnprocessableEntityError({
      code: 'UNPROCESSABLE_ENTITY',
      message: 'Unprocessable entity',
    });
    expect(error.statusCode).toBe(422);
    expect(error.code).toBe('UNPROCESSABLE_ENTITY');
    expect(error.message).toBe('Unprocessable entity');

    const defaultError = new UnprocessableEntityError({});
    expect(defaultError.code).toBe('UNPROCESSABLE_ENTITY');
    expect(defaultError.message).toBe('Unprocessable entity');
  });
});
