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

## Angular Jam demo runbook

| Branch | What it is |
|---|---|
| `main` | The **before** state for the live demo: `/api/activity` is a 404, 4 of 10 tests fail by design. Don't merge anything into it before the talk. |
| `feat/42-activity-feed` (PR #2) | The finished **rehearsal** run of delivery-skills 1.1 — the backup if the live run stalls. Never merge. |

Live flow: `npm start` here (port 3000, the web app needs it), then in this repo:

1. `/setup-project-skills` — writes `docs/agents/`, `CLAUDE.md`, the `verify-api` skill and its harness.
2. `/loop 42` — answer the grill questions, let it run until green and clean (the rehearsal took 2 cycles).
3. Say yes to `/finalize-feature` — it opens a PR.

Restarting the server resets the in-memory data to the seed.
