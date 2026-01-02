import type { TruncateOptions, ExtractOptions } from './types';

/**
 * Truncate text to specified length, word-aware
 *
 * This function shortens text to a maximum length while:
 * - Respecting word boundaries (don't cut words in half)
 * - Adding ellipsis to indicate truncation
 * - Preserving original text if already short enough
 * - Accounting for ellipsis length in total character count
 *
 * **Features:**
 * - Smart word boundary detection
 * - Customizable ellipsis
 * - No truncation for short text
 * - Handles edge cases gracefully
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length of output (including ellipsis)
 * @param options - Optional configuration
 * @returns The truncated text with ellipsis if needed
 *
 * @example
 * Basic usage:
 * ```typescript
 * truncate('Ini adalah contoh text yang panjang', 20)
 * // → 'Ini adalah contoh...'
 *
 * truncate('Short text', 20)
 * // → 'Short text' (no truncation needed)
 * ```
 *
 * @example
 * Word boundary handling:
 * ```typescript
 * truncate('Ini adalah contoh text yang panjang', 20, { wordBoundary: true })
 * // → 'Ini adalah contoh...' (stops at word)
 *
 * truncate('Ini adalah contoh text yang panjang', 20, { wordBoundary: false })
 * // → 'Ini adalah contoh t...' (cuts mid-word)
 * ```
 *
 * @example
 * Custom ellipsis:
 * ```typescript
 * truncate('Ini adalah contoh text yang panjang', 20, { ellipsis: '…' })
 * // → 'Ini adalah contoh…'
 *
 * truncate('Ini adalah contoh text yang panjang', 20, { ellipsis: ' [...]' })
 * // → 'Ini adalah [...]'
 * ```
 *
 * @example
 * Edge cases:
 * ```typescript
 * truncate('', 10)
 * // → ''
 *
 * truncate('Hello', 10)
 * // → 'Hello'
 *
 * truncate('Hello World', 11)
 * // → 'Hello World' (exact length, no ellipsis)
 * ```
 *
 * @public
 */
export function truncate(
  text: string,
  maxLength: number,
  options?: TruncateOptions
): string {
  // Early return for empty or invalid input
  if (!text || maxLength <= 0) {
    return '';
  }

  const { ellipsis = '...', wordBoundary = true } = options || {};

  // Early return if text is already short enough
  if (text.length <= maxLength) {
    return text;
  }

  // Calculate available space for actual text (excluding ellipsis)
  const availableLength = maxLength - ellipsis.length;

  // If ellipsis is longer than maxLength, just return ellipsis truncated
  if (availableLength <= 0) {
    return ellipsis.slice(0, maxLength);
  }

  // Get preliminary truncated text
  let truncated = text.slice(0, availableLength);

  // If word boundary is enabled, find last complete word
  if (wordBoundary) {
    // Find the last space within the truncated text
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    // Only cut at word boundary if we found a space
    // Why: Prevents returning empty string for single long word
    if (lastSpaceIndex > 0) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }
    // If no space found, keep the full availableLength
  }

  // Trim any trailing whitespace before adding ellipsis
  truncated = truncated.trimEnd();

  return truncated + ellipsis;
}

/**
 * Extract words from text, respecting Indonesian language rules
 *
 * This function splits text into individual words while:
 * - Respecting hyphenated words (anak-anak as single word)
 * - Filtering by minimum length
 * - Optional lowercase conversion
 * - Removing punctuation and special characters
 *
 * **Features:**
 * - Indonesian hyphenation support (anak-anak, buku-buku)
 * - Minimum word length filtering
 * - Case normalization
 * - Handles punctuation gracefully
 *
 * @param text - The text to extract words from
 * @param options - Optional configuration
 * @returns Array of extracted words
 *
 * @example
 * Basic usage:
 * ```typescript
 * extractWords('Anak-anak bermain di taman')
 * // → ['Anak-anak', 'bermain', 'di', 'taman']
 *
 * extractWords('Hello, World! How are you?')
 * // → ['Hello', 'World', 'How', 'are', 'you']
 * ```
 *
 * @example
 * Hyphenated word handling:
 * ```typescript
 * extractWords('Anak-anak bermain di taman', { includeHyphenated: true })
 * // → ['Anak-anak', 'bermain', 'di', 'taman']
 *
 * extractWords('Anak-anak bermain di taman', { includeHyphenated: false })
 * // → ['Anak', 'anak', 'bermain', 'di', 'taman']
 * ```
 *
 * @example
 * Minimum length filtering:
 * ```typescript
 * extractWords('Di rumah ada 3 kucing', { minLength: 3 })
 * // → ['rumah', 'ada', 'kucing']
 * // 'Di' (2 chars) and '3' (1 char) filtered out
 *
 * extractWords('a b cd def ghij', { minLength: 3 })
 * // → ['def', 'ghij']
 * ```
 *
 * @example
 * Lowercase conversion:
 * ```typescript
 * extractWords('Hello WORLD', { lowercase: true })
 * // → ['hello', 'world']
 *
 * extractWords('Hello WORLD', { lowercase: false })
 * // → ['Hello', 'WORLD']
 * ```
 *
 * @example
 * Combined options:
 * ```typescript
 * extractWords('Anak-Anak BERMAIN di Taman', {
 *   includeHyphenated: true,
 *   minLength: 3,
 *   lowercase: true
 * })
 * // → ['anak-anak', 'bermain', 'taman']
 * // 'di' filtered out (< 3 chars)
 * ```
 *
 * @example
 * Edge cases:
 * ```typescript
 * extractWords('')
 * // → []
 *
 * extractWords('   ')
 * // → []
 *
 * extractWords('!!!@@##')
 * // → []
 * ```
 *
 * @public
 */
export function extractWords(text: string, options?: ExtractOptions): string[] {
  // Early return for empty input
  if (!text || !text.trim()) {
    return [];
  }

  const {
    minLength = 0,
    includeHyphenated = true,
    lowercase = false,
  } = options || {};

  // Remove punctuation but preserve hyphens and spaces
  // Why: We want to keep hyphenated words like 'anak-anak' intact
  let cleaned = text;

  if (includeHyphenated) {
    // Keep hyphens, remove other punctuation
    // Replace punctuation except hyphens with spaces
    cleaned = text.replace(/[^\w\s-]/g, ' ');
  } else {
    // Replace all punctuation including hyphens with spaces
    cleaned = text.replace(/[^\w\s]/g, ' ');
  }

  // Split by whitespace to get individual words
  const words = cleaned
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    // Filter out words that are just hyphens (common artifact of punctuation removal)
    .filter((word) => !/^-+$/.test(word));

  // Apply filters
  let result = words;

  // Filter by minimum length
  if (minLength > 0) {
    result = result.filter((word) => word.length >= minLength);
  }

  // Convert to lowercase if requested
  if (lowercase) {
    result = result.map((word) => word.toLowerCase());
  }

  return result;
}
