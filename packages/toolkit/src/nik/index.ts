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
 * import { validateNIK, parseNIK, formatNIK, cleanNIK, compareNIK, isAdult } from '@indodev/toolkit/nik';
 *
 * // Validate a NIK
 * const isValid = validateNIK('3201234567890123');
 *
 * // Clean NIK (remove separators)
 * const cleaned = cleanNIK('3201-2345-6789-0123'); // '3201234567890123'
 *
 * // Compare two NIKs
 * const isSamePerson = compareNIK('3201018901310123', '3201-01-89-01-31-0123'); // true
 *
 * // Check if adult (17+ by default)
 * const isEligibleForKTP = isAdult('3201950101950123'); // true
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

export { cleanNIK } from './clean';

export { validateNIKDetailed } from './validate-detailed';

export {
  getAge,
  compareNIK,
  isAdult,
  formatBirthDate,
  isValidForGender,
  isValidForBirthDate,
} from './utils';

export type {
  NIKInfo,
  MaskOptions,
  NIKValidationResult,
  NIKValidationError,
  NIKErrorCode,
  GetAgeOptions,
  Age,
} from './types';

export { InvalidNIKError } from './types';
