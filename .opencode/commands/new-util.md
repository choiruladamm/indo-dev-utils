---
description: Scaffold a new utility module in packages/toolkit/src/
---

Scaffold a new utility module in `packages/toolkit/src/$ARGUMENTS`.

## STEP 1: SCAFFOLD FILES

Follow the project's architecture:

1. Create directory `packages/toolkit/src/$ARGUMENTS` and `packages/toolkit/src/$ARGUMENTS/__tests__`
2. Create `index.ts` to export public APIs
3. Create `$ARGUMENTS.ts` for core implementation
4. Create `types.ts` for interfaces and custom error classes
5. Create `constants.ts` for static constants (if needed)
6. Create `utils.ts` for internal helpers (if needed)
7. Create `__tests__/$ARGUMENTS.test.ts` with basic test cases

Use strict TypeScript, follow naming conventions (kebab-case for modules, camelCase for functions, PascalCase for types), add JSDoc in English.

## STEP 2: REGISTER MODULE

Update the following registration files:

1. **packages/toolkit/package.json**: Add `"./$ARGUMENTS": { import/require entries }` to `exports`
2. **packages/toolkit/tsup.config.ts**: Add `'$ARGUMENTS/index': 'src/$ARGUMENTS/index.ts'` to `entry`
3. **packages/toolkit/src/index.ts**: Export the new utility from main index

## STEP 3: DOCUMENTATION

1. Create `docs/src/content/api/$ARGUMENTS.mdx` using standard format
2. Register in `docs/src/content/api/_meta.js`
3. Add entry to `docs/src/content/changelog.mdx` under latest version

## QUALITY GATES

After scaffolding, run:

```bash
pnpm --filter @indodev/toolkit test:run
pnpm --filter @indodev/toolkit typecheck
pnpm --filter @indodev/toolkit lint:fix
pnpm --filter @indodev/toolkit build
```
