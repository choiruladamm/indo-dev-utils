import { AREA_CODES } from './constants';
import { PhoneFormat, MaskOptions } from './types';
import { validatePhoneNumber } from './validate';

/**
 * Formats an Indonesian phone number to the specified format.
 *
 * Accepts various input formats and converts to the desired output format.
 * Automatically adds appropriate separators for readability.
 *
 * @param phone - The phone number to format
 * @param format - Target format ('international', 'national', 'e164', 'display')
 * @returns Formatted phone number, or original string if invalid
 *
 * @example
 * International format:
 * ```typescript
 * formatPhoneNumber('081234567890', 'international');
 * // '+62 812-3456-7890'
 * ```
 *
 * @example
 * National format:
 * ```typescript
 * formatPhoneNumber('+6281234567890', 'national');
 * // '0812-3456-7890'
 * ```
 *
 * @example
 * E.164 format (no spaces/dashes):
 * ```typescript
 * formatPhoneNumber('0812-3456-7890', 'e164');
 * // '6281234567890'
 * ```
 *
 * @public
 */
export function formatPhoneNumber(
  phone: string,
  format: PhoneFormat = 'national'
): string {
  if (!validatePhoneNumber(phone)) {
    return phone;
  }

  const cleaned = cleanPhoneNumber(phone);

  let normalized: string;
  if (cleaned.startsWith('+62')) {
    normalized = '0' + cleaned.substring(3);
  } else if (cleaned.startsWith('62') && !cleaned.startsWith('620')) {
    normalized = '0' + cleaned.substring(2);
  } else {
    normalized = cleaned;
  }

  switch (format) {
    case 'international':
      return toInternational(normalized);
    case 'national':
    case 'display':
      return toNational(normalized);
    case 'e164':
      return toE164(normalized);
    default:
      return phone;
  }
}

/**
 * Converts a phone number to international format (+62 xxx-xxxx-xxxx).
 *
 * @param phone - The phone number to convert
 * @returns Phone number in international format with separators
 *
 * @example
 * ```typescript
 * toInternational('081234567890');
 * // '+62 812-3456-7890'
 * ```
 *
 * @example
 * Already international:
 * ```typescript
 * toInternational('+6281234567890');
 * // '+62 812-3456-7890'
 * ```
 *
 * @public
 */
export function toInternational(phone: string): string {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) {
    return phone;
  }

  const normalized = normalizeToNational(cleaned);
  if (!normalized) {
    return phone;
  }

  const withoutZero = normalized.substring(1);

  if (normalized.startsWith('08')) {
    if (withoutZero.length === 11) {
      return `+62 ${withoutZero.substring(0, 3)}-${withoutZero.substring(3, 7)}-${withoutZero.substring(7)}`;
    } else if (withoutZero.length === 10) {
      return `+62 ${withoutZero.substring(0, 3)}-${withoutZero.substring(3, 6)}-${withoutZero.substring(6)}`;
    } else if (withoutZero.length === 9) {
      return `+62 ${withoutZero.substring(0, 3)}-${withoutZero.substring(3)}`;
    } else if (withoutZero.length === 12) {
      return `+62 ${withoutZero.substring(0, 3)}-${withoutZero.substring(3, 7)}-${withoutZero.substring(7)}`;
    }
  }

  const areaCodeLength = getAreaCodeLength(normalized);
  const areaCode = normalized.substring(1, areaCodeLength + 1);
  const localNumber = normalized.substring(areaCodeLength + 1);

  return `+62 ${areaCode}-${localNumber}`;
}

/**
 * Converts a phone number to national format (08xx-xxxx-xxxx).
 *
 * @param phone - The phone number to convert
 * @returns Phone number in national format with dashes
 *
 * @example
 * ```typescript
 * toNational('+6281234567890');
 * // '0812-3456-7890'
 * ```
 *
 * @example
 * Already national:
 * ```typescript
 * toNational('081234567890');
 * // '0812-3456-7890'
 * ```
 *
 * @public
 */
export function toNational(phone: string): string {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) {
    return phone;
  }

  const normalized = normalizeToNational(cleaned);
  if (!normalized) {
    return phone;
  }

  if (normalized.startsWith('08')) {
    if (normalized.length === 12) {
      return `${normalized.substring(0, 4)}-${normalized.substring(4, 8)}-${normalized.substring(8)}`;
    } else if (normalized.length === 11) {
      return `${normalized.substring(0, 4)}-${normalized.substring(4, 7)}-${normalized.substring(7)}`;
    } else if (normalized.length === 10) {
      return `${normalized.substring(0, 4)}-${normalized.substring(4)}`;
    } else if (normalized.length === 13) {
      return `${normalized.substring(0, 4)}-${normalized.substring(4, 8)}-${normalized.substring(8)}`;
    }
  }

  const areaCodeLength = getAreaCodeLength(normalized);
  const areaCodeWithZero = normalized.substring(0, areaCodeLength + 1);
  const localNumber = normalized.substring(areaCodeLength + 1);

  return `${areaCodeWithZero}-${localNumber}`;
}

/**
 * Converts a phone number to E.164 format (6281234567890).
 *
 * E.164 is the international standard format without spaces or dashes.
 * Suitable for API calls and database storage.
 *
 * @param phone - The phone number to convert
 * @returns Phone number in E.164 format
 *
 * @example
 * ```typescript
 * toE164('0812-3456-7890');
 * // '6281234567890'
 * ```
 *
 * @example
 * From international format:
 * ```typescript
 * toE164('+62 812-3456-7890');
 * // '6281234567890'
 * ```
 *
 * @public
 */
export function toE164(phone: string): string {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) {
    return phone;
  }

  const normalized = normalizeToNational(cleaned);
  if (!normalized) {
    return phone;
  }

  return '62' + normalized.substring(1);
}

/**
 * Removes all non-digit characters from a phone number, preserving leading +.
 *
 * @param phone - The phone number to clean
 * @returns Cleaned phone number with only digits (and optional leading +)
 *
 * @example
 * ```typescript
 * cleanPhoneNumber('0812-3456-7890');
 * // '081234567890'
 * ```
 *
 * @example
 * ```typescript
 * cleanPhoneNumber('+62 812 3456 7890');
 * // '+6281234567890'
 * ```
 *
 * @public
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  return phone.replace(/[^\d+]/g, '');
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
  } else if (phone.startsWith('62') && !phone.startsWith('620')) {
    return '0' + phone.substring(2);
  } else if (phone.startsWith('0')) {
    return phone;
  }
  return '';
}

/**
 * Determines area code length for landline numbers.
 *
 * @param normalized - Phone number in national format (0xxx)
 * @returns Area code length (digits after leading 0)
 * @internal
 */
function getAreaCodeLength(normalized: string): number {
  // Check 4-digit area codes ('0xxxx')
  const fourDigitCode = normalized.substring(0, 5);
  if (AREA_CODES[fourDigitCode]) {
    return 4;
  }

  // Check 3-digit area codes ('0xxx')
  const threeDigitCode = normalized.substring(0, 4);
  if (AREA_CODES[threeDigitCode]) {
    return 3;
  }

  // Check 2-digit area codes ('0xx')
  const twoDigitCode = normalized.substring(0, 3);
  if (AREA_CODES[twoDigitCode]) {
    return 2;
  }

  return 2;
}

/**
 * Masks a phone number for privacy protection.
 *
 * By default, shows the first 4 and last 4 digits, masking the middle digits.
 * Optionally formats with separators.
 *
 * @param phone - The phone number to mask
 * @param options - Masking configuration options
 * @returns Masked phone number, or original string if invalid
 *
 * @example
 * Default masking:
 * ```typescript
 * maskPhoneNumber('081234567890');
 * // '0812****7890'
 * ```
 *
 * @example
 * Custom mask character:
 * ```typescript
 * maskPhoneNumber('081234567890', { char: 'X' });
 * // '0812XXXX7890'
 * ```
 *
 * @example
 * With separator:
 * ```typescript
 * maskPhoneNumber('081234567890', { separator: '-' });
 * // '0812-****-7890'
 * ```
 *
 * @public
 */
export function maskPhoneNumber(
  phone: string,
  options: MaskOptions = {}
): string {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) {
    return phone;
  }

  const isInternational = cleaned.startsWith('+');
  let toMask: string;

  if (isInternational) {
    toMask = cleaned;
  } else {
    const normalized = normalizeToNational(cleaned);
    toMask = normalized || cleaned;
  }

  if (toMask.length < 4) {
    return phone;
  }

  const { char = '*', separator } = options;
  let { start = 4, end = 4 } = options;

  if (start + end >= toMask.length) {
    // Auto-adjust for short numbers to ensure masking happens
    if (toMask.length < 10) {
      const minMaskLength = 1;
      const availableForVisible = toMask.length - minMaskLength;

      if (availableForVisible >= 2) {
        start = Math.floor(availableForVisible / 2);
        end = availableForVisible - start;
      } else {
        return toMask;
      }
    } else {
      return toMask;
    }
  }

  const startPart = toMask.substring(0, start);
  const endPart = toMask.substring(toMask.length - end);
  const maskLength = toMask.length - start - end;
  const masked = startPart + char.repeat(maskLength) + endPart;

  if (separator) {
    return `${masked.substring(0, start)}${separator}${masked.substring(start, masked.length - end)}${separator}${masked.substring(masked.length - end)}`;
  }

  return masked;
}
