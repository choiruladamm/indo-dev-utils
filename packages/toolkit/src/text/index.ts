export { capitalize, toTitleCase, toSentenceCase } from './capitalization';

export { slugify } from './slug';

export { normalizeWhitespace, sanitize, removeAccents } from './sanitize';

export { expandAbbreviation, contractAbbreviation } from './abbreviation';
export { profanityFilter, removeStopwords } from './filter';
export { toFormal, isAlay } from './normalization';

export { truncate, extractWords } from './extract';

export { compareStrings, similarity } from './compare';

export type {
  TitleCaseOptions,
  SlugifyOptions,
  SanitizeOptions,
  TruncateOptions,
  ExtractOptions,
  CompareOptions,
} from './types';

export { LOWERCASE_WORDS, ACRONYMS, ABBREVIATIONS } from './constants';
