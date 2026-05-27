import {
  WHITESPACE_PATTERN,
  NON_ALPHANUMERIC_PATTERN,
} from './constants';

/**
 * Collapses multiple spaces to single space and trims.
 *
 * @param text - Text to normalize
 * @returns Text with normalized whitespace
 *
 * @example
 * ```typescript
 * normalizeWhitespace("  Budi   pergi  ke   sekolah  ")
 * // "Budi pergi ke sekolah"
 * ```
 */
export function normalizeWhitespace(text: string): string {
  if (!text || typeof text !== 'string') return text;
  return text.trim().replace(WHITESPACE_PATTERN, ' ');
}

/**
 * Removes all non-letter/number characters except spaces.
 *
 * @param text - Text to clean
 * @returns Text with only letters, numbers, and spaces
 *
 * @example
 * ```typescript
 * stripNonAlphanumeric("Budi123@#$%"); // "Budi123"
 * stripNonAlphanumeric("Hello! World?"); // "Hello World"
 * ```
 */
export function stripNonAlphanumeric(text: string): string {
  if (!text || typeof text !== 'string') return text;
  return text.replace(NON_ALPHANUMERIC_PATTERN, '');
}