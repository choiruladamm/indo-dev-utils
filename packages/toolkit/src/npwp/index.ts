/**
 * Indonesian Tax Identity Number (NPWP) utilities.
 *
 * Provides validation, formatting, parsing, masking, and type checking
 * functions for Indonesian Tax Identity Numbers (Nomor Pokok Wajib Pajak).
 * Supports both 15-digit (standard) and 16-digit (NIK-based) formats.
 *
 * @example
 * Basic usage:
 * ```typescript
 * import { validateNPWP, formatNPWP, cleanNPWP, isNIKBasedNPWP } from '@indodev/toolkit/npwp';
 *
 * // Validate NPWP
 * const isValid = validateNPWP('091234567012000'); // true
 *
 * // Format NPWP
 * formatNPWP('091234567012000'); // '09.123.456.7-012.000'
 *
 * // Clean NPWP (remove separators)
 * cleanNPWP('09.123.456.7-012.000'); // '091234567012000'
 *
 * // Check if NIK-based
 * isNIKBasedNPWP('3201234567890003'); // true
 * ```
 *
 * @module npwp
 * @packageDocumentation
 */

export { validateNPWP } from './validate';
export { formatNPWP, parseNPWP, maskNPWP } from './format';
export { cleanNPWP } from './clean';
export { isNIKBasedNPWP } from './type-check';
export type { NPWPInfo, MaskOptions } from './types';
export { InvalidNPWPError } from './errors';
