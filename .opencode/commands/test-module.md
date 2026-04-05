---
description: Run tests for a specific module
agent: build
---

Run tests for a specific module: `$ARGUMENTS`

Execute:

```bash
pnpm --filter @indodev/toolkit test:run src/$ARGUMENTS
```

Report:

- Pass/fail count
- Coverage for that module
- Any failing test cases with suggestions
