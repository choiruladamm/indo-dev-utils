/**
 * Currency utilities for Indonesian Rupiah.
 *
 * Provides formatting, parsing, and conversion functions for
 * Indonesian currency. Includes support for compact formats
 * and terbilang (number to words conversion).
 *
 * @example
 * ```typescript
 * import { formatRupiah, formatCompact, toWords } from '@indodev/toolkit/currency';
 *
 * // Format currency
 * formatRupiah(1500000); // 'Rp 1.500.000'
 *
 * // Compact format
 * formatCompact(1500000); // 'Rp 1,5 juta'
 *
 * // Convert to words
 * toWords(1500000); // 'satu juta lima ratus ribu rupiah'
 * ```
 *
 * @module currency
 * @packageDocumentation
 */

// Formatting functions
export { formatRupiah, formatCompact } from './format';

// Parsing functions
export { parseRupiah } from './parse';

// Word conversion
export { toWords } from './words';

// Utility functions
export { roundToClean } from './utils';

// Types
export type { RupiahOptions, WordOptions, RoundUnit } from './types';