import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { createSeed } from '../src/seed.js';

describe('tasks', () => {
  it('GET /api/tasks returns the seed', async () => {
    const res = await request(createApp()).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(createSeed().tasks);
  });

  it('PATCH /api/tasks/:id updates the status', async () => {
    const res = await request(createApp()).patch('/api/tasks/t5').send({ status: 'in-progress' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 't5', status: 'in-progress' });
  });

  it('PATCH an unknown task returns 404', async () => {
    const res = await request(createApp()).patch('/api/tasks/nope').send({ status: 'done' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
  });

  it('PATCH an invalid status returns 400', async () => {
    const res = await request(createApp()).patch('/api/tasks/t5').send({ status: 'someday' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('PATCH records an activity event', async () => {
    const app = createApp({ clock: () => new Date('2030-01-01T12:00:00.000Z') });
    const { activity } = app.locals.store;
    const before = activity.length;

    await request(app).patch('/api/tasks/t5').send({ status: 'done', actorId: 'u2' });

    expect(activity).toHaveLength(before + 1);
    expect(activity.at(-1)).toMatchObject({
      taskId: 't5',
      actorId: 'u2',
      action: 'status-changed',
      from: 'todo',
      to: 'done',
      at: '2030-01-01T12:00:00.000Z',
    });
  });
});
