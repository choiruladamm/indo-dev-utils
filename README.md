# @indodev/toolkit

Indonesian developer utilities for validation, formatting, and more.

## 🚀 Features

- NIK (National Identity Number) validation and parsing
- Indonesian phone number formatting and validation
- Rupiah currency formatting with terbilang support
- TypeScript support with full type inference
- Zero runtime dependencies (Zod is optional)
- Tree-shakeable - import only what you need
- Well tested with >80% coverage

## 📦 Installation

```bash
npm install @indodev/toolkit
# or
pnpm add @indodev/toolkit
# or
yarn add @indodev/toolkit
```

## 🎯 Quick Start

```typescript
import { validateNIK, formatPhoneNumber, formatRupiah } from '@indodev/toolkit';

// Validate NIK
const isValid = validateNIK('3201234567890123'); // true

// Format phone number
const phone = formatPhoneNumber('081234567890', 'international');
// → '+62 812-3456-7890'

// Format currency
const price = formatRupiah(1500000); // → 'Rp 1.500.000'
```

## 📚 Documentation

Full documentation: [Coming Soon]

## 🤝 Contributing

Contributions are welcome! Please read our contributing guide.

## 📝 License

MIT License - see LICENSE file for details