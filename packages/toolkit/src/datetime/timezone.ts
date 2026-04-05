/**
 * Timezone utilities for Indonesian locale
 *
 * @module datetime/timezone
 * @packageDocumentation
 */

import { TIMEZONE_MAP } from './constants';

/**
 * Map IANA timezone names or UTC offsets to Indonesian abbreviations (WIB/WITA/WIT).
 *
 * Supported mappings:
 * - UTC+7 / Asia/Jakarta / Asia/Pontianak → "WIB"
 * - UTC+8 / Asia/Makassar / Asia/Denpasar → "WITA"
 * - UTC+9 / Asia/Jayapura → "WIT"
 *
 * @param input - IANA timezone name (case-sensitive), offset in hours, or offset string
 * @returns Indonesian timezone abbreviation or null if not Indonesian
 *
 * @example
 * ```typescript
 * // IANA timezone names
 * getIndonesianTimezone('Asia/Jakarta');    // 'WIB'
 * getIndonesianTimezone('Asia/Makassar');   // 'WITA'
 * getIndonesianTimezone('Asia/Jayapura');   // 'WIT'
 *
 * // Offset as number (hours)
 * getIndonesianTimezone(7);                 // 'WIB'
 * getIndonesianTimezone(8);                 // 'WITA'
 * getIndonesianTimezone(9);                 // 'WIT'
 *
 * // Offset as string
 * getIndonesianTimezone('+07:00');          // 'WIB'
 * getIndonesianTimezone('+0700');           // 'WIB'
 * getIndonesianTimezone('+08:00');          // 'WITA'
 *
 * // Non-Indonesian returns null
 * getIndonesianTimezone('America/New_York'); // null
 * getIndonesianTimezone(-5);                 // null
 * ```
 */
export function getIndonesianTimezone(
  input: string | number
): 'WIB' | 'WITA' | 'WIT' | null {
  // Handle number input (offset in hours)
  if (typeof input === 'number') {
    if (!Number.isFinite(input) || !Number.isInteger(input)) {
      return null;
    }

    switch (input) {
      case 7:
        return 'WIB';
      case 8:
        return 'WITA';
      case 9:
        return 'WIT';
      default:
        return null;
    }
  }

  // Handle string input
  if (typeof input !== 'string') {
    return null;
  }

  const trimmed = input.trim();

  // Check if it's an offset string (+07:00, +0700, -05:00, etc.)
  const offsetMatch = trimmed.match(/^([+-])(\d{2}):?(\d{2})$/);
  if (offsetMatch) {
    const sign = offsetMatch[1];
    const hours = parseInt(offsetMatch[2], 10);
    const minutes = parseInt(offsetMatch[3], 10);

    // Indonesian timezones are all positive (UTC+)
    if (sign === '-') {
      return null;
    }

    // Validate format (must be exactly on the hour, no minutes)
    if (minutes !== 0) {
      return null;
    }

    // Map to Indonesian timezone
    switch (hours) {
      case 7:
        return 'WIB';
      case 8:
        return 'WITA';
      case 9:
        return 'WIT';
      default:
        return null;
    }
  }

  // Check if it's an IANA timezone name
  if (TIMEZONE_MAP[trimmed]) {
    return TIMEZONE_MAP[trimmed];
  }

  // Unknown timezone
  return null;
}
