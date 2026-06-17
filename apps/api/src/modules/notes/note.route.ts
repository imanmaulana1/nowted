import { Router } from 'express';

import { requireAuth, validateRequest } from '#/shared/middlewares/index.js';

import * as noteController from './note.controller.js';
import {
  noteBodySchema,
  noteParamsSchema,
  noteQuerySchema,
} from './schemas/index.js';

export const noteRouter = Router();

noteRouter.use(requireAuth);

noteRouter.get(
  '/',
  validateRequest(noteQuerySchema, 'query'),
  noteController.getNotes
);

noteRouter.post(
  '/',
  validateRequest(noteBodySchema),
  noteController.createNote
);

noteRouter.get(
  '/:noteSlug',
  validateRequest(noteParamsSchema, 'params'),
  noteController.getNote
);

noteRouter.patch(
  '/:noteSlug',
  validateRequest(noteParamsSchema, 'params'),
  validateRequest(noteBodySchema),
  noteController.updateNote
);

noteRouter.delete(
  '/:noteSlug',
  validateRequest(noteParamsSchema, 'params'),
  noteController.deleteNote
);

noteRouter.patch(
  '/:noteSlug/favorite',
  validateRequest(noteParamsSchema, 'params'),
  noteController.toggleFavorite
);

noteRouter.patch(
  '/:noteSlug/archive',
  validateRequest(noteParamsSchema, 'params'),
  noteController.archiveNote
);

noteRouter.patch(
  '/:noteSlug/unarchive',
  validateRequest(noteParamsSchema, 'params'),
  noteController.unarchiveNote
);

noteRouter.patch(
  '/:noteSlug/trash',
  validateRequest(noteParamsSchema, 'params'),
  noteController.trashNote
);

noteRouter.patch(
  '/:noteSlug/restore',
  validateRequest(noteParamsSchema, 'params'),
  noteController.restoreNote
);
