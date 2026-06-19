import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';

const app = createApp();

describe('GET /health', () => {
  it('should return 200 OK and health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Status OK');
    expect(res.body.data.status).toBe('ok');
  });
});

describe('GET /', () => {
  it('should return 200 OK and api status', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('API is running');
    expect(res.body.data.service).toBe('nowted-api');
  });
});
