import { describe, expect, it, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { prisma } from '../../src/config/prisma.js';
import { nanoid } from 'nanoid';

const app = createApp();

describe('Auth Integration Tests', () => {
  const email = `auth-test-${nanoid().toLowerCase()}@example.com`;
  let userId: string;

  afterAll(async () => {
    if (userId) {
      await prisma.user.delete({ where: { id: userId } }).catch(() => {});
    }
  });

  it('should register a new user successfully', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      fullName: 'Test User Auth',
      email,
      password: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
    expect(res.body.data.email).toBe(email);
    expect(res.body.data.id).toBeDefined();

    userId = res.body.data.id;
  });

  it('should not register with existing email', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      fullName: 'Test User Auth',
      email,
      password: 'password123',
    });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_ALREADY_EXISTS');
  });

  it('should login successfully', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email,
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User logged in successfully');
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should not login with wrong credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email,
      password: 'wrongpassword',
    });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('should get current user profile when authenticated', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email,
      password: 'password123',
    });

    const accessToken = loginRes.body.data.accessToken;

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(email);
    expect(res.body.data.fullName).toBe('Test User Auth');
  });
});
