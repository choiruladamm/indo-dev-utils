import { OPERATOR_PREFIXES, AREA_CODES } from './constants';

/**
 * Validates an Indonesian phone number format.
 *
 * Accepts multiple input formats:
 * - National format: 08xx-xxxx-xxxx or 08xxxxxxxxxx
 * - International with +: +62 8xx-xxxx-xxxx or +628xxxxxxxxxx
 * - International without +: 62 8xx-xxxx-xxxx or 628xxxxxxxxxx
 *
 * For mobile numbers, validates:
 * - Starts with 08 (national) or 628 (international)
 * - Has valid operator prefix (0811, 0812, 0817, etc.)
 * - Total length is 10-13 digits (after removing non-digits)
 *
 * For landline numbers, validates:
 * - Starts with 0 followed by area code (021, 022, etc.)
 * - Total length is appropriate for landline
 *
 * @param phone - The phone number string to validate
 * @returns `true` if the phone number is valid, `false` otherwise
 *
 * @example
 * Valid mobile number (national):
 * ```typescript
 * validatePhoneNumber('081234567890'); // true
 * ```
 *
 * @example
 * Valid mobile number (international):
 * ```typescript
 * validatePhoneNumber('+6281234567890'); // true
 * validatePhoneNumber('6281234567890'); // true
 * ```
 *
 * @example
 * With separators:
 * ```typescript
 * validatePhoneNumber('0812-3456-7890'); // true
 * validatePhoneNumber('+62 812-3456-7890'); // true
 * ```
 *
 * @example
 * Invalid numbers:
 * ```typescript
 * validatePhoneNumber('1234'); // false - too short
 * validatePhoneNumber('08001234567'); // false - invalid prefix
 * validatePhoneNumber('+1234567890'); // false - wrong country code
 * ```
 *
 * @public
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Only allow digits, +, -, space, parentheses, dot
  if (!/^[\d\s\-+().]+$/.test(phone)) {
    return false;
  }

  const cleaned = phone.replace(/[\s\-().]/g, '');

  let normalized: string;

  if (cleaned.startsWith('+62')) {
    normalized = '0' + cleaned.substring(3);
  } else if (cleaned.startsWith('62') && !cleaned.startsWith('620')) {
    normalized = '0' + cleaned.substring(2);
  } else if (cleaned.startsWith('0')) {
    normalized = cleaned;
  } else {
    return false;
  }

  if (normalized.startsWith('08')) {
    return validateMobileNumber(normalized);
  }

  if (normalized.startsWith('0')) {
    return validateLandlineNumber(normalized);
  }

  return false;
}

/**
 * Validates a mobile phone number (08xx format).
 *
 * @param phone - Phone number in 08xx format
 * @returns true if valid mobile number
 * @internal
 */
function validateMobileNumber(phone: string): boolean {
  // Mobile numbers should be 10-13 digits
  if (phone.length < 10 || phone.length > 13) {
    return false;
  }

  // Check if prefix is valid (first 4 digits)
  const prefix = phone.substring(0, 4);
  if (!OPERATOR_PREFIXES[prefix]) {
    return false;
  }

  // All digits should be numeric
  if (!/^\d+$/.test(phone)) {
    return false;
  }

  return true;
}

/**
 * Validates a landline phone number.
 *
 * @param phone - Phone number in landline format
 * @returns true if valid landline number
 * @internal
 */
function validateLandlineNumber(phone: string): boolean {
  // Landline numbers typically 9-11 digits
  if (phone.length < 9 || phone.length > 11) {
    return false;
  }

  // Check common area codes (3 or 4 digits)
  const areaCode3 = phone.substring(0, 3);
  const areaCode4 = phone.substring(0, 4);

  if (AREA_CODES[areaCode3] || AREA_CODES[areaCode4]) {
    return true;
  }

  // If not in our area code list, check if it follows general pattern
  // Landlines start with 0 followed by 2-4 digit area code
  if (/^0[2-9]\d{7,9}$/.test(phone)) {
    return true;
  }

  return false;
}

/**
 * Checks if a phone number is a mobile number.
 *
 * @param phone - The phone number to check
 * @returns `true` if it's a mobile number (08xx), `false` otherwise
 *
 * @example
 * ```typescript
 * isMobileNumber('081234567890'); // true
 * isMobileNumber('+6281234567890'); // true
 * isMobileNumber('0212345678'); // false (landline)
 * ```
 *
 * @public
 */
export function isMobileNumber(phone: string): boolean {
  if (!validatePhoneNumber(phone)) {
    return false;
  }

  const cleaned = phone.replace(/[^\d+]/g, '');
  let normalized: string;

  if (cleaned.startsWith('+62')) {
    normalized = '0' + cleaned.substring(3);
  } else if (cleaned.startsWith('62')) {
    normalized = '0' + cleaned.substring(2);
  } else {
    normalized = cleaned;
  }

  return normalized.startsWith('08');
}

/**
 * Checks if a phone number is a landline number.
 *
 * @param phone - The phone number to check
 * @returns `true` if it's a landline number, `false` otherwise
 *
 * @example
 * ```typescript
 * isLandlineNumber('0212345678'); // true
 * isLandlineNumber('081234567890'); // false (mobile)
 * ```
 *
 * @public
 */
export function isLandlineNumber(phone: string): boolean {
  if (!validatePhoneNumber(phone)) {
    return false;
  }

  return !isMobileNumber(phone);
}