---
name: release
description: Create consistent releases and changelogs for @indodev/toolkit
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---

## What I Do

- Analyze commits since last release
- Determine version bump (patch/minor/major) per semver
- Generate changelog entry
- Create git tag
- Provide commands for npm publish

## When to Use Me

Use this skill when preparing a tagged release for `@indodev/toolkit`.

## Workflow

### Step 1: Check Current State

```bash
git status
git log --oneline -10
```

Ensure working directory is clean and on correct branch.

### Step 2: Determine Version Bump

Analyze changes since last tag:

```bash
git describe --tags --abbrev=0
git log --oneline $(git describe --tags --abbrev=0)..HEAD
```

Version bump rules:

- **patch**: Bug fixes, enhancements (0.3.4 → 0.3.5)
- **minor**: New modules, features (0.3.4 → 0.4.0)
- **major**: Breaking API changes (0.3.4 → 1.0.0)

### Step 3: Update Changelog

Edit `docs/src/content/changelog.mdx`:

- Add new version header
- List changes categorized as: Features, Fixes, Docs, Refactor
- Follow existing format

### Step 4: Create Tag

```bash
git add docs/src/content/changelog.mdx
git commit -m "chore: release v{version}"git tag v{version}
```

### Step 5: Publish

```bash
cd packages/toolkit
pnpm build
pnpm test:run
npm publish --access public
```

## Questions to Ask

- What version bump is appropriate for these changes?
- Are there breaking API changes?
- Is the documentation updated?
- Has the quality gate passed?
