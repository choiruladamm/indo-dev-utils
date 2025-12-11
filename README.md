# @indodev/toolkit

TypeScript utilities for Indonesian data validation and formatting.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why?

Building apps for Indonesia means dealing with NIK validation, phone number formatting, and Rupiah display. Instead of rewriting the same logic across projects, use battle-tested utilities that just work.

## Features

- **NIK validation** - Verify Indonesian National Identity Numbers with province, date, and gender checks
- **Phone formatting** - Support for all major operators (Telkomsel, XL, Indosat, Smartfren, Axis) and 200+ area codes
- **Rupiah formatting** - Display currency with proper grammar rules (1,5 juta, not 1,0 juta)
- **Terbilang converter** - Numbers to Indonesian words (1500000 → "satu juta lima ratus ribu rupiah")
- **Type-safe** - Full TypeScript support with proper type inference
- **Well-tested** - 470+ test cases with 95%+ coverage
- **Zero dependencies** - Lightweight and tree-shakeable

## Install
```bash
npm install @indodev/toolkit
```

## Usage

### NIK Validation & Parsing
```typescript
import { validateNIK, parseNIK, maskNIK } from '@indodev/toolkit/nik';

// Validate
validateNIK('3201234567890123'); // true
validateNIK('1234'); // false

// Extract info
const info = parseNIK('3201234567890123');
console.log(info.province.name); // 'Jawa Barat'
console.log(info.birthDate); // Date object
console.log(info.gender); // 'male' or 'female'

// Mask for privacy
maskNIK('3201234567890123'); // '3201****0123'
```

### Phone Numbers
```typescript
import { validatePhoneNumber, formatPhoneNumber, getOperator } from '@indodev/toolkit/phone';

// Validate (works with 08xx, +62, 62 formats)
validatePhoneNumber('081234567890'); // true
validatePhoneNumber('+6281234567890'); // true

// Format
formatPhoneNumber('081234567890', 'international'); // '+62 812-3456-7890'
formatPhoneNumber('081234567890', 'national'); // '0812-3456-7890'

// Detect operator
getOperator('081234567890'); // 'Telkomsel'
getOperator('085612345678'); // 'Indosat'
```

### Currency Formatting
```typescript
import { formatRupiah, formatCompact, toWords } from '@indodev/toolkit/currency';

// Standard format
formatRupiah(1500000); // 'Rp 1.500.000'
formatRupiah(1500000.50, { decimal: true }); // 'Rp 1.500.000,50'

// Compact format (follows Indonesian grammar!)
formatCompact(1500000); // 'Rp 1,5 juta'
formatCompact(1000000); // 'Rp 1 juta' (not '1,0 juta')

// Terbilang
toWords(1500000); 
// 'satu juta lima ratus ribu rupiah'

toWords(1500000, { uppercase: true, withCurrency: false });
// 'Satu juta lima ratus ribu'
```

### Parsing (Reverse Operations)
```typescript
import { parseNIK } from '@indodev/toolkit/nik';
import { parsePhoneNumber } from '@indodev/toolkit/phone';
import { parseRupiah } from '@indodev/toolkit/currency';

// Parse formatted strings back
parseRupiah('Rp 1.500.000'); // 1500000
parseRupiah('Rp 1,5 juta'); // 1500000
parseRupiah('Rp 500 ribu'); // 500000
```

## Real-World Examples

### E-commerce Checkout
```typescript
import { formatRupiah, formatCompact } from '@indodev/toolkit/currency';

// Product card
<div className="price">
  {formatCompact(product.price)} {/* "Rp 1,5 juta" */}
</div>

// Checkout total
<div className="total">
  Total: {formatRupiah(cart.total, { decimal: true })}
  {/* "Rp 1.500.000,50" */}
</div>
```

### User Registration Form
```typescript
import { validateNIK } from '@indodev/toolkit/nik';
import { validatePhoneNumber } from '@indodev/toolkit/phone';

function validateForm(data) {
  if (!validateNIK(data.nik)) {
    return 'NIK tidak valid';
  }
  
  if (!validatePhoneNumber(data.phone)) {
    return 'Nomor telepon tidak valid';
  }
  
  return null;
}
```

### Invoice Generator
```typescript
import { formatRupiah, toWords } from '@indodev/toolkit/currency';

const total = 1500000;

console.log(`Total: ${formatRupiah(total)}`);
console.log(`Terbilang: ${toWords(total, { uppercase: true })}`);

// Output:
// Total: Rp 1.500.000
// Terbilang: Satu juta lima ratus ribu rupiah
```

## TypeScript Support

Full type inference out of the box:
```typescript
import type { NIKInfo, PhoneInfo, RupiahOptions } from '@indodev/toolkit';

const nikInfo: NIKInfo = parseNIK('3201234567890123');
// nikInfo.province ✓ auto-complete works
// nikInfo.birthDate ✓ Date type
// nikInfo.gender ✓ 'male' | 'female' | null

const options: RupiahOptions = {
  symbol: true,
  decimal: true,
  precision: 2,
  separator: '.',
  decimalSeparator: ',',
};
```

## Tree-Shaking

Import only what you need - unused code gets removed:
```typescript
// ✅ Recommended: Import from submodules
import { formatRupiah } from '@indodev/toolkit/currency';
import { validateNIK } from '@indodev/toolkit/nik';

// ⚠️ Works but imports everything
import { formatRupiah, validateNIK } from '@indodev/toolkit';
```

## Framework Examples

Works with any framework:
```typescript
// React
import { formatRupiah } from '@indodev/toolkit/currency';

function ProductCard({ price }) {
  return <div>{formatRupiah(price)}</div>;
}

// Vue
import { formatPhoneNumber } from '@indodev/toolkit/phone';

export default {
  computed: {
    formattedPhone() {
      return formatPhoneNumber(this.phone, 'international');
    }
  }
}

// Svelte
<script>
  import { validateNIK } from '@indodev/toolkit/nik';
  
  $: isValid = validateNIK(nik);
</script>
```

## API Reference

### NIK Module

| Function | Description |
|----------|-------------|
| `validateNIK(nik)` | Check if NIK is valid |
| `parseNIK(nik)` | Extract province, birth date, gender |
| `formatNIK(nik, separator?)` | Format with separators |
| `maskNIK(nik, options?)` | Mask for privacy |

[Full NIK docs →](#)

### Phone Module

| Function | Description |
|----------|-------------|
| `validatePhoneNumber(phone)` | Validate Indonesian phone numbers |
| `formatPhoneNumber(phone, format)` | Format to international/national/e164 |
| `getOperator(phone)` | Detect operator (Telkomsel, XL, etc) |
| `parsePhoneNumber(phone)` | Get all phone info |

[Full Phone docs →](#)

### Currency Module

| Function | Description |
|----------|-------------|
| `formatRupiah(amount, options?)` | Standard Rupiah format |
| `formatCompact(amount)` | Compact format (1,5 juta) |
| `parseRupiah(formatted)` | Parse formatted string to number |
| `toWords(amount, options?)` | Convert to Indonesian words |
| `roundToClean(amount, unit?)` | Round to clean amounts |

[Full Currency docs →](#)

## Bundle Size

| Module | Size (minified + gzipped) |
|--------|---------------------------|
| NIK | ~8 KB |
| Phone | ~12 KB |
| Currency | ~10 KB |
| **Total** | **~30 KB** |

Import only what you need to keep your bundle small.

## Requirements

- Node.js >= 18
- TypeScript >= 5.0 (optional)

## Contributing

Found a bug? Want to add more Indonesian utilities?

1. Fork the repo
2. Create a branch: `git checkout -b feat/my-feature`
3. Make changes and add tests
4. Submit a PR

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Roadmap

- [x] NIK validation & parsing
- [x] Phone number utilities
- [x] Currency formatting & terbilang
- [ ] NPWP validation
- [ ] Bank account validation
- [ ] Indonesian address parsing
- [ ] Date & holiday utilities
- [ ] Zod schema exports

## License

MIT © [choiruladamm](https://github.com/choiruladamm)

## Support

- 📖 [Documentation](#) (coming soon)
- 🐛 [Report Issues](https://github.com/yourusername/indo-dev-utils/issues)
- 💬 [Discussions](https://github.com/yourusername/indo-dev-utils/discussions)

---

Made with ❤️ for Indonesian developers. Stop copy-pasting, start shipping.