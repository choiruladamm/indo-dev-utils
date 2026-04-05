---
name: release
description: Complete workflow for developing and releasing modules in @indodev/toolkit
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---

## Complete End-to-End Workflow

```
Phase 0: PRD Review → Phase 1-4: Implementation (TDD) → Phase 5: Quality Gate → Phase 6: Docs → Phase 7: Pre-Release → Phase 8: Release
```

---

## When to Use Me

Use this skill when:

- Starting new module implementation
- Preparing for release
- Need complete workflow guidance

---

## Phase 0: PRD Review

**Prerequisites**:

- PRD file exists: `packages/toolkit/prd/v{X.Y.Z}_{MODULE}.md`
- PRD has been reviewed by @prd-reviewer or manual review

**Checklist**:

- [ ] 7 required sections present
- [ ] Per-function specs complete (signature, defaults, validation, edge cases, errors)
- [ ] Bundle size target specified
- [ ] No hardcoded regulatory data
- [ ] Error classes defined

---

## Phase 1-4: Implementation (TDD Approach)

### For Each Phase:

**Step 1: Write Tests (Red)**

```bash
touch src/{module}/__tests__/{feature}.test.ts
```

**Step 2: Implement Function (Green)**

```bash
touch src/{module}/{feature}.ts
```

Requirements:

- Pure functions only
- Input validation
- JSDoc comments with examples
- Error handling per PRD

**Step 3: Update Exports**

- `src/{module}/index.ts`
- `src/index.ts` (main export)
- `tsup.config.ts` (if new subpath)

**Step 4: Run Tests**

```bash
# CRITICAL: Use test:run, NEVER test (watch mode hangs!)
pnpm --filter @indodev/toolkit test:run src/{module}/__tests__
```

**Must pass before next phase.**

---

## Phase 5: Quality Gate

Run all quality checks:

```bash
# 1. Test Suite
pnpm --filter @indodev/toolkit test:run

# 2. TypeScript Check
pnpm --filter @indodev/toolkit typecheck

# 3. Linting
pnpm --filter @indodev/toolkit lint:fix

# 4. Build
pnpm --filter @indodev/toolkit build
```

### Quality Gate Checklist

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build successful
- [ ] Bundle size acceptable (<4KB target)

**All must pass before proceeding.**

---

## Phase 6: Documentation Update ⭐

### 6.1 JSDoc in Source

Already done during implementation. Ensure all exports have:

- Description
- @param tags
- @returns
- @example with code

### 6.2 Update CHANGELOG.md (Root)

**Location**: `CHANGELOG.md`

```markdown
## [0.X.0] - YYYY-MM-DD

### Added

- **{Module} Module**: Description
  - `functionName()`: What it does
  - `functionName2()`: What it does
```

### 6.3 ⭐ Create API Docs (Docs Website)

**Location**: Choose appropriate category:

- Identity: `docs/src/content/identity/{module}/`
- Contact: `docs/src/content/contact/{module}/`
- Vehicles: `docs/src/content/vehicles/{module}/`
- Utilities: `docs/src/content/utilities/{module}/`

**CRITICAL**: This is required for website documentation!

**Folder Structure**:

```
docs/src/content/{category}/{module}/
├── _meta.js
└── index.mdx
```

Structure:

1. Frontmatter (title, description)
2. Overview (features, why this module)
3. Installation (Tabs for npm/pnpm/yarn/bun)
4. Quick Start
5. API Reference (per function):
   - Type Signature
   - Parameters table
   - Returns
   - Examples
   - Use Cases
6. Type Reference
7. Common Use Cases
8. Best Practices
9. Troubleshooting

**Template**: See `docs/src/content/identity/nik/index.mdx` or `utilities/currency/index.mdx`

### 6.4 Update Website Changelog

**Location**: `docs/src/content/changelog.mdx`

Mirror root CHANGELOG with Nextra formatting.

### 6.5 Update README.md (If New Module)

Add to feature list and include quick example.

### 6.6 Update Navigation/Sidebar

**Files to update**:

- `docs/src/content/_meta.js` - Add new category (if new category)
- `docs/src/content/{category}/_meta.js` - Add module to category

**⚠️ NO nested `_meta.js` in module subfolders** if only `index.mdx` exists (single-page modules). This prevents double dropdown nesting in sidebar.

Only create `_meta.js` in subfolder if it contains **multiple pages** (e.g., `identity/nik.mdx` + `identity/npwp.mdx`).

### 6.7 Update Website Pages

**Files to update**:

- `docs/src/content/index.mdx` - Update stats, module count, add to table
- `docs/src/content/get-started.mdx` - Add examples, update API links

### 6.8 Update Banner

**File**: `docs/src/app/layout.jsx`

Update the `<Banner>` component with new version info.

---

## Phase 7: Pre-Release Verification

### 7.1 Final Quality Gate

Re-run all checks from Phase 5.

### 7.2 Build Docs Website

```bash
cd docs && pnpm build
```

Must complete without errors.

### 7.3 Export Conflict Check

```bash
# Check for duplicate exports
grep -n "export {" packages/toolkit/src/index.ts
```

Use aliases if conflicts: `getAge as getAgeFromDate`

### 7.4 Verify All Files Modified

```bash
git status
```

Should show:

- src/{module}/\*\* (new/modified)
- src/index.ts (exports)
- tsup.config.ts (if subpath)
- package.json (if exports added)
- CHANGELOG.md (updated)
- docs/src/content/{category}/{module}/index.mdx ⭐ (new)
- docs/src/content/{category}/{module}/\_meta.js ⭐ (new)
- docs/src/content/{category}/\_meta.js (updated)
- docs/src/content/\_meta.js (updated)
- docs/src/content/index.mdx (updated)
- docs/src/content/get-started.mdx (updated)
- docs/src/content/changelog.mdx (updated)
- docs/src/app/layout.jsx (banner updated)

---

## Phase 8: Release

### Step 1: Determine Version Bump

Analyze changes:

```bash
git describe --tags --abbrev=0
git log --oneline $(git describe --tags --abbrev=0)..HEAD
```

Rules:

- **patch** (0.3.4 → 0.3.5): Bug fixes, minor enhancements
- **minor** (0.3.4 → 0.4.0): New modules, features
- **major** (0.3.4 → 1.0.0): Breaking API changes

### Step 2: Commit Changes

```bash
git add -A
git commit -m "feat: add {module} module v{X.Y.Z}

- Add {feature1} for ...
- Add {feature2} for ...
- Include comprehensive tests (100% coverage)
- Add API documentation

Closes #{issue_number}"
```

### Step 3: Create Tag

```bash
git tag v{X.Y.Z}
git push origin v{X.Y.Z}
```

### Step 4: Publish

```bash
cd packages/toolkit
pnpm build
pnpm test:run
npm publish --access public
```

---

## ⚠️ Critical Reminders

1. **⭐ Docs Website**: Always create `docs/src/content/{module}/index.mdx` and `_meta.js`
2. **⚠️ Test Command**: Use `test:run`, never `test` (watch mode hangs)
3. **📦 Bundle Size**: Target <4KB per module
4. **🔍 Export Conflicts**: Check src/index.ts for duplicate names
5. **✅ Quality Gate**: All checks must pass before release

6. **📚 API Docs**: Follow existing format (identity/nik/index.mdx, utilities/currency/index.mdx)

7. **🎯 Banner**: Update `docs/src/app/layout.jsx` banner component

---

## Quick Commands

```bash
# Quality gate
/quality-gate

# Test module
pnpm --filter @indodev/toolkit test:run src/{module}/__tests__

# Build docs
cd docs && pnpm build

# Check bundle size
ls -lh packages/toolkit/dist/{module}/
```

---

## Questions to Ask

- What version bump is appropriate?
- Are there breaking API changes?
- Is the documentation complete (including docs website)?
- Has the quality gate passed?
- What is the bundle size?

---

## References

- Full workflow: `.opencode/rules/workflow.md`
- Module guidelines: `guide/MODULE_GUIDELINES.md`
- Identity docs: `docs/src/content/identity/`
- Contact docs: `docs/src/content/contact/`
- Vehicles docs: `docs/src/content/vehicles/`
- Utilities docs: `docs/src/content/utilities/`
- PRD examples: `packages/toolkit/prd/`
