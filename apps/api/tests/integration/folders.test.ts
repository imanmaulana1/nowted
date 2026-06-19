import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { createTestUser, deleteTestUser } from './test-helper.js';
import { nanoid } from 'nanoid';

const app = createApp();

describe('Folders Integration Tests', () => {
  let user: any;
  let authHeader: string;

  beforeAll(async () => {
    const email = `folder-test-${nanoid().toLowerCase()}@example.com`;
    const res = await createTestUser(email);
    user = res.user;
    authHeader = res.authHeader;
  });

  afterAll(async () => {
    if (user) {
      await deleteTestUser(user.id);
    }
  });

  it('should create a new folder successfully', async () => {
    const res = await request(app)
      .post('/api/v1/folders')
      .set('Authorization', authHeader)
      .send({
        name: 'Work',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Folder created successfully');
    expect(res.body.data.name).toBe('Work');
    expect(res.body.data.slug).toBe('work');
  });

  it('should list user folders', async () => {
    const res = await request(app)
      .get('/api/v1/folders')
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Work');
  });

  it('should rename folder', async () => {
    const res = await request(app)
      .patch('/api/v1/folders/work')
      .set('Authorization', authHeader)
      .send({
        name: 'Personal',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Folder updated successfully');
    expect(res.body.data.name).toBe('Personal');
    expect(res.body.data.slug).toBe('personal');
  });

  it('should delete folder', async () => {
    const res = await request(app)
      .delete('/api/v1/folders/personal')
      .set('Authorization', authHeader);

    expect(res.status).toBe(204);
  });
});
