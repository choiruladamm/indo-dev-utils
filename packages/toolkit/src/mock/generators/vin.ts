import { createLCG } from '../lcg';
import { VINMockOptions } from '../types';
import {
  VIN_LENGTH,
  VIN_CHECK_DIGIT_INDEX,
  VIN_MODULUS,
  VIN_CHECK_DIGIT_X,
  VIN_WEIGHTS,
  VIN_CHAR_VALUES,
  EXCLUDED_VIN_CHARS,
} from '../../vin/constants';

const VIN_CHARS = Object.keys(VIN_CHAR_VALUES);
const EXCLUDED_SET = new Set(EXCLUDED_VIN_CHARS);

function computeCheckDigit(chars: readonly string[]): string {
  let sum = 0;
  for (let i = 0; i < VIN_LENGTH; i++) {
    if (i === VIN_CHECK_DIGIT_INDEX) continue;
    const val = VIN_CHAR_VALUES[chars[i]];
    sum += val * VIN_WEIGHTS[i];
  }
  const value = sum % VIN_MODULUS;
  return value === 10 ? VIN_CHECK_DIGIT_X : value.toString();
}

function isValidVinChar(c: string): boolean {
  return c.length === 1 && !EXCLUDED_SET.has(c) && c in VIN_CHAR_VALUES;
}

/**
 * Generates a structurally valid 17-character VIN.
 * Output passes `validateVIN()` from `@indodev/toolkit/vin`, including a correct
 * check digit at position 9 and no excluded characters (I, O, Q).
 *
 * - When `manufacturerPrefix` is provided, it is used as the leading 3 chars. If the
 *   prefix contains invalid characters, the function falls back to a random prefix.
 * - When `seed` is provided, the LCG is re-seeded so output is reproducible.
 *
 * @example
 * generateVIN()                      // 17-char VIN
 * generateVIN({ manufacturerPrefix: '1HG', seed: 1 })  // starts with '1HG'
 */
export function generateVIN(options: VINMockOptions = {}): string {
  const { manufacturerPrefix, seed } = options;
  const lcg = createLCG(seed);

  const chars: string[] = new Array(VIN_LENGTH);
  const usePrefix =
    typeof manufacturerPrefix === 'string' &&
    manufacturerPrefix.length === 3 &&
    [...manufacturerPrefix].every(isValidVinChar);

  if (usePrefix) {
    for (let i = 0; i < 3; i++) {
      chars[i] = (manufacturerPrefix as string)[i].toUpperCase();
    }
  } else {
    for (let i = 0; i < 3; i++) {
      chars[i] = lcg.nextElement(VIN_CHARS);
    }
  }

  for (let i = 3; i < VIN_LENGTH; i++) {
    if (i === VIN_CHECK_DIGIT_INDEX) continue;
    chars[i] = lcg.nextElement(VIN_CHARS);
  }

  chars[VIN_CHECK_DIGIT_INDEX] = computeCheckDigit(chars);
  return chars.join('');
}
