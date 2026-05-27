import {
  PHONETIC_CODES,
  DUTCH_NORMALIZATIONS,
  ARABIC_NORMALIZATIONS,
} from './constants';

/**
 * Encodes a name into a phonetic code for fuzzy matching.
 *
 * Uses Soundex-like algorithm adapted for Indonesian names.
 * Handles Dutch and Arabic name normalizations for better
 * matching accuracy in Indonesian context.
 *
 * @param text - Name to encode (e.g., person name)
 * @returns Phonetic code (1 letter + 3 digits, e.g., 'S635')
 *
 * @example
 * ```typescript
 * encodePhonetic('Syahruddin'); // 'S635'
 * encodePhonetic('Ahmad');     // 'A530'
 * ```
 *
 * @example
 * For fuzzy name matching:
 * ```typescript
 * const code1 = encodePhonetic('Budi');
 * const code2 = encodePhonetic('Budi'); // same code = match
 * // Useful for deduping names with spelling variations
 * ```
 */
export function encodePhonetic(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let normalized = text.toLowerCase();

  for (const [from, to] of Object.entries(DUTCH_NORMALIZATIONS)) {
    normalized = normalized.split(from).join(to);
  }

  for (const [from, to] of Object.entries(ARABIC_NORMALIZATIONS)) {
    normalized = normalized.split(from).join(to);
  }

  const firstLetter = normalized.charAt(0);

  const consonants: string[] = [];
  for (const char of normalized.slice(1)) {
    const code = PHONETIC_CODES[char];
    if (code && code !== '0') {
      if (consonants.length < 3 && (consonants.length === 0 || consonants[consonants.length - 1] !== code)) {
        consonants.push(code);
      }
    }
  }

  while (consonants.length < 3) {
    consonants.push('0');
  }

  return firstLetter.toUpperCase() + consonants.slice(0, 3).join('');
}

/**
 * Checks if two names match phonetically.
 *
 * Compares the phonetic codes of two names to determine
 * if they likely refer to the same person despite spelling
 * variations (typos, nicknames, alternative spellings).
 *
 * @param text1 - First name to compare
 * @param text2 - Second name to compare
 * @returns `true` if names match phonetically, `false` otherwise
 *
 * @example
 * ```typescript
 * isPhoneticMatch('Syahruddin', 'Syahrudin'); // true
 * isPhoneticMatch('Budi', 'Budi');           // true
 * isPhoneticMatch('Andi', 'Budi');            // false
 * ```
 *
 * @example
 * For search-as-you-type:
 * ```typescript
 * const typed = 'Syahrudin';
 * const candidates = ['Syahruddin', 'Budi', 'Andi'];
 * const match = candidates.find(c => isPhoneticMatch(typed, c));
 * // Returns 'Syahruddin'
 * ```
 */
export function isPhoneticMatch(text1: string, text2: string): boolean {
  if (!text1 || !text2) return false;

  const code1 = encodePhonetic(text1);
  const code2 = encodePhonetic(text2);

  return code1 === code2 && code1.length > 0;
}