import cors from 'cors';
import type { RequestHandler } from 'express';

import { getEnv } from '#/config/env.js';

const corsOrigin = getEnv.CORS_ORIGIN.replace(/\/$/, '');
const allowedOrigins = [corsOrigin, 'http://localhost:4173'];
const isDev = getEnv.NODE_ENV === 'development';

const pnaPreflightHandler: RequestHandler = (req, res, next) => {
  if (req.headers['access-control-request-private-network']) {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    if (origin && (isDev || allowedOrigins.includes(origin))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
    res.sendStatus(204);
    return;
  }
  next();
};

const mainCorsHandler = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (isDev) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

export const corsHandler = [pnaPreflightHandler, mainCorsHandler];
