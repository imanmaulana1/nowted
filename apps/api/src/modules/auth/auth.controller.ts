import type { Request, Response } from 'express';

import { successResponse } from '#/shared/utils/http-response.js';

import * as authService from './auth.service.js';
import type { RegisterBody } from './schemas/register.schema.js';

export const register = async (req: Request, res: Response) => {
  const payload = req.validated.body as RegisterBody;

  const data = await authService.register(payload);

  res
    .status(201)
    .json(successResponse({ message: 'User registered successfully', data }));
};
