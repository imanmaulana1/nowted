import slugify from 'slugify';
import { describe, expect, it, vi } from 'vitest';
import { ConflictError, NotFoundError } from '../../shared/errors/index.js';
import * as folderRepository from './folder.repository.js';
import * as folderService from './folder.service.js';

vi.mock('./folder.repository.js', () => ({
  findFolders: vi.fn(),
  countFolders: vi.fn(),
  findFolderByName: vi.fn(),
  findFolderBySlug: vi.fn(),
  createFolder: vi.fn(),
  updateFolder: vi.fn(),
  deleteFolder: vi.fn(),
}));

vi.mock('slugify', () => ({
  default: vi.fn((val: string) => val.replace(/\s+/g, '-').toLowerCase()),
}));

describe('Folder Service - getFolders', () => {
  it('should return folders with categorized note statuses', async () => {
    const mockFolders = [
      {
        id: 'folder-1',
        name: 'Folder 1',
        slug: 'folder-1',
        notes: [
          {
            id: 'note-1',
            title: 'Note 1',
            archivedAt: new Date(),
            trashedAt: null,
          },
          {
            id: 'note-2',
            title: 'Note 2',
            archivedAt: null,
            trashedAt: new Date(),
          },
          { id: 'note-3', title: 'Note 3', archivedAt: null, trashedAt: null },
        ],
      },
    ];

    vi.mocked(folderRepository.findFolders).mockResolvedValue(mockFolders);

    const result = await folderService.getFolders('user-id');

    expect(folderRepository.findFolders).toHaveBeenCalledWith('user-id');
    expect(result).toEqual([
      {
        id: 'folder-1',
        name: 'Folder 1',
        slug: 'folder-1',
        notes: [
          { id: 'note-1', title: 'Note 1', status: 'archive' },
          { id: 'note-2', title: 'Note 2', status: 'trash' },
          { id: 'note-3', title: 'Note 3', status: 'active' },
        ],
      },
    ]);
  });
});

describe('Folder Service - createFolder', () => {
  it('should throw ConflictError if user reached the limit of 5 folders', async () => {
    vi.mocked(folderRepository.countFolders).mockResolvedValue(5);

    await expect(
      folderService.createFolder('user-id', { name: 'New Folder' })
    ).rejects.toThrow(ConflictError);
  });

  it('should throw ConflictError if folder name already exists', async () => {
    vi.mocked(folderRepository.countFolders).mockResolvedValue(3);
    vi.mocked(folderRepository.findFolderByName).mockResolvedValue({
      id: 'existing-id',
    });

    await expect(
      folderService.createFolder('user-id', { name: 'Existing Name' })
    ).rejects.toThrow(ConflictError);
  });

  it('should throw ConflictError if folder slug already exists', async () => {
    vi.mocked(folderRepository.countFolders).mockResolvedValue(3);
    vi.mocked(folderRepository.findFolderByName).mockResolvedValue(null);
    vi.mocked(folderRepository.findFolderBySlug).mockResolvedValue({
      id: 'existing-slug-id',
      name: 'Existing Slug Name',
    });

    await expect(
      folderService.createFolder('user-id', { name: 'existing slug name' })
    ).rejects.toThrow(ConflictError);
  });

  it('should successfully create a new folder', async () => {
    const mockNewFolder = {
      id: 'new-id',
      name: 'My Folder',
      slug: 'my-folder',
    };

    vi.mocked(folderRepository.countFolders).mockResolvedValue(3);
    vi.mocked(folderRepository.findFolderByName).mockResolvedValue(null);
    vi.mocked(folderRepository.findFolderBySlug).mockResolvedValue(null);
    vi.mocked(folderRepository.createFolder).mockResolvedValue(mockNewFolder);

    const result = await folderService.createFolder('user-id', {
      name: 'My Folder',
    });

    expect(slugify).toHaveBeenCalledWith('my folder');
    expect(folderRepository.createFolder).toHaveBeenCalledWith({
      userId: 'user-id',
      name: 'My Folder',
      slug: 'my-folder',
    });
    expect(result).toEqual(mockNewFolder);
  });
});

describe('Folder Service - updateFolder', () => {
  it('should throw NotFoundError if folder is not found', async () => {
    vi.mocked(folderRepository.findFolderBySlug).mockResolvedValue(null);

    await expect(
      folderService.updateFolder('user-id', 'non-existent', { name: 'Updated' })
    ).rejects.toThrow(NotFoundError);
  });

  it('should return folder directly if name is unchanged', async () => {
    const mockFolder = {
      id: 'folder-id',
      name: 'Unchanged Name',
      slug: 'unchanged-name',
    };
    vi.mocked(folderRepository.findFolderBySlug).mockResolvedValue(mockFolder);

    const result = await folderService.updateFolder(
      'user-id',
      'unchanged-name',
      {
        name: 'Unchanged Name',
      }
    );

    expect(result).toEqual(mockFolder);
    expect(folderRepository.updateFolder).not.toHaveBeenCalled();
  });

  it('should throw ConflictError if updated name already exists', async () => {
    const mockFolder = { id: 'folder-id', name: 'Old Name', slug: 'old-name' };
    vi.mocked(folderRepository.findFolderBySlug).mockResolvedValue(mockFolder);
    vi.mocked(folderRepository.findFolderByName).mockResolvedValue({
      id: 'existing-id',
    });

    await expect(
      folderService.updateFolder('user-id', 'old-name', {
        name: 'Existing Name',
      })
    ).rejects.toThrow(ConflictError);
  });

  it('should successfully update folder details', async () => {
    const mockFolder = {
      id: 'folder-id',
      name: 'Old Name',
      slug: 'old-name',
      updatedAt: new Date(),
    };
    const mockUpdatedFolder = {
      id: 'folder-id',
      name: 'New Name',
      slug: 'new-name',
    };

    vi.mocked(folderRepository.findFolderBySlug)
      .mockResolvedValueOnce(mockFolder) // first call to find the folder to update
      .mockResolvedValueOnce(null); // second call to check for slug conflicts
    vi.mocked(folderRepository.findFolderByName).mockResolvedValue(null);
    vi.mocked(folderRepository.updateFolder).mockResolvedValue(
      mockUpdatedFolder
    );

    const result = await folderService.updateFolder('user-id', 'old-name', {
      name: 'New Name',
    });

    expect(slugify).toHaveBeenCalledWith('new name');
    expect(folderRepository.updateFolder).toHaveBeenCalledWith('folder-id', {
      name: 'New Name',
      slug: 'new-name',
      updatedAt: mockFolder.updatedAt,
    });
    expect(result).toEqual(mockUpdatedFolder);
  });

  it('should throw ConflictError if updated slug exists for another folder', async () => {
    const mockFolder = { id: 'folder-id', name: 'Old Name', slug: 'old-name' };
    vi.mocked(folderRepository.findFolderBySlug)
      .mockResolvedValueOnce(mockFolder) // to find the folder to update
      .mockResolvedValueOnce({
        id: 'another-folder-id',
        name: 'Existing Slug Name',
      } as any); // check conflict
    vi.mocked(folderRepository.findFolderByName).mockResolvedValue(null);

    await expect(
      folderService.updateFolder('user-id', 'old-name', {
        name: 'Existing Slug Name',
      })
    ).rejects.toThrow(ConflictError);
  });
});

describe('Folder Service - deleteFolder', () => {
  it('should throw NotFoundError if folder is not found', async () => {
    vi.mocked(folderRepository.findFolderBySlug).mockResolvedValue(null);

    await expect(
      folderService.deleteFolder('user-id', 'non-existent')
    ).rejects.toThrow(NotFoundError);
  });

  it('should successfully delete folder', async () => {
    const mockFolder = {
      id: 'folder-id',
      name: 'Folder To Delete',
      slug: 'folder-to-delete',
    };
    vi.mocked(folderRepository.findFolderBySlug).mockResolvedValue(mockFolder);
    vi.mocked(folderRepository.deleteFolder).mockResolvedValue(mockFolder);

    const result = await folderService.deleteFolder(
      'user-id',
      'folder-to-delete'
    );

    expect(folderRepository.deleteFolder).toHaveBeenCalledWith('folder-id');
    expect(result).toEqual(mockFolder);
  });
});
