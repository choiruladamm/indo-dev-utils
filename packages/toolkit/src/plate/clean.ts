/**
 * Cleans a license plate by removing all non-alphanumeric characters
 * and converting to uppercase.
 *
 * @param plate - The license plate to clean
 * @returns Cleaned plate string (alphanumeric only, uppercase), or empty string if empty input
 *
 * @example
 * ```typescript
 * cleanPlate('B 1234 ABC');  // 'B1234ABC'
 * cleanPlate('da-1234-xyz'); // 'DA1234XYZ'
 * cleanPlate('');           // ''
 * ```
 *
 * @public
 */
export function cleanPlate(plate: string): string {
  if (typeof plate !== 'string') {
    return '';
  }

  const cleaned = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  return cleaned;
}
