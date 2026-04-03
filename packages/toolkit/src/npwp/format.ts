import { validateNPWP } from './validate';
import { NPWPInfo, MaskOptions } from './types';

/**
 * Formats an NPWP string into standard Indonesian format (99.999.999.9-999.999).
 *
 * @param npwp - The NPWP string to format
 * @returns Formatted NPWP string, or original if invalid
 *
 * @example
 * ```typescript
 * formatNPWP('012345678012000'); // '01.234.567.8-012.000'
 * ```
 */
export function formatNPWP(npwp: string): string {
  if (!validateNPWP(npwp)) {
    return npwp;
  }

  const cleaned = npwp.replace(/[^\d]/g, '');

  if (cleaned.length === 15) {
    return `${cleaned.substring(0, 2)}.${cleaned.substring(
      2,
      5
    )}.${cleaned.substring(5, 8)}.${cleaned.substring(8, 9)}-${cleaned.substring(
      9,
      12
    )}.${cleaned.substring(12, 15)}`;
  }

  // 16-digit NPWP (NIK) usually doesn't have a standard "dots" format like 15-digit
  // but if it's NIK, it might be formatted as NIK elsewhere.
  // For now, return as is or implement a simple format.
  return cleaned;
}

/**
 * Parses an NPWP string into its components.
 *
 * @param npwp - The NPWP string to parse
 * @returns NPWPInfo object, or null if invalid
 */
export function parseNPWP(npwp: string): NPWPInfo | null {
  if (!validateNPWP(npwp)) {
    return null;
  }

  const cleaned = npwp.replace(/[^\d]/g, '');
  const isNikBased = cleaned.length === 16;

  if (isNikBased) {
    return {
      npwp: cleaned,
      type: cleaned.substring(0, 2),
      serial: cleaned.substring(2, 8),
      checksum: cleaned.substring(8, 9),
      taxOfficeCode: cleaned.substring(9, 12),
      branchCode: cleaned.substring(12, 16),
      isNikBased: true,
    };
  }

  return {
    npwp: cleaned,
    type: cleaned.substring(0, 2),
    serial: cleaned.substring(2, 8),
    checksum: cleaned.substring(8, 9),
    taxOfficeCode: cleaned.substring(9, 12),
    branchCode: cleaned.substring(12, 15),
    isNikBased: false,
  };
}

/**
 * Masks an NPWP string for privacy.
 *
 * @param npwp - The NPWP string to mask
 * @param options - Masking options
 * @returns Masked NPWP string
 */
export function maskNPWP(npwp: string, options?: MaskOptions): string {
  if (!npwp) return '';

  const { visibleStart = 2, visibleEnd = 3, maskChar = '*' } = options || {};

  // If input is formatted, we mask the digits but keep the symbols in place
  if (npwp.includes('.') || npwp.includes('-')) {
    let digitCount = 0;
    const digitsOnly = npwp.replace(/[^\d]/g, '');
    const totalDigits = digitsOnly.length;

    return npwp
      .split('')
      .map((char) => {
        if (/\d/.test(char)) {
          digitCount++;
          if (
            digitCount <= visibleStart ||
            digitCount > totalDigits - visibleEnd
          ) {
            return char;
          }
          return maskChar;
        }
        return char;
      })
      .join('');
  }

  const cleaned = npwp.replace(/[^\d]/g, '');

  if (cleaned.length < visibleStart + visibleEnd) {
    return cleaned.replace(/./g, maskChar);
  }

  const start = cleaned.substring(0, visibleStart);
  const end = cleaned.substring(cleaned.length - visibleEnd);
  const middle = maskChar.repeat(cleaned.length - visibleStart - visibleEnd);

  return `${start}${middle}${end}`;
}
