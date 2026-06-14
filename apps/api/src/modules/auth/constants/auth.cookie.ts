import { getEnv } from '#/config/env.js';
import type { CookieOptions } from 'express';

export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: getEnv.NODE_ENV === 'production',
  sameSite: getEnv.NODE_ENV === 'production' ? 'none' : 'lax',
};

export const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
