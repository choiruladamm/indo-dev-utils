/**
 * Cleans an NPWP by removing all non-digit characters.
 *
 * @param npwp - The NPWP to clean
 * @returns Cleaned NPWP string (digits only), or empty string if invalid
 *
 * @example
 * ```typescript
 * cleanNPWP('01.234.567.8-012.345'); // '0123456789012345'
 * cleanNPWP('01-234-567-8-012-345'); // '0123456789012345'
 * cleanNPWP(''); // ''
 * ```
 *
 * @public
 */
export function cleanNPWP(npwp: string): string {
  if (typeof npwp !== 'string') {
    return '';
  }

  const cleaned = npwp.replace(/\D/g, '');

  return cleaned;
}
