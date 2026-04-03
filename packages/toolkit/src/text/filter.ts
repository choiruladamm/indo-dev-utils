import { PROFANITY, STOPWORDS } from './constants';

/**
 * Filters common Indonesian profanity words by masking them.
 *
 * @param text - The text to filter
 * @param mask - The masking character (default: '*')
 * @returns Filtered text
 *
 * @example
 * ```typescript
 * profanityFilter('kamu anjing banget'); // 'kamu ****** banget'
 * ```
 */
export function profanityFilter(text: string, mask: string = '*'): string {
  let filtered = text;

  PROFANITY.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filtered = filtered.replace(regex, mask.repeat(word.length));
  });

  return filtered;
}

/**
 * Removes common Indonesian stopwords from text.
 *
 * @param text - The text to process
 * @returns Text with stopwords removed
 *
 * @example
 * ```typescript
 * removeStopwords('saya sedang makan nasi'); // 'makan nasi'
 * ```
 */
export function removeStopwords(text: string): string {
  const words = text.split(/\s+/);
  const filtered = words.filter(
    (word) => !(STOPWORDS as readonly string[]).includes(word.toLowerCase())
  );

  return filtered.join(' ');
}
