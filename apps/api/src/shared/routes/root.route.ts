import { getEnv } from '#/config/env.js';
import { successResponse } from '#/shared/utils/http-response.js';
import { Router } from 'express';

export const rootRouter = Router();

rootRouter.get('/', (_req, res) => {
  res.status(200).json(
    successResponse({
      message: 'API is running',
      data: {
        service: 'nowted-api',
        version: '1.0.0',
        environment: getEnv.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
    })
  );
});

rootRouter.get('/health', (_req, res) => {
  res.status(200).json(
    successResponse({
      message: 'Status OK',
      data: {
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
    })
  );
});
