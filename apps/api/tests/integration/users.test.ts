import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { createTestUser, deleteTestUser } from './test-helper.js';
import { nanoid } from 'nanoid';

const app = createApp();

describe('Users Integration Tests', () => {
  let user: any;
  let authHeader: string;

  beforeAll(async () => {
    const email = `user-test-${nanoid().toLowerCase()}@example.com`;
    const res = await createTestUser(email);
    user = res.user;
    authHeader = res.authHeader;
  });

  afterAll(async () => {
    if (user) {
      await deleteTestUser(user.id);
    }
  });

  it('should update user profile details successfully', async () => {
    const res = await request(app)
      .patch('/api/v1/users/profile')
      .set('Authorization', authHeader)
      .send({
        fullName: 'Jane Doe Integration',
        removeAvatar: 'true',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Profile updated successfully');
    expect(res.body.data.fullName).toBe('Jane Doe Integration');
    expect(res.body.data.avatarUrl).toBeNull();
  });
});
