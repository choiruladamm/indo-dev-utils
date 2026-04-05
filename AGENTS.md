# AGENTS.md — Project Conventions

`@indodev/toolkit` — Zero-dependency TypeScript utility library for Indonesian developers.

**Monorepo**: pnpm workspaces with `packages/toolkit/` (main library) and `docs/` (Next.js + Nextra).

## Quick Reference

| Topic                 | Location                          |
| --------------------- | --------------------------------- |
| **Core Mandates**     | `.opencode/rules/mandates.md`     |
| **Architecture**      | `.opencode/rules/architecture.md` |
| **Tech Standards**    | `.opencode/rules/standards.md`    |
| **Module Guidelines** | `guide/MODULE_GUIDELINES.md`      |
| **Philosophy**        | `guide/PHILOSOPHY.md`             |

## Key Principles

1. **Data Independence** — No external datasets (bank lists, tax rates, etc.)
2. **Pure Functions** — No side effects
3. **Surgical Changes** — Minimal, targeted updates
4. **>90% Test Coverage** — Mandatory

## Quality Gates

```bash
pnpm --filter @indodev/toolkit test:run
pnpm --filter @indodev/toolkit typecheck
pnpm --filter @indodev/toolkit lint:fix
pnpm --filter @indodev/toolkit build
```

## Common Pitfalls

| Pitfall                   | Fix                                      |
| ------------------------- | ---------------------------------------- |
| Missing default values    | Always specify `default = 'X'`           |
| Vague range boundaries    | Specify "inclusive" or "exclusive"       |
| Using `toLocaleString`    | Use internal formatting                  |
| Hardcoded regulatory data | Remove defaults, require explicit params |
| Negative currency format  | Sign before symbol: `-Rp 1.500.000`      |

## OpenCode Tools

| Path                                         | Description                             |
| -------------------------------------------- | --------------------------------------- |
| `.opencode/commands/new-util.md`             | `/new-util {module}` — Scaffold module  |
| `.opencode/commands/quality-gate.md`         | `/quality-gate` — Run all quality gates |
| `.opencode/commands/coverage.md`             | `/coverage` — Check test coverage       |
| `.opencode/agents/prd-reviewer.md`           | `@prd-reviewer` — Review PRD            |
| `.opencode/agents/docs-writer.md`            | `@docs-writer` — Help with docs         |
| `.opencode/skills/module-checklist/SKILL.md` | Module validation                       |
| `.opencode/skills/release/SKILL.md`          | Release workflow                        |
