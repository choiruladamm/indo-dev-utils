/**
 * DateTime utilities for Indonesian developers.
 *
 * Provides formatting, parsing, and calculation functions for Indonesian
 * date/time operations including:
 * - Date formatting with Indonesian month/day names
 * - Strict DD-MM-YYYY date parsing
 * - Relative time in Indonesian ("X menit yang lalu")
 * - Age calculations with leap year support
 * - Indonesian timezone mapping (WIB/WITA/WIT)
 *
 * @example
 * Basic usage:
 * ```typescript
 * import {
 *   formatDate,
 *   parseDate,
 *   toRelativeTime,
 *   getAge,
 *   isLeapYear,
 *   daysInMonth,
 *   isValidDate,
 *   isWeekend,
 *   isWorkingDay,
 *   getIndonesianTimezone
 * } from '@indodev/toolkit/datetime';
 *
 * // Format date
 * formatDate(new Date(), 'long'); // '5 April 2026'
 *
 * // Parse Indonesian date format
 * parseDate('02-01-2026'); // Date(2026, 0, 2)
 *
 * // Relative time
 * toRelativeTime(new Date(Date.now() - 3600000)); // '1 jam yang lalu'
 *
 * // Calculate age
 * getAge('1990-06-15', { asString: true }); // '35 Tahun 9 Bulan'
 *
 * // Check leap year
 * isLeapYear(2024); // true
 *
 * // Get days in month
 * daysInMonth(2, 2024); // 29
 *
 * // Validate Date object
 * isValidDate(new Date()); // true
 *
 * // Check weekend/working day
 * isWeekend(new Date('2026-01-03')); // true (Saturday)
 * isWorkingDay(new Date('2026-01-05')); // true (Monday)
 *
 * // Get Indonesian timezone
 * getIndonesianTimezone('Asia/Jakarta'); // 'WIB'
 * getIndonesianTimezone(8); // 'WITA'
 * ```
 *
 * @module datetime
 * @packageDocumentation
 */

// Error types
export { InvalidDateError, InvalidDateRangeError } from './types';
export type { DateStyle, AgeOptions, AgeResult } from './types';

// Constants
export {
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
  DAY_NAMES,
  DAY_NAMES_SHORT,
  TIMEZONE_MAP,
  VALID_UTC_OFFSETS,
} from './constants';

// Calculation utilities
export {
  isLeapYear,
  daysInMonth,
  isValidDate,
  isWeekend,
  isWorkingDay,
  getAge,
} from './calc';

// Parsing
export { parseDate } from './parse';

// Formatting
export { formatDate, formatDateRange } from './format';

// Relative time
export { toRelativeTime } from './relative';

// Timezone
export { getIndonesianTimezone } from './timezone';
