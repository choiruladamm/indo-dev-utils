/**
 * Date formatting utilities for Indonesian locale
 *
 * @module datetime/format
 * @packageDocumentation
 */

import {
  InvalidDateError,
  InvalidDateRangeError,
  type DateStyle,
} from './types';
import { MONTH_NAMES, MONTH_NAMES_SHORT, DAY_NAMES } from './constants';

/**
 * Normalize various date input types to a Date object.
 *
 * @param date - Date input (Date, string, or number timestamp)
 * @returns Date object
 * @throws {InvalidDateError} If the input cannot be parsed to a valid date
 */
function normalizeDate(date: Date | string | number): Date {
  let result: Date;

  if (date instanceof Date) {
    result = date;
  } else if (typeof date === 'number') {
    // Assume milliseconds timestamp
    result = new Date(date);
  } else if (typeof date === 'string') {
    result = new Date(date);
  } else {
    throw new InvalidDateError('Date must be a Date, string, or number');
  }

  // Validate the result
  if (Number.isNaN(result.getTime())) {
    throw new InvalidDateError(`Unable to parse date: ${String(date)}`);
  }

  return result;
}

/**
 * Format a date with Indonesian locale.
 *
 * @param date - Date to format (Date, string, or number timestamp in milliseconds)
 * @param style - Formatting style (default: 'long')
 * @returns Formatted date string
 * @throws {InvalidDateError} If the date is invalid
 *
 * @example
 * ```typescript
 * formatDate(new Date('2026-01-02'), 'full');   // 'Jumat, 2 Januari 2026'
 * formatDate(new Date('2026-01-02'), 'long');   // '2 Januari 2026'
 * formatDate(new Date('2026-01-02'), 'medium'); // '2 Jan 2026'
 * formatDate(new Date('2026-01-02'), 'short');  // '02/01/2026'
 * formatDate(new Date('2026-01-02'), 'weekday'); // 'Jumat'
 * formatDate(new Date('2026-01-02'), 'month');  // 'Januari'
 * ```
 */
export function formatDate(
  date: Date | string | number,
  style: DateStyle = 'long'
): string {
  const d = normalizeDate(date);

  const day = d.getDate();
  const month = d.getMonth() + 1; // 1-indexed
  const year = d.getFullYear();
  const dayOfWeek = d.getDay(); // 0 = Sunday

  switch (style) {
    case 'full':
      return `${DAY_NAMES[dayOfWeek]}, ${day} ${MONTH_NAMES[month]} ${year}`;

    case 'long':
      return `${day} ${MONTH_NAMES[month]} ${year}`;

    case 'medium':
      return `${day} ${MONTH_NAMES_SHORT[month]} ${year}`;

    case 'short': {
      const dd = String(day).padStart(2, '0');
      const mm = String(month).padStart(2, '0');
      return `${dd}/${mm}/${year}`;
    }

    case 'weekday':
      return DAY_NAMES[dayOfWeek];

    case 'month':
      return MONTH_NAMES[month];

    default:
      throw new InvalidDateError(`Unknown format style: ${style}`);
  }
}

/**
 * Format a date range with Indonesian locale and smart redundancy removal.
 *
 * Removes redundant month/year information when dates share them.
 *
 * @param start - Start date
 * @param end - End date
 * @param style - Formatting style (default: 'long')
 * @returns Formatted date range string
 * @throws {InvalidDateError} If either date is invalid
 * @throws {InvalidDateRangeError} If end date is before start date
 *
 * @example
 * ```typescript
 * // Same day
 * formatDateRange(
 *   new Date('2026-01-02'),
 *   new Date('2026-01-02')
 * ); // '2 Januari 2026'
 *
 * // Same month & year
 * formatDateRange(
 *   new Date('2026-01-02'),
 *   new Date('2026-01-05')
 * ); // '2 - 5 Januari 2026'
 *
 * // Same year
 * formatDateRange(
 *   new Date('2026-01-30'),
 *   new Date('2026-02-02')
 * ); // '30 Januari - 2 Februari 2026'
 *
 * // Different year
 * formatDateRange(
 *   new Date('2025-12-30'),
 *   new Date('2026-01-02')
 * ); // '30 Desember 2025 - 2 Januari 2026'
 * ```
 */
export function formatDateRange(
  start: Date,
  end: Date,
  style: Exclude<DateStyle, 'weekday' | 'month'> = 'long'
): string {
  const s = normalizeDate(start);
  const e = normalizeDate(end);

  // Validate range
  if (e.getTime() < s.getTime()) {
    throw new InvalidDateRangeError();
  }

  // Short style: no redundancy removal, always full format
  if (style === 'short') {
    return `${formatDate(s, 'short')} - ${formatDate(e, 'short')}`;
  }

  // Full style: full weekday + date for both
  if (style === 'full') {
    return `${formatDate(s, 'full')} - ${formatDate(e, 'full')}`;
  }

  // Extract components
  const sDay = s.getDate();
  const eDay = e.getDate();
  const sMonth = s.getMonth() + 1;
  const eMonth = e.getMonth() + 1;
  const sYear = s.getFullYear();
  const eYear = e.getFullYear();

  // Same day: show single date
  if (sDay === eDay && sMonth === eMonth && sYear === eYear) {
    return formatDate(s, style);
  }

  // Different year: full format for both
  if (sYear !== eYear) {
    return `${formatDate(s, style)} - ${formatDate(e, style)}`;
  }

  // Same year, different month: omit year from start date
  if (sMonth !== eMonth) {
    if (style === 'long') {
      return `${sDay} ${MONTH_NAMES[sMonth]} - ${eDay} ${MONTH_NAMES[eMonth]} ${eYear}`;
    }
    // medium style
    return `${sDay} ${MONTH_NAMES_SHORT[sMonth]} - ${eDay} ${MONTH_NAMES_SHORT[eMonth]} ${eYear}`;
  }

  // Same month & year: show range with single month/year
  if (style === 'long') {
    return `${sDay} - ${eDay} ${MONTH_NAMES[eMonth]} ${eYear}`;
  }
  // medium style
  return `${sDay} - ${eDay} ${MONTH_NAMES_SHORT[eMonth]} ${eYear}`;
}
