/**
 * NIK (Nomor Induk Kependudukan) utilities.
 *
 * Provides validation, parsing, formatting, and masking functions for
 * Indonesian National Identity Numbers (NIK). Supports extracting location
 * codes, birth dates, and gender information from 16-digit NIK strings.
 *
 * @example
 * Basic usage:
 * ```typescript
 * import { validateNIK, parseNIK, formatNIK } from '@indodev/toolkit/nik';
 *
 * // Validate a NIK
 * const isValid = validateNIK('3201234567890123');
 *
 * // Parse NIK to extract information
 * const info = parseNIK('3201234567890123');
 * console.log(info.province.name); // 'Jawa Barat'
 * console.log(info.gender); // 'male' or 'female'
 *
 * // Format for display
 * const formatted = formatNIK('3201234567890123');
 * console.log(formatted); // '32-01-23-45-67-89-0123'
 *
 * // Mask for privacy
 * const masked = maskNIK('3201234567890123');
 * console.log(masked); // '3201********0123'
 * ```
 *
 * @module nik
 * @packageDocumentation
 */

export { validateNIK } from './validate';

export { parseNIK } from './parse';

export { formatNIK, maskNIK } from './format';

export type { NIKInfo, MaskOptions } from './types';
