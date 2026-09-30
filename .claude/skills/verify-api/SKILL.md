---
name: verify-api
description: Verify the API end to end — start it, curl the endpoints the current branch touches, try to break them with hostile input, and save evidence. Run as the last gate of /verify-feature.
---

**Load config first.** Read `docs/agents/stack.md` and `docs/agents/vcs.md`. This skill checks
the running server; the unit gates already ran. **Never edit code** — report, don't fix.

## Evidence directory

```bash
repo=$(basename "$(git rev-parse --show-toplevel)")
branch=$(git branch --show-current | tr '/' '-')
run="${TMPDIR:-/tmp}/delivery-skills/$repo/$branch/app-verify/$(date +%Y%m%dT%H%M%S)"
mkdir -p "$run"
```

## Steps

1. **Scope.** `git diff --name-only main...HEAD`; map changed files to the routes they serve.
2. **Start.** `PORT=3100 npm start > "$run/server.log" 2>&1 &` (a spare port, so a dev server on
   3000 doesn't collide). Wait for readiness: retry `curl -sf localhost:3100/api/users` for up
   to 30 s. If it never answers, report `FAILED` with the last 40 lines of `server.log`.
3. **Drive** each scoped route with `curl -sS -i`, appending request and response to
   `$run/transcript.txt`. Check status code and response shape (fields, order, count).
4. **Try to break it**, only on inputs the change accepts: query values `0`, `-1`, `abc`,
   `1.5`, `999999`, empty (`?limit=`), and repeated (`?limit=1&limit=2`); an empty log and a
   log far larger than any limit (PATCH a task 50 times first). A 5xx or a crash is a
   failure; a clear 400 `{ error }` is a pass.
5. **Tear down** the server this skill started.
6. **Write `$run/index.md`** — one line per check (route, input, result, evidence), then report.

## Report format

```
ALL GREEN
evidence: <run dir>
```

```
FAILED
<route> - <what broke, with the real response> - app_verify
evidence: <run dir>
```
