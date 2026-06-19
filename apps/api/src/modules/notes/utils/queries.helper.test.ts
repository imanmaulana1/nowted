import { describe, expect, it } from 'vitest';
import { buildFindNotesWhereInput } from './queries.helper.js';

describe('Queries Helper - buildFindNotesWhereInput', () => {
  it('should build where input for active notes status', () => {
    const result = buildFindNotesWhereInput('user-1', {
      status: 'active',
      orderBy: 'updatedAt',
    });
    expect(result).toEqual({
      userId: 'user-1',
      archivedAt: null,
      trashedAt: null,
    });
  });

  it('should build where input for undefined status (default active)', () => {
    const result = buildFindNotesWhereInput('user-1', { orderBy: 'updatedAt' });
    expect(result).toEqual({
      userId: 'user-1',
      archivedAt: null,
      trashedAt: null,
    });
  });

  it('should build where input for archived status', () => {
    const result = buildFindNotesWhereInput('user-1', {
      status: 'archive',
      orderBy: 'updatedAt',
    });
    expect(result).toEqual({
      userId: 'user-1',
      archivedAt: { not: null },
      trashedAt: null,
    });
  });

  it('should build where input for trashed status', () => {
    const result = buildFindNotesWhereInput('user-1', {
      status: 'trash',
      orderBy: 'updatedAt',
    });
    expect(result).toEqual({
      userId: 'user-1',
      trashedAt: { not: null },
    });
  });

  it('should build where input with favorite filter', () => {
    const result = buildFindNotesWhereInput('user-1', {
      favorite: true,
      orderBy: 'updatedAt',
    });
    expect(result).toEqual({
      userId: 'user-1',
      archivedAt: null,
      trashedAt: null,
      isFavorite: true,
    });
  });

  it('should build where input with search query', () => {
    const result = buildFindNotesWhereInput('user-1', {
      search: 'hello',
      orderBy: 'updatedAt',
    });
    expect(result).toEqual({
      userId: 'user-1',
      archivedAt: null,
      trashedAt: null,
      title: {
        contains: 'hello',
        mode: 'insensitive',
      },
    });
  });
});
