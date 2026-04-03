# 🎯 Core Mandates

1.  **Data Independence (Strict Prohibition)**:
    - **FORBIDDEN**: Do not add any data that requires periodic updates (e.g., Bank Lists, SWIFT codes, Regional/Province/City data, Tax rates, PTKP thresholds).
    - **ACCEPTED**: Only accept utilities based on **Pure Algorithms** (NIK, NPWP, Currency to Words, Phone Formatting, etc.) that remain valid for at least 5 years without data updates.
2.  **Pure Functions**: All utilities must be pure functions (Input -> Output). No side-effects allowed (no console logs, API calls, or global state mutations).
3.  **Surgical Changes**: Perform minimal, targeted updates. Do not refactor unrelated code.
4.  **Early Returns**: Favor flat logic with early returns. Keep nesting to a maximum of 2 levels where possible.