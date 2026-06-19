import { z } from 'zod';
import { registry } from '#/config/openapi.js';
import { createSuccessResponseSchema } from '#/shared/schemas/response.schema.js';

import { changePasswordSchema } from './schemas/change-password.schema.js';
import { loginSchema } from './schemas/login.schema.js';
import { registerSchema } from './schemas/register.schema.js';
import {
  authUserResponseSchema,
  loginResponseSchema,
  refreshResponseSchema,
  registerResponseSchema,
} from './schemas/auth-response.schema.js';

export const errorResponseComponent = registry.register(
  'ErrorResponse',
  z
    .object({
      error: z.object({
        code: z.string().openapi({
          description: 'Error code representing the specific issue.',
          example: 'UNAUTHORIZED',
        }),
        message: z.string().openapi({
          description: 'Human-readable description of the error.',
          example: 'Invalid token or expired',
        }),
      }),
    })
    .openapi({
      description: 'Standard error response payload format.',
    })
);

export const validationErrorResponseComponent = registry.register(
  'ValidationErrorResponse',
  z
    .object({
      error: z.object({
        code: z.string().openapi({
          description: 'Error code representing a validation failure.',
          example: 'VALIDATION_ERROR',
        }),
        message: z.string().openapi({
          description: 'General description of the validation failure.',
          example: 'Please check your input details and try again',
        }),
        details: z.record(z.string(), z.array(z.string())).openapi({
          description: 'Dictionary of field-level validation errors.',
          example: {
            email: ['Invalid email address'],
            password: ['Password must be at least 8 characters long'],
          },
        }),
      }),
    })
    .openapi({
      description:
        'Error response payload format returned when validation fails.',
    })
);

const registerRequestComponent = registry.register(
  'RegisterRequest',
  registerSchema.openapi({
    description:
      'User registration request payload containing full name, email, and password.',
    example: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'SecurePassword123!',
    },
  })
);

const loginRequestComponent = registry.register(
  'LoginRequest',
  loginSchema.openapi({
    description: 'User login request payload containing email and password.',
    example: {
      email: 'john.doe@example.com',
      password: 'SecurePassword123!',
    },
  })
);

const changePasswordRequestComponent = registry.register(
  'ChangePasswordRequest',
  changePasswordSchema.openapi({
    description:
      'Change password request payload containing current password and new password.',
    example: {
      currentPassword: 'SecurePassword123!',
      newPassword: 'BrandNewPassword456!',
    },
  })
);

const registerResponseComponent = registry.register(
  'RegisterResponse',
  registerResponseSchema.openapi({
    description: 'User details returned after a successful registration.',
    example: {
      id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: null,
      createdAt: '2026-06-19T11:47:31.000Z',
    },
  })
);

const authUserResponseComponent = registry.register(
  'AuthUserResponse',
  authUserResponseSchema.openapi({
    description:
      'Current user profile details including aggregate statistics like total notes and folders.',
    example: {
      id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl:
        'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      updatedAt: '2026-06-19T11:47:31.000Z',
      totalNotes: 12,
      totalFolders: 3,
    },
  })
);

const loginResponseComponent = registry.register(
  'LoginResponse',
  loginResponseSchema.openapi({
    description: 'Logged-in user details and the access token.',
    example: {
      user: {
        id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: null,
        updatedAt: '2026-06-19T11:47:31.000Z',
        totalNotes: 12,
        totalFolders: 3,
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkM2IwNzM4NC1kMTEzLTQ5NTYtYTVjYy05YzYwNjJmNmI4YTgifQ...',
    },
  })
);

const refreshResponseComponent = registry.register(
  'RefreshResponse',
  refreshResponseSchema.openapi({
    description: 'New access token payload.',
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkM2IwNzM4NC1kMTEzLTQ5NTYtYTVjYy05YzYwNjJmNmI4YTgifQ...',
    },
  })
);

const registerSuccessResponseComponent = registry.register(
  'RegisterSuccessResponse',
  createSuccessResponseSchema(registerResponseComponent).openapi({
    description: 'Standard success envelope for registration.',
  })
);

const loginSuccessResponseComponent = registry.register(
  'LoginSuccessResponse',
  createSuccessResponseSchema(loginResponseComponent).openapi({
    description: 'Standard success envelope for login.',
  })
);

const authUserSuccessResponseComponent = registry.register(
  'AuthUserSuccessResponse',
  createSuccessResponseSchema(authUserResponseComponent).openapi({
    description:
      'Standard success envelope for retrieving the authenticated user.',
  })
);

const refreshSuccessResponseComponent = registry.register(
  'RefreshSuccessResponse',
  createSuccessResponseSchema(refreshResponseComponent).openapi({
    description: 'Standard success envelope for refreshing the access token.',
  })
);

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/register',
  tags: ['Auth'],
  summary: 'Register a new user account',
  request: {
    body: {
      content: { 'application/json': { schema: registerRequestComponent } },
    },
  },
  responses: {
    201: {
      description: 'User registered successfully',
      content: {
        'application/json': {
          schema: registerSuccessResponseComponent,
          example: {
            message: 'User registered successfully',
            data: {
              id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              avatarUrl: null,
              createdAt: '2026-06-19T11:47:31.000Z',
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
                fullName: ['Name must be at least 3 characters long'],
                email: ['Invalid email address'],
                password: ['Password must be at least 8 characters long'],
              },
            },
          },
        },
      },
    },
    409: {
      description: 'Email already exists',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'EMAIL_ALREADY_EXISTS',
              message: 'An account with this email already exists',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/login',
  tags: ['Auth'],
  summary: 'Login with email and password',
  request: {
    body: {
      content: { 'application/json': { schema: loginRequestComponent } },
    },
  },
  responses: {
    200: {
      description: 'User logged in successfully',
      content: {
        'application/json': {
          schema: loginSuccessResponseComponent,
          example: {
            message: 'User logged in successfully',
            data: {
              user: {
                id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                avatarUrl: null,
                updatedAt: '2026-06-19T11:47:31.000Z',
                totalNotes: 12,
                totalFolders: 3,
              },
              accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkM2IwNzM4NC1kMTEzLTQ5NTYtYTVjYy05YzYwNjJmNmI4YTgifQ...',
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
                email: ['Invalid email address'],
                password: ['Password must be at least 8 characters long'],
              },
            },
          },
        },
      },
    },
    401: {
      description: 'Invalid credentials',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid credentials',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/logout',
  tags: ['Auth'],
  summary: 'Logout and invalidate refresh token session',
  responses: {
    204: { description: 'Logged out successfully, no content' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/refresh',
  tags: ['Auth'],
  summary: 'Refresh access token using refresh token cookie',
  responses: {
    200: {
      description: 'Token refreshed successfully',
      content: {
        'application/json': {
          schema: refreshSuccessResponseComponent,
          example: {
            message: 'Token refreshed successfully',
            data: {
              accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkM2IwNzM4NC1kMTEzLTQ5NTYtYTVjYy05YzYwNjJmNmI4YTgifQ...',
            },
          },
        },
      },
    },
    401: {
      description: 'Invalid or expired refresh token',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'TOKEN_EXPIRED',
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
  path: '/api/v1/auth/me',
  tags: ['Auth'],
  summary: 'Get current authenticated user profile',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'User retrieved successfully',
      content: {
        'application/json': {
          schema: authUserSuccessResponseComponent,
          example: {
            message: 'User retrieved successfully',
            data: {
              id: 'd3b07384-d113-4956-a5cc-9c6062f6b8a8',
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              avatarUrl:
                'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
              updatedAt: '2026-06-19T11:47:31.000Z',
              totalNotes: 12,
              totalFolders: 3,
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized, invalid or missing access token',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'User session is no longer valid',
            },
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/auth/change-password',
  tags: ['Auth'],
  summary: 'Change current user password',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: changePasswordRequestComponent },
      },
    },
  },
  responses: {
    204: { description: 'Password changed successfully, no content' },
    400: {
      description: 'Current password is incorrect or validation error',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'BAD_REQUEST',
              message: 'Current password is incorrect',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized, invalid or missing access token',
      content: {
        'application/json': {
          schema: errorResponseComponent,
          example: {
            error: {
              code: 'UNAUTHORIZED',
              message: 'User session is no longer valid',
            },
          },
        },
      },
    },
  },
});
