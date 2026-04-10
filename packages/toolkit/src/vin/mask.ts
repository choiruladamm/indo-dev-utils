import { validateVIN } from './validate';
import type { VINMaskOptions } from './types';

/**
 * Masks a Vehicle Identification Number (VIN) for privacy.
 *
 * By default, masks the serial number section (positions 12-17).
 * VIN must pass validation to be masked.
 *
 * @param vin - The VIN to mask
 * @param options - Mask options (visibleStart, visibleEnd, maskChar)
 * @returns Masked VIN string, or empty string if invalid
 *
 * @example
 * Default masking (masks serial section):
 * ```typescript
 * maskVIN('1HGBH41JXMN109186'); // '1HGBH41JXMN******'
 * ```
 *
 * @example
 * Custom visibility:
 * ```typescript
 * maskVIN('1HGBH41JXMN109186', { visibleEnd: 2 }); // '1HGBH41JXMN109***'
 * maskVIN('1HGBH41JXMN109186', { visibleEnd: 6 }); // '1HGBH41JXMN******'
 * ```
 *
 * @example
 * Custom mask character:
 * ```typescript
 * maskVIN('1HGBH41JXMN109186', { maskChar: '#' }); // '1HGBH41JXMN######'
 * ```
 *
 * @example
 * Invalid VIN returns empty string:
 * ```typescript
 * maskVIN('invalid');   // ''
 * maskVIN('');          // ''
 * ```
 *
 * @public
 */
export function maskVIN(vin: string, options: VINMaskOptions = {}): string {
  if (!vin || typeof vin !== 'string') {
    return '';
  }

  if (!validateVIN(vin)) {
    return '';
  }

  const { visibleStart = 11, visibleEnd = 0, maskChar = '*' } = options;

  if (visibleStart < 0 || visibleEnd < 0) {
    return '';
  }

  const normalized = vin.toUpperCase();
  const totalLength = normalized.length;

  if (visibleStart + visibleEnd >= totalLength) {
    return normalized;
  }

  const maskLength = totalLength - visibleStart - visibleEnd;
  const mask = maskChar.repeat(maskLength);

  return (
    normalized.substring(0, visibleStart) +
    mask +
    normalized.substring(visibleStart + maskLength)
  );
}
