/**
 * Currency module types for Indonesian Rupiah utilities.
 *
 * @module currency/types
 * @packageDocumentation
 */

/**
 * Options for formatting Rupiah currency.
 *
 * @example
 * Default formatting:
 * ```typescript
 * const options: RupiahOptions = {
 *   symbol: true,
 *   decimal: false,
 *   separator: '.',
 * };
 * formatRupiah(1500000, options); // 'Rp 1.500.000'
 * ```
 *
 * @example
 * With decimals:
 * ```typescript
 * const options: RupiahOptions = {
 *   symbol: true,
 *   decimal: true,
 *   precision: 2,
 * };
 * formatRupiah(1500000.50, options); // 'Rp 1.500.000,50'
 * ```
 *
 * @public
 */
export interface RupiahOptions {
  /**
   * Whether to show 'Rp' symbol.
   *
   * @defaultValue true
   */
  symbol?: boolean;

  /**
   * Whether to show decimal places.
   *
   * @defaultValue false
   */
  decimal?: boolean;

  /**
   * Thousands separator character.
   *
   * @defaultValue '.'
   *
   * @example
   * ```typescript
   * '.' // Indonesian standard
   * ',' // International standard
   * ' ' // Space separator
   * ```
   */
  separator?: string;

  /**
   * Decimal separator character.
   *
   * @defaultValue ','
   *
   * @example
   * ```typescript
   * ',' // Indonesian standard
   * '.' // International standard
   * ```
   */
  decimalSeparator?: string;

  /**
   * Number of decimal places to show.
   *
   * @defaultValue 0
   */
  precision?: number;

  /**
   * Whether to add space after 'Rp' symbol.
   *
   * @defaultValue true
   *
   * @example
   * ```typescript
   * true  // 'Rp 1.500.000'
   * false // 'Rp1.500.000'
   * ```
   */
  spaceAfterSymbol?: boolean;
}

/**
 * Options for converting numbers to Indonesian words (terbilang).
 *
 * @example
 * Default:
 * ```typescript
 * toWords(1500000); // 'satu juta lima ratus ribu rupiah'
 * ```
 *
 * @example
 * Uppercase:
 * ```typescript
 * toWords(1500000, { uppercase: true });
 * // 'Satu juta lima ratus ribu rupiah'
 * ```
 *
 * @example
 * Without currency suffix:
 * ```typescript
 * toWords(1500000, { withCurrency: false });
 * // 'satu juta lima ratus ribu'
 * ```
 *
 * @public
 */
export interface WordOptions {
  /**
   * Whether to capitalize the first letter.
   *
   * @defaultValue false
   *
   * @example
   * ```typescript
   * false // 'satu juta'
   * true  // 'Satu juta'
   * ```
   */
  uppercase?: boolean;

  /**
   * Whether to add 'rupiah' at the end.
   *
   * @defaultValue true
   *
   * @example
   * ```typescript
   * true  // 'satu juta rupiah'
   * false // 'satu juta'
   * ```
   */
  withCurrency?: boolean;
}

/**
 * Unit for rounding currency amounts.
 *
 * Common Indonesian currency rounding units:
 * - `'ribu'`: Round to thousands (1.000)
 * - `'ratus-ribu'`: Round to hundred thousands (100.000)
 * - `'juta'`: Round to millions (1.000.000)
 *
 * @example
 * ```typescript
 * roundToClean(1234567, 'ribu');      // 1235000
 * roundToClean(1234567, 'ratus-ribu'); // 1200000
 * roundToClean(1234567, 'juta');       // 1000000
 * ```
 *
 * @public
 */
export type RoundUnit = 'ribu' | 'ratus-ribu' | 'juta';