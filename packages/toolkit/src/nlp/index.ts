/**
 * Indonesian NLP Engine utilities.
 *
 * Provides text processing functions for Indonesian language:
 * - stemming: Strip Indonesian affixes (me-, di-, ber-, etc.)
 * - phonetics: Encode names for fuzzy matching
 * - tokenization: Split sentences ignoring abbreviations
 * - normalization: Clean whitespace and special characters
 *
 * @example
 * ```typescript
 * import { stemText, encodePhonetic, tokenizeIndo } from '@indodev/toolkit/nlp';
 *
 * stemText('mempertanggungjawabkan'); // 'tanggung jawab'
 * encodePhonetic('Syahruddin');       // 'S635'
 * tokenizeIndo("Kpd Yth. Bpk. Budi."); // ["Kpd Yth. Bpk. Budi."]
 * ```
 *
 * @module nlp
 * @packageDocumentation
 */

export { stemText } from './stemmer';
export { encodePhonetic, isPhoneticMatch } from './phonetics';
export { tokenizeIndo } from './tokenizer';
export { normalizeWhitespace, stripNonAlphanumeric } from './normalize';

export type { PhoneticResult, TokenizationResult, StemmingResult } from './types';

export {
  SENTENCE_ABBREVIATIONS,
  PREFIX_PATTERNS,
  SUFFIX_PATTERNS,
} from './constants';