# 🏗️ Architecture & Patterns

- **Monorepo**: Powered by pnpm workspaces. Core logic resides in `packages/toolkit`.
- **Module Structure**:
    ```
    packages/toolkit/src/{module-name}/
    ├── index.ts              # Public API exports
    ├── {feature}.ts          # Implementation logic
    ├── types.ts              # TypeScript Interfaces/Types
    ├── constants.ts          # Static constants
    ├── utils.ts              # Internal helpers
    └── __tests__/            # Vitest unit tests
    ```
- **Naming Conventions**:
    - Modules: `kebab-case`.
    - Functions: `camelCase` (e.g., `validateNIK`, `formatCurrency`, `parsePhoneNumber`).
    - Types/Interfaces: `PascalCase`.
