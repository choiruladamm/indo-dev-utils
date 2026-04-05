---
description: Run tests for a specific module (auto exit, no watch mode)
agent: build
---

Run tests for module: `$ARGUMENTS`

IMPORTANT: Always use `test:run` (not `test`) to avoid watch mode hang.

Execute:

```bash
pnpm --filter @indodev/toolkit test:run src/$ARGUMENTS
```

Report:

- Pass/fail count
- Coverage for that module
- Any failing test cases with suggestions

Note: `test:run` = `vitest run` (exit after completion), `test` = `vitest` (watch mode)
