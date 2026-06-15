import { Router } from 'express';

import { requireAuth, validateRequest } from '#/shared/middlewares/index.js';

import * as authController from './auth.controller.js';
import { loginSchema } from './schemas/login.schema.js';
import { registerSchema } from './schemas/register.schema.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(registerSchema),
  authController.register
);

authRouter.post('/login', validateRequest(loginSchema), authController.login);

authRouter.post('/logout', authController.logout);

authRouter.post('/refresh', authController.refresh);

authRouter.get('/me', requireAuth, authController.getCurrentUser);
