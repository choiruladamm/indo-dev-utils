/**
 * @indodev/toolkit
 * Indonesian developer utilities for validation, formatting, and more
 * @packageDocumentation
 */

// NIK (National Identity Number) utilities
export {
  validateNIK,
  parseNIK,
  formatNIK,
  maskNIK,
  cleanNIK,
  validateNIKDetailed,
  getAge,
  compareNIK,
  isAdult,
  formatBirthDate,
  isValidForGender,
  isValidForBirthDate,
} from './nik';

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
  generateWALink,
  generateSmsLink,
  generateTelLink,
  isProvider,
  normalizePhoneNumber,
  comparePhones,
  getLandlineRegion,
} from './phone';

export type {
  PhoneFormat,
  PhoneInfo,
  MaskOptions as PhoneMaskOptions,
} from './phone';

export { InvalidPhoneError } from './phone';

export type { OperatorName } from './phone';

// NPWP (Taxpayer Identification Number) utilities
export {
  validateNPWP,
  formatNPWP,
  parseNPWP,
  maskNPWP,
  cleanNPWP,
  isNIKBasedNPWP,
} from './npwp';

export {
  validatePlate,
  getRegionFromPlate,
  formatPlate,
  parsePlate,
  maskPlate,
  cleanPlate,
  isPrivatePlate,
  isPublicPlate,
  isDiplomatPlate,
} from './plate';
export { InvalidPlateError } from './plate';
export { PLATE_REGIONS } from './plate';
export type { PlateInfo, PlateMaskOptions } from './plate';

// VIN (Vehicle Identification Number) utilities
export { validateVIN, parseVIN, maskVIN, cleanVIN } from './vin';
export { InvalidVINError } from './vin';
export type {
  VINOptions,
  VINValidationResult,
  VINInfo,
  VINMaskOptions,
} from './vin';

// Email validator utilities
export {
  validateEmail,
  normalizeEmail,
  maskEmail,
  getEmailInfo,
} from './email-validator';
export type {
  EmailValidationOptions,
  EmailValidationResult,
  EmailMaskOptions,
  EmailInfo,
} from './email-validator';

export { InvalidEmailError } from './email-validator';

export type { NPWPInfo, MaskOptions as NPWPMaskOptions } from './npwp';

export { InvalidNPWPError } from './npwp';

// Currency utilities
export {
  formatRupiah,
  formatCompact,
  formatPercentage,
  parseRupiah,
  toWords,
  roundToClean,
  formatAccounting,
  calculateTax,
  addRupiahSymbol,
  splitAmount,
  percentageOf,
  difference,
  validateRupiah,
} from './currency';

export type { RupiahOptions, WordOptions, PercentageOptions, RoundUnit, CompactOptions, SplitOptions } from './currency';

export { InvalidSplitError } from './currency';

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
  profanityFilter,
  removeStopwords,
  toFormal,
  isAlay,
  compareStrings,
  similarity,
  maskText,
} from './text';

export type {
  TitleCaseOptions,
  SlugifyOptions,
  SanitizeOptions,
  TruncateOptions,
  ExtractOptions,
  CompareOptions,
  MaskOptions as TextMaskOptions,
} from './text';

export {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  countSyllables,
  LOWERCASE_WORDS,
  ACRONYMS,
  ABBREVIATIONS,
} from './text';

// NLP (Natural Language Processing) utilities
export {
  stemText,
  encodePhonetic,
  isPhoneticMatch,
  tokenizeIndo,
  normalizeWhitespace as normalizeTextWhitespace,
  stripNonAlphanumeric,
} from './nlp';

export type { PhoneticResult, TokenizationResult, StemmingResult } from './nlp';

export {
  SENTENCE_ABBREVIATIONS,
  PREFIX_PATTERNS,
  SUFFIX_PATTERNS,
} from './nlp';

// PDP (Privacy/PII) utilities
export {
  scanPII,
  maskStringPDP,
  anonymizeString,
  anonymizePDP,
} from './pdp';

export type { PIIType, PIIFinding, PIIOptions, PIIConfidence } from './pdp';

// DateTime utilities
export {
  // Errors
  InvalidDateError,
  InvalidDateRangeError,
  // Constants
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
  DAY_NAMES,
  DAY_NAMES_SHORT,
  TIMEZONE_MAP,
  VALID_UTC_OFFSETS,
  // Calculations
  isLeapYear,
  daysInMonth,
  isValidDate,
  isWeekend,
  isWorkingDay,
  addBusinessDays,
  // Parsing
  parseDate,
  // Formatting
  formatDate,
  formatDateRange,
  // Relative time
  toRelativeTime,
  // Calculations (expanded)
  getAge as getAgeFromDate,
  // Timezone
  getIndonesianTimezone,
  // Weton (Javanese market day)
  getWeton,
} from './datetime';

export type {
  DateStyle,
  AgeOptions,
  AgeResult,
  Pasaran,
  IndonesianWeekday,
  Weton,
} from './datetime';

// BPJS module
export {
  validateBPJS,
  validateBPJSKesehatan,
  validateBPJSKetenagakerjaan,
  detectBPJSType,
  formatBPJS,
  parseBPJS,
  maskBPJS,
  cleanBPJS,
  InvalidBPJSError,
} from './bpjs';

export type {
  BPJSType,
  BPJSInfo,
  BPJSMaskOptions,
} from './bpjs';

// Mock data generator utilities
export {
  generateNIK,
  generatePhone,
  generateNPWP,
  generatePlate,
  generateEmail,
  generateName,
  generateMockPerson,
  createMockFactory,
} from './mock';

export type {
  MockGender,
  PhoneOperator,
  PhoneFormat as MockPhoneFormat,
  NPWPFormat,
  PlateType,
  NameParts,
  NIKMockOptions,
  PhoneMockOptions,
  NPWPMockOptions,
  PlateMockOptions,
  EmailMockOptions,
  NameMockOptions,
  MockPersonOptions,
  MockPerson,
  MockFactory,
} from './mock';
