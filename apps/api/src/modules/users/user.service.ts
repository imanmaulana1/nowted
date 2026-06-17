import type { Prisma } from '#/generated/prisma/client.js';
import type { UpdateProfileBody } from './schemas/update-profile.schema.js';
import * as userRepository from './user.repository.js';
import { uploadImageToCloudinary } from './utils/upload-image.js';

export const updateProfile = async (
  userId: string,
  payload: UpdateProfileBody,
  fileBuffer?: Buffer
) => {
  const userData: Prisma.UserUncheckedUpdateInput = {};

  if (payload.fullName !== undefined) {
    userData.fullName = payload.fullName;
  }

  if (fileBuffer) {
    const uploadResult = await uploadImageToCloudinary(fileBuffer);
    userData.avatarUrl = uploadResult.secure_url;
  } else if (payload.removeAvatar === true) {
    userData.avatarUrl = null;
  }

  const updatedUser = await userRepository.updateUserProfile(userId, userData);

  return updatedUser;
};
