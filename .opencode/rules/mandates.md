# Core Mandates

Non-negotiable principles for `@indodev/toolkit` development.

## 1. Data Independence (Strict Prohibition)

**FORBIDDEN**: Do not add any data that requires periodic updates.

Examples of prohibited data:

- Bank lists, SWIFT codes
- Regional/Province/City data
- Tax rates, PTKP thresholds
- Holiday lists
- Postal codes

**ACCEPTED**: Only utilities based on **Pure Algorithms** that remain valid for 5+ years:

- NIK validation (format-based)
- NPWP validation (format-based)
- Currency to Words (algorithmic)
- Phone formatting (pattern-based)
- Text utilities (language rules)

Static constants are OK — they don't change (month names, day names).

## 2. Pure Functions

All utilities must be pure functions.

- Input → Output only
- No side effects
- No `console.log`
- No API calls
- No global state mutations

## 3. Surgical Changes

Perform minimal, targeted updates.

- Do not refactor unrelated code
- Do not modify UI styling unless instructed
- Keep changes focused

## 4. Early Returns

Favor flat logic with early returns.

- Keep nesting to maximum 2 levels
- Avoid deep `if-else` chains
- Guard clauses preferred
