# AGENTS.md — Project Conventions & Learnings

## Project Overview

`@indodev/toolkit` — Zero-dependency TypeScript utility library for Indonesian developers. Monorepo (pnpm workspaces) with `packages/toolkit/` (main library) and `docs/` (Next.js + Nextra).

## Core Mandates (from `.gemini/rules/`)

### 1. Data Independence

- **FORBIDDEN**: Bank lists, SWIFT codes, regional data, tax rates, PTKP, holiday lists
- **ACCEPTED**: Pure algorithms (NIK, NPWP, Currency to Words, etc.) that remain valid 5+ years without updates
- Static constants (month names, day names) are OK — they don't change

### 2. Pure Functions

- Input → Output only. No side effects
- No `console.log`, API calls, global state mutations

### 3. Surgical Changes

- Minimal, targeted updates only
- Don't refactor unrelated code

### 4. Early Returns

- Flat logic, max nesting 2 levels

## Tech Stack & Conventions

| Aspect     | Rule                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| TypeScript | Strict mode, prefer `unknown` over `any`                                      |
| Testing    | Vitest, >90% coverage mandatory                                               |
| JSDoc      | **MANDATORY** for every public function (desc, params, return, @example)      |
| Naming     | Modules `kebab-case`, Functions `camelCase`, Types `PascalCase`               |
| Docs       | Update `docs/` with MDX for every change                                      |
| Changelog  | Record in `changelog.mdx` for every change                                    |
| Test cases | Cover: Happy Path, Error Cases, Edge Cases (empty, null, undefined, boundary) |

## Module Structure

```
src/{module}/
├── index.ts          # Barrel exports
├── {feature}.ts      # Implementation
├── types.ts          # TypeScript interfaces + custom error classes
├── constants.ts      # Static constants (if needed)
├── utils.ts          # Internal helpers
└── __tests__/
    └── {feature}.test.ts
```

## Custom Error Classes

- Define in `types.ts` (NOT separate `errors.ts`)
- Extend standard `Error` class
- Example: `export class InvalidSplitError extends Error { ... }`

## PRD Process

- PRDs live in `packages/toolkit/prd/`
- Must follow minimum requirements (7 sections: Document Info, Executive Summary, Functional Requirements, Non-Functional Requirements, Module Structure, Error Handling Strategy, Testing Strategy)
- Every function needs: signature, defaults, rules, edge cases, error handling
- Use `/suggest-tags` command to generate commit/tag suggestions

## Git Conventions

- Branch: `{type}/{module}` — types: feat, fix, refactor, chore
- Commit: conventional commits, lowercase only, bullets use `-`
- Tags: `v{semver}` (e.g., `v0.3.5`)
- Version bump: patch = fix/enhancement, minor = new module, major = breaking API

## Quality Gates (run before every commit)

```bash
pnpm --filter @indodev/toolkit test:run
pnpm --filter @indodev/toolkit typecheck
pnpm --filter @indodev/toolkit lint:fix
pnpm --filter @indodev/toolkit build
```

## Private Files

- `packages/toolkit/prd/` is gitignored (private docs)
- Uncomment in `.gitignore` to track locally

## Common Pitfalls to Avoid

| Pitfall                       | Fix                                                       |
| ----------------------------- | --------------------------------------------------------- |
| Missing default values in PRD | Always specify `default = 'X'`                            |
| Inconsistent error handling   | Define per-function in Error Handling table               |
| Vague range boundaries        | Specify "inclusive" or "exclusive"                        |
| Custom error undefined        | Define in `types.ts`, extend `Error`                      |
| Using `toLocaleString`        | Use internal formatting for consistency                   |
| Hardcoded regulatory data     | Remove defaults, require explicit params                  |
| Negative format inconsistency | Always place sign before currency symbol: `-Rp 1.500.000` |
