import { Router } from 'express';

import { validateRequest } from '#/shared/middlewares/validate-request.js';

import * as authController from './auth.controller.js';
import { registerSchema } from './schemas/register.schema.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(registerSchema),
  authController.register
);
