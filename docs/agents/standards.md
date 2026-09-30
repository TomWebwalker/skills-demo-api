---
scope: changed-lines
---

# Standards

The reviewer holds every change to these. The builder never reads this file.

- **A1** `judgment` — Routes stay thin: data rules live in `src/store.js`, routes only
  parse input and shape the response. *Why: the store is what the tests isolate.*
- **A2** `mechanical` — Errors return `{ error: string }` with a 4xx status, never a bare
  string or HTML. *Why: the UI shows `error` directly.*
- **A3** `judgment` — Query parameters are validated; a bad value is a 400, not a silent
  default. *Why: silent defaults hide client bugs.*
- **A4** `mechanical` — ES modules and named exports only. *Why: one module style.*
- **A5** `judgment` — Nothing mutates the seed arrays from outside the store; readers get
  a copy. *Why: a caller reversing the log in place would corrupt it.*
