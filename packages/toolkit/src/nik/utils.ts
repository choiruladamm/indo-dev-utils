import { parseNIK } from './parse';
import { cleanNIK } from './clean';
import { Age, GetAgeOptions } from './types';

/**
 * Calculates the age of a person based on their NIK.
 *
 * Returns detailed age breakdown with years, months, and days, or a
 * formatted Indonesian string. This is consistent with `datetime.getAge()`.
 *
 * @param nik - The 16-digit NIK string
 * @param options - Options object with `referenceDate` and `asString`
 * @returns Age object `{ years, months, days }`, formatted string, or null if invalid
 *
 * @example
 * ```typescript
 * // Returns object by default
 * getAge('3201018901310123');
 * // { years: 35, months: 2, days: 6 } (as of 2026-04-06)
 *
 * // Returns formatted string
 * getAge('3201018901310123', { asString: true });
 * // '35 Tahun 2 Bulan 6 Hari'
 *
 * // Custom reference date
 * getAge('3201018901310123', { referenceDate: new Date('2025-01-01') });
 * // { years: 35, months: 11, days: 1 }
 * ```
 *
 * @public
 */
export function getAge(
  nik: string,
  options: GetAgeOptions = {}
): Age | string | null {
  const { referenceDate = new Date(), asString = false } = options;

  const info = parseNIK(nik);
  if (!info || !info.birthDate) {
    return null;
  }

  const birthDate = info.birthDate;
  let years = referenceDate.getFullYear() - birthDate.getFullYear();
  let months = referenceDate.getMonth() - birthDate.getMonth();
  let days = referenceDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      0
    );
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (asString) {
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} Tahun`);
    if (months > 0) parts.push(`${months} Bulan`);
    if (days > 0 || parts.length === 0) parts.push(`${days} Hari`);
    return parts.join(' ');
  }

  return { years, months, days };
}

/**
 * Compares two NIKs to check if they belong to the same person.
 *
 * Two NIKs are considered the same person if they have identical:
 * - Province code (positions 1-2)
 * - Regency code (positions 3-4)
 * - District code (positions 5-6)
 * - Birth date (year + month + day)
 * - Gender (derived from day encoding)
 * - Serial number (positions 13-16)
 *
 * @param nik1 - First NIK (accepts any format)
 * @param nik2 - Second NIK (accepts any format)
 * @returns True if both NIKs belong to the same person, false otherwise
 *
 * @example
 * ```typescript
 * // Same person, same format
 * compareNIK('3201018901310123', '3201018901310123'); // true
 *
 * // Same person, different format
 * compareNIK('3201018901310123', '3201-01-89-01-31-0123'); // true
 *
 * // Different serial number
 * compareNIK('3201018901310123', '3201018901310124'); // false
 *
 * // Invalid NIK
 * compareNIK('invalid', '3201018901310123'); // false
 * ```
 *
 * @public
 */
export function compareNIK(nik1: string, nik2: string): boolean {
  const cleaned1 = cleanNIK(nik1);
  const cleaned2 = cleanNIK(nik2);

  if (
    cleaned1 === '' ||
    cleaned2 === '' ||
    cleaned1.length !== 16 ||
    cleaned2.length !== 16
  ) {
    return false;
  }

  if (cleaned1 === cleaned2) {
    return true;
  }

  const pos1_6_1 = cleaned1.substring(0, 6);
  const pos1_6_2 = cleaned2.substring(0, 6);

  if (pos1_6_1 !== pos1_6_2) {
    return false;
  }

  const birthDate1 = cleaned1.substring(6, 12);
  const birthDate2 = cleaned2.substring(6, 12);

  if (birthDate1 !== birthDate2) {
    return false;
  }

  const serial1 = cleaned1.substring(12, 16);
  const serial2 = cleaned2.substring(12, 16);

  return serial1 === serial2;
}

/**
 * Checks if a person is an adult based on their NIK.
 *
 * By default, uses 17 years as the threshold (Indonesian KTP eligibility age).
 * Indonesian law allows KTP at age 17, or upon marriage, or already married.
 *
 * @param nik - The 16-digit NIK string
 * @param minAge - Minimum age threshold (default: 17)
 * @returns True if the person is at least minAge years old, false otherwise
 *
 * @example
 * ```typescript
 * // Born 1995-01-01, reference 2026-04-06 (age 31)
 * isAdult('3201950101950123'); // true (31 >= 17)
 * isAdult('3201950101950123', 21); // true (31 >= 21)
 *
 * // Born 2010-01-01, reference 2026-04-06 (age 16)
 * isAdult('3210010101950123'); // false (16 < 17)
 * isAdult('3210010101950123', 16); // true (16 >= 16)
 *
 * // Invalid NIK
 * isAdult('invalid'); // false
 * ```
 *
 * @public
 */
export function isAdult(nik: string, minAge: number = 17): boolean {
  const age = getAge(nik);
  if (age === null) {
    return false;
  }

  if (typeof age === 'string') {
    const yearsMatch = age.match(/^(\d+)/);
    if (yearsMatch) {
      return parseInt(yearsMatch[1], 10) >= minAge;
    }
    return false;
  }

  return age.years >= minAge;
}

/**
 * Formats the birth date from a NIK into a human-readable string.
 *
 * @param nik - The 16-digit NIK string
 * @param locale - The locale to use for formatting (default: 'id-ID')
 * @returns Formatted birth date string, or null if invalid
 *
 * @example
 * ```typescript
 * formatBirthDate('3201018901310123'); // '31 Januari 1989'
 * ```
 */
export function formatBirthDate(nik: string): string | null {
  const info = parseNIK(nik);
  if (!info || !info.birthDate) {
    return null;
  }

  const day = info.birthDate.getDate();
  const month = info.birthDate.getMonth();
  const year = info.birthDate.getFullYear();

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return `${day} ${monthNames[month]} ${year}`;
}

/**
 * Checks if a NIK matches a specific gender.
 *
 * @param nik - The 16-digit NIK string
 * @param gender - The gender to check ('male' | 'female')
 * @returns True if the NIK matches the gender, false otherwise
 */
export function isValidForGender(
  nik: string,
  gender: 'male' | 'female'
): boolean {
  const info = parseNIK(nik);
  if (!info) {
    return false;
  }
  return info.gender === gender;
}

/**
 * Checks if a NIK matches a specific birth date.
 *
 * @param nik - The 16-digit NIK string
 * @param birthDate - The birth date to check
 * @returns True if the NIK matches the birth date, false otherwise
 */
export function isValidForBirthDate(nik: string, birthDate: Date): boolean {
  const info = parseNIK(nik);
  if (!info || !info.birthDate) {
    return false;
  }

  return (
    info.birthDate.getFullYear() === birthDate.getFullYear() &&
    info.birthDate.getMonth() === birthDate.getMonth() &&
    info.birthDate.getDate() === birthDate.getDate()
  );
}
