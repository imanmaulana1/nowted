import { registry } from '#/config/openapi.js';
import { createSuccessResponseSchema } from '#/shared/schemas/response.schema.js';
import {
  errorResponseComponent,
  validationErrorResponseComponent,
} from '#/modules/auth/auth.openapi.js';

import { folderBodySchema } from './schemas/folder-body.schema.js';
import { folderParamsSchema } from './schemas/folder-params.schema.js';
import {
  folderSchema,
  folderWithNotesSchema,
} from './schemas/folder-response.schema.js';

const folderBodyComponent = registry.register(
  'FolderRequest',
  folderBodySchema.openapi({
    description: 'Folder request body payload containing the folder name.',
    example: {
      name: 'Personal Notes',
    },
  })
);

const folderResponseComponent = registry.register(
  'FolderResponse',
  folderSchema.openapi({
    description: 'Folder details.',
    example: {
      id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
      name: 'Personal Notes',
      slug: 'personal-notes',
      createdAt: '2026-06-19T11:47:31.000Z',
      updatedAt: '2026-06-19T11:47:31.000Z',
    },
  })
);

const folderWithNotesComponent = registry.register(
  'FolderWithNotesResponse',
  folderWithNotesSchema.openapi({
    description: 'Folder details along with a list of notes inside it.',
    example: {
      id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
      name: 'Personal Notes',
      slug: 'personal-notes',
      createdAt: '2026-06-19T11:47:31.000Z',
      updatedAt: '2026-06-19T11:47:31.000Z',
      notes: [
        {
          id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
          title: 'Shopping List',
          slug: 'shopping-list',
          isFavorite: true,
          updatedAt: '2026-06-19T11:47:31.000Z',
          status: 'active',
        },
      ],
    },
  })
);

const foldersSuccessResponseComponent = registry.register(
  'FoldersSuccessResponse',
  createSuccessResponseSchema(folderWithNotesComponent.array()).openapi({
    description: 'Standard success envelope for listing folders.',
  })
);

const folderSuccessResponseComponent = registry.register(
  'FolderSuccessResponse',
  createSuccessResponseSchema(folderResponseComponent).openapi({
    description: 'Standard success envelope for folder details.',
  })
);

registry.registerPath({
  method: 'get',
  path: '/api/v1/folders',
  tags: ['Folders'],
  summary: 'Get all folders with their notes for the authenticated user',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Folders retrieved successfully',
      content: {
        'application/json': {
          schema: foldersSuccessResponseComponent,
          example: {
            message: 'Folders retrieved successfully',
            data: [
              {
                id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
                name: 'Personal Notes',
                slug: 'personal-notes',
                createdAt: '2026-06-19T11:47:31.000Z',
                updatedAt: '2026-06-19T11:47:31.000Z',
                notes: [
                  {
                    id: '2cf7b19a-9e12-40f4-8a4d-e9c5651c6812',
                    title: 'Shopping List',
                    slug: 'shopping-list',
                    isFavorite: true,
                    updatedAt: '2026-06-19T11:47:31.000Z',
                    status: 'active',
                  },
                ],
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
  path: '/api/v1/folders',
  tags: ['Folders'],
  summary: 'Create a new folder',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: folderBodyComponent } },
    },
  },
  responses: {
    201: {
      description: 'Folder created successfully',
      content: {
        'application/json': {
          schema: folderSuccessResponseComponent,
          example: {
            message: 'Folder created successfully',
            data: {
              id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
              name: 'Personal Notes',
              slug: 'personal-notes',
              createdAt: '2026-06-19T11:47:31.000Z',
              updatedAt: '2026-06-19T11:47:31.000Z',
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
                name: ['Folder name must be at least 3 characters'],
              },
            },
          },
        },
      },
    },
    409: {
      description: 'Folder name already exists or folder limit reached',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          examples: {
            FolderLimitReached: {
              summary: 'Folder limit reached',
              value: {
                error: {
                  code: 'FOLDER_LIMIT_REACHED',
                  message: 'Maximum limit of 5 folders reached',
                },
              },
            },
            FolderNameExists: {
              summary: 'Folder name already exists',
              value: {
                error: {
                  code: 'FOLDER_NAME_EXISTS',
                  message: 'Folder "Personal Notes" already exists',
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
  path: '/api/v1/folders/{folderSlug}',
  tags: ['Folders'],
  summary: 'Update a folder name by slug',
  security: [{ bearerAuth: [] }],
  request: {
    params: folderParamsSchema,
    body: {
      content: { 'application/json': { schema: folderBodyComponent } },
    },
  },
  responses: {
    200: {
      description: 'Folder updated successfully',
      content: {
        'application/json': {
          schema: folderSuccessResponseComponent,
          example: {
            message: 'Folder updated successfully',
            data: {
              id: '8d2a6a68-b80c-4fa2-bf4f-80d463d1a8c9',
              name: 'Personal Notes',
              slug: 'personal-notes',
              createdAt: '2026-06-19T11:47:31.000Z',
              updatedAt: '2026-06-19T11:47:31.000Z',
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
                name: ['Folder name must be at least 3 characters'],
              },
            },
          },
        },
      },
    },
    404: {
      description: 'Folder not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'FOLDER_NOT_FOUND',
              message: 'Folder with slug "personal-notes" not found',
            },
          },
        },
      },
    },
    409: {
      description: 'Folder name already exists',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'FOLDER_NAME_EXISTS',
              message: 'Folder "Personal Notes" already exists',
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
  path: '/api/v1/folders/{folderSlug}',
  tags: ['Folders'],
  summary: 'Delete a folder by slug',
  security: [{ bearerAuth: [] }],
  request: {
    params: folderParamsSchema,
  },
  responses: {
    204: { description: 'Folder deleted successfully, no content' },
    404: {
      description: 'Folder not found',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'FOLDER_NOT_FOUND',
              message: 'Folder with slug "personal-notes" not found',
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
