import type { SanitizeOptions } from './types';

/**
 * Normalize all whitespace characters to single spaces
 *
 * This function:
 * - Collapses multiple spaces into one
 * - Converts tabs, newlines, and other whitespace to single space
 * - Trims leading and trailing whitespace
 * - Handles Unicode whitespace characters
 *
 * **Whitespace Characters Normalized:**
 * - Space (` `)
 * - Tab (`\t`)
 * - Newline (`\n`)
 * - Carriage return (`\r`)
 * - Form feed (`\f`)
 * - Vertical tab (`\v`)
 * - Non-breaking space (`\u00A0`)
 * - Other Unicode spaces
 *
 * @param text - The text to normalize
 * @returns Text with normalized whitespace
 *
 * @example
 * Basic usage:
 * ```typescript
 * normalizeWhitespace('hello    world')
 * // → 'hello world'
 *
 * normalizeWhitespace('hello\tworld')
 * // → 'hello world'
 * ```
 *
 * @example
 * Multiple types of whitespace:
 * ```typescript
 * normalizeWhitespace('hello\n\nworld')
 * // → 'hello world'
 *
 * normalizeWhitespace('hello\r\nworld')
 * // → 'hello world'
 *
 * normalizeWhitespace('line1\n\nline2\tword')
 * // → 'line1 line2 word'
 * ```
 *
 * @example
 * Leading and trailing whitespace:
 * ```typescript
 * normalizeWhitespace('  hello world  ')
 * // → 'hello world'
 *
 * normalizeWhitespace('\n\thello\t\n')
 * // → 'hello'
 * ```
 *
 * @example
 * Edge cases:
 * ```typescript
 * normalizeWhitespace('')
 * // → ''
 *
 * normalizeWhitespace('   ')
 * // → ''
 *
 * normalizeWhitespace('hello')
 * // → 'hello'
 * ```
 *
 * @public
 */
export function normalizeWhitespace(text: string): string {
  if (!text) return text;

  // Replace all whitespace characters with single space
  // \s matches: space, tab, newline, carriage return, form feed, vertical tab
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Remove or replace unwanted characters from text
 *
 * This function provides flexible text sanitization with options to:
 * - Remove newlines
 * - Remove extra spaces
 * - Remove punctuation
 * - Keep only allowed characters
 * - Trim leading/trailing whitespace
 *
 * @param text - The text to sanitize
 * @param options - Sanitization options
 * @returns The sanitized text
 *
 * @example
 * Remove extra spaces (default):
 * ```typescript
 * sanitize('hello    world')
 * // → 'hello world'
 * ```
 *
 * @example
 * Remove newlines:
 * ```typescript
 * sanitize('line1\nline2\nline3', { removeNewlines: true })
 * // → 'line1 line2 line3'
 * ```
 *
 * @example
 * Remove punctuation:
 * ```typescript
 * sanitize('Hello, World!', { removePunctuation: true })
 * // → 'Hello World'
 * ```
 *
 * @example
 * Allow only specific characters:
 * ```typescript
 * sanitize('ABC123!@#', { allowedChars: 'A-Za-z0-9' })
 * // → 'ABC123'
 *
 * sanitize('Hello123!@#', { allowedChars: 'a-z' })
 * // → 'ello'
 * ```
 *
 * @example
 * Combined options:
 * ```typescript
 * sanitize('  Hello,\n  World!  ', {
 *   removeNewlines: true,
 *   removePunctuation: true,
 *   removeExtraSpaces: true,
 *   trim: true
 * })
 * // → 'Hello World'
 * ```
 *
 * @public
 */
export function sanitize(text: string, options?: SanitizeOptions): string {
  if (!text) return text;

  const {
    removeNewlines = false,
    removeExtraSpaces = true,
    removePunctuation = false,
    allowedChars,
    trim = true,
  } = options || {};

  let result = text;

  // Remove newlines first (replace with space)
  if (removeNewlines) {
    result = result.replace(/[\n\r]/g, ' ');
  }

  // Remove punctuation
  if (removePunctuation) {
    result = result.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '');
  }

  // Keep only allowed characters
  if (allowedChars) {
    const allowedRegex = new RegExp(`[^${allowedChars}]`, 'g');
    result = result.replace(allowedRegex, '');
  }

  // Remove extra spaces
  if (removeExtraSpaces) {
    if (trim) {
      // When trimming, we can safely collapse all spaces
      if (removeNewlines) {
        result = result.replace(/\s+/g, ' ');
      } else {
        result = result.replace(/[ \t]+/g, ' ');
      }
    } else {
      // When not trimming, preserve leading/trailing spaces
      // Only collapse spaces in the middle
      const leadingMatch = result.match(/^([ \t]*)/);
      const trailingMatch = result.match(/([ \t]*)$/);
      const leading = leadingMatch ? leadingMatch[1] : '';
      const trailing = trailingMatch ? trailingMatch[1] : '';

      const middle = result.slice(
        leading.length,
        result.length - trailing.length
      );
      const normalizedMiddle = removeNewlines
        ? middle.replace(/\s+/g, ' ')
        : middle.replace(/[ \t]+/g, ' ');

      result = leading + normalizedMiddle + trailing;
    }
  }

  // Trim
  if (trim) {
    result = result.trim();
  }

  return result;
}

/**
 * Remove diacritical marks (accents) from characters
 *
 * Converts accented characters to their base form:
 * - é → e
 * - ñ → n
 * - ü → u
 * - etc.
 *
 * Useful for:
 * - Search normalization
 * - Sorting/comparison
 * - URL generation
 * - Database queries
 *
 * @param text - The text to remove accents from
 * @returns Text with accents removed
 *
 * @example
 * Basic usage:
 * ```typescript
 * removeAccents('café')
 * // → 'cafe'
 *
 * removeAccents('résumé')
 * // → 'resume'
 * ```
 *
 * @example
 * Various accents:
 * ```typescript
 * removeAccents('naïve')
 * // → 'naive'
 *
 * removeAccents('Zürich')
 * // → 'Zurich'
 *
 * removeAccents('São Paulo')
 * // → 'Sao Paulo'
 * ```
 *
 * @example
 * Mixed text:
 * ```typescript
 * removeAccents('École française à Montréal')
 * // → 'Ecole francaise a Montreal'
 * ```
 *
 * @public
 */
export function removeAccents(text: string): string {
  if (!text) return text;

  // Manual mapping for Nordic and other special characters that don't decompose
  const specialChars: Record<string, string> = {
    Ø: 'O',
    ø: 'o',
    Æ: 'AE',
    æ: 'ae',
    Å: 'A',
    å: 'a',
    Đ: 'D',
    đ: 'd',
    Ł: 'L',
    ł: 'l',
    Þ: 'TH',
    þ: 'th',
    ß: 'ss',
  };

  // First apply manual mappings
  let result = text;
  for (const [accented, plain] of Object.entries(specialChars)) {
    result = result.replace(new RegExp(accented, 'g'), plain);
  }

  // Then normalize to NFD and remove combining diacritical marks
  return result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
