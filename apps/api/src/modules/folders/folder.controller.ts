import type { Request, Response } from 'express';

import { successResponse } from '#/shared/utils/http-response.js';

import { getAuthenticatedUser } from '../auth/utils/auth.helper.js';
import * as folderService from './folder.service.js';
import type { FolderBody } from './schemas/folder-body.schema.js';
import type { FolderParams } from './schemas/folder-params.schema.js';

export const getFolders = async (req: Request, res: Response) => {
  const { id: currentUserId } = getAuthenticatedUser(req);

  const data = await folderService.getFolders(currentUserId);

  res.status(200).json(
    successResponse({
      message: 'Folders retrieved successfully',
      data,
    })
  );
};

export const createFolder = async (req: Request, res: Response) => {
  const { id: currentUserId } = getAuthenticatedUser(req);
  const payload = req.validated.body as FolderBody;

  const data = await folderService.createFolder(currentUserId, payload);

  res.status(201).json(
    successResponse({
      message: 'Folder created successfully',
      data,
    })
  );
};

export const updateFolder = async (req: Request, res: Response) => {
  const { id: currentUserId } = getAuthenticatedUser(req);
  const { folderSlug } = req.validated.params as FolderParams;
  const payload = req.validated.body as FolderBody;

  const data = await folderService.updateFolder(
    currentUserId,
    folderSlug,
    payload
  );

  res.status(200).json(
    successResponse({
      message: 'Folder updated successfully',
      data,
    })
  );
};

export const deleteFolder = async (req: Request, res: Response) => {
  const { id: currentUserId } = getAuthenticatedUser(req);
  const { folderSlug } = req.validated.params as FolderParams;

  await folderService.deleteFolder(currentUserId, folderSlug);

  res.sendStatus(204);
};
