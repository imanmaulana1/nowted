import { prisma } from '#/config/prisma.js';
import type { Prisma } from '#/generated/prisma/client.js';

export const updateUserProfile = async (
  id: string,
  data: Prisma.UserUncheckedUpdateInput
) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      updatedAt: true,
    },
  });
};
