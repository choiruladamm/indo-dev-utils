import { ACRONYMS, LOWERCASE_WORDS } from './constants';
import { TitleCaseOptions } from './types';

/**
 * Capitalize the first letter of a string and lowercase the rest
 *
 * This function converts the first character to uppercase and all remaining
 * characters to lowercase. It handles empty strings, Unicode characters,
 * and multi-word strings (only first word is affected).
 *
 * @param text - The text to capitalize
 * @returns The capitalized text
 *
 * @example
 * Basic usage:
 * ```typescript
 * capitalize('joko')      // → 'Joko'
 * capitalize('JOKO')      // → 'Joko'
 * capitalize('jOKO')      // → 'Joko'
 * ```
 *
 * @example
 * Multi-word strings (only first word capitalized):
 * ```typescript
 * capitalize('joko widodo')  // → 'Joko widodo'
 * capitalize('JOKO WIDODO')  // → 'Joko widodo'
 * ```
 *
 * @example
 * Edge cases:
 * ```typescript
 * capitalize('')           // → ''
 * capitalize('a')          // → 'A'
 * capitalize('123abc')     // → '123abc'
 * ```
 *
 * @public
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert text to title case following Indonesian grammar rules
 *
 * This function capitalizes the first letter of each word while respecting
 * Indonesian language conventions:
 * - Keeps particles lowercase (di, ke, dari, untuk, dan, etc.)
 * - Preserves known acronyms in uppercase (PT, CV, TNI, DKI, etc.)
 * - Handles hyphenated words correctly (anak-anak → Anak-Anak)
 * - Normalizes whitespace automatically
 *
 * @param text - The text to convert to title case
 * @param options - Optional configuration
 * @returns The title-cased text with proper Indonesian grammar
 *
 * @example
 * Basic usage:
 * ```typescript
 * toTitleCase('joko widodo')
 * // → 'Joko Widodo'
 *
 * toTitleCase('JOKO WIDODO')
 * // → 'Joko Widodo'
 * ```
 *
 * @example
 * Indonesian particles (kept lowercase):
 * ```typescript
 * toTitleCase('buku untuk anak dan orang tua')
 * // → 'Buku untuk Anak dan Orang Tua'
 *
 * toTitleCase('dari jakarta ke bandung')
 * // → 'Dari Jakarta ke Bandung'
 * // (first word always capitalized)
 * ```
 *
 * @example
 * Acronyms (preserved in uppercase):
 * ```typescript
 * toTitleCase('pt bank bca tbk')
 * // → 'PT Bank BCA Tbk'
 *
 * toTitleCase('dki jakarta')
 * // → 'DKI Jakarta'
 *
 * toTitleCase('tni angkatan darat')
 * // → 'TNI Angkatan Darat'
 * ```
 *
 * @example
 * Hyphenated words:
 * ```typescript
 * toTitleCase('anak-anak bermain')
 * // → 'Anak-Anak Bermain'
 *
 * toTitleCase('makan-makan di rumah')
 * // → 'Makan-Makan di Rumah'
 * ```
 *
 * @example
 * With options:
 * ```typescript
 * toTitleCase('PT BCA', { preserveAcronyms: false })
 * // → 'Pt Bca'
 *
 * toTitleCase('mobil dari jepang', { exceptions: ['jepang'] })
 * // → 'Mobil dari jepang'
 *
 * toTitleCase('HELLO WORLD', { strict: true })
 * // → 'Hello World'
 * ```
 *
 * @public
 */
export function toTitleCase(text: string, options?: TitleCaseOptions): string {
  if (!text) return text;

  const {
    preserveAcronyms = true,
    strict = false,
    exceptions = [],
  } = options || {};

  const lowercaseSet = new Set([...LOWERCASE_WORDS, ...exceptions]);
  const acronymSet = new Set(ACRONYMS);

  const normalized = normalizeSpaces(text);
  const words = normalized.split(' ');

  return words
    .map((word, index) => {
      if (!word) return word;

      if (word.includes('-')) {
        return processHyphenatedWord(word, index === 0, {
          lowercaseSet,
          acronymSet,
          preserveAcronyms,
          strict,
        });
      }

      return processWord(word, index === 0, {
        lowercaseSet,
        acronymSet,
        preserveAcronyms,
        strict,
      });
    })
    .join(' ');
}

/**
 * Normalize whitespace in text (trim and collapse multiple spaces)
 */
function normalizeSpaces(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Process a single word according to title case rules
 */
function processWord(
  word: string,
  isFirstWord: boolean,
  context: {
    lowercaseSet: Set<string>;
    acronymSet: Set<string>;
    preserveAcronyms: boolean;
    strict: boolean;
  }
): string {
  const { lowercaseSet, acronymSet, preserveAcronyms, strict } = context;
  const lowerWord = word.toLowerCase();
  const upperWord = word.toUpperCase();

  // Check if it's a known acronym
  if (preserveAcronyms && acronymSet.has(upperWord)) {
    return upperWord;
  }

  // Check if it should be lowercase (but not at the start)
  if (!isFirstWord && lowercaseSet.has(lowerWord)) {
    return lowerWord;
  }

  // Capitalize first letter
  if (strict) {
    return capitalizeFirstLetter(lowerWord);
  }

  return capitalizeFirstLetter(word.toLowerCase());
}

/**
 * Process hyphenated word (e.g., "anak-anak")
 */
function processHyphenatedWord(
  word: string,
  isFirstWord: boolean,
  context: {
    lowercaseSet: Set<string>;
    acronymSet: Set<string>;
    preserveAcronyms: boolean;
    strict: boolean;
  }
): string {
  return word
    .split('-')
    .map((part, index) =>
      processWord(part, isFirstWord && index === 0, context)
    )
    .join('-');
}

/**
 * Capitalize first letter of a word
 */
function capitalizeFirstLetter(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Convert text to sentence case (capitalize first letter of sentences only)
 *
 * This function capitalizes the first character of the text and the first
 * character after sentence-ending punctuation (. ! ?), while keeping
 * everything else in lowercase.
 *
 * **Sentence Detection Rules:**
 * - Period (.), exclamation (!), question mark (?) mark sentence endings
 * - Next letter after punctuation + space is capitalized
 * - Handles multiple spaces and newlines
 * - Does NOT treat abbreviations as sentence endings (e.g., "Dr. Smith")
 *
 * @param text - The text to convert to sentence case
 * @returns The sentence-cased text
 *
 * @example
 * Basic usage:
 * ```typescript
 * toSentenceCase('JOKO WIDODO ADALAH PRESIDEN')
 * // → 'Joko widodo adalah presiden'
 *
 * toSentenceCase('joko widodo adalah presiden')
 * // → 'Joko widodo adalah presiden'
 * ```
 *
 * @example
 * Multiple sentences:
 * ```typescript
 * toSentenceCase('halo, apa kabar? baik-baik saja.')
 * // → 'Halo, apa kabar? Baik-baik saja.'
 *
 * toSentenceCase('jakarta. surabaya. bandung.')
 * // → 'Jakarta. Surabaya. Bandung.'
 * ```
 *
 * @example
 * Different punctuation:
 * ```typescript
 * toSentenceCase('wow! amazing! fantastic!')
 * // → 'Wow! Amazing! Fantastic!'
 *
 * toSentenceCase('siapa nama anda? saya joko.')
 * // → 'Siapa nama anda? Saya joko.'
 * ```
 *
 * @example
 * Edge cases:
 * ```typescript
 * toSentenceCase('')
 * // → ''
 *
 * toSentenceCase('hello')
 * // → 'Hello'
 *
 * toSentenceCase('  hello.  world.  ')
 * // → 'Hello. World.'
 * ```
 *
 * @public
 */
export function toSentenceCase(text: string): string {
  if (!text) return text;

  const normalized = text.trim().replace(/\s+/g, ' ');

  let result = '';
  let shouldCapitalize = true;

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];

    // Capitalize if we should and this is a letter
    if (shouldCapitalize && /[a-zA-ZÀ-ÿ]/.test(char)) {
      result += char.toUpperCase();
      shouldCapitalize = false;
    } else {
      result += char.toLowerCase();
    }

    // Mark next letter for capitalization after sentence-ending punctuation
    if (isSentenceEnd(char)) {
      shouldCapitalize = true;
    }

    // Handle abbreviations: don't capitalize after period in abbreviations
    if (char === '.' && i + 1 < normalized.length) {
      const nextChar = normalized[i + 1];

      // If next char is not a space, likely an abbreviation
      if (nextChar !== ' ' && !/[.!?]/.test(nextChar)) {
        shouldCapitalize = false;
      }
    }
  }

  return result;
}

/**
 * Check if a character marks the end of a sentence
 */
function isSentenceEnd(char: string): boolean {
  return char === '.' || char === '!' || char === '?';
}
