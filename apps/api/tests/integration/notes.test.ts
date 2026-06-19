import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { createTestUser, deleteTestUser } from './test-helper.js';
import { nanoid } from 'nanoid';

const app = createApp();

describe('Notes Integration Tests', () => {
  let user: any;
  let authHeader: string;
  let noteSlug: string;

  beforeAll(async () => {
    const email = `note-test-${nanoid().toLowerCase()}@example.com`;
    const res = await createTestUser(email);
    user = res.user;
    authHeader = res.authHeader;
  });

  afterAll(async () => {
    if (user) {
      await deleteTestUser(user.id);
    }
  });

  it('should create a note successfully', async () => {
    const res = await request(app)
      .post('/api/v1/notes')
      .set('Authorization', authHeader)
      .send({
        title: 'Integration Test Note',
        content: { type: 'doc', content: [] },
        plainText: 'Hello World',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Note created successfully');
    expect(res.body.data.title).toBe('Integration Test Note');
    expect(res.body.data.slug).toBe('integration-test-note');
    noteSlug = res.body.data.slug;
  });

  it('should list notes', async () => {
    const res = await request(app)
      .get('/api/v1/notes')
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].slug).toBe(noteSlug);
  });

  it('should get note by slug', async () => {
    const res = await request(app)
      .get(`/api/v1/notes/${noteSlug}`)
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Integration Test Note');
    expect(res.body.data.plainText).toBe('Hello World');
  });

  it('should toggle favorite status', async () => {
    const favRes = await request(app)
      .patch(`/api/v1/notes/${noteSlug}/favorite`)
      .set('Authorization', authHeader);

    expect(favRes.status).toBe(200);
    expect(favRes.body.data.isFavorite).toBe(true);

    const unfavRes = await request(app)
      .patch(`/api/v1/notes/${noteSlug}/favorite`)
      .set('Authorization', authHeader);

    expect(unfavRes.status).toBe(200);
    expect(unfavRes.body.data.isFavorite).toBe(false);
  });

  it('should archive note', async () => {
    const res = await request(app)
      .patch(`/api/v1/notes/${noteSlug}/archive`)
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.archivedAt).not.toBeNull();
  });

  it('should unarchive note', async () => {
    const res = await request(app)
      .patch(`/api/v1/notes/${noteSlug}/unarchive`)
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.archivedAt).toBeNull();
  });

  it('should trash note', async () => {
    const res = await request(app)
      .patch(`/api/v1/notes/${noteSlug}/trash`)
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.trashedAt).not.toBeNull();
  });

  it('should restore note', async () => {
    const res = await request(app)
      .patch(`/api/v1/notes/${noteSlug}/restore`)
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.data.trashedAt).toBeNull();
  });

  it('should permanently delete note after trashing it again', async () => {
    // move to trash first
    await request(app)
      .patch(`/api/v1/notes/${noteSlug}/trash`)
      .set('Authorization', authHeader);

    // delete permanently
    const res = await request(app)
      .delete(`/api/v1/notes/${noteSlug}`)
      .set('Authorization', authHeader);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Note deleted successfully');
  });
});
