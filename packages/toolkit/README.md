# @indodev/toolkit

<div align="center">

[![CI](https://github.com/choiruladamm/indo-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/choiruladamm/indo-dev-utils/actions)
[![npm version](https://img.shields.io/npm/v/@indodev/toolkit.svg)](https://npmjs.com/package/@indodev/toolkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TypeScript utilities for Indonesian data — zero dependencies, tree-shakeable, 2068+ tests.

</div>

## Install

```bash
npm install @indodev/toolkit
```

## Quick Start

```typescript
import { parseNIK, formatRupiah, generateNIK } from '@indodev/toolkit';

parseNIK('3273051205900001');
// { province: 'Jawa Barat', gender: 'male', birthDate: 1990-05-12, ... }

formatRupiah(1500000);        // 'Rp 1.500.000'
formatCompact(1500000);       // 'Rp 1,5 juta' ← NOT '1,0 juta'

generateNIK({ seed: 42 });    // '3174061201900001' — passes validateNIK()
```

## Highlights

### Mock — Test Fixtures That Pass Validators

```typescript
import { createMockFactory } from '@indodev/toolkit/mock';

// Same seed = same data every time
const factory = createMockFactory(12345);
const person = factory.generateMockPerson();

// All fields are valid Indonesian data
person.nik;      // passes validateNIK()
person.npwp;     // passes validateNPWP()
person.phone;    // passes validatePhoneNumber()
person.email;    // passes validateEmail()
person.plate;    // passes validatePlate()
```

### Currency — Rupiah Formatting

```typescript
import { formatRupiah, formatCompact, toWords, formatAccounting } from '@indodev/toolkit/currency';

formatRupiah(1500000);      // 'Rp 1.500.000'
formatCompact(1500000);     // 'Rp 1,5 juta'
formatCompact(1000000);     // 'Rp 1 juta' ← no "1,0 juta"
toWords(1500000);           // 'satu juta lima ratus ribu rupiah'
formatAccounting(-500000);  // '(Rp 500.000)'
```

### PDP — Mask PII for UU PDP Compliance

```typescript
import { scanPII, maskPII } from '@indodev/toolkit/pdp';

const findings = scanPII('NIK 3273051205900001 atas nama Joko');
// [{ type: 'NIK', value: '3273051205900001', start: 4, end: 20 }]

maskPII('NIK 3273051205900001', { maskType: 'full' });
// 'NIK *********************************'
```

### Text — Slug, Abbreviation, Case Conversion

```typescript
import { toTitleCase, expandAbbreviation, slugify } from '@indodev/toolkit/text';

toTitleCase('pt bank central asia');     // 'PT Bank Central Asia'
expandAbbreviation('Jl. Sudirman');      // 'Jalan Sudirman'
expandAbbreviation('Dr. Joko, S.H.');    // 'Doktor Joko, Sarjana Hukum'
slugify('Pria & Wanita');               // 'pria-dan-wanita'
```

### Phone — Format for Display vs Storage

```typescript
import { validatePhoneNumber, formatPhoneNumber, maskPhoneNumber } from '@indodev/toolkit/phone';

validatePhoneNumber('081234567890');       // true
formatPhoneNumber('081234567890', 'international');  // '+62 812-3456-7890'
formatPhoneNumber('081234567890', 'national');       // '0812-3456-7890'
maskPhoneNumber('081234567890');                     // '0812****7890'
```

### NIK — Extract All Info from One Number

```typescript
import { validateNIK, parseNIK, maskNIK } from '@indodev/toolkit/nik';

const info = parseNIK('3273051205900001');
// { province: 'Jawa Barat', city: 'Kota Bandung', gender: 'male',
//   birthDate: 1990-05-12, uniqueCode: 1 }

info.gender;           // 'male'
info.birthDate;        // Date(1990, 4, 12)

validateNIK('3273051205900001');  // true (checksum)
maskNIK('3273051205900001');       // '3273************01'
```

### NPWP — Validate & Format

```typescript
import { validateNPWP, formatNPWP, maskNPWP } from '@indodev/toolkit/npwp';

validateNPWP('012345678901234');     // true (checksum)
formatNPWP('012345678901234');       // '01.234.567.8-901.234'
maskNPWP('012345678901234');         // '01.******.8-901.234'
```

### Plate — Validate & Detect Region

```typescript
import { validatePlate, parsePlate } from '@indodev/toolkit/plate';

validatePlate('B 1234 ABC');         // true
parsePlate('B 1234 ABC').region;     // 'DKI Jakarta'
parsePlate('B 1234 ABC').type;       // 'private'
```

### BPJS — Kesehatan & Ketenagakerjaan

```typescript
import { validateBPJS, formatBPJS, maskBPJS } from '@indodev/toolkit/bpjs';

validateBPJS('0001234567890', 'kesehatan');      // true (13-digit)
validateBPJS('12345678901', 'ketenagakerjaan');  // true (11-digit)

formatBPJS('0001234567890', 'kesehatan');        // '0001-2345-67890'
maskBPJS('0001234567890');                        // '0001*******90'
```

### NLP — Indonesian Text Processing

```typescript
import { stemText, soundex, tokenize } from '@indodev/toolkit/nlp';

stemText('mendengarkan');          // 'dengar'
soundex('Jakarta');                // 'J630'
tokenize('Saya makan nasi');      // ['Saya', 'makan', 'nasi']
toFormal('gw lg makan deh');      // 'saya sedang makan'
```

### DateTime — Indonesian Locale Formatting

```typescript
import { formatDate, parseDate, toRelativeTime, getAge, isWorkingDay } from '@indodev/toolkit/datetime';

formatDate(new Date('2026-01-02'), 'long');      // '2 Januari 2026'
parseDate('02-01-2026');                          // Date(2026, 0, 2)
toRelativeTime(Date.now() - 3600000);             // '1 jam yang lalu'
getAge('1990-06-15');                            // { years: 35, months: 9, ... }
isWorkingDay(new Date('2026-01-01'));             // false (Tahun Baru)
```

### NIK — Extract All Info from One Number

```typescript
import { validateNIK, parseNIK, maskNIK } from '@indodev/toolkit/nik';

const info = parseNIK('3273051205900001');
// { province: 'Jawa Barat', city: 'Kota Bandung', gender: 'male',
//   birthDate: 1990-05-12, uniqueCode: 1 }

info.gender;           // 'male'
info.birthDate;        // Date(1990, 4, 12)

validateNIK('3273051205900001');  // true (checksum)
maskNIK('3273051205900001');       // '3273************01'
```

### NPWP — Validate & Format

```typescript
import { validateNPWP, formatNPWP, maskNPWP } from '@indodev/toolkit/npwp';

validateNPWP('012345678901234');     // true (checksum)
formatNPWP('012345678901234');       // '01.234.567.8-901.234'
maskNPWP('012345678901234');         // '01.******.8-901.234'
```

### Phone — Format for Display vs Storage

```typescript
import { validatePhoneNumber, formatPhoneNumber, maskPhoneNumber } from '@indodev/toolkit/phone';

validatePhoneNumber('081234567890');       // true
formatPhoneNumber('081234567890', 'international');  // '+62 812-3456-7890'
formatPhoneNumber('081234567890', 'national');       // '0812-3456-7890'
maskPhoneNumber('081234567890');                     // '0812****7890'
```

### Plate — Validate & Detect Region

```typescript
import { validatePlate, parsePlate } from '@indodev/toolkit/plate';

validatePlate('B 1234 ABC');         // true
parsePlate('B 1234 ABC').region;     // 'DKI Jakarta'
parsePlate('B 1234 ABC').type;       // 'private'
```

### BPJS — Kesehatan & Ketenagakerjaan

```typescript
import { validateBPJS, formatBPJS, maskBPJS } from '@indodev/toolkit/bpjs';

validateBPJS('0001234567890', 'kesehatan');      // true (13-digit)
validateBPJS('12345678901', 'ketenagakerjaan');  // true (11-digit)

formatBPJS('0001234567890', 'kesehatan');        // '0001-2345-67890'
maskBPJS('0001234567890');                        // '0001*******90'
```

### PDP — Mask PII for UU PDP Compliance

```typescript
import { scanPII, maskPII } from '@indodev/toolkit/pdp';

const findings = scanPII('NIK 3273051205900001 atas nama Joko');
// [{ type: 'NIK', value: '3273051205900001', start: 4, end: 20 }]

maskPII('NIK 3273051205900001', { maskType: 'full' });
// 'NIK *********************************'
```

### NLP — Indonesian Text Processing

```typescript
import { stemText, soundex, tokenize } from '@indodev/toolkit/nlp';

stemText('mendengarkan');          // 'dengar'
soundex('Jakarta');                // 'J630'
tokenize('Saya makan nasi');      // ['Saya', 'makan', 'nasi']
toFormal('gw lg makan deh');      // 'saya sedang makan'
```

### Currency — Rupiah That Follows Indonesian Grammar

```typescript
import { formatRupiah, formatCompact, toWords, formatAccounting } from '@indodev/toolkit/currency';

formatRupiah(1500000);      // 'Rp 1.500.000'
formatCompact(1500000);     // 'Rp 1,5 juta'
formatCompact(1000000);     // 'Rp 1 juta' ← no "1,0 juta"
toWords(1500000);           // 'satu juta lima ratus ribu rupiah'
formatAccounting(-500000);  // '(Rp 500.000)'
```

### DateTime — Indonesian Locale Formatting

```typescript
import { formatDate, parseDate, toRelativeTime, getAge, isWorkingDay } from '@indodev/toolkit/datetime';

formatDate(new Date('2026-01-02'), 'long');      // '2 Januari 2026'
parseDate('02-01-2026');                          // Date(2026, 0, 2)
toRelativeTime(Date.now() - 3600000);             // '1 jam yang lalu'
getAge('1990-06-15');                            // { years: 35, months: 9, ... }
isWorkingDay(new Date('2026-01-01'));             // false (Tahun Baru)
```

### Text — Slug, Abbreviation, Case Conversion

```typescript
import { toTitleCase, expandAbbreviation, slugify } from '@indodev/toolkit/text';

toTitleCase('pt bank central asia');     // 'PT Bank Central Asia'
expandAbbreviation('Jl. Sudirman');      // 'Jalan Sudirman'
expandAbbreviation('Dr. Joko, S.H.');    // 'Doktor Joko, Sarjana Hukum'
slugify('Pria & Wanita');               // 'pria-dan-wanita'
```

## All Modules

| Module                                                               | Description                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------ |
| [Currency](https://toolkit.chrl.cloud/docs/utilities/currency)       | Format Rupiah, terbilang, split amounts, percentages          |
| [Text](https://toolkit.chrl.cloud/docs/utilities/text)               | Title case, slugs, abbreviations, case conversion, masking    |
| [DateTime](https://toolkit.chrl.cloud/docs/utilities/datetime)       | Indonesian date formatting, relative time, age calculation    |
| [NIK](https://toolkit.chrl.cloud/docs/identity/nik)                  | Validate, parse, and mask Indonesian National Identity Numbers|
| [NPWP](https://toolkit.chrl.cloud/docs/identity/npwp)                | Validate and format Tax Identification Numbers                |
| [Phone](https://toolkit.chrl.cloud/docs/contact/phone)               | Format, validate, and detect mobile operators                 |
| [Email](https://toolkit.chrl.cloud/docs/contact/email)                | Validate emails with disposable domain detection              |
| [Plate](https://toolkit.chrl.cloud/docs/vehicles/plate)              | Validate license plates with region detection                 |
| [VIN](https://toolkit.chrl.cloud/docs/vehicles/vin)                  | Validate Vehicle Identification Numbers (ISO 3779)            |
| [BPJS](https://toolkit.chrl.cloud/docs/bpjs)                         | Validate & format BPJS Kesehatan & Ketenagakerjaan numbers     |
| [Mock](https://toolkit.chrl.cloud/docs/mock)                         | Generate deterministic fake Indonesian identity data         |
| [PDP](https://toolkit.chrl.cloud/docs/utilities/pdp)                 | PII scanning & masking for UU PDP compliance                 |
| [NLP](https://toolkit.chrl.cloud/docs/utilities/nlp)                 | Indonesian stemming, phonetic encoding, tokenization          |

**13 modules · 133+ exports · 2068+ tests · zero dependencies**

Full docs, examples, and API reference at [toolkit.chrl.cloud](https://toolkit.chrl.cloud/docs)

MIT