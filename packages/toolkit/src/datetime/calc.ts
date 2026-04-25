/**
 * Date calculation utilities
 *
 * @module datetime/calc
 * @packageDocumentation
 */

import { normalizeDate } from './utils';
import { InvalidDateError } from './types';

/**
 * Check if a year is a leap year.
 *
 * A year is a leap year if:
 * - Divisible by 4, but not by 100, OR
 * - Divisible by 400
 *
 * @param year - The year to check
 * @returns `true` if leap year, `false` otherwise (including invalid inputs)
 *
 * @example
 * ```typescript
 * isLeapYear(2024); // true
 * isLeapYear(2023); // false
 * isLeapYear(1900); // false (divisible by 100 but not 400)
 * isLeapYear(2000); // true (divisible by 400)
 * isLeapYear(NaN);  // false
 * isLeapYear(3.5);  // false (non-integer)
 * ```
 */
export function isLeapYear(year: number): boolean {
  // Return false for non-finite, non-integer, or NaN values
  if (!Number.isFinite(year) || !Number.isInteger(year)) {
    return false;
  }

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get the number of days in a month.
 *
 * Accounts for leap years in February.
 *
 * @param month - Month number (1-12, 1-indexed)
 * @param year - Full year (e.g., 2026)
 * @returns Number of days in the month, or 0 for invalid inputs
 *
 * @example
 * ```typescript
 * daysInMonth(1, 2026);  // 31 (January)
 * daysInMonth(2, 2024);  // 29 (February, leap year)
 * daysInMonth(2, 2023);  // 28 (February, non-leap year)
 * daysInMonth(4, 2026);  // 30 (April)
 * daysInMonth(13, 2026); // 0 (invalid month)
 * daysInMonth(2, NaN);   // 0 (invalid year)
 * ```
 */
export function daysInMonth(month: number, year: number): number {
  // Validate inputs
  if (
    !Number.isFinite(month) ||
    !Number.isInteger(month) ||
    !Number.isFinite(year) ||
    !Number.isInteger(year) ||
    month < 1 ||
    month > 12
  ) {
    return 0;
  }

  // Months with 31 days: Jan(1), Mar(3), May(5), Jul(7), Aug(8), Oct(10), Dec(12)
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    return 31;
  }

  // Months with 30 days: Apr(4), Jun(6), Sep(9), Nov(11)
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }

  // February - check for leap year
  return isLeapYear(year) ? 29 : 28;
}

/**
 * Type guard to check if a value is a valid Date object.
 *
 * Returns `true` only for Date instances that represent a valid date
 * (i.e., not `Invalid Date`). Returns `false` for null, undefined,
 * invalid dates, and non-Date values.
 *
 * @param date - Value to check
 * @returns `true` if valid Date object, `false` otherwise
 *
 * @example
 * ```typescript
 * isValidDate(new Date());           // true
 * isValidDate(new Date('invalid'));  // false
 * isValidDate(null);                 // false
 * isValidDate(undefined);            // false
 * isValidDate('2024-01-01');         // false (string, not Date)
 * isValidDate(1704067200000);        // false (number, not Date)
 * ```
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

/**
 * Check if a date falls on a weekend (Saturday or Sunday).
 *
 * Note: This only checks Saturday/Sunday and does not account for
 * industry-specific Saturday work schedules.
 *
 * @param date - Date object to check
 * @returns `true` if Saturday or Sunday, `false` otherwise
 *
 * @example
 * ```typescript
 * isWeekend(new Date('2026-01-03')); // true (Saturday)
 * isWeekend(new Date('2026-01-04')); // true (Sunday)
 * isWeekend(new Date('2026-01-05')); // false (Monday)
 * ```
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

/**
 * Check if a date falls on a working day (Monday-Friday).
 *
 * Note: This only checks Monday-Friday and does not account for
 * national holidays (holiday lists require periodic updates and
 * are not included per project mandates).
 *
 * @param date - Date object to check
 * @returns `true` if Monday-Friday, `false` otherwise
 *
 * @example
 * ```typescript
 * isWorkingDay(new Date('2026-01-05')); // true (Monday)
 * isWorkingDay(new Date('2026-01-03')); // false (Saturday)
 * isWorkingDay(new Date('2026-01-04')); // false (Sunday)
 * ```
 */
export function isWorkingDay(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday = 1 to Friday = 5
}

/**
 * Calculate age from a birth date.
 *
 * Accounts for leap years and month length variations.
 * Can return as an object { years, months, days } or as a formatted string.
 *
 * @param birthDate - Birth date (Date, string, or number timestamp)
 * @param options - Options for age calculation
 * @returns Age as object or formatted string (based on asString option)
 * @throws {InvalidDateError} If birthDate or fromDate is invalid
 *
 * @example
 * ```typescript
 * // Get age as object
 * getAge('1990-06-15'); // { years: 36, months: 9, days: 21 }
 * getAge(new Date('1990-06-15'), { fromDate: new Date('2024-06-15') });
 * // { years: 34, months: 0, days: 0 }
 *
 * // Get age as string
 * getAge('1990-06-15', { asString: true });
 * // '36 Tahun 9 Bulan 21 Hari'
 *
 * getAge(new Date('2020-01-01'), { fromDate: new Date('2020-01-15'), asString: true });
 * // '15 Hari'
 * ```
 */
export function getAge(
  birthDate: Date | string | number,
  options: { fromDate?: Date | string | number; asString?: boolean } = {}
): { years: number; months: number; days: number } | string {
  const birth = normalizeDate(birthDate);
  const from = options.fromDate ? normalizeDate(options.fromDate) : new Date();

  // Validate: birth date cannot be in the future
  if (birth.getTime() > from.getTime()) {
    throw new InvalidDateError(
      'Birth date cannot be in the future relative to fromDate'
    );
  }

  let years = from.getFullYear() - birth.getFullYear();
  let months = from.getMonth() - birth.getMonth();
  let days = from.getDate() - birth.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = from.getMonth() === 0 ? 11 : from.getMonth() - 1;
    const prevMonthYear =
      from.getMonth() === 0 ? from.getFullYear() - 1 : from.getFullYear();
    days += daysInMonth(prevMonth + 1, prevMonthYear);
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  const result = { years, months, days };

  if (options.asString) {
    return formatAgeString(result);
  }

  return result;
}

/**
 * Format age object as Indonesian string.
 * Omits zero components.
 *
 * @param age - Age object with years, months, days
 * @returns Formatted age string
 */
function formatAgeString(age: {
  years: number;
  months: number;
  days: number;
}): string {
  const parts: string[] = [];

  if (age.years > 0) {
    parts.push(`${age.years} Tahun`);
  }

  if (age.months > 0) {
    parts.push(`${age.months} Bulan`);
  }

  if (age.days > 0) {
    parts.push(`${age.days} Hari`);
  }

  // Handle edge case: all zeros (same day)
  if (parts.length === 0) {
    return '0 Hari';
  }

  return parts.join(' ');
}
