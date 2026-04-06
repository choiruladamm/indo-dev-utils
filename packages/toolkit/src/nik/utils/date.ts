/**
 * Shared date parsing and validation utilities for NIK module.
 *
 * @module nik/utils/date
 * @packageDocumentation
 */

/**
 * Result of parsing date components from a NIK string.
 *
 * @public
 */
export interface ParsedNIKDate {
  /** 2-digit year code (00-99) from NIK positions 7-8 */
  year: number;
  /** Full 4-digit year (1900-1999 or 2000-2099) */
  fullYear: number;
  /** Month (1-12) from NIK positions 9-10 */
  month: number;
  /** Actual day (1-31), decoded from encoded day */
  day: number;
  /** Gender derived from day encoding */
  gender: 'male' | 'female';
  /** Original encoded day (1-31 for male, 41-71 for female) */
  dayEncoded: number;
}

/**
 * Parses date components from a NIK string.
 *
 * Extracts year, month, and encoded day from positions 7-12 of the NIK.
 * For females, the day is encoded as (actual day + 40).
 *
 * @param nik - 16-digit NIK string
 * @returns ParsedNIKDate or null if NIK format is invalid
 *
 * @example
 * ```typescript
 * const result = parseNIKDate('3201018901310123');
 * // { year: 89, fullYear: 1989, month: 1, day: 31, gender: 'male', dayEncoded: 31 }
 * ```
 *
 * @public
 */
export function parseNIKDate(nik: string): ParsedNIKDate | null {
  if (nik.length !== 16) {
    return null;
  }

  const yearStr = nik.substring(6, 8);
  const monthStr = nik.substring(8, 10);
  const dayEncodedStr = nik.substring(10, 12);

  const year = parseInt(yearStr, 10);
  if (isNaN(year)) return null;

  const fullYear = year > 30 ? 1900 + year : 2000 + year;

  const month = parseInt(monthStr, 10);
  if (isNaN(month)) return null;

  const dayEncoded = parseInt(dayEncodedStr, 10);
  if (isNaN(dayEncoded)) return null;

  const gender: 'male' | 'female' = dayEncoded > 40 ? 'female' : 'male';
  const day = dayEncoded > 40 ? dayEncoded - 40 : dayEncoded;

  return { year, fullYear, month, day, gender, dayEncoded };
}

/**
 * Validates if year/month/day form a valid calendar date.
 *
 * Uses JavaScript's Date object to check if the date actually exists
 * (handles leap years, invalid month/day combinations).
 *
 * @param year - Full 4-digit year
 * @param month - Month (1-12)
 * @param day - Day (1-31)
 * @returns true if valid calendar date
 *
 * @example
 * ```typescript
 * validateNIKDateComponents(2024, 2, 29); // true (leap year)
 * validateNIKDateComponents(2023, 2, 29); // false
 * validateNIKDateComponents(2024, 13, 1); // false
 * ```
 *
 * @public
 */
export function validateNIKDateComponents(
  year: number,
  month: number,
  day: number
): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const testDate = new Date(year, month - 1, day);
  return (
    testDate.getFullYear() === year &&
    testDate.getMonth() === month - 1 &&
    testDate.getDate() === day
  );
}
