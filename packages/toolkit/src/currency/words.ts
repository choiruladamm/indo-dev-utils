/**
 * Convert numbers to Indonesian words (terbilang).
 *
 * @module currency/words
 * @packageDocumentation
 */

import type { WordOptions } from './types';

/**
 * Basic Indonesian number words (0-9).
 * @internal
 */
const BASIC_NUMBERS = [
  '',
  'satu',
  'dua',
  'tiga',
  'empat',
  'lima',
  'enam',
  'tujuh',
  'delapan',
  'sembilan',
];

/**
 * Indonesian words for 10-19.
 * @internal
 */
const TEENS = [
  'sepuluh',
  'sebelas',
  'dua belas',
  'tiga belas',
  'empat belas',
  'lima belas',
  'enam belas',
  'tujuh belas',
  'delapan belas',
  'sembilan belas',
];

/**
 * Indonesian words for tens (20, 30, 40, etc).
 * @internal
 */
const TENS = [
  '',
  '',
  'dua puluh',
  'tiga puluh',
  'empat puluh',
  'lima puluh',
  'enam puluh',
  'tujuh puluh',
  'delapan puluh',
  'sembilan puluh',
];

/**
 * Converts a number to Indonesian words (terbilang).
 *
 * Supports numbers up to trillions (triliun).
 * Follows Indonesian language rules for number pronunciation.
 *
 * Special rules:
 * - 1 = "satu" in most cases, but "se-" for 100, 1000
 * - 11 = "sebelas" (not "satu belas")
 * - 100 = "seratus" (not "satu ratus")
 * - 1000 = "seribu" (not "satu ribu")
 *
 * @param amount - The number to convert
 * @param options - Conversion options
 * @returns Indonesian words representation
 *
 * @example
 * Basic numbers:
 * ```typescript
 * toWords(123); // 'seratus dua puluh tiga rupiah'
 * ```
 *
 * @example
 * Large numbers:
 * ```typescript
 * toWords(1500000); // 'satu juta lima ratus ribu rupiah'
 * ```
 *
 * @example
 * With options:
 * ```typescript
 * toWords(1500000, { uppercase: true });
 * // 'Satu juta lima ratus ribu rupiah'
 *
 * toWords(1500000, { withCurrency: false });
 * // 'satu juta lima ratus ribu'
 * ```
 *
 * @public
 */
export function toWords(amount: number, options?: WordOptions): string {
  const { uppercase = false, withCurrency = true } = options || {};

  if (amount === 0) {
    let result = 'nol';
    if (withCurrency) result += ' rupiah';
    return uppercase ? capitalize(result) : result;
  }

  const isNegative = amount < 0;
  const absAmount = Math.floor(Math.abs(amount));

  let words = '';

  // Break into groups: triliun, miliar, juta, ribu, sisa
  const triliun = Math.floor(absAmount / 1_000_000_000_000);
  const miliar = Math.floor((absAmount % 1_000_000_000_000) / 1_000_000_000);
  const juta = Math.floor((absAmount % 1_000_000_000) / 1_000_000);
  const ribu = Math.floor((absAmount % 1_000_000) / 1_000);
  const sisa = absAmount % 1_000;

  if (triliun > 0) {
    words += convertGroup(triliun) + ' triliun';
  }

  if (miliar > 0) {
    if (words) words += ' ';
    words += convertGroup(miliar) + ' miliar';
  }

  if (juta > 0) {
    if (words) words += ' ';
    words += convertGroup(juta) + ' juta';
  }

  if (ribu > 0) {
    if (words) words += ' ';
    // Special rule: 1000 = "seribu" not "satu ribu"
    words += ribu === 1 ? 'seribu' : convertGroup(ribu) + ' ribu';
  }

  if (sisa > 0) {
    if (words) words += ' ';
    words += convertGroup(sisa);
  }

  if (isNegative) {
    words = 'minus ' + words;
  }

  if (withCurrency) {
    words += ' rupiah';
  }

  return uppercase ? capitalize(words) : words;
}

/**
 * Converts a group of 1-3 digits (0-999) to Indonesian words.
 *
 * @param num - Number to convert (0-999)
 * @returns Indonesian words for the number
 * @internal
 */
function convertGroup(num: number): string {
  if (num === 0) return '';

  let result = '';

  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    // Special rule: 100 = "seratus" not "satu ratus"
    result = hundreds === 1 ? 'seratus' : BASIC_NUMBERS[hundreds] + ' ratus';
  }

  const remainder = num % 100;
  if (remainder > 0) {
    if (result) result += ' ';
    result += convertTwoDigits(remainder);
  }

  return result;
}

/**
 * Converts numbers 1-99 to Indonesian words.
 *
 * @param num - Number to convert (1-99)
 * @returns Indonesian words for the number
 * @internal
 */
function convertTwoDigits(num: number): string {
  if (num === 0) return '';
  if (num < 10) return BASIC_NUMBERS[num];
  if (num >= 10 && num < 20) return TEENS[num - 10];

  const tens = Math.floor(num / 10);
  const ones = num % 10;

  let result = TENS[tens];
  if (ones > 0) {
    result += ' ' + BASIC_NUMBERS[ones];
  }

  return result;
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - String to capitalize
 * @returns String with first letter capitalized
 * @internal
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
