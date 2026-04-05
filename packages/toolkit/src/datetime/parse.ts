/**
 * Date parsing utilities for Indonesian formats
 *
 * @module datetime/parse
 * @packageDocumentation
 */

import { daysInMonth } from './calc';

/**
 * Parse a date string in Indonesian format (DD-MM-YYYY) or ISO format (YYYY-MM-DD).
 *
 * Strict parsing rules:
 * - Accepts delimiters: `/`, `-`, `.`
 * - DD-MM-YYYY format: Day first (1-31), 4-digit year required
 * - ISO auto-detection: If first segment is 4 digits AND > 31, treated as YYYY-MM-DD
 * - Leap year validation: Feb 29 is only valid in leap years
 * - 2-digit years NOT supported
 * - Time components NOT supported
 *
 * @param dateStr - Date string to parse
 * @returns Date object if valid, `null` if invalid
 *
 * @example
 * ```typescript
 * // Indonesian format (DD-MM-YYYY)
 * parseDate('02-01-2026');    // Date(2026, 0, 2) - Jan 2, 2026
 * parseDate('02/01/2026');    // Date(2026, 0, 2)
 * parseDate('02.01.2026');    // Date(2026, 0, 2)
 *
 * // ISO format auto-detected (YYYY-MM-DD)
 * parseDate('2026-01-02');    // Date(2026, 0, 2)
 *
 * // Invalid inputs return null
 * parseDate('29-02-2023');    // null (not a leap year)
 * parseDate('02-01-26');      // null (2-digit year)
 * parseDate('02-01-2026 14:30'); // null (time component)
 * parseDate('invalid');       // null
 * ```
 */
export function parseDate(dateStr: string): Date | null {
  // Trim whitespace
  const trimmed = dateStr.trim();

  // Reject if empty
  if (!trimmed) {
    return null;
  }

  // Reject if contains time component (has space or colon)
  if (trimmed.includes(' ') || trimmed.includes(':')) {
    return null;
  }

  // Split by supported delimiters: / - .
  const parts = trimmed.split(/[-/.]/);

  // Must have exactly 3 parts
  if (parts.length !== 3) {
    return null;
  }

  // Parse all segments as integers
  const nums = parts.map((p) => parseInt(p, 10));

  // Check for NaN or negative values
  if (nums.some((n) => Number.isNaN(n) || n < 0)) {
    return null;
  }

  // Check for 2-digit years (any segment < 100 after the first position)
  // First segment can be < 100 (day) or > 31 (year in ISO format)
  const [first, second, third] = nums;

  // Determine format: ISO (YYYY-MM-DD) or Indonesian (DD-MM-YYYY)
  let day: number;
  let month: number;
  let year: number;

  // ISO format detection: first segment is 4 digits AND > 31 (must be a year)
  if (first > 999 && first > 31) {
    // ISO format: YYYY-MM-DD
    year = first;
    month = second;
    day = third;
  } else {
    // Indonesian format: DD-MM-YYYY
    // Validate that third segment is 4 digits (year)
    if (third < 1000) {
      return null; // 2-digit year not supported
    }

    day = first;
    month = second;
    year = third;
  }

  // Validate month range (1-12)
  if (month < 1 || month > 12) {
    return null;
  }

  // Validate year is reasonable (positive and 4 digits)
  if (year < 1000 || year > 9999) {
    return null;
  }

  // Validate day against month length
  const maxDays = daysInMonth(month, year);
  if (maxDays === 0 || day < 1 || day > maxDays) {
    return null;
  }

  // Create date (month is 0-indexed in JS Date)
  const date = new Date(year, month - 1, day);

  // Final validation: ensure the date was created correctly
  // (catches edge cases like Feb 30 being converted to Mar 2)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}
