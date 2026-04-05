---
name: module-checklist
description: Validate new module candidates against library philosophy and acceptance criteria
license: MIT
compatibility: opencode
metadata:
  audience: contributors
  workflow: planning
---

## What I Do

I validate whether a proposed module fits the `@indodev/toolkit` library by checking against the 5 acceptance criteria.

## The 5 Acceptance Criteria

A module must pass ALL 5:

### 1. Indonesian-Specific 🇮🇩

- Solves a problem specific to Indonesian developers
- Not generic functionality available in lodash/ramda
- Indonesian language, formats, or conventions

**Questions:**

- Is this specific to Indonesia?
- Could you find this in lodash, ramda, or generic libraries?

### 2. Data-Independent 🚫📊

- No external datasets required
- No data that changes over time
- Pure algorithm or logic-based

**Questions:**

- Does this require external data (bank lists, province lists, tax rates)?
- Will this data change over time?

### 3. Long-Term Stable 🕐

- Will remain accurate for 5+ years without updates
- Format/rules don't change frequently
- Not dependent on volatile regulations

**Questions:**

- Will this still work in 5 years?
- Does this depend on government regulations?

### 4. Pure Function Compatible 🧮

- Can be implemented as pure functions
- Predictable inputs → outputs
- No side effects, no state

**Questions:**

- Can this be a pure function?
- Does it require API calls, database queries, file I/O?

### 5. Broadly Useful 👥

- Solves a common problem
- Useful to many Indonesian developers
- Not overly niche or business-specific

**Questions:**

- How many Indonesian developers need this?
- Is this specific to one company/business?

## Decision Tree

```
START: New Module Idea
│
├─ 1️⃣ Is it Indonesian-specific?
│   ├─ NO → ❌ REJECT (Use lodash/ramda/generic library)
│   └─ YES → Continue
│
├─ 2️⃣ Does it require external data?
│   ├─ YES → ❌ REJECT (Suggest external API/service)
│   └─ NO → Continue
│
├─ 3️⃣ Will it be accurate in 5 years?
│   ├─ NO → ❌ REJECT (Too volatile)
│   └─ YES → Continue
│
├─ 4️⃣ Can it be pure functions?
│   ├─ NO → ❌ REJECT (Side effects not allowed)
│   └─ YES → Continue
│
├─ 5️⃣ Is it broadly useful?
│   ├─ NO → ❌ REJECT (Too niche)
│   └─ YES → ✅ ACCEPT
│
└─ ✅ ACCEPTED → Proceed to PRD
```

## Output Format

```markdown
## Module Checklist: {module name}

### Acceptance Criteria

| Criterion                | Status | Notes    |
| ------------------------ | ------ | -------- |
| Indonesian-Specific      | ✅/❌  | {reason} |
| Data-Independent         | ✅/❌  | {reason} |
| Long-Term Stable         | ✅/❌  | {reason} |
| Pure Function Compatible | ✅/❌  | {reason} |
| Broadly Useful           | ✅/❌  | {reason} |

### Decision: ✅ ACCEPTED / ❌ REJECTED

### Recommendation

{If rejected, suggest alternatives}
{If accepted, next steps}
```

## Examples

### ✅ ACCEPTED: NIK Validator

- Indonesian-Specific: ✅ Indonesian ID card format
- Data-Independent: ✅ Pure algorithm, no external data
- Long-Term Stable: ✅ Format unchanged since 2011
- Pure Function: ✅ Input → boolean
- Broadly Useful: ✅ Every Indonesian has NIK

### ❌ REJECTED: Bank Validator

- Indonesian-Specific: ✅ Indonesian banks
- Data-Independent: ❌ Requires bank list (changes frequently)
- Long-Term Stable: ❌ Banks merge/close
- Pure Function: ✅ Could be pure
- Broadly Useful: ✅ Common need

**Recommendation**: Use Midtrans/Xendit SDK for bank validation.
