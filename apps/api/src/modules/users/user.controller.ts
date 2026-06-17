import type { Request, Response } from 'express';

import { successResponse } from '#/shared/utils/http-response.js';

import { getAuthenticatedUser } from '../auth/utils/auth.helper.js';
import type { UpdateProfileBody } from './schemas/update-profile.schema.js';
import * as userService from './user.service.js';

export const updateProfile = async (req: Request, res: Response) => {
  const { id: currentUserId } = getAuthenticatedUser(req);

  const payload = req.validated.body as UpdateProfileBody;
  const fileBuffer = req.file?.buffer;

  const data = await userService.updateProfile(
    currentUserId,
    payload,
    fileBuffer
  );

  res.status(200).json(
    successResponse({
      message: 'Profile updated successfully',
      data,
    })
  );
};
