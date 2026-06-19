import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { describe, expect, it, vi } from 'vitest';
import { ConflictError, NotFoundError } from '../../shared/errors/index.js';
import * as noteRepository from './note.repository.js';
import * as noteService from './note.service.js';
import { generateExcerpt } from './utils/note.helper.js';

vi.mock('./note.repository.js', () => ({
  findNotes: vi.fn(),
  findNoteBySlug: vi.fn(),
  createNote: vi.fn(),
  findNoteBySlugWithoutContent: vi.fn(),
  updateNote: vi.fn(),
  deleteNote: vi.fn(),
  updateStatusNote: vi.fn(),
}));

vi.mock('./utils/note.helper.js', () => ({
  generateExcerpt: vi.fn(),
}));

vi.mock('slugify', () => ({
  default: vi.fn((val: string) => val.replace(/\s+/g, '-').toLowerCase()),
}));

vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'abc'),
}));

describe('Note Service - getNotes', () => {
  it('should return a list of notes matching the query params', async () => {
    const mockNotes = [
      { id: '1', title: 'Note 1' },
      { id: '2', title: 'Note 2' },
    ];
    vi.mocked(noteRepository.findNotes).mockResolvedValue(mockNotes);

    const result = await noteService.getNotes('user-id', {
      status: 'active',
      orderBy: 'updatedAt',
    });

    expect(noteRepository.findNotes).toHaveBeenCalledWith('user-id', {
      status: 'active',
      orderBy: 'updatedAt',
    });
    expect(result).toEqual(mockNotes);
  });
});

describe('Note Service - createNote', () => {
  it('should successfully create a note with slug and excerpt', async () => {
    const payload = {
      title: 'My First Note',
      content: {},
      plainText: 'This is a test note.',
    };
    const mockNewNote = {
      id: 'note-1',
      title: 'My First Note',
      slug: 'my-first-note',
    };

    vi.mocked(noteRepository.findNoteBySlug).mockResolvedValue(null);
    vi.mocked(generateExcerpt).mockReturnValue('This is a test...');
    vi.mocked(noteRepository.createNote).mockResolvedValue(mockNewNote);

    const result = await noteService.createNote('user-id', payload);

    expect(slugify).toHaveBeenCalledWith('my first note');
    expect(noteRepository.findNoteBySlug).toHaveBeenCalledWith(
      'user-id',
      'my-first-note'
    );
    expect(generateExcerpt).toHaveBeenCalledWith('This is a test note.');
    expect(noteRepository.createNote).toHaveBeenCalledWith('user-id', {
      ...payload,
      slug: 'my-first-note',
      excerpt: 'This is a test...',
      userId: 'user-id',
      folderId: null,
    });
    expect(result).toEqual(mockNewNote);
  });

  it('should append nanoid suffix when slug already exists', async () => {
    const payload = {
      title: 'Duplicate Title',
      content: {},
      plainText: 'Note content',
    };
    const existingNote = { id: 'old-note-id', slug: 'duplicate-title' };
    const mockNewNote = { id: 'new-note-id', slug: 'duplicate-title-abc' };

    vi.mocked(noteRepository.findNoteBySlug).mockResolvedValue(existingNote);
    vi.mocked(generateExcerpt).mockReturnValue('Note content');
    vi.mocked(noteRepository.createNote).mockResolvedValue(mockNewNote);

    const result = await noteService.createNote('user-id', payload);

    expect(nanoid).toHaveBeenCalledWith(3);
    expect(noteRepository.createNote).toHaveBeenCalledWith('user-id', {
      ...payload,
      slug: 'duplicate-title-abc',
      excerpt: 'Note content',
      userId: 'user-id',
      folderId: null,
    });
    expect(result).toEqual(mockNewNote);
  });
});

describe('Note Service - getNoteBySlug', () => {
  it('should throw NotFoundError if note does not exist', async () => {
    vi.mocked(noteRepository.findNoteBySlug).mockResolvedValue(null);

    await expect(
      noteService.getNoteBySlug('user-id', 'non-existent')
    ).rejects.toThrow(NotFoundError);
  });

  it('should return note if found', async () => {
    const mockNote = { id: 'note-id', title: 'Hello', slug: 'hello' };
    vi.mocked(noteRepository.findNoteBySlug).mockResolvedValue(mockNote);

    const result = await noteService.getNoteBySlug('user-id', 'hello');

    expect(result).toEqual(mockNote);
  });
});

describe('Note Service - updateNote', () => {
  it('should throw NotFoundError when note is not found', async () => {
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      null
    );

    await expect(
      noteService.updateNote('user-id', 'non-existent', {
        title: 'update-title',
        content: {},
        plainText: 'plain-text',
        folderId: 'folder-id',
      })
    ).rejects.toThrow(NotFoundError);
  });

  it('should update note fields and generate new slug if title changes', async () => {
    const existingNote = {
      id: 'note-id',
      title: 'Old Title',
      slug: 'old-title',
      updatedAt: new Date(),
    };
    const payload = {
      title: 'New Title',
      plainText: 'New text content',
      content: { new: 'json' },
    };
    const mockUpdatedNote = {
      id: 'note-id',
      title: 'New Title',
      slug: 'new-title',
    };

    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      existingNote
    );
    vi.mocked(noteRepository.findNoteBySlug).mockResolvedValue(null);
    vi.mocked(generateExcerpt).mockReturnValue('New text...');
    vi.mocked(noteRepository.updateNote).mockResolvedValue(mockUpdatedNote);

    const result = await noteService.updateNote(
      'user-id',
      'old-title',
      payload
    );

    expect(noteRepository.findNoteBySlug).toHaveBeenCalledWith(
      'user-id',
      'new-title'
    );
    expect(generateExcerpt).toHaveBeenCalledWith('New text content');
    expect(noteRepository.updateNote).toHaveBeenCalledWith(
      'note-id',
      'user-id',
      {
        title: 'New Title',
        slug: 'new-title',
        plainText: 'New text content',
        excerpt: 'New text...',
        content: { new: 'json' },
      }
    );
    expect(result).toEqual(mockUpdatedNote);
  });

  it('should update folderId if supplied in payload', async () => {
    const existingNote = {
      id: 'note-id',
      title: 'Same Title',
      slug: 'same-title',
      updatedAt: new Date(),
    };
    const payload = {
      folderId: 'new-folder-id',
    };
    const mockUpdatedNote = {
      id: 'note-id',
      folderId: 'new-folder-id',
    };

    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      existingNote
    );
    vi.mocked(noteRepository.updateNote).mockResolvedValue(mockUpdatedNote);

    const result = await noteService.updateNote(
      'user-id',
      'same-title',
      payload
    );

    expect(noteRepository.updateNote).toHaveBeenCalledWith(
      'note-id',
      'user-id',
      {
        folderId: 'new-folder-id',
        updatedAt: existingNote.updatedAt,
      }
    );
    expect(result).toEqual(mockUpdatedNote);
  });
});

describe('Note Service - deleteNotePermanently', () => {
  it('should throw NotFoundError if note does not exist', async () => {
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      null
    );

    await expect(
      noteService.deleteNotePermanently('user-id', 'slug')
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw ConflictError if note is not in trash', async () => {
    const activeNote = { id: 'note-id', trashedAt: null };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      activeNote
    );

    await expect(
      noteService.deleteNotePermanently('user-id', 'slug')
    ).rejects.toThrow(ConflictError);
  });

  it('should permanently delete note if it is trashed', async () => {
    const trashedNote = { id: 'note-id', trashedAt: new Date() };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      trashedNote
    );
    vi.mocked(noteRepository.deleteNote).mockResolvedValue(trashedNote);

    const result = await noteService.deleteNotePermanently('user-id', 'slug');

    expect(noteRepository.deleteNote).toHaveBeenCalledWith(
      'note-id',
      'user-id'
    );
    expect(result).toEqual(trashedNote);
  });
});

describe('Note Service - toggleFavorite', () => {
  it('should throw NotFoundError if note is not found', async () => {
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      null
    );

    await expect(noteService.toggleFavorite('user-id', 'slug')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should throw ConflictError if note is archived or trashed', async () => {
    const archivedNote = {
      id: 'note-id',
      trashedAt: null,
      archivedAt: new Date(),
    };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      archivedNote
    );

    await expect(noteService.toggleFavorite('user-id', 'slug')).rejects.toThrow(
      ConflictError
    );
  });

  it('should toggle favorite status', async () => {
    const activeNote = {
      id: 'note-id',
      trashedAt: null,
      archivedAt: null,
      isFavorite: false,
      updatedAt: new Date(),
    };
    const mockUpdatedNote = { id: 'note-id', isFavorite: true };

    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      activeNote
    );
    vi.mocked(noteRepository.updateStatusNote).mockResolvedValue(
      mockUpdatedNote
    );

    const result = await noteService.toggleFavorite('user-id', 'slug');

    expect(noteRepository.updateStatusNote).toHaveBeenCalledWith(
      'note-id',
      'user-id',
      {
        isFavorite: true,
        favoriteAt: expect.any(Date),
        updatedAt: activeNote.updatedAt,
      }
    );
    expect(result).toEqual(mockUpdatedNote);
  });
});

describe('Note Service - archiveNote', () => {
  it('should throw NotFoundError if note is not found', async () => {
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      null
    );

    await expect(noteService.archiveNote('user-id', 'slug')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should throw ConflictError if note is already archived', async () => {
    const archivedNote = {
      id: 'note-id',
      archivedAt: new Date(),
      trashedAt: null,
    };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      archivedNote
    );

    await expect(noteService.archiveNote('user-id', 'slug')).rejects.toThrow(
      ConflictError
    );
  });

  it('should throw ConflictError if note is in trash', async () => {
    const trashedNote = {
      id: 'note-id',
      archivedAt: null,
      trashedAt: new Date(),
    };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      trashedNote
    );

    await expect(noteService.archiveNote('user-id', 'slug')).rejects.toThrow(
      ConflictError
    );
  });

  it('should successfully archive active note', async () => {
    const activeNote = {
      id: 'note-id',
      archivedAt: null,
      trashedAt: null,
      updatedAt: new Date(),
    };
    const mockUpdatedNote = { id: 'note-id', archivedAt: new Date() };

    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      activeNote
    );
    vi.mocked(noteRepository.updateStatusNote).mockResolvedValue(
      mockUpdatedNote
    );

    const result = await noteService.archiveNote('user-id', 'slug');

    expect(noteRepository.updateStatusNote).toHaveBeenCalledWith(
      'note-id',
      'user-id',
      {
        isFavorite: false,
        archivedAt: expect.any(Date),
        updatedAt: activeNote.updatedAt,
      }
    );
    expect(result).toEqual(mockUpdatedNote);
  });
});

describe('Note Service - unarchiveNote', () => {
  it('should throw NotFoundError if note is not found', async () => {
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      null
    );

    await expect(noteService.unarchiveNote('user-id', 'slug')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should throw ConflictError if note is not archived', async () => {
    const activeNote = { id: 'note-id', archivedAt: null, trashedAt: null };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      activeNote
    );

    await expect(noteService.unarchiveNote('user-id', 'slug')).rejects.toThrow(
      ConflictError
    );
  });

  it('should successfully unarchive archived note', async () => {
    const archivedNote = {
      id: 'note-id',
      archivedAt: new Date(),
      trashedAt: null,
      updatedAt: new Date(),
    };
    const mockUpdatedNote = { id: 'note-id', archivedAt: null };

    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      archivedNote
    );
    vi.mocked(noteRepository.updateStatusNote).mockResolvedValue(
      mockUpdatedNote
    );

    const result = await noteService.unarchiveNote('user-id', 'slug');

    expect(noteRepository.updateStatusNote).toHaveBeenCalledWith(
      'note-id',
      'user-id',
      {
        archivedAt: null,
        updatedAt: archivedNote.updatedAt,
      }
    );
    expect(result).toEqual(mockUpdatedNote);
  });
});

describe('Note Service - trashNote', () => {
  it('should throw NotFoundError if note is not found', async () => {
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      null
    );

    await expect(noteService.trashNote('user-id', 'slug')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should throw ConflictError if note is already trashed', async () => {
    const trashedNote = {
      id: 'note-id',
      archivedAt: null,
      trashedAt: new Date(),
    };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      trashedNote
    );

    await expect(noteService.trashNote('user-id', 'slug')).rejects.toThrow(
      ConflictError
    );
  });

  it('should successfully move note to trash', async () => {
    const activeNote = {
      id: 'note-id',
      archivedAt: null,
      trashedAt: null,
      updatedAt: new Date(),
    };
    const mockUpdatedNote = { id: 'note-id', trashedAt: new Date() };

    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      activeNote
    );
    vi.mocked(noteRepository.updateStatusNote).mockResolvedValue(
      mockUpdatedNote
    );

    const result = await noteService.trashNote('user-id', 'slug');

    expect(noteRepository.updateStatusNote).toHaveBeenCalledWith(
      'note-id',
      'user-id',
      {
        isFavorite: false,
        archivedAt: null,
        trashedAt: expect.any(Date),
        updatedAt: activeNote.updatedAt,
      }
    );
    expect(result).toEqual(mockUpdatedNote);
  });
});

describe('Note Service - restoreNote', () => {
  it('should throw NotFoundError if note is not found', async () => {
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      null
    );

    await expect(noteService.restoreNote('user-id', 'slug')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should throw ConflictError if note is not trashed', async () => {
    const activeNote = { id: 'note-id', archivedAt: null, trashedAt: null };
    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      activeNote
    );

    await expect(noteService.restoreNote('user-id', 'slug')).rejects.toThrow(
      ConflictError
    );
  });

  it('should successfully restore trashed note', async () => {
    const trashedNote = {
      id: 'note-id',
      archivedAt: null,
      trashedAt: new Date(),
      updatedAt: new Date(),
    };
    const mockUpdatedNote = { id: 'note-id', trashedAt: null };

    vi.mocked(noteRepository.findNoteBySlugWithoutContent).mockResolvedValue(
      trashedNote
    );
    vi.mocked(noteRepository.updateStatusNote).mockResolvedValue(
      mockUpdatedNote
    );

    const result = await noteService.restoreNote('user-id', 'slug');

    expect(noteRepository.updateStatusNote).toHaveBeenCalledWith(
      'note-id',
      'user-id',
      {
        trashedAt: null,
        updatedAt: trashedNote.updatedAt,
      }
    );
    expect(result).toEqual(mockUpdatedNote);
  });
});
