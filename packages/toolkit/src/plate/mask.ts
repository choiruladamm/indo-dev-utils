import { formatPlate, validatePlate } from './utils';
import type { PlateMaskOptions } from './types';

/**
 * Masks a license plate number for privacy.
 *
 * By default, shows 1 character at start and 3 at end, masking the middle.
 * Returns the masked cleaned string (without spaces).
 *
 * @param plate - The license plate to mask
 * @param options - Mask options (visibleStart, visibleEnd, maskChar)
 * @returns Masked plate string, or empty string if invalid
 *
 * @example
 * Default masking:
 * ```typescript
 * maskPlate('B 1234 ABC'); // 'B****ABC'
 * maskPlate('DA 1234 T');  // 'DA****T'
 * ```
 *
 * @example
 * Custom visibility:
 * ```typescript
 * maskPlate('B 1234 ABC', { visibleStart: 2 }); // 'B1***ABC'
 * maskPlate('B 1234 ABC', { visibleEnd: 4 });  // 'B***4ABC'
 * ```
 *
 * @example
 * Custom mask character:
 * ```typescript
 * maskPlate('B 1234 ABC', { maskChar: '#' }); // 'B####ABC'
 * ```
 *
 * @example
 * Empty or invalid input:
 * ```typescript
 * maskPlate('');      // ''
 * maskPlate('invalid'); // ''
 * ```
 *
 * @public
 */
export function maskPlate(
  plate: string,
  options: PlateMaskOptions = {}
): string {
  if (!plate || typeof plate !== 'string') {
    return '';
  }

  if (!validatePlate(plate)) {
    return '';
  }

  const formatted = formatPlate(plate);
  if (!formatted) {
    return '';
  }

  const { visibleStart = 1, visibleEnd = 3, maskChar = '*' } = options;

  if (visibleStart < 0 || visibleEnd < 0) {
    return '';
  }

  const cleaned = formatted.replace(/\s+/g, '');
  const totalLength = cleaned.length;

  if (visibleStart + visibleEnd >= totalLength) {
    return cleaned;
  }

  const maskLength = totalLength - visibleStart - visibleEnd;
  const mask = maskChar.repeat(maskLength);

  return (
    cleaned.substring(0, visibleStart) +
    mask +
    cleaned.substring(visibleStart + maskLength)
  );
}
