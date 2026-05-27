/**
 * NLP Engine types for Indonesian text processing.
 *
 * @module nlp
 */

/**
 * Phonetic encoding result with metadata.
 */
export interface PhoneticResult {
  /** Original text */
  original: string;
  /** Encoded phonetic representation */
  code: string;
}

/**
 * Tokenization result with sentence boundaries.
 */
export interface TokenizationResult {
  /** Array of sentences */
  sentences: string[];
  /** Positions of sentence boundaries */
  positions: number[];
}

/**
 * Stemming result with removed affixes.
 */
export interface StemmingResult {
  /** Original word */
  original: string;
  /** Stemmed word */
  stem: string;
  /** Removed affixes */
  removedAffixes: string[];
}