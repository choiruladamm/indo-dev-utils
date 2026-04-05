---
description: Generate commit and tag suggestions based on changes
agent: build
---

Analyze current changes and suggest commit message and version tag.

Run:

```bash
git status
git diff --stat
git log --oneline -5
```

Based on changes:

1. **Commit message**: Follow conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
2. **Version bump**:
   - `patch`: Bug fixes, enhancements (0.3.4 → 0.3.5)
   - `minor`: New module, new feature (0.3.4 → 0.4.0)
   - `major`: Breaking API change (0.3.4 → 1.0.0)
3. **Tag format**: `v{semver}` (e.g., `v0.3.5`)

Output:

- Suggested commit message
- Suggested version bump
- Suggested tag
