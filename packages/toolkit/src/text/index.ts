export { capitalize, toTitleCase, toSentenceCase } from './capitalization';

export { slugify } from './slug';

export { normalizeWhitespace, sanitize, removeAccents } from './sanitize';

export { expandAbbreviation, contractAbbreviation } from './abbreviation';

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
