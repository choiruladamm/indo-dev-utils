import { createLCG } from '../lcg';
import { PRIVATE_PLATE_PREFIXES } from '../constants';
import { PlateMockOptions } from '../types';

const PLATE_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXY'; // common plate suffix chars

/**
 * Generates a valid Indonesian private license plate.
 * Passes validatePlate() from @indodev/toolkit/plate.
 *
 * Note: Only 'private' type is implemented. 'public' type is accepted
 * as a parameter but produces the same output format.
 *
 * @example
 * generatePlate({ type: 'private', region: 'B', seed: 1 }) // 'B 1234 ABC'
 * generatePlate({ seed: 5 }) // 'D 5678 XY'
 */
export function generatePlate(options: PlateMockOptions = {}): string {
  const { region, seed } = options;
  const lcg = createLCG(seed);

  const prefix = region ?? lcg.nextElement(PRIVATE_PLATE_PREFIXES);

  // 4-digit number: 1000–9999
  const number = lcg.nextRange(1000, 9999).toString();

  // 2-3 letter suffix
  const suffixLength = lcg.nextRange(2, 3);
  let suffix = '';
  for (let i = 0; i < suffixLength; i++) {
    suffix += PLATE_LETTERS[lcg.nextInt(PLATE_LETTERS.length)];
  }

  return `${prefix} ${number} ${suffix}`;
}
