import { prisma } from '#/config/prisma.js';
import type { Prisma } from '#/generated/prisma/client.js';

import type { NoteRequestQuery } from './schemas/index.js';
import { buildFindNotesWhereInput } from './utils/queries.helper.js';

const noteSummarySelect: Prisma.NoteSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  isFavorite: true,
  favoriteAt: true,
  archivedAt: true,
  trashedAt: true,
  createdAt: true,
  updatedAt: true,
  folder: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
};

const noteDetailSelect = {
  ...noteSummarySelect,
  content: true,
  plainText: true,
};

export const findNotes = (userId: string, filter: NoteRequestQuery) => {
  const where = buildFindNotesWhereInput(userId, filter);

  return prisma.note.findMany({
    where,
    select: noteSummarySelect,
    orderBy: [{ [filter.orderBy]: 'desc' }, { id: 'desc' }],
  });
};

export const findNoteBySlug = (userId: string, slug: string) => {
  return prisma.note.findUnique({
    where: { userId_slug: { userId, slug } },
    select: noteDetailSelect,
  });
};

export const findNoteBySlugWithoutContent = (userId: string, slug: string) => {
  return prisma.note.findUnique({
    where: { userId_slug: { userId, slug } },
    select: noteSummarySelect,
  });
};

export const createNote = (
  userId: string,
  data: Prisma.NoteUncheckedCreateInput
) => {
  return prisma.note.create({
    data: { ...data, userId },
    select: noteDetailSelect,
  });
};

export const updateNote = (
  id: string,
  userId: string,
  data: Prisma.NoteUncheckedUpdateInput
) => {
  return prisma.note.update({
    where: { id, userId },
    data,
    select: noteSummarySelect,
  });
};

export const updateStatusNote = (
  id: string,
  userId: string,
  data: Prisma.NoteUncheckedUpdateInput
) => {
  return prisma.note.update({
    where: { id, userId },
    data,
    select: {
      id: true,
      title: true,
      slug: true,
      isFavorite: true,
      favoriteAt: true,
      archivedAt: true,
      trashedAt: true,
      updatedAt: true,
    },
  });
};

export const deleteNote = (id: string, userId: string) => {
  return prisma.note.delete({
    where: { id, userId },
    select: {
      id: true,
      slug: true,
    },
  });
};
