import {
  VIN_WEIGHTS,
  VIN_CHAR_VALUES,
  EXCLUDED_VIN_CHARS,
  VIN_LENGTH,
  VIN_CHECK_DIGIT_INDEX,
  VIN_MODULUS,
  VIN_CHECK_DIGIT_X,
} from './constants';

/**
 * Validates a Vehicle Identification Number (VIN) based on ISO 3779.
 *
 * Checks for:
 * - Exactly 17 characters length.
 * - Exclusion of characters I, O, and Q.
 * - Checksum validation using the check digit at position 9.
 *
 * @param vin - The VIN string to validate
 * @returns boolean indicating if the VIN is valid
 *
 * @example
 * ```typescript
 * import { validateVIN } from '@indodev/toolkit/vin';
 *
 * validateVIN('1HBHA82L7ZB000001'); // true
 * validateVIN('1HBHA82I7ZB000001'); // false (contains 'I')
 * ```
 */
export function validateVIN(vin: string): boolean {
  if (!vin || vin.length !== VIN_LENGTH) {
    return false;
  }

  const normalizedVIN = vin.toUpperCase();

  // 1. Check for excluded characters (I, O, Q)
  for (const char of EXCLUDED_VIN_CHARS) {
    if (normalizedVIN.includes(char)) {
      return false;
    }
  }

  // 2. Checksum validation (Position 9)
  let sum = 0;
  for (let i = 0; i < VIN_LENGTH; i++) {
    const char = normalizedVIN[i];
    const weight = VIN_WEIGHTS[i];
    const val = VIN_CHAR_VALUES[char];

    if (val === undefined) {
      return false; // Invalid character found
    }

    sum += val * weight;
  }

  const checkDigitValue = sum % VIN_MODULUS;
  const expectedCheckDigit =
    checkDigitValue === 10 ? VIN_CHECK_DIGIT_X : checkDigitValue.toString();
  const actualCheckDigit = normalizedVIN[VIN_CHECK_DIGIT_INDEX];

  return actualCheckDigit === expectedCheckDigit;
}
