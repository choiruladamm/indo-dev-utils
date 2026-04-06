import { PROVINCES, REGENCIES } from './constants';
import { NIKInfo } from './types';
import { parseNIKDate, validateNIKDateComponents } from './utils/date';

const NIK_PATTERN = /^\d{16}$/;

/**
 * Parses a NIK and extracts all embedded information.
 *
 * Extracts province, regency, district codes, birth date, gender,
 * and serial number from a 16-digit NIK string.
 *
 * @param nik - The 16-digit NIK string to parse
 * @returns Parsed NIK information, or `null` if the NIK format is invalid
 *
 * @example
 * Parse a valid male NIK:
 * ```typescript
 * const info = parseNIK('3201018901310123');
 * console.log(info);
 * // {
 * //   province: { code: '32', name: 'Jawa Barat' },
 * //   regency: { code: '01', name: 'Kab. Bogor' },
 * //   district: { code: '01', name: null },
 * //   birthDate: Date(1989, 0, 31), // Jan 31, 1989
 * //   gender: 'male',
 * //   serialNumber: '0123',
 * //   isValid: true
 * // }
 * ```
 *
 * @example
 * Parse a female NIK (day + 40):
 * ```typescript
 * const info = parseNIK('3201019508550123');
 * console.log(info.gender); // 'female'
 * console.log(info.birthDate); // Date(1995, 7, 15) - Aug 15, 1995
 * ```
 *
 * @example
 * Invalid NIK returns null:
 * ```typescript
 * const info = parseNIK('invalid');
 * console.log(info); // null
 * ```
 *
 * @public
 */
export function parseNIK(nik: string): NIKInfo | null {
  if (!NIK_PATTERN.test(nik)) {
    return null;
  }

  const provinceCode = nik.substring(0, 2);
  const regencyCode = nik.substring(2, 4);
  const districtCode = nik.substring(4, 6);
  const serialNumber = nik.substring(12, 16);

  const province = PROVINCES[provinceCode];
  if (!province) {
    return null;
  }

  const regencies = REGENCIES[provinceCode] || {};
  const regency = regencies[regencyCode] || 'Unknown';

  const parsed = parseNIKDate(nik);
  if (!parsed) {
    return null;
  }

  const { fullYear, month, day, gender } = parsed;

  if (!validateNIKDateComponents(fullYear, month, day)) {
    return null;
  }

  const birthDate = new Date(fullYear, month - 1, day);

  return {
    province: {
      code: provinceCode,
      name: province,
    },
    regency: {
      code: regencyCode,
      name: regency,
    },
    district: {
      code: districtCode,
      name: null,
    },
    birthDate,
    gender,
    serialNumber,
    isValid: true,
  };
}
