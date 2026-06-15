import type { Request, Response } from 'express';

import { successResponse } from '#/shared/utils/http-response.js';

import * as authService from './auth.service.js';
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_MAX_AGE_MS,
} from './constants/auth.cookie.js';
import type {
  ChangePasswordBody,
  LoginBody,
  RegisterBody,
} from './schemas/index.js';
import { getAuthenticatedUser } from './utils/auth.helper.js';

export const register = async (req: Request, res: Response) => {
  const payload = req.validated.body as RegisterBody;

  const data = await authService.register(payload);

  res
    .status(201)
    .json(successResponse({ message: 'User registered successfully', data }));
};

export const login = async (req: Request, res: Response) => {
  const payload = req.validated.body as LoginBody;
  const userAgent = req.headers['user-agent'] ?? null;
  const ipAddress = req.ip ?? null;

  const { accessToken, refreshToken, user } = await authService.login(
    payload,
    userAgent,
    ipAddress
  );

  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    ...REFRESH_TOKEN_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
  });

  res.status(200).json(
    successResponse({
      message: 'User logged in successfully',
      data: {
        user,
        accessToken,
      },
    })
  );
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string;

  await authService.logout(refreshToken);

  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS);

  res.sendStatus(204);
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  const userAgent = req.headers['user-agent'] ?? null;
  const ipAddress = req.ip ?? null;

  const { newAccessToken, newRefreshToken } = await authService.refresh(
    refreshToken,
    userAgent,
    ipAddress
  );

  res.cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, {
    ...REFRESH_TOKEN_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
  });

  res.status(200).json(
    successResponse({
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
      },
    })
  );
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);

  const data = await authService.getCurrentUser(userId);

  res
    .status(200)
    .json(successResponse({ message: 'User retrieved successfully', data }));
};

export const changePassword = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const payload = req.validated.body as ChangePasswordBody;

  await authService.changePassword(userId, payload);

  res.sendStatus(204);
};
