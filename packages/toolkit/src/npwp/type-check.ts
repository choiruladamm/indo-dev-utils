import { validateNPWP } from './validate';

/**
 * Checks if an NPWP is based on NIK (Nomor Induk Kependudukan).
 *
 * NIK-based NPWPs start with the same 16 digits as the holder's NIK.
 * This is the newer format introduced for individual taxpayers.
 *
 * @param npwp - The NPWP to check
 * @returns true if NIK-based NPWP, false otherwise
 *
 * @example
 * ```typescript
 * isNIKBasedNPWP('3201234567890003'); // true (16 digits, NIK-based)
 * isNIKBasedNPWP('012345678012345'); // true (16 digits, NIK-based)
 * isNIKBasedNPWP('091234567012000'); // false (15 digits, standard)
 * isNIKBasedNPWP('invalid');         // false
 * ```
 *
 * @public
 */
export function isNIKBasedNPWP(npwp: string): boolean {
  if (!npwp || typeof npwp !== 'string') {
    return false;
  }

  if (!validateNPWP(npwp)) {
    return false;
  }

  const cleaned = npwp.replace(/\D/g, '');

  return cleaned.length === 16;
}
