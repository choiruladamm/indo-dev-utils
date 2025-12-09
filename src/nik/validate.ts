import { PROVINCES } from './constants';

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
  if (!/^\d{16}$/.test(nik)) {
    return false;
  }

  const provinceCode = nik.substring(0, 2);
  if (!PROVINCES[provinceCode]) {
    return false;
  }

  const yearStr = nik.substring(6, 8);
  const monthStr = nik.substring(8, 10);
  const dayStr = nik.substring(10, 12);

  const year = parseInt(yearStr, 10);
  const fullYear = year > 30 ? 1900 + year : 2000 + year;

  const month = parseInt(monthStr, 10);
  let day = parseInt(dayStr, 10);

  if (day > 40) {
    day = day - 40;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  const testDate = new Date(fullYear, month - 1, day);
  if (
    testDate.getFullYear() !== fullYear ||
    testDate.getMonth() !== month - 1 ||
    testDate.getDate() !== day
  ) {
    return false;
  }

  const now = new Date();
  if (testDate > now || testDate < new Date(1900, 0, 1)) {
    return false;
  }

  return true;
}
