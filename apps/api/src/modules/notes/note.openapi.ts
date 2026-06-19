import { registry } from '#/config/openapi.js';
import { createSuccessResponseSchema } from '#/shared/schemas/response.schema.js';
import {
  errorResponseComponent,
  validationErrorResponseComponent,
} from '#/modules/auth/auth.openapi.js';

import { noteBodySchema } from './schemas/note-body.schema.js';
import { noteParamsSchema } from './schemas/note-params.schema.js';
import { noteQuerySchema } from './schemas/note-query.schema.js';
import {
  noteDeleteResponseSchema,
  noteDetailResponseSchema,
  noteStatusResponseSchema,
  noteSummaryResponseSchema,
} from './schemas/note-response.schema.js';

const noteBodyComponent = registry.register(
  'NoteRequest',
  noteBodySchema.openapi({
    description: 'Payload for creating or updating a note.',
    example: {
      title: 'Meeting Notes',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Discuss project architecture and timelines.',
              },
            ],
          },
        ],
      },
      plainText: 'Discuss project architecture and timelines.',
      folderId: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
    },
  })
);

const noteSummaryComponent = registry.register(
  'NoteSummaryResponse',
  noteSummaryResponseSchema.openapi({
    description:
      'Summary of note details (excluding the full content/plainText fields).',
    example: {
      id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
      title: 'Meeting Notes',
      slug: 'meeting-notes',
      excerpt: 'Discuss project architecture and timelines.',
      isFavorite: false,
      favoriteAt: null,
      archivedAt: null,
      trashedAt: null,
      createdAt: '2026-06-19T11:47:31.000Z',
      updatedAt: '2026-06-19T11:47:31.000Z',
      folder: {
        id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
        name: 'Work',
        slug: 'work',
      },
    },
  })
);

const noteDetailComponent = registry.register(
  'NoteDetailResponse',
  noteDetailResponseSchema.openapi({
    description:
      'Full note details including rich-text document content and plain-text representation.',
    example: {
      id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
      title: 'Meeting Notes',
      slug: 'meeting-notes',
      excerpt: 'Discuss project architecture and timelines.',
      isFavorite: false,
      favoriteAt: null,
      archivedAt: null,
      trashedAt: null,
      createdAt: '2026-06-19T11:47:31.000Z',
      updatedAt: '2026-06-19T11:47:31.000Z',
      folder: {
        id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
        name: 'Work',
        slug: 'work',
      },
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Discuss project architecture and timelines.',
              },
            ],
          },
        ],
      },
      plainText: 'Discuss project architecture and timelines.',
    },
  })
);

const noteDeleteComponent = registry.register(
  'NoteDeleteResponse',
  noteDeleteResponseSchema.openapi({
    description: 'Deleted note reference.',
    example: {
      id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
      slug: 'meeting-notes',
    },
  })
);

const noteStatusComponent = registry.register(
  'NoteStatusResponse',
  noteStatusResponseSchema.openapi({
    description:
      'Note details indicating its updated status or favorite attributes.',
    example: {
      id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
      title: 'Meeting Notes',
      slug: 'meeting-notes',
      isFavorite: true,
      favoriteAt: '2026-06-19T11:47:31.000Z',
      archivedAt: null,
      trashedAt: null,
      updatedAt: '2026-06-19T11:47:31.000Z',
    },
  })
);

const noteSummaryListSuccessResponseComponent = registry.register(
  'NoteSummaryListSuccessResponse',
  createSuccessResponseSchema(noteSummaryComponent.array()).openapi({
    description: 'Standard success envelope for listing notes.',
  })
);

const noteDetailSuccessResponseComponent = registry.register(
  'NoteDetailSuccessResponse',
  createSuccessResponseSchema(noteDetailComponent).openapi({
    description: 'Standard success envelope for a note detail object.',
  })
);

const noteDeleteSuccessResponseComponent = registry.register(
  'NoteDeleteSuccessResponse',
  createSuccessResponseSchema(noteDeleteComponent).openapi({
    description: 'Standard success envelope for deleting a note.',
  })
);

const noteStatusSuccessResponseComponent = registry.register(
  'NoteStatusSuccessResponse',
  createSuccessResponseSchema(noteStatusComponent).openapi({
    description: 'Standard success envelope for note status update.',
  })
);

registry.registerPath({
  method: 'get',
  path: '/api/v1/notes',
  tags: ['Notes'],
  summary: 'Get all notes with optional filters',
  security: [{ bearerAuth: [] }],
  request: {
    query: noteQuerySchema,
  },
  responses: {
    200: {
      description: 'Notes retrieved successfully',
      content: {
        'application/json': {
          schema: noteSummaryListSuccessResponseComponent,
          example: {
            message: 'Notes retrieved successfully',
            data: [
              {
                id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
                title: 'Meeting Notes',
                slug: 'meeting-notes',
                excerpt: 'Discuss project architecture and timelines.',
                isFavorite: false,
                favoriteAt: null,
                archivedAt: null,
                trashedAt: null,
                createdAt: '2026-06-19T11:47:31.000Z',
                updatedAt: '2026-06-19T11:47:31.000Z',
                folder: {
                  id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
                  name: 'Work',
                  slug: 'work',
                },
              },
            ],
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/notes',
  tags: ['Notes'],
  summary: 'Create a new note',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: noteBodyComponent } },
    },
  },
  responses: {
    201: {
      description: 'Note created successfully',
      content: {
        'application/json': {
          schema: noteDetailSuccessResponseComponent,
          example: {
            message: 'Note created successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              excerpt: 'Discuss project architecture and timelines.',
              isFavorite: false,
              favoriteAt: null,
              archivedAt: null,
              trashedAt: null,
              createdAt: '2026-06-19T11:47:31.000Z',
              updatedAt: '2026-06-19T11:47:31.000Z',
              folder: {
                id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
                name: 'Work',
                slug: 'work',
              },
              content: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Discuss project architecture and timelines.',
                      },
                    ],
                  },
                ],
              },
              plainText: 'Discuss project architecture and timelines.',
            },
          },
        },
      },
    },
    400: {
      description: 'Validation error',
      content: {
        'application/json': {
          schema: validationErrorResponseComponent,
          example: {
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Please check your input details and try again',
              details: {
                folderId: ['Invalid UUID format'],
              },
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/notes/{noteSlug}',
  tags: ['Notes'],
  summary: 'Get a single note by slug',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
  },
  responses: {
    200: {
      description: 'Note retrieved successfully',
      content: {
        'application/json': {
          schema: noteDetailSuccessResponseComponent,
          example: {
            message: 'Note retrieved successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              excerpt: 'Discuss project architecture and timelines.',
              isFavorite: false,
              favoriteAt: null,
              archivedAt: null,
              trashedAt: null,
              createdAt: '2026-06-19T11:47:31.000Z',
              updatedAt: '2026-06-19T11:47:31.000Z',
              folder: {
                id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
                name: 'Work',
                slug: 'work',
              },
              content: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Discuss project architecture and timelines.',
                      },
                    ],
                  },
                ],
              },
              plainText: 'Discuss project architecture and timelines.',
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notes/{noteSlug}',
  tags: ['Notes'],
  summary: 'Update a note by slug',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
    body: {
      content: { 'application/json': { schema: noteBodyComponent } },
    },
  },
  responses: {
    200: {
      description: 'Note updated successfully',
      content: {
        'application/json': {
          schema: noteDetailSuccessResponseComponent,
          example: {
            message: 'Note updated successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              excerpt: 'Discuss project architecture and timelines.',
              isFavorite: false,
              favoriteAt: null,
              archivedAt: null,
              trashedAt: null,
              createdAt: '2026-06-19T11:47:31.000Z',
              updatedAt: '2026-06-19T11:47:31.000Z',
              folder: {
                id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
                name: 'Work',
                slug: 'work',
              },
              content: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Discuss project architecture and timelines.',
                      },
                    ],
                  },
                ],
              },
              plainText: 'Discuss project architecture and timelines.',
            },
          },
        },
      },
    },
    400: {
      description: 'Validation error',
      content: {
        'application/json': {
          schema: validationErrorResponseComponent,
          example: {
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Please check your input details and try again',
              details: {
                title: ['Note title must be at least 1 character long'],
              },
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/api/v1/notes/{noteSlug}',
  tags: ['Notes'],
  summary: 'Permanently delete a trashed note by slug',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
  },
  responses: {
    200: {
      description: 'Note deleted successfully',
      content: {
        'application/json': {
          schema: noteDeleteSuccessResponseComponent,
          example: {
            message: 'Note deleted successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              slug: 'meeting-notes',
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    409: {
      description: 'Note is not in trash, cannot permanently delete',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_IN_TRASH',
              message:
                'Cannot permanently delete a note that is not in trash. Move it to trash first',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notes/{noteSlug}/favorite',
  tags: ['Notes'],
  summary: 'Toggle favorite status of a note',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
  },
  responses: {
    200: {
      description: 'Note favorite status toggled successfully',
      content: {
        'application/json': {
          schema: noteStatusSuccessResponseComponent,
          example: {
            message: 'Note added to favorites successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              isFavorite: true,
              favoriteAt: '2026-06-19T11:47:31.000Z',
              archivedAt: null,
              trashedAt: null,
              updatedAt: '2026-06-19T11:47:31.000Z',
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    409: {
      description: 'Cannot favorite a trashed or archived note',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_ACTIVE',
              message: 'Cannot favorite a trashed or archived note',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notes/{noteSlug}/archive',
  tags: ['Notes'],
  summary: 'Archive a note',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
  },
  responses: {
    200: {
      description: 'Note archived successfully',
      content: {
        'application/json': {
          schema: noteStatusSuccessResponseComponent,
          example: {
            message: 'Note added to archive successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              isFavorite: false,
              favoriteAt: null,
              archivedAt: '2026-06-19T11:47:31.000Z',
              trashedAt: null,
              updatedAt: '2026-06-19T11:47:31.000Z',
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    409: {
      description: 'Note is already archived or in trash',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          examples: {
            AlreadyArchived: {
              summary: 'Note already archived',
              value: {
                error: {
                  code: 'NOTE_ALREADY_ARCHIVED',
                  message: 'Note is already archived',
                },
              },
            },
            InTrash: {
              summary: 'Note in trash',
              value: {
                error: {
                  code: 'NOTE_IN_TRASH',
                  message: 'Cannot archive a trashed note. Restore it first',
                },
              },
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notes/{noteSlug}/unarchive',
  tags: ['Notes'],
  summary: 'Unarchive a note',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
  },
  responses: {
    200: {
      description: 'Note unarchived successfully',
      content: {
        'application/json': {
          schema: noteStatusSuccessResponseComponent,
          example: {
            message: 'Note removed from archive successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              isFavorite: false,
              favoriteAt: null,
              archivedAt: null,
              trashedAt: null,
              updatedAt: '2026-06-19T11:47:31.000Z',
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    409: {
      description: 'Note is not archived',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_ARCHIVED',
              message: 'Cannot unarchive a note that is not archived',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notes/{noteSlug}/trash',
  tags: ['Notes'],
  summary: 'Move a note to trash',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
  },
  responses: {
    200: {
      description: 'Note moved to trash successfully',
      content: {
        'application/json': {
          schema: noteStatusSuccessResponseComponent,
          example: {
            message: 'Note moved to trash successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              isFavorite: false,
              favoriteAt: null,
              archivedAt: null,
              trashedAt: '2026-06-19T11:47:31.000Z',
              updatedAt: '2026-06-19T11:47:31.000Z',
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    409: {
      description: 'Note is already trashed',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_ALREADY_TRASHED',
              message: 'Note is already trashed',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notes/{noteSlug}/restore',
  tags: ['Notes'],
  summary: 'Restore a note from trash',
  security: [{ bearerAuth: [] }],
  request: {
    params: noteParamsSchema,
  },
  responses: {
    200: {
      description: 'Note restored from trash successfully',
      content: {
        'application/json': {
          schema: noteStatusSuccessResponseComponent,
          example: {
            message: 'Note restored from trash successfully',
            data: {
              id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
              title: 'Meeting Notes',
              slug: 'meeting-notes',
              isFavorite: false,
              favoriteAt: null,
              archivedAt: null,
              trashedAt: null,
              updatedAt: '2026-06-19T11:47:31.000Z',
            },
          },
        },
      },
    },
    404: {
      description: 'Note not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_FOUND',
              message: 'Note not found with slug: meeting-notes',
            },
          },
        },
      },
    },
    409: {
      description: 'Note is not trashed',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'NOTE_NOT_TRASHED',
              message: 'Cannot restore a note that is not trashed',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid token or expired',
            },
          },
        },
      },
    },
  },
});
