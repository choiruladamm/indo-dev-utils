---
description: Generate API documentation snippet for a function
agent: build
---

Generate MDX documentation for: `$ARGUMENTS`

1. Read the source file to understand the function
2. Generate MDX following `guide/DOCS_STYLE_GUIDE.md` format:
   - Title & Description
   - Signature with types
   - Parameters table
   - Return type
   - Examples (TypeScript)
   - Edge cases
   - Related functions

3. Check if docs already exist at `docs/src/content/api/{module}.mdx`
4. If exists, show diff; if not, create new section

Output ready-to-paste MDX snippet.
