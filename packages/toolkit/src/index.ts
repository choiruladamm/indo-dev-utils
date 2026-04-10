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
  parseRupiah,
  toWords,
  roundToClean,
  formatAccounting,
  calculateTax,
  addRupiahSymbol,
  splitAmount,
  percentageOf,
  difference,
} from './currency';

export type { RupiahOptions, WordOptions } from './currency';

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
