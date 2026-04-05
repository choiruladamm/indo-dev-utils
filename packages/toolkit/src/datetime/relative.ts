/**
 * Relative time formatting for Indonesian locale
 *
 * @module datetime/relative
 * @packageDocumentation
 */

import { InvalidDateError } from './types';
import { formatDate } from './format';

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
    result = new Date(date);
  } else if (typeof date === 'string') {
    result = new Date(date);
  } else {
    throw new InvalidDateError('Date must be a Date, string, or number');
  }

  if (Number.isNaN(result.getTime())) {
    throw new InvalidDateError(`Unable to parse date: ${String(date)}`);
  }

  return result;
}

/**
 * Format a date as relative time in Indonesian.
 *
 * Returns human-readable relative time like "Baru saja", "X menit yang lalu",
 * "Kemarin", or falls back to formatted date for older dates.
 *
 * @param date - Date to format (Date, string, or number timestamp in milliseconds)
 * @param baseDate - Reference date for comparison (default: current date)
 * @returns Relative time string in Indonesian
 * @throws {InvalidDateError} If either date is invalid
 *
 * @example
 * ```typescript
 * // Assuming today is 2026-01-02 12:00:00
 * toRelativeTime(new Date('2026-01-02 11:59:00')); // 'Baru saja'
 * toRelativeTime(new Date('2026-01-02 11:00:00')); // '1 jam yang lalu'
 * toRelativeTime(new Date('2026-01-01 12:00:00')); // 'Kemarin'
 * toRelativeTime(new Date('2025-12-30 12:00:00')); // '3 hari yang lalu'
 * toRelativeTime(new Date('2025-12-01 12:00:00')); // '1 Desember 2025'
 * ```
 */
export function toRelativeTime(
  date: Date | string | number,
  baseDate: Date = new Date()
): string {
  const d = normalizeDate(date);
  const base = normalizeDate(baseDate);

  const diffMs = d.getTime() - base.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Exact match
  if (diffMs === 0) {
    return 'Sekarang';
  }

  // Future dates
  if (diffMs > 0) {
    // < 1 minute
    if (diffSec < 60) {
      return 'Baru saja';
    }

    // < 60 minutes
    if (diffMin < 60) {
      return `${diffMin} menit lagi`;
    }

    // < 24 hours
    if (diffHour < 24) {
      return `${diffHour} jam lagi`;
    }

    // 1 day (24-48 hours)
    if (diffHour < 48) {
      return 'Besok';
    }

    // 2-30 days
    if (diffDay <= 30) {
      return `${diffDay} hari lagi`;
    }

    // > 30 days: fallback to formatted date
    return formatDate(d, 'long');
  }

  // Past dates
  const absDiffSec = Math.abs(diffSec);
  const absDiffMin = Math.abs(diffMin);
  const absDiffHour = Math.abs(diffHour);
  const absDiffDay = Math.abs(diffDay);

  // < 1 minute
  if (absDiffSec < 60) {
    return 'Baru saja';
  }

  // < 60 minutes
  if (absDiffMin < 60) {
    return `${absDiffMin} menit yang lalu`;
  }

  // < 24 hours
  if (absDiffHour < 24) {
    return `${absDiffHour} jam yang lalu`;
  }

  // 1 day (24-48 hours)
  if (absDiffHour < 48) {
    return 'Kemarin';
  }

  // 2-30 days
  if (absDiffDay <= 30) {
    return `${absDiffDay} hari yang lalu`;
  }

  // > 30 days: fallback to formatted date
  return formatDate(d, 'long');
}
