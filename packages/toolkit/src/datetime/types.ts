/**
 * Custom error classes for datetime module
 *
 * @module datetime/types
 * @packageDocumentation
 */

/**
 * Error thrown when an invalid date is provided to a function.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   formatDate('invalid');
 * } catch (error) {
 *   if (error instanceof InvalidDateError) {
 *     console.log(error.code); // 'INVALID_DATE'
 *   }
 * }
 * ```
 */
export class InvalidDateError extends Error {
  /** Error code for programmatic identification */
  readonly code = 'INVALID_DATE' as const;

  constructor(message: string = 'Invalid date provided') {
    super(message);
    this.name = 'InvalidDateError';
  }
}

/**
 * Error thrown when an invalid date range is provided.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   formatDateRange(new Date('2026-01-05'), new Date('2026-01-01'));
 * } catch (error) {
 *   if (error instanceof InvalidDateRangeError) {
 *     console.log(error.code); // 'INVALID_DATE_RANGE'
 *   }
 * }
 * ```
 */
export class InvalidDateRangeError extends Error {
  /** Error code for programmatic identification */
  readonly code = 'INVALID_DATE_RANGE' as const;

  constructor(message: string = 'End date must be after start date') {
    super(message);
    this.name = 'InvalidDateRangeError';
  }
}

/**
 * Date formatting style options
 */
export type DateStyle =
  | 'full'
  | 'long'
  | 'medium'
  | 'short'
  | 'weekday'
  | 'month';

/**
 * Options for getAge function
 */
export interface AgeOptions {
  /**
   * Reference date to calculate age from.
   * Defaults to current date at function call time.
   * @defaultValue new Date()
   */
  fromDate?: Date | string | number;

  /**
   * Return age as formatted string instead of object.
   * @defaultValue false
   */
  asString?: boolean;
}

/**
 * Age calculation result object
 */
export interface AgeResult {
  /** Full years */
  years: number;
  /** Remaining months (0-11) */
  months: number;
  /** Remaining days (0-30) */
  days: number;
}

/**
 * The five-day Javanese market cycle (pancawara / pasaran).
 *
 * Listed in canonical order starting from the wetonan anchor (Legi).
 */
export type Pasaran =
  | 'Legi'
  | 'Pahing'
  | 'Pon'
  | 'Wage'
  | 'Kliwon';

/**
 * Indonesian weekday name (saptawara).
 *
 * Listed in canonical Monday-first order. For indexing against the
 * wetonan anchor (which starts on Jumat / Friday) use the
 * `WETON_WEEKDAY_ORDER` constant exported from `weton.ts`.
 */
export type IndonesianWeekday =
  | 'Senin'
  | 'Selasa'
  | 'Rabu'
  | 'Kamis'
  | 'Jumat'
  | 'Sabtu'
  | 'Minggu';

/**
 * Javanese market-day information for a given Gregorian date.
 *
 * The `neptu` value is the sum of the weekday neptu and the pasaran
 * neptu and always lies in the inclusive range `[7, 18]`.
 *
 * @see getWeton
 */
export interface Weton {
  /** The five-day market cycle position */
  pasaran: Pasaran;
  /** The Indonesian weekday name */
  weekday: IndonesianWeekday;
  /** Combined neptu value, integer in [7, 18] */
  neptu: number;
}
