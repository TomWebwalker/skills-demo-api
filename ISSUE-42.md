# Issue #42 — the activity feed

> The backend half lives in this repo (`angular-jam-demo-api`). The frontend half (criteria 03–05) lives in `angular-jam-demo-web`.

## Acceptance criteria

| #  | Criterion                                        | Side     |
|----|--------------------------------------------------|----------|
| 01 | GET /api/activity returns the log, newest first  | backend  |
| 02 | ?limit=n caps the result                         | backend  |
| 03 | ActivityStore exposes events, loading, isEmpty   | frontend |
| 04 | One list item per event, naming actor and task   | frontend |
| 05 | Empty log renders "No activity yet"              | frontend |

"Written as tests before the feature exists — the checker's definition of done."
