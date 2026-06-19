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

export const createSession = (data: Prisma.SessionUncheckedCreateInput) => {
  return prisma.session.create({
    data,
    select: {
      id: true,
    },
  });
};

export const findAuthUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      password: true,
      avatarUrl: true,
      updatedAt: true,
      _count: {
        select: {
          folders: true,
          notes: true,
        },
      },
    },
  });
};

export const findAuthUserById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      updatedAt: true,
      _count: {
        select: {
          folders: true,
          notes: true,
        },
      },
    },
  });
};

export const findUserPasswordById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      password: true,
    },
  });
};

export const deleteSessionByTokenHash = (tokenHash: string) => {
  return prisma.session.deleteMany({
    where: {
      tokenHash,
    },
  });
};

export const deleteSessionByUserId = (userId: string) => {
  return prisma.session.deleteMany({
    where: {
      userId,
    },
  });
};

export const findSessionByTokenHash = (tokenHash: string) => {
  return prisma.session.findUnique({
    where: {
      tokenHash,
    },
    select: {
      id: true,
      userId: true,
      tokenHash: true,
      userAgent: true,
      ipAddress: true,
      expiresAt: true,
      updatedAt: true,
    },
  });
};

export const updateSessionByTokenHash = (
  tokenHash: string,
  data: Prisma.SessionUncheckedUpdateInput
) => {
  return prisma.session.update({
    where: {
      tokenHash,
    },
    data,
    select: {
      id: true,
    },
  });
};

export const updateUserPassword = (id: string, password: string) => {
  return prisma.user.update({
    where: { id },
    data: {
      password,
    },
    select: {
      id: true,
    },
  });
};
