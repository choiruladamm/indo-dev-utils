/**
 * Format types for Indonesian phone numbers.
 *
 * - `international`: +62 format with spaces (e.g., '+62 812-3456-7890')
 * - `national`: 08xx format with dashes (e.g., '0812-3456-7890')
 * - `e164`: International format without spaces (e.g., '6281234567890')
 * - `display`: Formatted for display with separators (same as national)
 *
 * @public
 */
export type PhoneFormat = 'international' | 'national' | 'e164' | 'display';

/**
 * Information extracted from a valid Indonesian phone number.
 *
 * Contains parsed data including country code, operator, formatted variants,
 * and validation status.
 *
 * @example
 * ```typescript
 * const info: PhoneInfo = {
 *   countryCode: '62',
 *   operator: 'Telkomsel',
 *   number: '81234567890',
 *   formatted: {
 *     international: '+62 812-3456-7890',
 *     national: '0812-3456-7890',
 *     e164: '6281234567890',
 *   },
 *   isValid: true,
 *   isMobile: true,
 *   isLandline: false,
 * };
 * ```
 *
 * @public
 */
export interface PhoneInfo {
  /**
   * Country code (always '62' for Indonesia).
   */
  countryCode: string;

  /**
   * Mobile operator name, or `null` if not detected.
   *
   * Possible values: 'Telkomsel', 'XL', 'Indosat', 'Tri', 'Smartfren', 'Axis'
   *
   * @example
   * ```typescript
   * 'Telkomsel' // for 0812, 0813, 0821, 0822, 0851, 0852, 0853
   * 'XL'        // for 0817, 0818, 0819, 0859, 0877, 0878
   * null        // if operator cannot be determined
   * ```
   */
  operator: string | null;

  /**
   * Raw phone number without country code or leading zero.
   *
   * @example
   * ```typescript
   * '81234567890' // from '081234567890' or '+6281234567890'
   * ```
   */
  number: string;

  /**
   * Phone number in various formatted styles.
   */
  formatted: {
    /** International format with country code: '+62 812-3456-7890' */
    international: string;
    /** National format with leading zero: '0812-3456-7890' */
    national: string;
    /** E.164 format (no spaces/dashes): '6281234567890' */
    e164: string;
  };

  /**
   * Whether the phone number passed validation checks.
   */
  isValid: boolean;

  /**
   * Whether this is a mobile number (08xx).
   */
  isMobile: boolean;

  /**
   * Whether this is a landline number (02x, 04x, etc).
   */
  isLandline: boolean;

  /**
   * Region name for landline numbers, or `null` for mobile.
   *
   * @example
   * ```typescript
   * 'Jakarta'   // for 021 area code
   * 'Bandung'   // for 022 area code
   * null        // for mobile numbers
   * ```
   */
  region?: string | null;
}

/**
 * Options for masking phone numbers.
 *
 * Controls how many digits to show at the start and end,
 * what character to use for masking, and optional separators.
 *
 * @example
 * Default masking:
 * ```typescript
 * { start: 4, end: 4, char: '*' }
 * // '0812****7890'
 * ```
 *
 * @example
 * With separator:
 * ```typescript
 * { start: 4, end: 4, char: '*', separator: '-' }
 * // '0812-****-7890'
 * ```
 *
 * @public
 */
export interface MaskOptions {
  /**
   * Number of digits to show at the start.
   *
   * @defaultValue 4
   */
  start?: number;

  /**
   * Number of digits to show at the end.
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
   *
   * @defaultValue undefined
   */
  separator?: string;
}