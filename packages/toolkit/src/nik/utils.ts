import { parseNIK } from './parse';

/**
 * Calculates the age of a person based on their NIK.
 *
 * @param nik - The 16-digit NIK string
 * @param referenceDate - The date to calculate age from (default: current date)
 * @returns The age in years, or null if the NIK is invalid or birth date cannot be parsed
 *
 * @example
 * ```typescript
 * getAge('3201018901310123'); // 35 (as of 2024)
 * ```
 */
export function getAge(
  nik: string,
  referenceDate: Date = new Date()
): number | null {
  const info = parseNIK(nik);
  if (!info || !info.birthDate) {
    return null;
  }

  const birthDate = info.birthDate;
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const m = referenceDate.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && referenceDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
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
export function formatBirthDate(
  nik: string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
  locale: string = 'id-ID'
): string | null {
  const info = parseNIK(nik);
  if (!info || !info.birthDate) {
    return null;
  }

  return new Intl.DateTimeFormat(locale, options).format(info.birthDate);
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
