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
