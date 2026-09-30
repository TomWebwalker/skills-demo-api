# angular-jam-demo-api

Demo backend for the Angular Jam talk "Codifying the Developer Lifecycle": a tiny in-memory task board API (tasks, users, and an activity log) that the Angular frontend in `angular-jam-demo-web` talks to. Data lives in memory on purpose — restarting the server resets everything to the seed in `src/seed.js`.

## Routes

| Method | Path              | Returns                                                                 |
|--------|-------------------|-------------------------------------------------------------------------|
| GET    | `/api/tasks`      | `Task[]`                                                                |
| PATCH  | `/api/tasks/:id`  | updated `Task`; body: `status`, `assigneeId`, `title`, `actorId` (default `u1`). 404 unknown id, 400 invalid status. Records one activity event per changed field. |
| GET    | `/api/users`      | `User[]`                                                                |
| GET    | `/api/activity`   | **not implemented yet** — 404 (see below)                               |

## Run

```sh
npm install
npm start      # http://localhost:3000 (override with PORT)
npm test
```

## The missing feature

`GET /api/activity` is intentionally missing — it is [issue #42](./ISSUE-42.md). The API already records activity, but nothing reads it yet. Its tests are already written in `test/activity.test.js`, so `npm test` reports **4 failing tests by design** (6 pass, 4 fail) until the route is implemented.
