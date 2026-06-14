import { prisma } from '#/config/prisma.js';
import type { Prisma } from '#/generated/prisma/client.js';

export const createUser = (data: Prisma.UserUncheckedCreateInput) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
    },
  });
};

export const existsByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
};
