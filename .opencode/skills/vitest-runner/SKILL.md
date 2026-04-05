# Vitest Test Runner Skill

Guidelines for running Vitest tests in @indodev/toolkit without hanging.

## The Problem

Running `pnpm test` starts Vitest in **watch mode** (interactive), causing the process to hang and wait for file changes. This is problematic for automated/AI execution.

## The Solution

Always use the `test:run` script instead:

```bash
# WRONG - hangs in watch mode
pnpm --filter @indodev/toolkit test

# CORRECT - runs once and exits
pnpm --filter @indodev/toolkit test:run
```

## Available Commands

| Command              | Behavior             | Use Case                |
| -------------------- | -------------------- | ----------------------- |
| `pnpm test`          | Watch mode           | Development only        |
| `pnpm test:run`      | Run once & exit      | **CI/CD, AI execution** |
| `pnpm test:coverage` | With coverage report | Coverage analysis       |
| `pnpm test:ui`       | Browser UI           | Interactive debugging   |

## Running Specific Tests

```bash
# Single test file
pnpm --filter @indodev/toolkit test:run src/datetime/__tests__/calc.test.ts

# Multiple test files
pnpm --filter @indodev/toolkit test:run src/datetime/__tests__/

# Module-specific tests (pattern match)
pnpm --filter @indodev/toolkit test:run datetime
```

## Test File Naming Convention

- Unit tests: `src/{module}/__tests__/{function}.test.ts`
- Integration tests: `src/{module}/__tests__/{module}-integration.test.ts`

## Example Workflow

```bash
# After implementing a module
pnpm --filter @indodev/toolkit test:run src/datetime/

# Check coverage
pnpm --filter @indodev/toolkit test:coverage -- src/datetime/

# Run all tests before commit
pnpm --filter @indodev/toolkit test:run
```

## Important Notes

1. **Never use `pnpm test` in automated contexts** - it will hang indefinitely
2. **Always use `test:run`** for AI/CI/script execution
3. **Tests must pass** before proceeding to next phase
4. **Coverage target**: >95% for new code

## Troubleshooting

If tests hang:

- Press `q` to quit watch mode
- Re-run with `test:run` instead of `test`
- Check if vitest.config.ts has `watch: false` for CI
