import { validatePlate, formatPlate } from './utils';
import type { PlateInfo } from './types';

/**
 * Parses an Indonesian license plate number into its component parts.
 *
 * Extracts the prefix (region code), number, and suffix (optional letters)
 * from a plate number. Also determines the plate type and returns a
 * formatted representation.
 *
 * @param plate - The plate string to parse
 * @returns PlateInfo object with extracted components, or null if invalid
 *
 * @example
 * Private plate:
 * ```typescript
 * parsePlate('B 1234 ABC');
 * // {
 * //   prefix: 'B',
 * //   number: '1234',
 * //   suffix: 'ABC',
 * //   type: 'private',
 * //   formatted: 'B 1234 ABC',
 * //   isValid: true
 * // }
 * ```
 *
 * @example
 * Public transport plate:
 * ```typescript
 * parsePlate('AB 1 CD');
 * // {
 * //   prefix: 'AB',
 * //   number: '1',
 * //   suffix: 'CD',
 * //   type: 'public',
 * //   formatted: 'AB 1 CD',
 * //   isValid: true
 * // }
 * ```
 *
 * @example
 * Invalid plate returns null:
 * ```typescript
 * parsePlate('invalid');
 * // null
 * ```
 *
 * @public
 */
export function parsePlate(plate: string): PlateInfo | null {
  if (!plate || typeof plate !== 'string') {
    return null;
  }

  const cleaned = plate.replace(/\s+/g, '').toUpperCase();

  const privatePlateRegex = /^[A-Z]{1,2}\d{1,4}[A-Z]{1,3}$/;
  const publicPlateRegex = /^[A-Z]{1,2}\d{1,4}[A-Z]{0,3}$/;

  if (!privatePlateRegex.test(cleaned) && !publicPlateRegex.test(cleaned)) {
    return null;
  }

  const isValid = validatePlate(plate);

  const match = cleaned.match(/^([A-Z]{1,2})(\d{1,4})([A-Z]{0,3})$/);

  if (!match) {
    return null;
  }

  const prefix = match[1];
  const number = match[2];
  const suffix = match[3] || '';

  const type = determinePlateType(cleaned);

  return {
    prefix,
    number,
    suffix,
    type,
    formatted: formatPlate(plate),
    isValid,
  };
}

/**
 * Determines the type of plate based on the plate string.
 *
 * @internal
 */
function determinePlateType(
  plate: string
): 'private' | 'public' | 'diplomat' | null {
  const cleaned = plate.replace(/\s+/g, '').toUpperCase();

  if (
    cleaned.startsWith('CD') ||
    cleaned.startsWith('CC') ||
    cleaned.startsWith('KL')
  ) {
    return 'diplomat';
  }

  if (/^[A-Z]{1,2}\d{1,4}[A-Z]{0,3}$/.test(cleaned)) {
    const numDigits = cleaned.match(/\d+/)?.[0].length || 0;
    if (numDigits <= 4) {
      return 'private';
    }
  }

  if (/^[A-Z]{1,2}\d{1,4}[A-Z]{0,3}$/.test(cleaned)) {
    return 'public';
  }

  return null;
}
