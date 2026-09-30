// Issue #42 — written before the feature exists. These fail until GET /api/activity lands.
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

// A clock that moves forward one minute on every call.
function tickingClock(start = '2030-01-01T12:00:00.000Z') {
  let now = new Date(start).getTime();
  return () => new Date((now += 60_000));
}

describe('GET /api/activity (#42)', () => {
  it('returns the activity log', async () => {
    const app = createApp();
    const res = await request(app).get('/api/activity');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(app.locals.store.activity.length);
  });

  it('returns events newest first', async () => {
    const app = createApp({ clock: tickingClock() });
    await request(app).patch('/api/tasks/t5').send({ status: 'in-progress' });
    await request(app).patch('/api/tasks/t6').send({ status: 'in-progress' });

    const res = await request(app).get('/api/activity');

    expect(res.status).toBe(200);
    const times = res.body.map((e) => e.at);
    expect(times).toEqual([...times].sort().reverse());
    expect(res.body[0].taskId).toBe('t6');
  });

  it('?limit=2 returns only the 2 newest events', async () => {
    const app = createApp();
    const newest = [...app.locals.store.activity].reverse().slice(0, 2);

    const res = await request(app).get('/api/activity?limit=2');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(newest);
  });

  it('shows a PATCH as the newest event', async () => {
    const app = createApp({ clock: tickingClock() });
    await request(app).patch('/api/tasks/t5').send({ assigneeId: 'u3', actorId: 'u2' });

    const res = await request(app).get('/api/activity');

    expect(res.status).toBe(200);
    expect(res.body[0]).toMatchObject({
      taskId: 't5',
      actorId: 'u2',
      action: 'assigned',
      from: null,
      to: 'u3',
    });
  });
});
