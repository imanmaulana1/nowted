import { apiReference } from '@scalar/express-api-reference';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { getEnv } from '#/config/env.js';
import { generateOpenApiDocument } from '#/config/openapi-doc.js';
import { errorHandler, notFoundHandler } from '#/shared/middlewares/index.js';
import { rootRouter, v1Router } from '#/shared/routes/index.js';

export function createApp() {
  const app = express();

  const document = generateOpenApiDocument();

  app.get('/openapi.json', (_req, res) => {
    res.json(document);
  });

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
    })
  );

  app.use(helmet());
  app.use(
    cors({
      origin: [getEnv.CORS_ORIGIN, 'http://localhost:4173'],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(compression());
  app.use(morgan(getEnv.NODE_ENV === 'production' ? 'combined' : 'dev'));

  app.use('/', rootRouter);
  app.use('/api/v1', v1Router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
