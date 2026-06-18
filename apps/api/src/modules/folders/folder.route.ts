import { Router } from 'express';

import { requireAuth, validateRequest } from '#/shared/middlewares/index.js';

import * as folderController from './folder.controller.js';
import { folderBodySchema } from './schemas/folder-body.schema.js';
import { folderParamsSchema } from './schemas/folder-params.schema.js';

export const folderRouter = Router();

folderRouter.use(requireAuth);

folderRouter.get('/', folderController.getFolders);

folderRouter.post(
  '/',
  validateRequest(folderBodySchema),
  folderController.createFolder
);

folderRouter.patch(
  '/:folderSlug',
  [
    validateRequest(folderParamsSchema, 'params'),
    validateRequest(folderBodySchema),
  ],
  folderController.updateFolder
);

folderRouter.delete(
  '/:folderSlug',
  validateRequest(folderParamsSchema, 'params'),
  folderController.deleteFolder
);
