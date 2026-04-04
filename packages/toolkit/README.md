<div align="center">

# @indodev/toolkit

[![CI](https://github.com/choiruladamm/indo-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/choiruladamm/indo-dev-utils/actions)
[![npm version](https://img.shields.io/npm/v/@indodev/toolkit.svg)](https://npmjs.com/package/@indodev/toolkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

TypeScript utilities for Indonesian data. Handles Rupiah formatting, terbilang, NIK validation, phone normalization, and text rules that generic libraries don't cover.

## Install

```bash
npm install @indodev/toolkit
```

## Usage

Generate an invoice with proper Rupiah formatting and terbilang:

```typescript
import { formatRupiah, toWords, calculateTax } from '@indodev/toolkit/currency';

const items = [
  { name: 'Jasa Desain Website', qty: 1, price: 5000000 },
  { name: 'Hosting 1 Tahun', qty: 1, price: 1200000 },
];

const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
const tax = calculateTax(subtotal, 0.11);
const total = subtotal + tax;

console.log(formatRupiah(subtotal)); // 'Rp 6.200.000'
console.log(formatRupiah(tax)); // 'Rp 682.000'
console.log(formatRupiah(total)); // 'Rp 6.882.000'
console.log(toWords(total)); // 'enam juta delapan ratus delapan puluh dua ribu rupiah'
```

Validate and parse an Indonesian NIK:

```typescript
import { validateNIK, parseNIK } from '@indodev/toolkit/nik';

validateNIK('3201234567890123'); // true

const info = parseNIK('3201234567890123');
// info.province.name  → 'Jawa Barat'
// info.gender         → 'male'
// info.birthDate      → Date(1990-01-01)
```

Format phone numbers and mask sensitive data:

```typescript
import { formatPhoneNumber } from '@indodev/toolkit/phone';
import { maskText, toTitleCase, slugify } from '@indodev/toolkit/text';

formatPhoneNumber('081234567890', 'international'); // '+62 812-3456-7890'
maskText('08123456789', { pattern: 'middle', visibleStart: 4, visibleEnd: 3 }); // '0812****789'
toTitleCase('pt bank central asia tbk'); // 'PT Bank Central Asia Tbk'
slugify('Pria & Wanita'); // 'pria-dan-wanita'
```

## Modules

| Module                                                          | Description                                                    |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| [Currency](https://toolkit.adamm.cloud/docs/financial/currency) | Format Rupiah, terbilang, split amounts, percentages           |
| [Text](https://toolkit.adamm.cloud/docs/text-utils/text)        | Title case, slugs, abbreviations, case conversion, masking     |
| [NIK](https://toolkit.adamm.cloud/docs/identity/nik)            | Validate, parse, and mask Indonesian National Identity Numbers |
| [NPWP](https://toolkit.adamm.cloud/docs/identity/npwp)          | Validate and format Tax Identification Numbers                 |
| [Phone](https://toolkit.adamm.cloud/docs/contact/phone)         | Format, validate, and detect mobile operators                  |
| [Email](https://toolkit.adamm.cloud/docs/contact/email)         | Validate emails with disposable domain detection               |
| [Plate](https://toolkit.adamm.cloud/docs/vehicles/plate)        | Validate license plates with region detection                  |
| [VIN](https://toolkit.adamm.cloud/docs/vehicles/vin)            | Validate Vehicle Identification Numbers (ISO 3779)             |

Full docs, examples, and API reference at [toolkit.adamm.cloud](https://toolkit.adamm.cloud/docs)

MIT
