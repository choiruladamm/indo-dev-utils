# Architecture & Patterns

Module structure and naming conventions for `@indodev/toolkit`.

## Monorepo Structure

Powered by pnpm workspaces.

- `packages/toolkit/` — Main library
- `docs/` — Documentation site (Next.js + Nextra)

## Module Structure

```
packages/toolkit/src/{module-name}/
├── index.ts          # Public API exports (barrel exports)
├── {feature}.ts      # Implementation logic
├── types.ts          # TypeScript interfaces + custom error classes
├── constants.ts      # Static constants (if needed)
├── utils.ts          # Internal helpers (if needed)
└── __tests__/
    └── {feature}.test.ts
```

## Custom Error Classes

- Define in `types.ts` (NOT separate `errors.ts`)
- Extend standard `Error` class
- Example: `export class InvalidSplitError extends Error { ... }`

## Naming Conventions

| Type             | Convention             | Example                         |
| ---------------- | ---------------------- | ------------------------------- |
| Modules          | `kebab-case`           | `phone-number`, `currency`      |
| Functions        | `camelCase`            | `validateNIK`, `formatCurrency` |
| Types/Interfaces | `PascalCase`           | `PhoneInfo`, `CurrencyOptions`  |
| Constants        | `SCREAMING_SNAKE_CASE` | `MIN_AMOUNT`, `DEFAULT_LOCALE`  |

## API Design Patterns

### Validation Functions

```typescript
function validate{Entity}(input: string): boolean
```

### Parsing Functions

```typescript
function parse{Entity}(input: string): {Entity}Info | null
```

### Formatting Functions

```typescript
function format{Entity}(input: string, options?: FormatOptions): string
```

### Utility Functions

```typescript
function {action}{Entity}(input: string): ReturnType
```
