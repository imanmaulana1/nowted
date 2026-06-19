import { z } from 'zod';
import { registry } from '#/config/openapi.js';
import { createSuccessResponseSchema } from '#/shared/schemas/response.schema.js';
import {
  errorResponseComponent,
  validationErrorResponseComponent,
} from '#/modules/auth/auth.openapi.js';

import { updateProfileResponseSchema } from './schemas/user-response.schema.js';

const updateProfileRequestOpenApiSchema = z.object({
  fullName: z.string().optional().openapi({
    description: 'New full name of the user',
    example: 'John Doe',
  }),
  removeAvatar: z.string().optional().openapi({
    description: 'Set to "true" to remove the current avatar image',
    example: 'false',
  }),
  avatar: z.string().optional().openapi({
    type: 'string',
    format: 'binary',
    description: 'User avatar image file upload (JPEG, PNG, etc.)',
  }),
});

const updateProfileRequestComponent = registry.register(
  'UpdateProfileRequest',
  updateProfileRequestOpenApiSchema.openapi({
    description: 'Form data containing profile details and avatar file',
  })
);

const updateProfileResponseComponent = registry.register(
  'UpdateProfileResponse',
  updateProfileResponseSchema.openapi({
    description: 'User profile details returned after a successful update.',
    example: {
      id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl:
        'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      updatedAt: '2026-06-19T11:47:31.000Z',
    },
  })
);

const updateProfileSuccessResponseComponent = registry.register(
  'UpdateProfileSuccessResponse',
  createSuccessResponseSchema(updateProfileResponseComponent).openapi({
    description: 'Standard success envelope for profile updates.',
  })
);

registry.registerPath({
  method: 'patch',
  path: '/api/v1/users/profile',
  tags: ['Users'],
  summary: 'Update user profile (fullName and/or avatar)',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: updateProfileRequestComponent,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Profile updated successfully',
      content: {
        'application/json': {
          schema: updateProfileSuccessResponseComponent,
          example: {
            message: 'Profile updated successfully',
            data: {
              id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              avatarUrl:
                'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
              updatedAt: '2026-06-19T11:47:31.000Z',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request / Validation error',
      content: {
        'application/json': {
          schema: validationErrorResponseComponent,
          example: {
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Please check your input details and try again',
              details: {
                fullName: ['Full name must be at least 3 characters'],
                removeAvatar: ['Invalid boolean string'],
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
