import { describe, expect, it } from 'vitest';
import {
  signAccessToken,
  verifyAccessToken,
  hashRefreshToken,
  generateRefreshToken,
} from './token.helper.js';

describe('Token Helper', () => {
  it('should successfully sign and verify access token', async () => {
    const payload = { userId: 'user-id-123' };
    const token = await signAccessToken(payload, '1m');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const decoded = await verifyAccessToken(token);
    expect(decoded.userId).toBe('user-id-123');
  });

  it('should generate and hash refresh token', () => {
    const { plain, hash } = generateRefreshToken();
    expect(plain).toBeDefined();
    expect(hash).toBeDefined();
    expect(plain.length).toBeGreaterThan(0);
    expect(hash.length).toBeGreaterThan(0);

    const hashedAgain = hashRefreshToken(plain);
    expect(hashedAgain).toBe(hash);
  });
});
