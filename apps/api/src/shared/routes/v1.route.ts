import { Router } from 'express';

import { authRouter } from '#/modules/auth/auth.route.js';
import { noteRouter } from '#/modules/notes/note.route.js';
import { userRouter } from '#/modules/users/user.route.js';

export const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/notes', noteRouter);
v1Router.use('/users', userRouter);
