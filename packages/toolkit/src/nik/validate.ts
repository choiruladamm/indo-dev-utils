import { PROVINCES } from './constants';
import { parseNIKDate, validateNIKDateComponents } from './utils/date';

const NIK_PATTERN = /^\d{16}$/;

/**
 * Validates a NIK (Nomor Induk Kependudukan) format.
 *
 * A valid NIK must:
 * - Be exactly 16 digits
 * - Have a valid province code (positions 1-2)
 * - Have a valid date (positions 7-12)
 * - Not be in the future
 * - Not be before 1900
 *
 * For female NIKs, the day is encoded as (actual day + 40).
 * For example, a female born on the 15th would have day = 55.
 *
 * @param nik - The 16-digit NIK string to validate
 * @returns `true` if the NIK is valid, `false` otherwise
 *
 * @example
 * ```typescript
 * validateNIK('3201234567890123'); // true - valid NIK
 * validateNIK('1234'); // false - wrong length
 * validateNIK('9912345678901234'); // false - invalid province
 * ```
 *
 * @public
 */
export function validateNIK(nik: string): boolean {
  if (!NIK_PATTERN.test(nik)) {
    return false;
  }

  const provinceCode = nik.substring(0, 2);
  if (!PROVINCES[provinceCode]) {
    return false;
  }

  const parsed = parseNIKDate(nik);
  if (!parsed) {
    return false;
  }

  const { fullYear, month, day } = parsed;

  if (!validateNIKDateComponents(fullYear, month, day)) {
    return false;
  }

  const now = new Date();
  if (new Date(fullYear, month - 1, day) > now || fullYear < 1900) {
    return false;
  }

  return true;
}
