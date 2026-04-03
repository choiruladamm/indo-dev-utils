# 🛠️ Tech Stack & Standards

- **TypeScript**: Strict typing is mandatory. Prefer `unknown` over `any`.
- **Vitest**: Every new function must have unit tests with > 90% coverage.
- **tsup**: Build tool for ESM & CJS. Register new entry points in `tsup.config.ts` and `package.json` when necessary.
- **JSDoc**: Every public function **MUST** have comprehensive JSDoc in English, including a description, parameters, return value, and at least one `@example`.
- **Docs Site**: Update the documentation in the `docs/` folder using MDX, following the standards in `guide/DOCS_STYLE_GUIDE.md`. **This is a mandatory step for every new feature or API change.**
- **Changelog**: Every significant change or feature must be documented in `docs/src/content/changelog.mdx` under the latest version.

## 🧪 Testing & Validation Strategy

- Always run `pnpm test` before finalizing any task.
- **Documentation Check**: Ensure the new module is added to `docs/src/content/api/` and registered in `_meta.js`.
- **Changelog Check**: Confirm the change is reflected in the `changelog.mdx`.
- Test cases must cover:
    1. **Happy Path**: Valid inputs and expected outputs.
    2. **Error Cases**: Invalid types or formats.
    3. **Edge Cases**: Empty strings, null, undefined, and boundary values.
