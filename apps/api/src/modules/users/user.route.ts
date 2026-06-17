import { Router } from 'express';

import { upload } from '#/config/multer.js';
import { requireAuth, validateRequest } from '#/shared/middlewares/index.js';

import { updateProfileSchema } from './schemas/update-profile.schema.js';
import { updateProfile } from './user.controller.js';

export const userRouter = Router();

userRouter.patch(
  '/profile',
  requireAuth,
  upload.single('avatar'),
  validateRequest(updateProfileSchema),
  updateProfile
);
