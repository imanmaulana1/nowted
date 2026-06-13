import { getEnv } from '#/config/env.js';
import { errorResponseSchema } from '#/shared/schemas/response.schema.js';
import { z } from 'zod';

export interface SuccessParams<T> {
  message?: string;
  data: T;
}

export const successResponse = <T>({ message, data }: SuccessParams<T>) => {
  return {
    ...(message && { message }),
    data,
  };
};

export interface ErrorParams {
  code: string;
  message: string;
  details?: Record<string, string[]> | null;
  stack?: string;
}

export const errorResponse = ({
  code,
  message,
  details,
  stack,
}: ErrorParams): z.infer<typeof errorResponseSchema> & {
  error: { stack?: string };
} => {
  return {
    error: {
      code,
      message,
      ...(details && { details }),
      ...(getEnv.NODE_ENV === 'development' &&
        stack !== undefined && { stack }),
    },
  };
};
