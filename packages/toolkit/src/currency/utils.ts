/**
 * Currency utility functions.
 *
 * @module currency/utils
 * @packageDocumentation
 */

import type { RoundUnit } from './types';

/**
 * Rounds a number to a clean currency amount.
 *
 * Common use case: displaying approximate prices or budgets
 * in clean, rounded numbers.
 *
 * @param amount - The amount to round
 * @param unit - The unit to round to (default: 'ribu')
 * @returns Rounded amount
 *
 * @example
 * Round to thousands:
 * ```typescript
 * roundToClean(1234567, 'ribu'); // 1235000
 * ```
 *
 * @example
 * Round to hundred thousands:
 * ```typescript
 * roundToClean(1234567, 'ratus-ribu'); // 1200000
 * ```
 *
 * @example
 * Round to millions:
 * ```typescript
 * roundToClean(1234567, 'juta'); // 1000000
 * ```
 *
 * @public
 */
export function roundToClean(amount: number, unit: RoundUnit = 'ribu'): number {
  const divisors: Record<RoundUnit, number> = {
    ribu: 1000,
    'ratus-ribu': 100000,
    juta: 1000000,
  };

  const divisor = divisors[unit];

  // Math.round handles both positive and negative numbers
  return Math.round(amount / divisor) * divisor;
}
