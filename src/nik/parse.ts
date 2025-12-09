import { PROVINCES, REGENCIES } from './constants';
import { NIKInfo } from './types';

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
  if (!/^\d{16}$/.test(nik)) {
    return null;
  }

  const provinceCode = nik.substring(0, 2);
  const regencyCode = nik.substring(2, 4);
  const districtCode = nik.substring(4, 6);
  const yearStr = nik.substring(6, 8);
  const monthStr = nik.substring(8, 10);
  const dayStr = nik.substring(10, 12);
  const serialNumber = nik.substring(12, 16);

  const province = PROVINCES[provinceCode];
  if (!province) {
    return null;
  }

  const regencies = REGENCIES[provinceCode] || {};
  const regency = regencies[regencyCode] || 'Unknown';

  let day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  let gender: 'male' | 'female' | null = null;
  if (day > 40) {
    gender = 'female';
    day -= 40;
  } else {
    gender = 'male';
  }

  const fullYear = year > 30 ? 1900 + year : 2000 + year;

  const birthDate = new Date(fullYear, month - 1, day);
  if (
    birthDate.getFullYear() !== fullYear ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return null;
  }

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