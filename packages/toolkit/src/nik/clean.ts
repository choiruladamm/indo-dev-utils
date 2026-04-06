/**
 * Cleans a NIK by removing all non-digit characters.
 *
 * Accepts NIK in any format (with separators like `.`, `-`, ` `) and
 * returns a clean 16-digit string. Returns empty string for invalid inputs.
 *
 * @param nik - NIK in any format
 * @returns Clean 16-digit NIK or empty string if invalid
 *
 * @example
 * ```typescript
 * cleanNIK('32-01-01-89-01-31-0123'); // '3201018901310123'
 * cleanNIK('3201.8901.3101.23'); // '32018901310123' (only 14 digits - invalid)
 * cleanNIK('invalid'); // ''
 * ```
 *
 * @public
 */
export function cleanNIK(nik: string): string {
  if (typeof nik !== 'string') {
    return '';
  }

  const cleaned = nik.replace(/\D/g, '');

  if (cleaned.length !== 16) {
    return '';
  }

  return cleaned;
}
