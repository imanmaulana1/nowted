import { describe, expect, it, vi } from 'vitest';
import { successResponse, errorResponse } from './http-response.js';

const mockEnv = vi.hoisted(() => ({
  NODE_ENV: 'development',
}));

vi.mock('#/config/env.js', () => ({
  getEnv: mockEnv,
}));

describe('http-response', () => {
  it('should format successResponse correctly with and without message', () => {
    const res1 = successResponse({ data: { foo: 'bar' } });
    expect(res1).toEqual({ data: { foo: 'bar' } });

    const res2 = successResponse({ message: 'Success', data: { foo: 'bar' } });
    expect(res2).toEqual({ message: 'Success', data: { foo: 'bar' } });
  });

  it('should format errorResponse correctly in development', () => {
    mockEnv.NODE_ENV = 'development';

    const res = errorResponse({
      code: 'ERR_CODE',
      message: 'An error occurred',
      details: { field: ['error'] },
      stack: 'mock-stack-trace',
    });

    expect(res).toEqual({
      error: {
        code: 'ERR_CODE',
        message: 'An error occurred',
        details: { field: ['error'] },
        stack: 'mock-stack-trace',
      },
    });
  });

  it('should format errorResponse correctly in production (no stack trace)', () => {
    mockEnv.NODE_ENV = 'production';

    const res = errorResponse({
      code: 'ERR_CODE',
      message: 'An error occurred',
      details: { field: ['error'] },
      stack: 'mock-stack-trace',
    });

    expect(res).toEqual({
      error: {
        code: 'ERR_CODE',
        message: 'An error occurred',
        details: { field: ['error'] },
      },
    });
  });
});
