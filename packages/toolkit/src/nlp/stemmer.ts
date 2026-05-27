import {
  PREFIX_PATTERNS,
  SUFFIX_PATTERNS,
} from './constants';

/**
 * Removes Indonesian affixes (prefixes and suffixes) from a word.
 *
 * Strips common Indonesian morphological affixes such as:
 * - Prefixes: me-, di-, ber-, pe-, pe-, ku-, kau-, men-, men-, per-, dll
 * - Suffixes: -kan, -an, -nya, -lah, -tah, -pun
 *
 * Used for text normalization, search indexing, and linguistic analysis.
 *
 * @param text - Word or text to strip affixes from
 * @returns Text with affixes removed
 *
 * @example
 * ```typescript
 * stemText('mempertanggungjawabkan'); // 'tanggung jawab'
 * stemText('berbicara');               // 'bicara'
 * stemText('mahasiswanya');             // 'mahasisw'
 * ```
 *
 * @example
 * For search optimization:
 * ```typescript
 * const query = 'mempertanggungjawabkan';
 * const normalized = stemText(query); // 'tanggung jawab'
 * // Use normalized for Indonesian full-text search
 * ```
 */
export function stemText(text: string): string {
  if (!text || typeof text !== 'string') return text;
  if (text.length < 4) return text;

  let result = text;

  for (const { pattern, replacement } of PREFIX_PATTERNS) {
    const match = result.match(pattern);
    if (match) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  for (const { pattern, replacement } of SUFFIX_PATTERNS) {
    const match = result.match(pattern);
    if (match) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  return result || text;
}