import type { Prisma } from '#/generated/prisma/client.js';

import type { NoteRequestQuery } from '../schemas/note-query.schema.js';

export const buildFindNotesWhereInput = (
  userId: string,
  filter: NoteRequestQuery
): Prisma.NoteWhereInput => {
  const where: Prisma.NoteWhereInput = {
    userId,
  };

  if (filter.status === 'active' || filter.status == undefined) {
    where.archivedAt = null;
    where.trashedAt = null;
  }

  if (filter.status === 'archive') {
    where.archivedAt = {
      not: null,
    };
    where.trashedAt = null;
  }

  if (filter.status === 'trash') {
    where.trashedAt = {
      not: null,
    };
  }

  if (filter.favorite) {
    where.isFavorite = true;
  }

  if (filter.search) {
    where.title = {
      contains: filter.search,
      mode: 'insensitive',
    };
  }

  return where;
};
