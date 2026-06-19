import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from './password.helper.js';

describe('Password Helper', () => {
  it('should successfully hash and verify password', async () => {
    const password = 'my-secret-password';
    const hash = await hashPassword(password);
    expect(hash).not.toEqual(password);

    const isMatch = await verifyPassword(password, hash);
    expect(isMatch).toBe(true);

    const isNotMatch = await verifyPassword('wrong-password', hash);
    expect(isNotMatch).toBe(false);
  });
});
