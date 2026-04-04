/**
 * Currency utility functions.
 *
 * @module currency/utils
 * @packageDocumentation
 */

import { formatRupiah } from './format';
import type { RoundUnit, RupiahOptions } from './types';

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

/**
 * Formats a number as Indonesian Rupiah in accounting style.
 * Negative numbers are wrapped in parentheses.
 *
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted accounting string
 *
 * @example
 * ```typescript
 * formatAccounting(-1500000); // '(Rp 1.500.000)'
 * ```
 */
export function formatAccounting(
  amount: number,
  options?: RupiahOptions
): string {
  const isNegative = amount < 0;
  const formatted = formatRupiah(Math.abs(amount), options);

  if (isNegative) {
    return `(${formatted})`;
  }

  return formatted;
}

/**
 * Calculates tax (PPN) for a given amount.
 *
 * @param amount - The base amount
 * @param rate - The tax rate (e.g., 0.11 for 11% PPN)
 * @returns The calculated tax amount
 *
 * @example
 * ```typescript
 * calculateTax(1000000, 0.11); // 110000
 * ```
 */
export function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

/**
 * Helper to ensure a string or number has the 'Rp ' prefix.
 * If already prefixed, it returns the input as is.
 *
 * @param amount - The amount or formatted string
 * @returns String with Rupiah prefix
 */
export function addRupiahSymbol(amount: string | number): string {
  if (typeof amount === 'number') {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp ${formatted}`;
  }

  if (amount.trim().startsWith('Rp')) {
    return amount.trim();
  }

  return `Rp ${amount.trim()}`;
}
