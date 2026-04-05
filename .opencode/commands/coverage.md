---
description: Check test coverage for the toolkit package
agent: build
---

Run test coverage and report results.

```bash
pnpm --filter @indodev/toolkit test:coverage
```

Analyze coverage report:

- Identify files/functions below 90% coverage
- Suggest specific test cases to improve coverage
- Focus on uncovered branches and edge cases
