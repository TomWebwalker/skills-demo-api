import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { createSeed } from '../src/seed.js';

describe('users', () => {
  it('GET /api/users returns the seed', async () => {
    const res = await request(createApp()).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(createSeed().users);
  });
});
