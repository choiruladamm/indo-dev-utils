import { KESEHATAN_LENGTH, KETENAGAKERJAAN_LENGTH } from './constants';
import { BPJSType } from './types';
import { cleanBPJS } from './clean';

/**
 * Validates a BPJS number for the given type.
 * Cleans non-numeric characters before validating.
 *
 * @param number - BPJS number (raw or formatted)
 * @param type - 'kesehatan' (13 digits) or 'ketenagakerjaan' (11 digits)
 * @returns true if valid, false otherwise — never throws
 *
 * @example
 * validateBPJS('0001234567890', 'kesehatan') // true
 * validateBPJS('0001-2345-67890', 'kesehatan') // true (cleans first)
 * validateBPJS('12345678901', 'ketenangan') // true
 * validateBPJS('123456789', 'kesehatan') // false
 */
export function validateBPJS(number: string, type: BPJSType): boolean {
  if (!number || typeof number !== 'string') return false;
  const cleaned = cleanBPJS(number);
  const expectedLength =
    type === 'kesehatan' ? KESEHATAN_LENGTH : KETENAGAKERJAAN_LENGTH;
  return cleaned.length === expectedLength;
}

/**
 * Validates a BPJS Kesehatan number (13 numeric digits).
 *
 * @example
 * validateBPJSKesehatan('0001234567890') // true
 * validateBPJSKesehatan('000123456789') // false — 12 digits
 */
export function validateBPJSKesehatan(number: string): boolean {
  return validateBPJS(number, 'kesehatan');
}

/**
 * Validates a BPJS Ketenagakerjaan number (11 numeric digits).
 *
 * @example
 * validateBPJSKetenagakerjaan('12345678901') // true
 * validateBPJSKetenagakerjaan('1234567890') // false — 10 digits
 */
export function validateBPJSKetenagakerjaan(number: string): boolean {
  return validateBPJS(number, 'ketenagakerjaan');
}

/**
 * Detects BPJS type from digit length.
 * Returns null if the cleaned input length matches neither type.
 *
 * @example
 * detectBPJSType('0001234567890') // 'kesehatan'
 * detectBPJSType('12345678901')   // 'ketenagakerjaan'
 * detectBPJSType('123456789')     // null
 */
export function detectBPJSType(number: string): BPJSType | null {
  if (!number || typeof number !== 'string') return null;
  const cleaned = cleanBPJS(number);
  if (cleaned.length === KESEHATAN_LENGTH) return 'kesehatan';
  if (cleaned.length === KETENAGAKERJAAN_LENGTH) return 'ketenagakerjaan';
  return null;
}
