import { authRouter } from '#/modules/auth/auth.route.js';
import { Router } from 'express';

export const v1Router = Router();

v1Router.use('/auth', authRouter);
