import { PLATE_REGIONS } from './regions';

/**
 * Validates an Indonesian license plate number format.
 * Format: [1-2 letters] [1-4 digits] [1-3 letters]
 *
 * @param plate - The plate number string to validate
 * @returns `true` if valid, `false` otherwise
 *
 * @example
 * ```typescript
 * validatePlate('B 1234 ABC'); // true
 * validatePlate('AB 1 CD'); // true
 * ```
 */
export function validatePlate(plate: string): boolean {
  if (!plate || typeof plate !== 'string') {
    return false;
  }

  const cleaned = plate.replace(/\s+/g, '').toUpperCase();
  const regex = /^[A-Z]{1,2}\d{1,4}[A-Z]{1,3}$/;

  return regex.test(cleaned);
}

/**
 * Gets the region name from a license plate number.
 *
 * @param plate - The plate number
 * @returns Region name or null if not found
 */
export function getRegionFromPlate(plate: string): string | null {
  if (!plate || typeof plate !== 'string') {
    return null;
  }

  const cleaned = plate.replace(/\s+/g, '').toUpperCase();
  const match = cleaned.match(/^([A-Z]{1,2})/);

  if (!match) {
    return null;
  }

  const prefix = match[1];
  return PLATE_REGIONS[prefix] || null;
}

/**
 * Formats a license plate number with spaces (e.g., B 1234 ABC).
 *
 * @param plate - The plate number
 * @returns Formatted plate string
 */
export function formatPlate(plate: string): string {
  if (!plate) return '';

  const cleaned = plate.replace(/\s+/g, '').toUpperCase();
  const match = cleaned.match(/^([A-Z]{1,2})(\d{1,4})([A-Z]{1,3})$/);

  if (!match) {
    return cleaned;
  }

  return `${match[1]} ${match[2]} ${match[3]}`;
}
