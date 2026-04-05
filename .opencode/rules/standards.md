# Tech Stack & Standards

Technical standards for `@indodev/toolkit`.

## TypeScript

- Strict mode enabled
- Prefer `unknown` over `any`
- No implicit any
- Explicit return types for public functions

## Testing

- Framework: Vitest
- Coverage: >90% mandatory
- Structure: `__tests__/{feature}.test.ts`

### Test Cases Must Cover

1. **Happy Path**: Valid inputs and expected outputs
2. **Error Cases**: Invalid types or formats
3. **Edge Cases**: Empty strings, null, undefined, boundary values

## Build

- tsup for ESM & CJS
- Tree-shakeable exports
- Each module < 10KB gzipped

## JSDoc

Every public function **MUST** have:

````typescript
/**
 * Description of what the function does.
 *
 * @param param1 - Description of param1
 * @param param2 - Description of param2
 * @returns Description of return value
 *
 * @example
 * ```ts
 * const result = functionName('input');
 * console.log(result); // expected output
 * ```
 */
````

## Documentation

- Location: `docs/src/content/api/{module}.mdx`
- Format: MDX (Nextra)
- Must include: Description, API, Examples, Error Handling

## Changelog

- Location: `docs/src/content/changelog.mdx`
- Every significant change must be documented
- Format: Version header + categorized changes (Features, Fixes, Docs, Refactor)

## Quality Gates

Run before every commit:

```bash
pnpm --filter @indodev/toolkit test:run
pnpm --filter @indodev/toolkit typecheck
pnpm --filter @indodev/toolkit lint:fix
pnpm --filter @indodev/toolkit build
```

## Git Conventions

| Type   | Format                         | Example                               |
| ------ | ------------------------------ | ------------------------------------- |
| Branch | `{type}/{module}`              | `feat/currency`, `fix/nik-validation` |
| Commit | lowercase conventional commits | `feat: add currency module`           |
| Tag    | `v{semver}`                    | `v0.3.5`                              |

### Version Bump Rules

- **patch**: Bug fixes, enhancements
- **minor**: New modules, features
- **major**: Breaking API changes
