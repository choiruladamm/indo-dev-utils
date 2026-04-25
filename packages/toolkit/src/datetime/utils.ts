/**
 * Internal utilities for datetime module
 *
 * @module datetime/utils
 */

import { InvalidDateError } from './types';

/**
 * Normalize various date input types to a Date object.
 *
 * @param date - Date input (Date, string, or number timestamp)
 * @returns Date object
 * @throws {InvalidDateError} If the input cannot be parsed to a valid date
 */
export function normalizeDate(date: Date | string | number): Date {
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