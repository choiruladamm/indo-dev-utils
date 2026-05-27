/**
 * ============================================================================
 * INDONESIAN NLP ENGINE - CONSTANTS
 * ============================================================================
 *
 * This file contains constants for Indonesian text processing:
 * - AFFIX_PATTERNS: Indonesian prefix and suffix patterns for stemming
 * - ABBREVIATIONS: Common Indonesian abbreviations to preserve in tokenization
 * - PHONETIC_MAP: Character mappings for phonetic encoding
 *
 * ============================================================================
 */

/**
 * Common Indonesian abbreviations that should NOT be split on periods
 * during sentence tokenization.
 */
export const SENTENCE_ABBREVIATIONS = [
  'Yth.',    // Yth. - Kepada (Attention)
  'Bpk.',    // Bpk. - Bapak (Mr.)
  'Ibu.',    // Ibu - Mrs./Ms.
  'Sdr.',    // Sdr. - Saudara (Brother/Sister)
  'S.Kom.',  // S.Kom. - Sarjana Komputer
  'M.Kom.',  // M.Kom. - Magister Komputer
  'Dr.',     // Dr. - Doktor
  'Sp.',     // Sp. - Spesialis
  'Mk.',     // Mk. - Magister
  'Jl.',     // Jl. - Jalan (Street)
  'D.a.',    // D.a. - Dengan alat
  'D.l.',    // D.l. - Dalam lingkup
] as const;

/**
 * Indonesian prefix patterns for algorithmic stemming.
 * Order matters - longer patterns should be checked first.
 */
export const PREFIX_PATTERNS = [
  // 4-char prefixes
  { pattern: /^meng/i, replacement: '' },        // meng- → Ø
  { pattern: /^peny/i, replacement: 's' },       // peny- → s-
  { pattern: /^pen/i, replacement: '' },         // pen- → Ø
  { pattern: /^pem/i, replacement: '' },         // pem- → Ø
  { pattern: /^peng/i, replacement: '' },        // peng- → Ø
  { pattern: /^meny/i, replacement: 's' },       // meny- → s-
  { pattern: /^men/i, replacement: '' },         // men- → Ø
  { pattern: /^mem/i, replacement: '' },          // mem- → Ø

  // 3-char prefixes
  { pattern: /^ber/i, replacement: '' },          // ber- → Ø
  { pattern: /^bel/i, replacement: '' },          // bel- → Ø
  { pattern: /^ter/i, replacement: '' },          // ter- → Ø

  // 2-char prefixes
  { pattern: /^di/i, replacement: '' },           // di- → Ø
  { pattern: /^ke/i, replacement: '' },           // ke- → Ø
  { pattern: /^me/i, replacement: '' },          // me- → Ø
  { pattern: /^pe/i, replacement: '' },          // pe- → Ø
  { pattern: /^se/i, replacement: '' },          // se- → Ø
] as const;

/**
 * Indonesian suffix patterns for algorithmic stemming.
 * Order matters - longer patterns should be checked first.
 */
export const SUFFIX_PATTERNS = [
  // 4-char suffixes
  { pattern: /nya$/i, replacement: '' },         // -nya → Ø
  { pattern: /lah$/i, replacement: '' },         // -lah → Ø
  { pattern: /kan$/i, replacement: '' },        // -kan → Ø
  { pattern: /pun$/i, replacement: '' },        // -pun → Ø

  // 3-char suffixes
  { pattern: /an$/i, replacement: '' },         // -an → Ø
  { pattern: /ah$/i, replacement: '' },         // -ah → Ø
  { pattern: /oh$/i, replacement: '' },         // -oh → Ø
  { pattern: /eh$/i, replacement: '' },         // -eh → Ø

  // 2-char suffixes
  { pattern: /ku$/i, replacement: '' },          // -ku → Ø
  { pattern: /mu$/i, replacement: '' },          // -mu → Ø
  { pattern: /na$/i, replacement: '' },          // -na → Ø
] as const;

/**
 * Phonetic encoding character mappings.
 * Maps similar-sounding characters to the same code digit.
 */
export const PHONETIC_CODES: Record<string, string> = {
  // Vowels map to 0
  a: '0', e: '0', i: '0', o: '0', u: '0',
  // Certain consonants map to specific codes
  b: '1', f: '1', p: '1', v: '1',
  c: '2', g: '2', j: '2', k: '2', q: '2', x: '2',
  d: '3', t: '3',
  l: '4',
  m: '5', n: '5',
  r: '6',
  s: '6', z: '6',
  // h is often silent, drops encoding
  // w, y are sometimes vowels, handled specially
};

/**
 * Dutch spelling normalizations (oe → u, etc.)
 * Common in older Indonesian spellings and names.
 */
export const DUTCH_NORMALIZATIONS: Record<string, string> = {
  oe: 'u',
  dj: 'j',
  dz: 'z',
  j: 'j',   // already j
  ch: 'h',  // dutch ch → h
};

/**
 * Arabic loan phoneme normalizations.
 * Common in Arabic-derived Indonesian words.
 */
export const ARABIC_NORMALIZATIONS: Record<string, string> = {
  sy: 's',  // sy → s (as in Syafar)
  kh: 'k',  // kh → k (as in Khair)
  sh: 's',  // sh → s (as in Sharon)
};

/**
 * Regex pattern for Unicode whitespace normalization.
 */
export const WHITESPACE_PATTERN = /\s+/g;

/**
 * Regex pattern for non-alphanumeric characters (except spaces).
 */
export const NON_ALPHANUMERIC_PATTERN = /[^a-zA-Z0-9\s]/g;