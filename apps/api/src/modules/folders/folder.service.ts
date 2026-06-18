import slugify from 'slugify';

import { ConflictError, NotFoundError } from '#/shared/errors/index.js';

import * as folderRepository from './folder.repository.js';
import type { FolderBody } from './schemas/folder-body.schema.js';

export const getFolders = async (userId: string) => {
  const folders = await folderRepository.findFolders(userId);

  return folders.map((folder) => ({
    ...folder,
    notes: folder.notes.map((note) => {
      const { archivedAt, trashedAt, ...rest } = note;

      return {
        ...rest,
        status:
          archivedAt !== null
            ? 'archive'
            : trashedAt !== null
              ? 'trash'
              : 'active',
      };
    }),
  }));
};

export const createFolder = async (userId: string, payload: FolderBody) => {
  const folderCount = await folderRepository.countFolders(userId);
  if (folderCount >= 5)
    throw new ConflictError({
      code: 'FOLDER_LIMIT_REACHED',
      message: 'Maximum limit of 5 folders reached',
    });

  const existingName = await folderRepository.findFolderByName(
    userId,
    payload.name
  );
  if (existingName) {
    throw new ConflictError({
      code: 'FOLDER_NAME_EXISTS',
      message: `Folder "${payload.name}" already exists`,
    });
  }

  const slug = slugify(payload.name.toLowerCase());

  const existingSlug = await folderRepository.findFolderBySlug(userId, slug);
  if (existingSlug) {
    throw new ConflictError({
      code: 'FOLDER_NAME_EXISTS',
      message: `Folder "${existingSlug.name}" already exists`,
    });
  }

  const newFolder = await folderRepository.createFolder({
    userId,
    name: payload.name,
    slug,
  });

  return newFolder;
};

export const updateFolder = async (
  userId: string,
  folderSlug: string,
  payload: FolderBody
) => {
  const folder = await folderRepository.findFolderBySlug(userId, folderSlug);
  if (!folder)
    throw new NotFoundError({
      code: 'FOLDER_NOT_FOUND',
      message: `Folder with slug "${folderSlug}" not found`,
    });

  if (payload.name === folder.name) return folder;

  const existingName = await folderRepository.findFolderByName(
    userId,
    payload.name
  );
  if (existingName) {
    throw new ConflictError({
      code: 'FOLDER_NAME_EXISTS',
      message: `Folder "${payload.name}" already exists`,
    });
  }

  const slug = slugify(payload.name.toLowerCase());

  const existingSlug = await folderRepository.findFolderBySlug(userId, slug);
  if (existingSlug && existingSlug.id !== folder.id) {
    throw new ConflictError({
      code: 'FOLDER_NAME_EXISTS',
      message: `Folder "${folder.name}" already exists`,
    });
  }

  const updatedFolder = await folderRepository.updateFolder(folder.id, {
    name: payload.name,
    slug,
    updatedAt: folder.updatedAt,
  });

  return updatedFolder;
};

export const deleteFolder = async (userId: string, folderSlug: string) => {
  const folder = await folderRepository.findFolderBySlug(userId, folderSlug);
  if (!folder)
    throw new NotFoundError({
      code: 'FOLDER_NOT_FOUND',
      message: `Folder with slug "${folderSlug}" not found`,
    });

  const deletedFolder = await folderRepository.deleteFolder(folder.id);

  return deletedFolder;
};
