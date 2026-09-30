import { createSeed } from './seed.js';

export const STATUSES = ['todo', 'in-progress', 'done'];

const ACTIONS = { status: 'status-changed', assigneeId: 'assigned', title: 'renamed' };

// In-memory store. `clock` returns the current Date, so tests can control time.
export function createStore({ clock = () => new Date() } = {}) {
  const { users, tasks, activity } = createSeed();
  let nextEventId = activity.length + 1;

  function updateTask(id, changes, actorId = 'u1') {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;

    for (const field of Object.keys(ACTIONS)) {
      if (!(field in changes) || changes[field] === task[field]) continue;
      activity.push({
        id: `a${nextEventId++}`,
        taskId: id,
        actorId,
        action: ACTIONS[field],
        from: task[field],
        to: changes[field],
        at: clock().toISOString(),
      });
      task[field] = changes[field];
    }
    return task;
  }

  return { users, tasks, activity, updateTask };
}
