import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

import { registry } from '#/config/openapi.js';

import '#/modules/auth/auth.openapi.js';
import '#/modules/folders/folder.openapi.js';
import '#/modules/notes/note.openapi.js';
import '#/modules/users/user.openapi.js';

export const generateOpenApiDocument = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.3',
    info: {
      title: 'Nowted API',
      version: '1.0.0',
      description: 'REST API for Nowted - a notes application',
    },
    servers: [{ url: '/' }],
  });
};
