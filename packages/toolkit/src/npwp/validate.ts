/**
 * Validates an Indonesian NPWP (Nomor Pokok Wajib Pajak).
 *
 * Supports both 15-digit (standard) and 16-digit (new NIK-based) formats.
 *
 * @param npwp - The NPWP string to validate
 * @returns `true` if valid, `false` otherwise
 *
 * @example
 * ```typescript
 * validateNPWP('01.234.567.8-012.000'); // true
 * validateNPWP('012345678012000'); // true
 * ```
 */
export function validateNPWP(npwp: string): boolean {
  if (!npwp || typeof npwp !== 'string') {
    return false;
  }

  const cleaned = npwp.replace(/[^\d]/g, '');

  // Must be 15 or 16 digits
  if (cleaned.length !== 15 && cleaned.length !== 16) {
    return false;
  }

  // Basic check: all numeric
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }

  return true;
}
