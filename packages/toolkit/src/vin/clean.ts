/**
 * Cleans a VIN by removing all non-alphanumeric characters
 * and converting to uppercase.
 *
 * @param vin - The VIN to clean
 * @returns Cleaned VIN string (alphanumeric only, uppercase), or empty string if empty input
 *
 * @example
 * ```typescript
 * cleanVIN('1HGBH-41JXMN-109186'); // '1HGBH41JXMN109186'
 * cleanVIN(' 1hgbh41jxmn109186 '); // '1HGBH41JXMN109186'
 * cleanVIN(''); // ''
 * ```
 *
 * @public
 */
export function cleanVIN(vin: string): string {
  if (typeof vin !== 'string') {
    return '';
  }

  const cleaned = vin.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  return cleaned;
}
