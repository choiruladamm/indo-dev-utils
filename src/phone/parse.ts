import { OPERATOR_PREFIXES, AREA_CODES } from './constants';
import { PhoneInfo } from './types';
import {
  cleanPhoneNumber,
  toInternational,
  toNational,
  toE164,
} from './format';
import { validatePhoneNumber, isMobileNumber } from './validate';

/**
 * Parses an Indonesian phone number and extracts all information.
 *
 * Extracts country code, operator, formatted variants, and determines
 * if it's a mobile or landline number.
 *
 * @param phone - The phone number to parse
 * @returns Parsed phone information, or `null` if invalid
 *
 * @example
 * Parse a mobile number:
 * ```typescript
 * const info = parsePhoneNumber('081234567890');
 * console.log(info);
 * // {
 * //   countryCode: '62',
 * //   operator: 'Telkomsel',
 * //   number: '81234567890',
 * //   formatted: {
 * //     international: '+62 812-3456-7890',
 * //     national: '0812-3456-7890',
 * //     e164: '6281234567890'
 * //   },
 * //   isValid: true,
 * //   isMobile: true,
 * //   isLandline: false
 * // }
 * ```
 *
 * @example
 * Parse with different input format:
 * ```typescript
 * const info = parsePhoneNumber('+62 812-3456-7890');
 * console.log(info.operator); // 'Telkomsel'
 * console.log(info.formatted.national); // '0812-3456-7890'
 * ```
 *
 * @example
 * Parse a landline:
 * ```typescript
 * const info = parsePhoneNumber('0212345678');
 * console.log(info.region); // 'Jakarta'
 * console.log(info.isLandline); // true
 * ```
 *
 * @public
 */
export function parsePhoneNumber(phone: string): PhoneInfo | null {
  if (!validatePhoneNumber(phone)) {
    return null;
  }

  const cleaned = cleanPhoneNumber(phone);
  const normalized = normalizeToNational(cleaned);

  if (!normalized) {
    return null;
  }

  const countryCode = '62';
  const number = normalized.substring(1); // Remove leading 0
  const isMobile = normalized.startsWith('08');
  const isLandline = !isMobile;

  let operator: string | null = null;
  let region: string | null = null;

  if (isMobile) {
    operator = getOperator(normalized);
  } else {
    region = getRegion(normalized);
  }

  return {
    countryCode,
    operator,
    number,
    formatted: {
      international: toInternational(normalized),
      national: toNational(normalized),
      e164: toE164(normalized),
    },
    isValid: true,
    isMobile,
    isLandline,
    region,
  };
}

/**
 * Detects the mobile operator from a phone number.
 *
 * Identifies the operator based on the phone number prefix.
 * Returns `null` if the operator cannot be determined or if it's not a mobile number.
 *
 * @param phone - The phone number to check
 * @returns Operator name, or `null` if not detected
 *
 * @example
 * Telkomsel numbers:
 * ```typescript
 * getOperator('081234567890'); // 'Telkomsel'
 * getOperator('0812-3456-7890'); // 'Telkomsel'
 * getOperator('+6281234567890'); // 'Telkomsel'
 * ```
 *
 * @example
 * XL numbers:
 * ```typescript
 * getOperator('081734567890'); // 'XL'
 * ```
 *
 * @example
 * Non-mobile or invalid:
 * ```typescript
 * getOperator('0212345678'); // null (landline)
 * getOperator('1234'); // null (invalid)
 * ```
 *
 * @public
 */
export function getOperator(phone: string): string | null {
  if (!isMobileNumber(phone)) {
    return null;
  }

  const cleaned = cleanPhoneNumber(phone);
  const normalized = normalizeToNational(cleaned);

  if (!normalized || normalized.length < 4) {
    return null;
  }

  const prefix = normalized.substring(0, 4);
  return OPERATOR_PREFIXES[prefix] || null;
}

/**
 * Gets the region name for a landline number.
 *
 * @param phone - Landline phone number in national format
 * @returns Region name, or null if not found
 * @internal
 */
function getRegion(phone: string): string | null {
  if (!phone.startsWith('0')) {
    return null;
  }

  // Check 4-digit area code
  const areaCode4 = phone.substring(0, 4);
  if (AREA_CODES[areaCode4]) {
    return AREA_CODES[areaCode4];
  }

  // Check 3-digit area code
  const areaCode3 = phone.substring(0, 3);
  if (AREA_CODES[areaCode3]) {
    return AREA_CODES[areaCode3];
  }

  return null;
}

/**
 * Normalizes a phone number to national format (08xx).
 *
 * @param phone - Cleaned phone number
 * @returns Phone number in 08xx format
 * @internal
 */
function normalizeToNational(phone: string): string {
  if (phone.startsWith('+62')) {
    return '0' + phone.substring(3);
  } else if (phone.startsWith('62')) {
    return '0' + phone.substring(2);
  } else if (phone.startsWith('0')) {
    return phone;
  }
  return '';
}