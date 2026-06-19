import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load local test environment variables if present, fallback to .env
dotenv.config({ path: path.resolve(__dirname, '.env.test') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    // Fall back to dummy variables only if they are not already set in process.env
    env: {
      NODE_ENV: 'test',
      PORT: '5001',
      CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
      ACCESS_TOKEN_SECRET:
        process.env.ACCESS_TOKEN_SECRET ??
        'test_access_token_secret_key_which_is_extremely_long_and_safe',
      REFRESH_TOKEN_SECRET:
        process.env.REFRESH_TOKEN_SECRET ??
        'test_refresh_token_secret_key_which_is_extremely_long_and_safe',
      JWT_ISSUER: process.env.JWT_ISSUER ?? 'nowted-api-test',
      JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? 'nowted-web-test',
      CLOUDINARY_URL:
        process.env.CLOUDINARY_URL ?? 'cloudinary://test:test@test',
      DATABASE_URL:
        process.env.DATABASE_URL ??
        'postgresql://postgres:postgres@localhost:5432/nowted_test?schema=public',
    },
    setupFiles: ['./tests/setup.ts'],
  },
});
