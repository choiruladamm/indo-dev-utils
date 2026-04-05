# End-to-End Workflow: PRD to Release

Complete workflow for developing and releasing modules in @indodev/toolkit.

---

## 📋 Overview

```
PRD Creation → PRD Review → Implementation → Quality Gate → Docs Update → Release
```

---

## Phase 0: Planning & PRD

### 0.1 Create PRD

**Location**: `packages/toolkit/prd/v{X.Y.Z}_{MODULE_NAME}.md`

**Required Sections** (7 total):

1. Document Info (title, version, status, date)
2. Executive Summary (problem, solution, success criteria)
3. Functional Requirements (per-function specs)
4. Non-Functional Requirements (performance, bundle size)
5. Module Structure (file organization)
6. Error Handling Strategy (error classes, messages)
7. Testing Strategy (test cases, coverage target)

**Per-Function Checklist**:

- [ ] Signature with types
- [ ] Default values specified
- [ ] Validation rules
- [ ] Edge cases documented
- [ ] Error handling defined

### 0.2 PRD Review

Use `@prd-reviewer` agent or manual review:

```bash
# Check PRD completeness
cat packages/toolkit/prd/v0.4.0_DATETIME_UTILITIES.md | grep -E "^## [0-9]"
```

**Review Criteria**:

- All 7 sections present
- No hardcoded regulatory data
- Bundle size target specified
- Error classes defined

### 0.3 Planning

Break implementation into phases:

```
Phase 1: Foundation (types, constants, utilities)
Phase 2: Core Functions (parse, format)
Phase 3: Advanced Features (relative time, calculations)
Phase 4: Final (timezone, integration tests)
```

---

## Phase 1-4: Implementation (TDD)

### For Each Phase:

#### 1. Write Tests First (Red)

```bash
# Create test file
touch src/{module}/__tests__/{feature}.test.ts
```

**Test Structure**:

```typescript
describe('functionName', () => {
  describe('valid inputs', () => {
    /* happy path */
  });
  describe('invalid inputs', () => {
    /* error cases */
  });
  describe('edge cases', () => {
    /* boundaries */
  });
});
```

#### 2. Implement Function (Green)

```bash
# Create implementation
touch src/{module}/{feature}.ts
```

**Requirements**:

- Pure functions only
- Input validation
- JSDoc comments
- Error handling per PRD

#### 3. Update Exports

```typescript
// src/{module}/index.ts
export { functionName } from './feature';

// src/index.ts (main export)
export { functionName } from './{module}';
```

#### 4. Run Tests

```bash
# CRITICAL: Use test:run (not test) to avoid watch mode hang
pnpm --filter @indodev/toolkit test:run src/{module}/__tests__
```

**Must Pass Before Next Phase**

---

## Phase 5: Quality Gate

Run all quality checks:

```bash
# Test Suite
pnpm --filter @indodev/toolkit test:run

# TypeScript Check
pnpm --filter @indodev/toolkit typecheck

# Linting
pnpm --filter @indodev/toolkit lint:fix

# Build
pnpm --filter @indodev/toolkit build
```

### Quality Gate Checklist

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build successful
- [ ] Bundle size acceptable

### Bundle Size Check

```bash
# Check bundle size
ls -lh packages/toolkit/dist/{module}/index.js

# Target: <4KB per module (document if exceeded)
```

---

## Phase 6: Documentation Update

### 6.1 JSDoc in Source (Done during implementation)

Ensure all exports have JSDoc with:

- Description
- @param tags
- @returns
- @example
- @see (if applicable)

### 6.2 Update CHANGELOG.md (Root)

**Location**: `CHANGELOG.md`

```markdown
## [0.X.0] - YYYY-MM-DD

### Added

- **{Module} Module**: New module for ...
  - `functionName()`: Description
  - `functionName2()`: Description

### Changed

- ...

### Fixed

- ...
```

### 6.3 ⭐ Create API Docs (Docs Website)

**Location**: Depends on module category:

- **Identity**: `docs/src/content/identity/{module}/index.mdx`
- **Contact**: `docs/src/content/contact/{module}/index.mdx`
- **Vehicles**: `docs/src/content/vehicles/{module}/index.mdx`
- **Utilities**: `docs/src/content/utilities/{module}/index.mdx`

**⚠️ Important**: Place API docs in the appropriate category folder. Each module folder must contain:

- `index.mdx` - Main documentation file
- `_meta.js` - Folder metadata

**Template Structure**:

````mdx
---
title: { ModuleName }
description: Brief description of module
---

import { Callout, Tabs, Steps } from 'nextra/components';

# {ModuleName}

## Overview

### Features

- Feature 1
- Feature 2

## Installation

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
  <Tabs.Tab>```bash npm install @indodev/toolkit ```</Tabs.Tab>
  ...
</Tabs>

## Quick Start

```typescript
import { functionName } from '@indodev/toolkit/{module}';

functionName('input'); // 'output'
```
````

## API Reference

### functionName()

**Type Signature:**

```typescript
function functionName(param: Type): ReturnType;
```

**Parameters:**

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| `param` | `Type` | Description |

**Returns:**

`ReturnType` - Description

**Examples:**

```typescript
// Example code
```

**Use Cases:**

```typescript
// Real-world usage
```

---

## Type Reference

### TypeName

```typescript
interface TypeName {
  property: type;
}
```

---

## Common Use Cases

### Use Case Name

```typescript
// Example code
```

---

## Best Practices

### Practice Name

```typescript
// ✅ Good
// ❌ Bad
```

---

## Troubleshooting

**Q: Question?**

A: Answer with example.

````

### 6.4 Update Website Changelog
**Location**: `docs/src/content/changelog.mdx`

Mirror the root CHANGELOG but formatted for Nextra.

### 6.5 Update README.md (Root)
If new module:
- Add to feature list
- Add installation example
- Add quick usage example

### 6.6 Update Navigation/Sidebar ⭐
**Files to update**:
- `docs/src/content/_meta.js` - Add new category
- `docs/src/content/{module}/_meta.js` - Create folder metadata

**⚠️ Important**:
1. If adding a new category folder to `_meta.js`, ensure the folder contains at least one `.mdx` file (e.g., `index.mdx`). Nextra will fail if the folder only has `_meta.js` without actual content files.
2. API docs are placed in `docs/src/content/{category}/{module}/index.mdx` (e.g., `utilities/datetime/index.mdx`).
3. **NO nested `_meta.js`** in module subfolders if only `index.mdx` exists (single page). This prevents double dropdown nesting.
4. Create the folder structure:
   ```
   docs/src/content/{category}/
   ├── _meta.js              ← Define all modules in this category
   ├── {module-1}/
   │   └── index.mdx         ← NO _meta.js for single-page modules
   ├── {module-2}/
   │   └── index.mdx
   └── ...
   ```
5. Only create `_meta.js` in subfolder if it contains **multiple pages** (e.g., `identity/nik.mdx` + `identity/npwp.mdx`)

### 6.7 Update Website Pages ⭐
**Files to update**:
- `docs/src/content/index.mdx` - Update stats, module count, add to table
- `docs/src/content/get-started.mdx` - Add examples, update API links

### 6.8 Update Banner ⭐
**File**: `docs/src/app/layout.jsx`

Update the `<Banner>` component with new version info:
```jsx
<Banner storageKey="v{X.Y.Z}">
  v{X.Y.Z} released — Brief description of main changes.{' '}
  <a href="/docs/changelog" style={{ textDecoration: 'underline' }}>
    Read changelog
  </a>
</Banner>
```

---

## Phase 7: Pre-Release Verification

### 7.1 Final Quality Gate
Re-run all checks:
```bash
pnpm --filter @indodev/toolkit test:run
pnpm --filter @indodev/toolkit typecheck
pnpm --filter @indodev/toolkit lint:fix
pnpm --filter @indodev/toolkit build
````

### 7.2 Build Docs Website

```bash
# Build docs to verify no errors
cd docs
pnpm build
```

### 7.3 Export Conflict Check

```bash
# Check for duplicate exports
grep -n "export {" packages/toolkit/src/index.ts | grep -E "(getAge|validate)"
```

### 7.4 Check All Files Modified

```bash
git status
# Should show:
# - src/{module}/** (new/modified)
# - src/index.ts (updated exports)
# - tsup.config.ts (if new subpath)
# - package.json (if new exports)
# - CHANGELOG.md (updated)
# - docs/src/content/_meta.js (updated navigation)
# - docs/src/content/{module}/index.mdx (new)
# - docs/src/content/{module}/_meta.js (new)
# - docs/src/content/changelog.mdx (updated)
# - docs/src/content/index.mdx (updated)
# - docs/src/content/get-started.mdx (updated)
```

---

## Phase 8: Release

### 8.1 Determine Version Bump

- **patch** (0.3.4 → 0.3.5): Bug fixes, minor enhancements
- **minor** (0.3.4 → 0.4.0): New modules, features
- **major** (0.3.4 → 1.0.0): Breaking API changes

### 8.2 Commit Changes

```bash
git add -A
git commit -m "feat: add {module} module v{X.Y.Z}

- Add {feature1} for ...
- Add {feature2} for ...
- Include comprehensive tests (100% coverage)
- Add API documentation

Closes #{issue_number}"
```

### 8.3 Create Tag

```bash
git tag v{X.Y.Z}
git push origin v{X.Y.Z}
```

### 8.4 Publish (Manual or CI/CD)

```bash
cd packages/toolkit
pnpm build
pnpm test:run
npm publish --access public
```

---

## 📁 File Checklist

### Source Files

- [ ] `src/{module}/types.ts`
- [ ] `src/{module}/constants.ts`
- [ ] `src/{module}/{feature}.ts` (one per feature)
- [ ] `src/{module}/index.ts`
- [ ] `src/{module}/__tests__/{feature}.test.ts`
- [ ] `src/{module}/__tests__/{module}-integration.test.ts`

### Main Exports

- [ ] `src/index.ts` (updated)
- [ ] `tsup.config.ts` (if new subpath)
- [ ] `package.json` (if new exports)

### Documentation

**Note**: Place module docs in appropriate category folder:

- Identity modules: `docs/src/content/identity/{module}/`
- Contact modules: `docs/src/content/contact/{module}/`
- Vehicle modules: `docs/src/content/vehicles/{module}/`
- Utility modules: `docs/src/content/utilities/{module}/`

- [ ] `CHANGELOG.md` (root)
- [ ] `docs/src/content/{category}/{module}/index.mdx` ⭐
- [ ] `docs/src/content/{category}/_meta.js` (updated)
- [ ] **NO** `docs/src/content/{category}/{module}/_meta.js` (for single-page modules)
- [ ] `docs/src/content/changelog.mdx` ⭐
- [ ] `docs/src/content/index.mdx` (updated)
- [ ] `docs/src/content/get-started.mdx` (updated)
- [ ] `docs/src/content/_meta.js` (updated)
- [ ] `docs/src/app/layout.jsx` (banner updated) ⭐
- [ ] `README.md` (if major feature)

### PRD

- [ ] `packages/toolkit/prd/v{X.Y.Z}_{MODULE}.md`

---

## ⚠️ Critical Reminders

1. **Always use `pnpm test:run`**, never `pnpm test` (watch mode hangs)

2. **Bundle Size**: Target <4KB per module. Document in PRD if exceeded.

3. **Export Conflicts**: Check `src/index.ts` for duplicate names, use aliases if needed.

4. **Docs Website**: Don't forget `docs/src/content/{module}/index.mdx` and `_meta.js` ⭐

5. **Error Classes**: Must extend Error with `readonly code` property.

6. **Pure Functions**: No side effects, no external data.

7. **Test Coverage**: Minimum 95%, target 100%.

8. **Banner**: Update `docs/src/app/layout.jsx` banner for every release.

---

## 🔧 Quick Commands

```bash
# Run quality gate
pnpm --filter @indodev/toolkit test:run
pnpm --filter @indodev/toolkit typecheck
pnpm --filter @indodev/toolkit lint:fix
pnpm --filter @indodev/toolkit build

# Build docs
cd docs && pnpm build

# Check bundle size
ls -lh packages/toolkit/dist/{module}/

# Test specific module
pnpm --filter @indodev/toolkit test:run src/{module}/__tests__
```

---

## 📚 References

- [MODULE_GUIDELINES.md](../../guide/MODULE_GUIDELINES.md)
- [PHILOSOPHY.md](../../guide/PHILOSOPHY.md)
- [PRD Template](../prd/template.md)
- [Identity Docs](../../../docs/src/content/identity/)
- [Contact Docs](../../../docs/src/content/contact/)
- [Vehicles Docs](../../../docs/src/content/vehicles/)
- [Utilities Docs](../../../docs/src/content/utilities/)

---

**Last Updated**: Generated from datetime module v0.4.0
**Maintainer**: @choiruladamm
