import { createApp } from '#/app.js';
import { getEnv } from '#/config/env.js';

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception: ', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection: ', err);
  process.exit(1);
});

const app = createApp();

const server = app.listen(getEnv.PORT, () => {
  console.log(`🚀 Server running on port ${getEnv.PORT}`);
});

function gracefulShutdown(signal: string) {
  console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('❌ Forced shutdown — timeout exceeded.');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
