<div align="center">

# @indodev/toolkit

TypeScript utilities for Indonesian data validation and formatting.

[![CI](https://github.com/choiruladamm/indo-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/choiruladamm/indo-dev-utils/actions) [![npm version](https://img.shields.io/npm/v/@indodev/toolkit.svg)](https://npmjs.com/package/@indodev/toolkit) [![bundle size](https://img.shields.io/bundlephobia/minzip/@indodev/toolkit)](https://bundlephobia.com/package/@indodev/toolkit) [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://typescriptlang.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Why?

Building apps for Indonesia means dealing with NIK validation, phone number formatting, Rupiah display, and proper text handling. Instead of rewriting the same logic across projects, use battle-tested utilities that just work.

## Features

- **NIK validation** - Verify Indonesian National Identity Numbers with province, date, and gender checks
- **Phone formatting** - Support for all major operators (Telkomsel, XL, Indosat, Smartfren, Axis) and 200+ area codes
- **Rupiah formatting** - Display currency with proper grammar rules (1,5 juta, not 1,0 juta)
- **Text utilities** - Smart capitalization, slug generation, abbreviation expansion, and string comparison with Indonesian language support
- **Terbilang converter** - Numbers to Indonesian words (1500000 → "satu juta lima ratus ribu rupiah")
- **Type-safe** - Full TypeScript support with proper type inference
- **Well-tested** - 1060+ test cases with 95%+ coverage
- **Zero dependencies** - Lightweight and tree-shakeable

## Install

```bash
npm install @indodev/toolkit
```

## Quick Start

### NIK Validation & Parsing

```typescript
import { validateNIK, parseNIK, maskNIK } from '@indodev/toolkit/nik';

// Validate
validateNIK('3201234567890123'); // true

// Extract info
const info = parseNIK('3201234567890123');
console.log(info.province.name); // 'Jawa Barat'
console.log(info.gender); // 'male' or 'female'

// Mask for privacy
maskNIK('3201234567890123'); // '3201****0123'
```

### Phone Numbers

```typescript
import {
  validatePhoneNumber,
  formatPhoneNumber,
  getOperator,
} from '@indodev/toolkit/phone';

// Validate and format
validatePhoneNumber('081234567890'); // true
formatPhoneNumber('081234567890', 'international'); // '+62 812-3456-7890'

// Detect operator
getOperator('081234567890'); // 'Telkomsel'
```

### Currency Formatting

```typescript
import {
  formatRupiah,
  formatCompact,
  toWords,
} from '@indodev/toolkit/currency';

// Standard format
formatRupiah(1500000); // 'Rp 1.500.000'

// Compact format (follows Indonesian grammar!)
formatCompact(1500000); // 'Rp 1,5 juta'
formatCompact(1000000); // 'Rp 1 juta' (not '1,0 juta')

// Terbilang
toWords(1500000); // 'satu juta lima ratus ribu rupiah'
```

### Text Utilities

```typescript
import {
  toTitleCase,
  slugify,
  expandAbbreviation,
  truncate,
} from '@indodev/toolkit/text';

// Smart title case (respects Indonesian particles)
toTitleCase('buku panduan belajar di rumah');
// 'Buku Panduan Belajar di Rumah'

// Indonesian-aware slugs
slugify('Pria & Wanita'); // 'pria-dan-wanita'
slugify('Hitam/Putih'); // 'hitam-atau-putih'

// Expand abbreviations
expandAbbreviation('Jl. Sudirman No. 45');
// 'Jalan Sudirman Nomor 45'

// Smart truncation
truncate('Ini adalah text yang sangat panjang', 20);
// 'Ini adalah text...'
```

## API Reference

### NIK Module

| Function                     | Description                          |
| ---------------------------- | ------------------------------------ |
| `validateNIK(nik)`           | Check if NIK is valid                |
| `parseNIK(nik)`              | Extract province, birth date, gender |
| `formatNIK(nik, separator?)` | Format with separators               |
| `maskNIK(nik, options?)`     | Mask for privacy                     |

### Phone Module

| Function                           | Description                           |
| ---------------------------------- | ------------------------------------- |
| `validatePhoneNumber(phone)`       | Validate Indonesian phone numbers     |
| `formatPhoneNumber(phone, format)` | Format to international/national/e164 |
| `getOperator(phone)`               | Detect operator (Telkomsel, XL, etc)  |
| `parsePhoneNumber(phone)`          | Get all phone info                    |

### Currency Module

| Function                         | Description                      |
| -------------------------------- | -------------------------------- |
| `formatRupiah(amount, options?)` | Standard Rupiah format           |
| `formatCompact(amount)`          | Compact format (1,5 juta)        |
| `parseRupiah(formatted)`         | Parse formatted string to number |
| `toWords(amount, options?)`      | Convert to Indonesian words      |

### Text Module

| Function                               | Description                                     |
| -------------------------------------- | ----------------------------------------------- |
| `toTitleCase(text, options?)`          | Smart capitalization with Indonesian rules      |
| `slugify(text, options?)`              | URL-friendly slugs with Indonesian conjunctions |
| `expandAbbreviation(text, options?)`   | Expand Indonesian abbreviations (Jl., Bpk.)     |
| `truncate(text, maxLength, options?)`  | Smart text truncation at word boundaries        |
| `compareStrings(str1, str2, options?)` | Robust string comparison                        |
| `sanitize(text, options?)`             | Clean and normalize text                        |

## TypeScript Support

Full type inference out of the box:

```typescript
import type { NIKInfo, PhoneInfo, RupiahOptions } from '@indodev/toolkit';

const nikInfo: NIKInfo = parseNIK('3201234567890123');
// Auto-complete for province, birthDate, gender ✓
```

## Tree-Shaking

Import only what you need - unused code gets removed:

```typescript
// ✅ Recommended: Import from submodules
import { formatRupiah } from '@indodev/toolkit/currency';
import { validateNIK } from '@indodev/toolkit/nik';
import { slugify } from '@indodev/toolkit/text';

// ⚠️ Works but imports everything
import { formatRupiah, validateNIK, slugify } from '@indodev/toolkit';
```

## Bundle Size

| Module    | Size (minified + gzipped) |
| --------- | ------------------------- |
| NIK       | ~5 KB                     |
| Phone     | ~12 KB                    |
| Currency  | ~6 KB                     |
| Text      | ~8 KB                     |
| **Total** | **~31 KB**                |

## Requirements

- Node.js >= 18
- TypeScript >= 5.0 (optional)

## Documentation

- 📖 [Full Documentation](https://toolkit.adamm.cloud/docs)
- 🐛 [Report Issues](https://github.com/choiruladamm/indo-dev-utils/issues)

## License

MIT © [choiruladamm](https://github.com/choiruladamm)

---

Made with ❤️ for Indonesian developers. Stop copy-pasting, start shipping.
