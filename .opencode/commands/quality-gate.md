---
description: Run all quality gates (test, typecheck, lint, build)
agent: build
---

Run all quality gates before committing.

Execute the following commands in order:

```bash
pnpm --filter @indodev/toolkit test:run
pnpm --filter @indodev/toolkit typecheck
pnpm --filter @indodev/toolkit lint:fix
pnpm --filter @indodev/toolkit build
```

Report any failures and suggest fixes.Focus on:

- Test failures: Show which tests failed and why
- Type errors: Missing types, incorrect types
- Lint errors: Code style issues
- Build errors: Compilation problems
