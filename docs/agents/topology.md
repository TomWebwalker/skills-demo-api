---
role: backend
companion:
  kind: ui
  path: ../angular-jam-demo-web
  url: https://github.com/TomWebwalker/angular-jam-demo-web
---

# Topology

This repo is the API. The Angular UI lives in `../angular-jam-demo-web` and calls `/api/*`
through its dev proxy. Shared shapes are in that repo's `src/app/core/models.ts`.
