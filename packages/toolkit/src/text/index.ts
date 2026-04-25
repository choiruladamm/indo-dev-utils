/**
 * Indonesian text processing utilities.
 *
 * Provides text manipulation functions specifically tailored for
 * Indonesian language including case conversion, normalization,
 * slug generation, and text filtering.
 *
 * @example
 * ```typescript
 * import { toTitleCase, slugify, removeAccents } from '@indodev/toolkit/text';
 *
 * toTitleCase('halo dunia');     // 'Halo Dunia'
 * slugify('Halo Dunia!');        // 'halo-dunia'
 * removeAccents('Haić');         // 'Haic'
 * ```
 *
 * @module text
 * @packageDocumentation
 */

export { capitalize, toTitleCase, toSentenceCase } from './capitalization';

export { slugify } from './slug';

export { normalizeWhitespace, sanitize, removeAccents } from './sanitize';

export { expandAbbreviation, contractAbbreviation } from './abbreviation';
export { profanityFilter, removeStopwords } from './filter';
export { toFormal, isAlay } from './normalization';

export { truncate, extractWords } from './extract';

export { compareStrings, similarity } from './compare';

export { maskText } from './mask';

export { toCamelCase, toPascalCase, toSnakeCase } from './case-converters';

export { countSyllables } from './syllable';

export type {
  TitleCaseOptions,
  SlugifyOptions,
  SanitizeOptions,
  TruncateOptions,
  ExtractOptions,
  CompareOptions,
  MaskOptions,
} from './types';

export { LOWERCASE_WORDS, ACRONYMS, ABBREVIATIONS } from './constants';
