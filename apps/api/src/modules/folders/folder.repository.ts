import { prisma } from '#/config/prisma.js';
import type { Prisma } from '#/generated/prisma/client.js';

const folderSelect = {
  id: true,
  name: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.FolderSelect;

const folderWithNotesSelect = {
  ...folderSelect,
  notes: {
    select: {
      id: true,
      title: true,
      slug: true,
      isFavorite: true,
      archivedAt: true,
      trashedAt: true,
      updatedAt: true,
    },
  },
} satisfies Prisma.FolderSelect;

export const findFolders = (userId: string) => {
  return prisma.folder.findMany({
    where: {
      userId,
    },
    select: folderWithNotesSelect,
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
  });
};

export const findFolderByName = (userId: string, name: string) => {
  return prisma.folder.findUnique({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
    select: folderSelect,
  });
};

export const findFolderBySlug = (userId: string, slug: string) => {
  return prisma.folder.findUnique({
    where: {
      userId_slug: {
        userId,
        slug,
      },
    },
    select: folderSelect,
  });
};

export const createFolder = (data: Prisma.FolderUncheckedCreateInput) => {
  return prisma.folder.create({
    data,
    select: folderSelect,
  });
};

export const updateFolder = (
  id: string,
  data: Prisma.FolderUncheckedUpdateInput
) => {
  return prisma.folder.update({
    where: {
      id,
    },
    data,
    select: folderSelect,
  });
};

export const deleteFolder = (id: string) => {
  return prisma.folder.delete({
    where: {
      id,
    },
    select: folderSelect,
  });
};

export const countFolders = (userId: string) => {
  return prisma.folder.count({
    where: {
      userId,
    },
  });
};
