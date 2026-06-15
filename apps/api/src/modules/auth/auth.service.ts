import { ConflictError } from '#/shared/errors/conflict.error.js';
import { UnauthorizedError } from '#/shared/errors/unauthorized.error.js';

import * as authRepository from './auth.repository.js';
import { REFRESH_TOKEN_MAX_AGE_MS } from './constants/auth.cookie.js';
import type { LoginResponse } from './schemas/login-response.schema.js';
import type { LoginBody } from './schemas/login.schema.js';
import type { RegisterResponse } from './schemas/register-response.schema.js';
import type { RegisterBody } from './schemas/register.schema.js';
import { hashPassword, verifyPassword } from './utils/password.helper.js';
import {
  generateRefreshToken,
  hashRefreshToken,
  signAccessToken,
} from './utils/token.helper.js';

export const register = async (
  payload: RegisterBody
): Promise<RegisterResponse> => {
  const existingUser = await authRepository.existsByEmail(payload.email);
  if (existingUser)
    throw new ConflictError({
      code: 'EMAIL_ALREADY_EXISTS',
      message: 'An account with this email already exists',
    });

  const hashedPassword = await hashPassword(payload.password);

  const newUser = await authRepository.createUser({
    ...payload,
    password: hashedPassword,
  });

  return newUser;
};

export const login = async (
  payload: LoginBody,
  userAgent: string | null,
  ipAddress: string | null
): Promise<LoginResponse> => {
  const user = await authRepository.findAuthUserByEmail(payload.email);
  if (!user)
    throw new UnauthorizedError({
      message: 'Invalid credentials',
    });

  const isPasswordValid = await verifyPassword(payload.password, user.password);
  if (!isPasswordValid)
    throw new UnauthorizedError({
      message: 'Invalid credentials',
    });

  const accessToken = await signAccessToken({ sub: user.id });
  const refreshToken = generateRefreshToken();

  await authRepository.createSession({
    userId: user.id,
    tokenHash: refreshToken.hash,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS),
  });

  const {
    _count: { folders, notes },
    password: _password,
    ...restUser
  } = user;

  return {
    user: {
      ...restUser,
      totalNotes: notes,
      totalFolders: folders,
    },
    accessToken,
    refreshToken: refreshToken.plain,
  };
};

export const logout = async (refreshToken: string) => {
  if (!refreshToken) return;

  const refreshTokenHash = hashRefreshToken(refreshToken);
  await authRepository.deleteSessionByTokenHash(refreshTokenHash);
};

export const refresh = async (
  token: string | undefined,
  userAgent: string | null,
  ipAddress: string | null
) => {
  if (!token)
    throw new UnauthorizedError({
      message: 'Invalid or session expired',
    });

  const tokenHash = hashRefreshToken(token);
  const session = await authRepository.findSessionByTokenHash(tokenHash);
  if (!session)
    throw new UnauthorizedError({
      message: 'Invalid or session expired',
    });

  const isExpired = session.expiresAt < new Date();
  if (isExpired)
    throw new UnauthorizedError({
      message: 'Invalid or session expired',
    });

  const newAccessToken = await signAccessToken({ sub: session.userId });
  const newRefreshToken = generateRefreshToken();

  await authRepository.updateSessionByTokenHash(session.tokenHash, {
    tokenHash: newRefreshToken.hash,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS),
  });

  return {
    newAccessToken,
    newRefreshToken: newRefreshToken.plain,
  };
};
