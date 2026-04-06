import { AREA_CODES } from './constants';

/**
 * Normalizes a cleaned phone number to national format (0xxx).
 *
 * Accepts pre-cleaned phone string (digits only, optional leading +).
 * Use `cleanPhoneNumber()` first if input may contain separators.
 *
 * @param phone - Cleaned phone number string
 * @returns Phone number in 08xx format, or empty string if invalid
 *
 * @example
 * ```typescript
 * normalizePhoneNumber('+6281234567890'); // '081234567890'
 * normalizePhoneNumber('6281234567890'); // '081234567890'
 * normalizePhoneNumber('081234567890'); // '081234567890'
 * ```
 *
 * @example
 * Invalid inputs return empty string:
 * ```typescript
 * normalizePhoneNumber(''); // ''
 * normalizePhoneNumber('620812345678'); // '' (620 is not valid country code pattern)
 * normalizePhoneNumber('invalid'); // ''
 * ```
 *
 * @public
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  if (phone.startsWith('+62')) {
    return '0' + phone.substring(3);
  }

  if (phone.startsWith('62') && !phone.startsWith('620')) {
    return '0' + phone.substring(2);
  }

  if (phone.startsWith('0')) {
    return phone;
  }

  return '';
}

/**
 * Compares two phone numbers regardless of format.
 *
 * Both inputs are normalized to E.164 format for comparison.
 * Returns false if either input is invalid.
 *
 * @param phoneA - First phone number in any format
 * @param phoneB - Second phone number in any format
 * @returns true if both represent the same number, false otherwise
 *
 * @example
 * Same number in different formats:
 * ```typescript
 * comparePhones('081234567890', '+6281234567890'); // true
 * comparePhones('0812-3456-7890', '6281234567890'); // true
 * ```
 *
 * @example
 * Different numbers:
 * ```typescript
 * comparePhones('081234567890', '081234567891'); // false
 * comparePhones('0212345678', '0221234567'); // false
 * ```
 *
 * @example
 * Invalid inputs return false:
 * ```typescript
 * comparePhones('invalid', '081234567890'); // false
 * comparePhones('', ''); // false
 * ```
 *
 * @public
 */
export function comparePhones(phoneA: string, phoneB: string): boolean {
  if (typeof phoneA !== 'string' || typeof phoneB !== 'string') {
    return false;
  }

  const cleanedA = phoneA.replace(/[^\d+]/g, '');
  const cleanedB = phoneB.replace(/[^\d+]/g, '');

  const normalizedA = normalizePhoneNumber(cleanedA);
  const normalizedB = normalizePhoneNumber(cleanedB);

  if (!normalizedA || !normalizedB) {
    return false;
  }

  const e164A = '62' + normalizedA.substring(1);
  const e164B = '62' + normalizedB.substring(1);

  return e164A === e164B;
}

/**
 * Gets the region name for a landline number.
 *
 * Accepts phone number in any format (national, international, e164).
 *
 * @param phone - Landline phone number in any format
 * @returns Region name, or null if not found or if mobile number
 *
 * @example
 * ```typescript
 * getLandlineRegion('0212345678'); // 'Jakarta'
 * getLandlineRegion('+62212345678'); // 'Jakarta'
 * getLandlineRegion('081234567890'); // null (mobile)
 * ```
 *
 * @public
 */
export function getLandlineRegion(phone: string): string | null {
  if (!phone || typeof phone !== 'string') {
    return null;
  }

  const cleaned = phone.replace(/[^\d+]/g, '');
  const normalized = normalizePhoneNumber(cleaned);

  if (!normalized || !normalized.startsWith('0')) {
    return null;
  }

  if (normalized.startsWith('08')) {
    return null;
  }

  const areaCode4 = normalized.substring(0, 4);
  if (AREA_CODES[areaCode4]) {
    return AREA_CODES[areaCode4];
  }

  const areaCode3 = normalized.substring(0, 3);
  if (AREA_CODES[areaCode3]) {
    return AREA_CODES[areaCode3];
  }

  const areaCode2 = normalized.substring(0, 2);
  if (AREA_CODES[areaCode2]) {
    return AREA_CODES[areaCode2];
  }

  return null;
}
