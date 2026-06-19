import { describe, expect, it } from 'vitest';
import { getAuthenticatedUser } from './auth.helper.js';
import { UnauthorizedError } from '../../../shared/errors/index.js';

describe('Auth Helper - getAuthenticatedUser', () => {
  it('should throw UnauthorizedError if req.user is not set', () => {
    const req = {} as any;
    expect(() => getAuthenticatedUser(req)).toThrow(UnauthorizedError);
  });

  it('should return req.user if user is authenticated', () => {
    const user = { id: 'user-id', email: 'test@example.com' };
    const req = { user } as any;
    expect(getAuthenticatedUser(req)).toEqual(user);
  });
});
