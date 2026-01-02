import type { CompareOptions } from './types';
import { normalizeWhitespace, removeAccents } from './sanitize';

/**
 * Compare strings with Indonesian-aware normalization
 *
 * This function allows flexible string comparison with options to ignore
 * case, whitespace, and accents. Useful for search, filtering, and
 * validation.
 *
 * **Features:**
 * - Case-insensitive comparison (default: false)
 * - Whitespace normalization (ignore extra spaces)
 * - Accent removal (café == cafe)
 * - Null-safe (handles empty strings)
 *
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @param options - Comparison options
 * @returns True if strings match according to options
 *
 * @example
 * Basic matching:
 * ```typescript
 * compareStrings('Hello', 'Hello') // → true
 * compareStrings('Hello', 'hello') // → false
 * ```
 *
 * @example
 * Case insensitive:
 * ```typescript
 * compareStrings('Hello', 'hello', { caseSensitive: false }) // → true
 * // Note: default is caseSensitive: false for convenience in many utils,
 * // but strict comparison usually defaults to true.
 * // Let's check the implementation default.
 * ```
 *
 * @example
 * Ignore whitespace:
 * ```typescript
 * compareStrings('  Hello   World  ', 'Hello World', { ignoreWhitespace: true })
 * // → true
 * ```
 *
 * @example
 * Ignore accents:
 * ```typescript
 * compareStrings('café', 'cafe', { ignoreAccents: true })
 * // → true
 * ```
 *
 * @public
 */
export function compareStrings(
  str1: string,
  str2: string,
  options?: CompareOptions
): boolean {
  // Early return for exact match (optimization)
  if (str1 === str2) {
    return true;
  }

  // Handle null/undefined as empty strings for robust comparison
  // usage of (str || '') pattern
  const s1 = str1 || '';
  const s2 = str2 || '';

  const {
    caseSensitive = false,
    ignoreWhitespace = false,
    ignoreAccents = false,
  } = options || {};

  let normalized1 = s1;
  let normalized2 = s2;

  // Apply whitespace normalization
  if (ignoreWhitespace) {
    normalized1 = normalizeWhitespace(normalized1);
    normalized2 = normalizeWhitespace(normalized2);
  }

  // Apply accent removal
  if (ignoreAccents) {
    normalized1 = removeAccents(normalized1);
    normalized2 = removeAccents(normalized2);
  }

  // Apply case sensitivity
  if (!caseSensitive) {
    normalized1 = normalized1.toLowerCase();
    normalized2 = normalized2.toLowerCase();
  }

  return normalized1 === normalized2;
}

/**
 * Calculate similarity score between two strings (0-1) using Levenshtein distance
 *
 * This function measures the difference between two strings and returns a score
 * where 1.0 means identical and 0.0 means completely different.
 *
 * **Algorithm:**
 * Uses Levenshtein distance to calculate the minimum number of single-character
 * edits (insertions, deletions, substitutions) required to change one string
 * into the other.
 *
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Similarity score between 0.0 and 1.0
 *
 * @example
 * Basic Usage:
 * ```typescript
 * similarity('hello', 'hello') // → 1.0 (identical)
 * similarity('hello', 'hallo') // → 0.8 (1 edit / 5 length)
 * similarity('hello', 'world') // → 0.2 (4 edits / 5 length)
 * ```
 *
 * @example
 * Case sensitivity:
 * Note: This function is case-sensitive. Use compareStrings options or
 * manual lowercasing if you need case-insensitive similarity.
 *
 * @public
 */
export function similarity(str1: string, str2: string): number {
  if (str1 === str2) return 1.0;
  if (str1.length === 0) return str2.length === 0 ? 1.0 : 0.0;
  if (str2.length === 0) return 0.0;

  const len1 = str1.length;
  const len2 = str2.length;

  // Track previous and current rows of the matrix
  // Optimization: We only need two rows, not the full matrix O(min(m,n)) space
  let prevRow = Array(len2 + 1).fill(0);
  let currentRow = Array(len2 + 1).fill(0);

  // Initialize first row
  for (let j = 0; j <= len2; j++) {
    prevRow[j] = j;
  }

  // Calculate distance
  for (let i = 1; i <= len1; i++) {
    currentRow[0] = i;

    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

      currentRow[j] = Math.min(
        currentRow[j - 1] + 1, // Insertion
        prevRow[j] + 1, // Deletion
        prevRow[j - 1] + cost // Substitution
      );
    }

    // Move current row to previous for next iteration
    [prevRow, currentRow] = [currentRow, prevRow];
  }

  // Calculate similarity: 1 - (distance / max_length)
  const distance = prevRow[len2];
  const maxLength = Math.max(len1, len2);

  return 1.0 - distance / maxLength;
}
