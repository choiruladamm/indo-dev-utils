/**
 * @indodev/toolkit
 * Indonesian developer utilities for validation, formatting, and more
 * @packageDocumentation
 */

// NIK (National Identity Number) utilities
export { validateNIK, parseNIK, formatNIK, maskNIK } from './nik';

export type { NIKInfo, MaskOptions as NIKMaskOptions } from './nik';

// Phone utilities
export {
  validatePhoneNumber,
  isMobileNumber,
  isLandlineNumber,
  formatPhoneNumber,
  toInternational,
  toNational,
  toE164,
  parsePhoneNumber,
  getOperator,
  cleanPhoneNumber,
  maskPhoneNumber,
} from './phone';

export type {
  PhoneFormat,
  PhoneInfo,
  MaskOptions as PhoneMaskOptions,
} from './phone';

// Currency utilities
export { formatRupiah, formatCompact, parseRupiah, toWords } from './currency';

export type { RupiahOptions, WordOptions } from './currency';

// Text utilities
export {
  capitalize,
  toTitleCase,
  toSentenceCase,
  slugify,
  normalizeWhitespace,
  sanitize,
  removeAccents,
  expandAbbreviation,
  contractAbbreviation,
  truncate,
  extractWords,
  compareStrings,
  similarity,
} from './text';

export type {
  TitleCaseOptions,
  SlugifyOptions,
  SanitizeOptions,
  TruncateOptions,
  ExtractOptions,
  CompareOptions,
} from './text';
