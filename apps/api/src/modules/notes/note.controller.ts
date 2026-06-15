import type { Request, Response } from 'express';

import { getAuthenticatedUser } from '#/modules/auth/utils/auth.helper.js';
import { successResponse } from '#/shared/utils/http-response.js';

import * as noteService from './note.service.js';
import type {
  NoteRequestBody,
  NoteRequestParams,
  NoteRequestQuery,
} from './schemas/index.js';

export const getNotes = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const queryParams = req.validated.query as NoteRequestQuery;

  const data = await noteService.getNotes(userId, queryParams);

  res
    .status(200)
    .json(successResponse({ message: 'Notes retrieved successfully', data }));
};

export const createNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const payload = req.validated.body as NoteRequestBody;

  const data = await noteService.createNote(userId, payload);

  res
    .status(201)
    .json(successResponse({ message: 'Note created successfully', data }));
};

export const getNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;

  const data = await noteService.getNoteBySlug(userId, noteSlug);

  res
    .status(200)
    .json(successResponse({ message: 'Note retrieved successfully', data }));
};

export const updateNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;
  const payload = req.validated.body as NoteRequestBody;

  const data = await noteService.updateNote(userId, noteSlug, payload);

  res
    .status(200)
    .json(successResponse({ message: 'Note updated successfully', data }));
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;

  const data = await noteService.deleteNotePermanently(userId, noteSlug);

  res
    .status(200)
    .json(successResponse({ message: 'Note deleted successfully', data }));
};

export const toggleFavorite = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;

  const data = await noteService.toggleFavorite(userId, noteSlug);

  const message = data.isFavorite
    ? 'Note added to favorites successfully'
    : 'Note removed from favorites successfully';

  res.status(200).json(successResponse({ message, data }));
};

export const archiveNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;

  const data = await noteService.archiveNote(userId, noteSlug);

  res
    .status(200)
    .json(
      successResponse({ message: 'Note added to archive successfully', data })
    );
};

export const unarchiveNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;

  const data = await noteService.unarchiveNote(userId, noteSlug);

  res.status(200).json(
    successResponse({
      message: 'Note removed from archive successfully',
      data,
    })
  );
};

export const trashNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;

  const data = await noteService.trashNote(userId, noteSlug);

  res
    .status(200)
    .json(
      successResponse({ message: 'Note moved to trash successfully', data })
    );
};

export const restoreNote = async (req: Request, res: Response) => {
  const { id: userId } = getAuthenticatedUser(req);
  const { noteSlug } = req.validated.params as NoteRequestParams;

  const data = await noteService.restoreNote(userId, noteSlug);

  res.status(200).json(
    successResponse({
      message: 'Note restored from trash successfully',
      data,
    })
  );
};
