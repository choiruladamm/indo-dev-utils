import {
  VIN_LENGTH,
  VIN_CHAR_VALUES,
  EXCLUDED_VIN_CHARS,
  VIN_WEIGHTS,
  VIN_CHECK_DIGIT_INDEX,
  VIN_MODULUS,
  VIN_CHECK_DIGIT_X,
} from './constants';
import type { VINInfo } from './types';

/**
 * Parses a Vehicle Identification Number (VIN) into its component parts.
 *
 * Extracts the WMI (World Manufacturer Identifier), VDS (Vehicle Descriptor Section),
 * check digit, model year code, plant code, and serial number from a VIN.
 *
 * @param vin - The VIN string to parse
 * @returns VINInfo object with extracted components, or null if invalid
 *
 * @example
 * Valid VIN:
 * ```typescript
 * parseVIN('1HBHA82L7ZB000001');
 * // {
 * //   wmi: '1HB',
 * //   vds: 'HA82L7',
 * //   checkDigit: '7',
 * //   modelYearCode: 'Z',
 * //   plantCode: 'B',
 * //   serialNumber: '0000001',
 * //   isValid: true
 * // }
 * ```
 *
 * @example
 * Invalid VIN returns null:
 * ```typescript
 * parseVIN('invalid');
 * // null
 * ```
 *
 * @public
 */
export function parseVIN(vin: string): VINInfo | null {
  if (!vin || typeof vin !== 'string') {
    return null;
  }

  const normalizedVIN = vin.toUpperCase();

  if (normalizedVIN.length !== VIN_LENGTH) {
    return null;
  }

  for (const char of EXCLUDED_VIN_CHARS) {
    if (normalizedVIN.includes(char)) {
      return null;
    }
  }

  for (const char of normalizedVIN) {
    if (VIN_CHAR_VALUES[char] === undefined) {
      return null;
    }
  }

  const isValid = validateCheckDigit(normalizedVIN);

  const wmi = normalizedVIN.substring(0, 3);
  const vds = normalizedVIN.substring(3, 9);
  const checkDigit = normalizedVIN[VIN_CHECK_DIGIT_INDEX];
  const modelYearCode = normalizedVIN[9];
  const plantCode = normalizedVIN[10];
  const serialNumber = normalizedVIN.substring(11, 17);

  return {
    wmi,
    vds,
    checkDigit,
    modelYearCode,
    plantCode,
    serialNumber,
    isValid,
  };
}

/**
 * Validates the check digit of a VIN.
 *
 * @internal
 */
function validateCheckDigit(vin: string): boolean {
  let sum = 0;
  for (let i = 0; i < VIN_LENGTH; i++) {
    const char = vin[i];
    const weight = VIN_WEIGHTS[i];
    const val = VIN_CHAR_VALUES[char];

    if (val === undefined) {
      return false;
    }

    sum += val * weight;
  }

  const checkDigitValue = sum % VIN_MODULUS;
  const expectedCheckDigit =
    checkDigitValue === 10 ? VIN_CHECK_DIGIT_X : checkDigitValue.toString();
  const actualCheckDigit = vin[VIN_CHECK_DIGIT_INDEX];

  return actualCheckDigit === expectedCheckDigit;
}
