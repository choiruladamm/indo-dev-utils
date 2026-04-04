/**
 * Count the number of syllables in an Indonesian word
 *
 * Uses algorithm-based vowel counting with Indonesian dipthong awareness.
 * Works for both Indonesian and English text.
 *
 * **Syllable Detection Rules:**
 * - Each vowel group (a, i, u, e, o) counts as one syllable
 * - Dipthongs (ai, au, oi) count as a single vowel sound
 * - Silent 'e' at the end is handled
 * - Minimum 1 syllable for any word with letters
 *
 * @param text - The word or text to count syllables in
 * @returns The number of syllables
 *
 * @example
 * Indonesian words:
 * ```typescript
 * countSyllables('buku')
 * // → 2 (bu-ku)
 *
 * countSyllables('matahari')
 * // → 4 (ma-ta-ha-ri)
 *
 * countSyllables('pulau')
 * // → 2 (pu-lau, dipthong 'au' counts as one)
 * ```
 *
 * @example
 * English words:
 * ```typescript
 * countSyllables('hello')
 * // → 2 (hel-lo)
 *
 * countSyllables('beautiful')
 * // → 3 (beau-ti-ful)
 * ```
 *
 * @example
 * Edge cases:
 * ```typescript
 * countSyllables('')
 * // → 0
 *
 * countSyllables('a')
 * // → 1
 *
 * countSyllables('rhythm')
 * // → 1 (no vowels, minimum 1)
 * ```
 *
 * @public
 */
export function countSyllables(text: string): number {
  if (!text) return 0;

  const cleaned = text.toLowerCase().replace(/[^a-z]/g, '');

  if (!cleaned) return 0;

  // Handle Indonesian dipthongs: ai, au, oi
  const withDipthongs = cleaned
    .replace(/ai/g, 'æ')
    .replace(/au/g, 'œ')
    .replace(/oi/g, 'ø');

  // Count vowel groups
  const vowelGroups = withDipthongs.match(/[aiueoæœø]+/g);

  if (!vowelGroups) {
    // No vowels found, return 1 for words with consonants
    return cleaned.length > 0 ? 1 : 0;
  }

  // Handle silent 'e' at the end (common in English)
  let count = vowelGroups.length;
  if (cleaned.endsWith('e') && count > 1) {
    count -= 1;
  }

  return Math.max(1, count);
}
