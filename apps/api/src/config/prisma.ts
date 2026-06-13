import { PrismaClient } from '#/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { getEnv } from './env.js';

const adapter = new PrismaPg({ connectionString: getEnv.DATABASE_URL });

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (getEnv.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
