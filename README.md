<div align="center">

# @indodev/toolkit

[![CI](https://github.com/choiruladamm/indo-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/choiruladamm/indo-dev-utils/actions)
[![npm version](https://img.shields.io/npm/v/@indodev/toolkit.svg)](https://npmjs.com/package/@indodev/toolkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

TypeScript utilities for Indonesian data. Handles Rupiah formatting, terbilang, NIK validation, phone normalization, date formatting, and text rules that generic libraries don't cover.

## Install

```bash
npm install @indodev/toolkit
```

## Highlights

### Currency — Smart Rupiah Formatting

```typescript
import {
  formatRupiah,
  formatCompact,
  toWords,
  formatAccounting,
} from '@indodev/toolkit/currency';

formatRupiah(1500000); // 'Rp 1.500.000'
formatCompact(1500000); // 'Rp 1,5 juta'
formatCompact(1000000); // 'Rp 1 juta'  ← NO "1,0 juta"
toWords(1500000); // 'satu juta lima ratus ribu rupiah'
formatAccounting(-500000); // '(Rp 500.000)'
```

### Text — Indonesian-Specific Rules

```typescript
import {
  toTitleCase,
  expandAbbreviation,
  toFormal,
  isAlay,
  slugify,
} from '@indodev/toolkit/text';

toTitleCase('pt bank central asia'); // 'PT Bank Central Asia'
expandAbbreviation('Jl. Sudirman'); // 'Jalan Sudirman'
expandAbbreviation('Dr. Joko, S.H.'); // 'Doktor Joko, Sarjana Hukum'
toFormal('gw lg makan deh'); // 'saya sedang makan'
isAlay('aqU sAyAnG kMu'); // true
slugify('Pria & Wanita'); // 'pria-dan-wanita'
```

### DateTime — Indonesian Locale

```typescript
import {
  formatDate,
  parseDate,
  toRelativeTime,
  getAge,
  isWorkingDay,
} from '@indodev/toolkit/datetime';

formatDate(new Date('2026-01-02'), 'long'); // '2 Januari 2026'
parseDate('02-01-2026'); // Date(2026, 0, 2)
toRelativeTime(Date.now() - 3600000); // '1 jam yang lalu'
getAge('1990-06-15'); // { years: 35, months: 9, ... }
isWorkingDay(new Date('2026-01-01')); // false (Tahun Baru)
```

## More Modules

Validate and parse Indonesian identity documents:

```typescript
import { validateNIK, parseNIK } from '@indodev/toolkit/nik';
import { validateNPWP, formatNPWP } from '@indodev/toolkit/npwp';
import { formatPhoneNumber, maskPhoneNumber } from '@indodev/toolkit/phone';

validateNIK('3201234567890123'); // true
parseNIK('3201234567890123').province.name; // 'Jawa Barat'

validateNPWP('012345678901234'); // true
formatPhoneNumber('081234567890', 'international'); // '+62 812-3456-7890'
maskPhoneNumber('081234567890'); // '0812****7890'
```

## All Modules

| Module                                                          | Description                                                    |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| [Currency](https://toolkit.adamm.cloud/docs/utilities/currency) | Format Rupiah, terbilang, split amounts, percentages           |
| [Text](https://toolkit.adamm.cloud/docs/utilities/text)         | Title case, slugs, abbreviations, case conversion, masking     |
| [DateTime](https://toolkit.adamm.cloud/docs/utilities/datetime) | Indonesian date formatting, relative time, age calculation     |
| [NIK](https://toolkit.adamm.cloud/docs/identity/nik)            | Validate, parse, and mask Indonesian National Identity Numbers |
| [NPWP](https://toolkit.adamm.cloud/docs/identity/npwp)          | Validate and format Tax Identification Numbers                 |
| [Phone](https://toolkit.adamm.cloud/docs/contact/phone)         | Format, validate, and detect mobile operators                  |
| [Email](https://toolkit.adamm.cloud/docs/contact/email)         | Validate emails with disposable domain detection               |
| [Plate](https://toolkit.adamm.cloud/docs/vehicles/plate)        | Validate license plates with region detection                  |
| [VIN](https://toolkit.adamm.cloud/docs/vehicles/vin)            | Validate Vehicle Identification Numbers (ISO 3779)             |

Full docs, examples, and API reference at [toolkit.adamm.cloud](https://toolkit.adamm.cloud/docs)

MIT
