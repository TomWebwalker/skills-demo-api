import express from 'express';
import { createStore, STATUSES } from './store.js';

// Builds a fresh app with a fresh store, so every test starts from the seed.
export function createApp({ clock } = {}) {
  const store = createStore({ clock });
  const app = express();
  app.use(express.json());
  app.locals.store = store;

  app.get('/api/users', (req, res) => {
    res.json(store.users);
  });

  app.get('/api/tasks', (req, res) => {
    res.json(store.tasks);
  });

  app.patch('/api/tasks/:id', (req, res) => {
    const { actorId = 'u1', ...changes } = req.body ?? {};
    if ('status' in changes && !STATUSES.includes(changes.status)) {
      return res.status(400).json({ error: `Invalid status: ${changes.status}` });
    }
    const task = store.updateTask(req.params.id, changes, actorId);
    if (!task) {
      return res.status(404).json({ error: `Task not found: ${req.params.id}` });
    }
    res.json(task);
  });

  return app;
}
