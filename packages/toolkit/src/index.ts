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
  getAge,
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
} from './phone';

export type {
  PhoneFormat,
  PhoneInfo,
  MaskOptions as PhoneMaskOptions,
} from './phone';

// NPWP (Taxpayer Identification Number) utilities
export { validateNPWP, formatNPWP, parseNPWP, maskNPWP } from './npwp';

export { validatePlate, getRegionFromPlate, formatPlate } from './plate';

// VIN (Vehicle Identification Number) utilities
export { validateVIN } from './vin';
export type { VINOptions, VINValidationResult } from './vin';

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

export type { NPWPInfo, MaskOptions as NPWPMaskOptions } from './npwp';

// Currency utilities
export {
  formatRupiah,
  formatCompact,
  parseRupiah,
  toWords,
  roundToClean,
  formatAccounting,
  calculateTax,
  addRupiahSymbol,
} from './currency';

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
  profanityFilter,
  removeStopwords,
  toFormal,
  isAlay,
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
} from './datetime';

export type { DateStyle, AgeOptions, AgeResult } from './datetime';
