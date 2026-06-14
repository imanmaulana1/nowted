import type { Request, Response } from 'express';

import { successResponse } from '#/shared/utils/http-response.js';

import * as authService from './auth.service.js';
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_MAX_AGE_MS,
} from './constants/auth.cookie.js';
import type { LoginBody } from './schemas/login.schema.js';
import type { RegisterBody } from './schemas/register.schema.js';

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
