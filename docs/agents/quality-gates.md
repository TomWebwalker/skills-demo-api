---
commit:
  convention: conventional
  ticket_ref: footer
  coauthor_line: 'Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>'
  validator: ''
  rules: 'header <= 72 chars, imperative; reference the ticket as "Refs: #42" in the footer'
gates:
  - { name: test, cmd: 'stack.commands.test' }
dup_check:
  enabled: false
  cmd: ''
  scope: changed-files
app_verify:
  enabled: true
  skill: verify-api
loop:
  max_cycles: 5
  builder_agent: builder
  checker_agent: checker
  reviewer_agent: reviewer
  models: { builder: sonnet, checker: haiku, reviewer: opus }
  on_exhausted: stop-and-report
---

# Quality gates

No CI yet, so the gates are what the repo scripts: `npm test`. There is no lint or build
step. `verify-api` runs last and drives the real server with `curl`.
