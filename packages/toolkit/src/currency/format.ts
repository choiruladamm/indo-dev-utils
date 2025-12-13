/**
 * Currency formatting utilities for Indonesian Rupiah.
 *
 * @module currency/format
 * @packageDocumentation
 */

import type { RupiahOptions } from './types';

/**
 * Formats a number as Indonesian Rupiah currency.
 *
 * Provides flexible formatting options including symbol display,
 * decimal places, and custom separators.
 *
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted Rupiah string
 *
 * @example
 * Basic formatting:
 * ```typescript
 * formatRupiah(1500000); // 'Rp 1.500.000'
 * ```
 *
 * @example
 * With decimals:
 * ```typescript
 * formatRupiah(1500000.50, { decimal: true }); // 'Rp 1.500.000,50'
 * ```
 *
 * @example
 * Without symbol:
 * ```typescript
 * formatRupiah(1500000, { symbol: false }); // '1.500.000'
 * ```
 *
 * @example
 * Custom separators:
 * ```typescript
 * formatRupiah(1500000, { separator: ',' }); // 'Rp 1,500,000'
 * ```
 *
 * @public
 */
export function formatRupiah(amount: number, options?: RupiahOptions): string {
  const {
    symbol = true,
    decimal = false,
    separator = '.',
    decimalSeparator = ',',
    spaceAfterSymbol = true,
  } = options || {};

  // Default precision: 2 for decimals, 0 otherwise
  const precision =
    options?.precision !== undefined ? options.precision : decimal ? 2 : 0;

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  let result: string;

  if (decimal) {
    const factor = Math.pow(10, precision);
    const rounded = Math.round(absAmount * factor) / factor;

    if (precision > 0) {
      const [intPart, decPart] = rounded.toFixed(precision).split('.');
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      result = `${formattedInt}${decimalSeparator}${decPart}`;
    } else {
      // Precision 0: no decimal separator needed
      const intPart = rounded.toString();
      result = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
  } else {
    const intAmount = Math.floor(absAmount);
    result = intAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }

  if (isNegative) {
    result = `-${result}`;
  }

  if (symbol) {
    const space = spaceAfterSymbol ? ' ' : '';
    result = `Rp${space}${result}`;
  }

  return result;
}

/**
 * Formats a number in compact Indonesian format.
 *
 * Uses Indonesian units: ribu, juta, miliar, triliun.
 * Follows Indonesian grammar rules (e.g., "1 juta" not "1,0 juta").
 *
 * @param amount - The amount to format
 * @returns Compact formatted string
 *
 * @example
 * Millions:
 * ```typescript
 * formatCompact(1500000); // 'Rp 1,5 juta'
 * formatCompact(1000000); // 'Rp 1 juta'
 * ```
 *
 * @example
 * Thousands:
 * ```typescript
 * formatCompact(500000); // 'Rp 500 ribu'
 * ```
 *
 * @example
 * Small numbers:
 * ```typescript
 * formatCompact(1500); // 'Rp 1.500'
 * ```
 *
 * @public
 */
export function formatCompact(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);

  let result: string;

  if (abs >= 1_000_000_000_000) {
    result = formatCompactValue(abs / 1_000_000_000_000, 'triliun');
  } else if (abs >= 1_000_000_000) {
    result = formatCompactValue(abs / 1_000_000_000, 'miliar');
  } else if (abs >= 1_000_000) {
    result = formatCompactValue(abs / 1_000_000, 'juta');
  } else if (abs >= 100_000) {
    result = formatCompactValue(abs / 1000, 'ribu');
  } else if (abs >= 1_000) {
    // Below 100k: use standard formatting instead of "ribu"
    result = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    result = abs.toString();
  }

  if (isNegative) {
    result = `-${result}`;
  }

  return `Rp ${result}`;
}

/**
 * Formats a value with Indonesian unit, applying grammar rules.
 *
 * Automatically removes trailing ".0" to follow proper Indonesian grammar.
 * For example: "1 juta" instead of "1,0 juta".
 *
 * @param value - The numeric value to format
 * @param unit - The Indonesian unit (ribu, juta, miliar, triliun)
 * @returns Formatted string with unit
 * @internal
 */
function formatCompactValue(value: number, unit: string): string {
  const rounded = Math.round(value * 10) / 10;

  if (rounded % 1 === 0) {
    return `${rounded.toFixed(0)} ${unit}`;
  }

  return `${rounded.toString().replace('.', ',')} ${unit}`;
}
