/**
 * Indonesian phone number utilities.
 *
 * Provides validation, formatting, and parsing functions for Indonesian
 * phone numbers. Supports multiple formats (08xx, +62, 62) and detects
 * mobile operators (Telkomsel, XL, Indosat, Tri, Smartfren, Axis).
 *
 * @example
 * Basic usage:
 * ```typescript
 * import { 
 *   validatePhoneNumber, 
 *   formatPhoneNumber, 
 *   getOperator 
 * } from '@indodev/toolkit/phone';
 *
 * // Validate
 * const isValid = validatePhoneNumber('081234567890'); // true
 *
 * // Format to international
 * const formatted = formatPhoneNumber('081234567890', 'international');
 * console.log(formatted); // '+62 812-3456-7890'
 *
 * // Detect operator
 * const operator = getOperator('081234567890');
 * console.log(operator); // 'Telkomsel'
 * ```
 *
 * @example
 * Parse phone number:
 * ```typescript
 * import { parsePhoneNumber } from '@indodev/toolkit/phone';
 *
 * const info = parsePhoneNumber('0812-3456-7890');
 * console.log(info);
 * // {
 * //   countryCode: '62',
 * //   operator: 'Telkomsel',
 * //   formatted: {
 * //     international: '+62 812-3456-7890',
 * //     national: '0812-3456-7890',
 * //     e164: '6281234567890'
 * //   },
 * //   isMobile: true
 * // }
 * ```
 *
 * @example
 * Format conversions:
 * ```typescript
 * import { toInternational, toNational, toE164 } from '@indodev/toolkit/phone';
 *
 * const phone = '081234567890';
 * 
 * toInternational(phone); // '+62 812-3456-7890'
 * toNational(phone);      // '0812-3456-7890'
 * toE164(phone);          // '6281234567890'
 * ```
 *
 * @module phone
 * @packageDocumentation
 */

export {
  validatePhoneNumber,
  isMobileNumber,
  isLandlineNumber,
} from './validate';

export {
  formatPhoneNumber,
  toInternational,
  toNational,
  toE164,
  cleanPhoneNumber,
  maskPhoneNumber,
} from './format';

export { parsePhoneNumber, getOperator } from './parse';

export type { PhoneInfo, PhoneFormat, MaskOptions } from './types';