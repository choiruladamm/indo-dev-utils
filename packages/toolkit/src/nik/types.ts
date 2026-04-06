/**
 * Information extracted from a valid NIK.
 *
 * Contains parsed data including location codes, birth date, gender,
 * and serial number from a 16-digit NIK string.
 *
 * @public
 */
export interface NIKInfo {
  /**
   * Province information extracted from positions 1-2 of the NIK.
   *
   * @example
   * ```typescript
   * { code: '32', name: 'Jawa Barat' }
   * ```
   */
  province: {
    /** Two-digit province code (e.g., '32') */
    code: string;
    /** Full province name (e.g., 'Jawa Barat') */
    name: string;
  };

  /**
   * Regency (Kabupaten/Kota) information extracted from positions 3-4 of the NIK.
   *
   * @example
   * ```typescript
   * { code: '01', name: 'Kab. Bogor' }
   * ```
   */
  regency: {
    /** Two-digit regency code (e.g., '01') */
    code: string;
    /** Full regency name (e.g., 'Kab. Bogor') */
    name: string;
  };

  /**
   * District (Kecamatan) information extracted from positions 5-6 of the NIK.
   * May be `null` if district data is not available.
   *
   * @example
   * ```typescript
   * { code: '23', name: 'Ciawi' }
   * ```
   */
  district: {
    /** Two-digit district code (e.g., '23') */
    code: string;
    /** Full district name, or `null` if data unavailable */
    name: string | null;
  };

  /**
   * Birth date extracted from positions 7-12 of the NIK.
   * For females, the day is encoded as (actual day + 40).
   * Returns `null` if the date is invalid.
   *
   * @example
   * ```typescript
   * new Date(1989, 0, 31) // January 31, 1989
   * ```
   */
  birthDate: Date | null;

  /**
   * Gender derived from the day encoding in the NIK.
   * - 'male': day is 1-31
   * - 'female': day is 41-71 (actual day + 40)
   * - `null`: if unable to determine
   */
  gender: 'male' | 'female' | null;

  /**
   * Serial number from positions 13-16 of the NIK.
   * Uniquely identifies individuals with the same location and birth date.
   * Returns `null` if unable to extract.
   *
   * @example
   * ```typescript
   * '0123'
   * ```
   */
  serialNumber: string | null;

  /**
   * Whether the NIK passed validation checks.
   * If `false`, other fields may be `null` or contain partial data.
   */
  isValid: boolean;
}

/**
 * Options for masking a NIK to protect privacy.
 *
 * Controls how many characters to show at the start and end,
 * what character to use for masking, and optional separators.
 *
 * @example
 * ```typescript
 * // Default: shows first 4 and last 4 digits
 * { start: 4, end: 4, char: '*' }
 * // Result: '3201********0123'
 *
 * // With separator
 * { start: 4, end: 4, char: '*', separator: '-' }
 * // Result: '3201-****-****-0123'
 * ```
 *
 * @public
 */
export interface MaskOptions {
  /**
   * Number of characters to show at the start.
   *
   * @defaultValue 4
   */
  start?: number;

  /**
   * Number of characters to show at the end.
   *
   * @defaultValue 4
   */
  end?: number;

  /**
   * Character to use for masking hidden digits.
   *
   * @defaultValue '*'
   */
  char?: string;

  /**
   * Optional separator to add between groups of digits.
   * If provided, the NIK will be formatted with separators.
   *
   * @defaultValue undefined (no separator)
   *
   * @example
   * ```typescript
   * '-' // Results in format: '3201-****-****-0123'
   * ' ' // Results in format: '3201 **** **** 0123'
   * ```
   */
  separator?: string;
}

/**
 * Error thrown when an invalid NIK is provided to a function.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   requireNIK('invalid');
 * } catch (error) {
 *   if (error instanceof InvalidNIKError) {
 *     console.log(error.code); // 'INVALID_NIK'
 *   }
 * }
 * ```
 *
 * @public
 */
export class InvalidNIKError extends Error {
  /** Error code for programmatic identification */
  readonly code = 'INVALID_NIK' as const;

  constructor(message: string = 'Invalid NIK provided') {
    super(message);
    this.name = 'InvalidNIKError';
  }
}

/**
 * Error codes for detailed NIK validation.
 *
 * @public
 */
export type NIKErrorCode =
  | 'INVALID_FORMAT'
  | 'INVALID_PROVINCE'
  | 'INVALID_MONTH'
  | 'INVALID_DAY'
  | 'INVALID_DATE'
  | 'FUTURE_DATE';

/**
 * A single validation error with code and message.
 *
 * @public
 */
export interface NIKValidationError {
  /** Error code for programmatic handling */
  code: NIKErrorCode;
  /** Human-readable error message */
  message: string;
}

/**
 * Detailed validation result for NIK with structured error reporting.
 *
 * Use this for form validation where you need to show specific error
 * messages per field.
 *
 * @example
 * ```typescript
 * const result = validateNIKDetailed('1234');
 * if (!result.isValid) {
 *   result.errors.forEach(err => {
 *     console.log(err.code, err.message);
 *   });
 * }
 * ```
 *
 * @public
 */
export interface NIKValidationResult {
  /** Whether the NIK is valid */
  isValid: boolean;
  /** List of validation errors (empty if valid) */
  errors: NIKValidationError[];
  /** Cleaned 16-digit NIK if valid, null otherwise */
  nik: string | null;
}

/**
 * Options for getAge function.
 *
 * @public
 */
export interface GetAgeOptions {
  /** Date to calculate age from (default: current date) */
  referenceDate?: Date;
  /** Return formatted Indonesian string instead of object */
  asString?: boolean;
}

/**
 * Age result object with years, months, and days.
 *
 * @public
 */
export interface Age {
  /** Full years */
  years: number;
  /** Remaining months after full years */
  months: number;
  /** Remaining days after full months */
  days: number;
}
