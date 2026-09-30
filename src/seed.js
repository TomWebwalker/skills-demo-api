// The known starting state. Restarting the server resets to this.
export function createSeed() {
  return {
    users: [
      { id: 'u1', name: 'Ada' },
      { id: 'u2', name: 'Linus' },
      { id: 'u3', name: 'Grace' },
    ],
    tasks: [
      { id: 't1', title: 'Draft the talk outline', status: 'done', assigneeId: 'u1' },
      { id: 't2', title: 'Record the backup video', status: 'done', assigneeId: 'u3' },
      { id: 't3', title: 'Wire up the task board', status: 'in-progress', assigneeId: 'u2' },
      { id: 't4', title: 'Polish the slide deck', status: 'in-progress', assigneeId: 'u1' },
      { id: 't5', title: 'Test the venue projector', status: 'todo', assigneeId: null },
      { id: 't6', title: 'Show the activity feed', status: 'todo', assigneeId: 'u3' },
    ],
    // Oldest first, in the order it happened.
    activity: [
      { id: 'a1', taskId: 't1', actorId: 'u1', action: 'status-changed', from: 'in-progress', to: 'done', at: '2026-09-29T09:00:00.000Z' },
      { id: 'a2', taskId: 't3', actorId: 'u2', action: 'assigned', from: null, to: 'u2', at: '2026-09-29T09:15:00.000Z' },
      { id: 'a3', taskId: 't4', actorId: 'u1', action: 'renamed', from: 'Slides', to: 'Polish the slide deck', at: '2026-09-29T09:30:00.000Z' },
      { id: 'a4', taskId: 't2', actorId: 'u3', action: 'status-changed', from: 'in-progress', to: 'done', at: '2026-09-29T09:45:00.000Z' },
    ],
  };
}
