import { prisma } from '../../src/config/prisma.js';
import { signAccessToken } from '../../src/modules/auth/utils/token.helper.js';

export const createTestUser = async (email: string) => {
  const user = await prisma.user.create({
    data: {
      fullName: 'Test User',
      email,
      password: 'password123',
    },
  });

  const token = await signAccessToken({ sub: user.id });

  return {
    user,
    token,
    authHeader: `Bearer ${token}`,
  };
};

export const deleteTestUser = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (_error) {
    // Ignore error if already deleted
  }
};
