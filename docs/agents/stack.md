---
language: javascript
framework: express
layout: service
package_manager: npm
source_paths: [src]
qa_mode: api
fix_agent: ''
commands:
  install: npm ci
  dev: npm start
  test: npm test
  lint: ''
  format_check: ''
  typecheck: ''
  build: ''
services: ''
---

# Stack

Express 5 HTTP API, ES modules, no build step. First-party code in `src/`; tests in `test/`
(vitest + supertest). All data is in memory: `createApp()` builds a fresh store from
`src/seed.js`, so a restart or a new test is back at the known seed. Serves on port 3000.

## QA mode

`api` — exercise endpoints with `curl` against `npm start` on http://localhost:3000.
