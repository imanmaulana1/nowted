import { getEnv } from '#/config/env.js';
import { errorHandler, notFoundHandler } from '#/shared/middlewares/index.js';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';


export function createApp() {
  const app = express();

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


  app.use(notFoundHandler)
  app.use(errorHandler)
  return app;
}
