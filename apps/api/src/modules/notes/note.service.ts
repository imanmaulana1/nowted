import { nanoid } from 'nanoid';
import slugify from 'slugify';

import type { Prisma } from '#/generated/prisma/client.js';
import { ConflictError, NotFoundError } from '#/shared/errors/index.js';

import * as noteRepository from './note.repository.js';
import type { NoteRequestBody, NoteRequestQuery } from './schemas/index.js';
import { generateExcerpt } from './utils/note.helper.js';

export const getNotes = async (
  userId: string,
  queryParams: NoteRequestQuery
) => {
  const notes = await noteRepository.findNotes(userId, queryParams);

  return notes;
};

export const createNote = async (userId: string, payload: NoteRequestBody) => {
  const currentSlug = slugify(payload.title.toLowerCase());

  const existingNote = await noteRepository.findNoteBySlug(userId, currentSlug);
  const finalSlug = existingNote
    ? `${currentSlug}-${nanoid(3).toLowerCase()}`
    : currentSlug;

  const excerpt = generateExcerpt(payload.plainText);

  const newNote = await noteRepository.createNote(userId, {
    ...payload,
    slug: finalSlug,
    excerpt,
    userId,
    folderId: payload.folderId ?? null,
  });

  return newNote;
};

export const getNoteBySlug = async (userId: string, noteSlug: string) => {
  const note = await noteRepository.findNoteBySlug(userId, noteSlug);
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  return note;
};

export const updateNote = async (
  userId: string,
  noteSlug: string,
  payload: NoteRequestBody
) => {
  const note = await noteRepository.findNoteBySlugWithoutContent(
    userId,
    noteSlug
  );
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  const updatedPayload: Prisma.NoteUncheckedUpdateInput = {};

  if (payload.title !== undefined && payload.title !== note.title) {
    const newSlug = slugify(payload.title.toLowerCase());

    const existingNote = await noteRepository.findNoteBySlug(userId, newSlug);
    const isConflict = existingNote && existingNote.id !== note.id;
    const finalSlug = isConflict
      ? `${newSlug}-${nanoid(3).toLowerCase()}`
      : newSlug;

    updatedPayload.title = payload.title;
    updatedPayload.slug = finalSlug;
  }

  if (payload.plainText !== undefined) {
    updatedPayload.plainText = payload.plainText;
    updatedPayload.excerpt = generateExcerpt(payload.plainText);
  }

  if (payload.content !== undefined) {
    updatedPayload.content = payload.content;
  }
  if (payload.folderId !== undefined) {
    updatedPayload.folderId = payload.folderId;
    updatedPayload.updatedAt = note.updatedAt;
  }

  const updatedNote = await noteRepository.updateNote(
    note.id,
    userId,
    updatedPayload
  );

  return updatedNote;
};

export const deleteNotePermanently = async (
  userId: string,
  noteSlug: string
) => {
  const note = await noteRepository.findNoteBySlugWithoutContent(
    userId,
    noteSlug
  );
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  const isTrashed = note.trashedAt !== null;
  if (!isTrashed)
    throw new ConflictError({
      code: 'NOTE_NOT_IN_TRASH',
      message: `Cannot permanently delete a note that is not in trash. Move it to trash first`,
    });

  const deletedNote = await noteRepository.deleteNote(note.id, userId);

  return deletedNote;
};

export const toggleFavorite = async (userId: string, noteSlug: string) => {
  const note = await noteRepository.findNoteBySlugWithoutContent(
    userId,
    noteSlug
  );
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  const isActive = note.trashedAt === null && note.archivedAt === null;
  if (!isActive)
    throw new ConflictError({
      code: 'NOTE_NOT_ACTIVE',
      message: 'Cannot favorite a trashed or archived note',
    });

  const isFavorite = !note.isFavorite;

  const updatedNote = await noteRepository.updateStatusNote(note.id, userId, {
    isFavorite,
    favoriteAt: isFavorite ? new Date() : null,
    updatedAt: note.updatedAt,
  });

  return updatedNote;
};

export const archiveNote = async (userId: string, noteSlug: string) => {
  const note = await noteRepository.findNoteBySlugWithoutContent(
    userId,
    noteSlug
  );
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  const isArchive = note.archivedAt !== null && note.trashedAt === null;
  if (isArchive)
    throw new ConflictError({
      code: 'NOTE_ALREADY_ARCHIVED',
      message: 'Note is already archived',
    });

  const isTrashed = note.archivedAt === null && note.trashedAt !== null;
  if (isTrashed)
    throw new ConflictError({
      code: 'NOTE_IN_TRASH',
      message: 'Cannot archive a trashed note. Restore it first',
    });

  const updatedNote = await noteRepository.updateStatusNote(note.id, userId, {
    isFavorite: false,
    archivedAt: new Date(),
    updatedAt: note.updatedAt,
  });

  return updatedNote;
};

export const unarchiveNote = async (userId: string, noteSlug: string) => {
  const note = await noteRepository.findNoteBySlugWithoutContent(
    userId,
    noteSlug
  );
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  const isArchive = note.archivedAt !== null && note.trashedAt === null;
  if (!isArchive)
    throw new ConflictError({
      code: 'NOTE_NOT_ARCHIVED',
      message: 'Cannot unarchive a note that is not archived',
    });

  const updatedNote = await noteRepository.updateStatusNote(note.id, userId, {
    archivedAt: null,
    updatedAt: note.updatedAt,
  });

  return updatedNote;
};

export const trashNote = async (userId: string, noteSlug: string) => {
  const note = await noteRepository.findNoteBySlugWithoutContent(
    userId,
    noteSlug
  );
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  const isTrashed = note.trashedAt !== null && note.archivedAt === null;
  if (isTrashed)
    throw new ConflictError({
      code: 'NOTE_ALREADY_TRASHED',
      message: 'Note is already trashed',
    });

  const updatedNote = await noteRepository.updateStatusNote(note.id, userId, {
    isFavorite: false,
    archivedAt: null,
    trashedAt: new Date(),
    updatedAt: note.updatedAt,
  });

  return updatedNote;
};

export const restoreNote = async (userId: string, noteSlug: string) => {
  const note = await noteRepository.findNoteBySlugWithoutContent(
    userId,
    noteSlug
  );
  if (!note)
    throw new NotFoundError({
      code: 'NOTE_NOT_FOUND',
      message: `Note not found with slug: ${noteSlug}`,
    });

  const isTrashed = note.trashedAt !== null && note.archivedAt === null;
  if (!isTrashed)
    throw new ConflictError({
      code: 'NOTE_NOT_TRASHED',
      message: 'Cannot restore a note that is not trashed',
    });

  const updatedNote = await noteRepository.updateStatusNote(note.id, userId, {
    trashedAt: null,
    updatedAt: note.updatedAt,
  });

  return updatedNote;
};
