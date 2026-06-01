import { createLCG } from '../lcg';
import { PROVINCE_CODES } from '../constants';
import { NIKMockOptions, MockGender } from '../types';

/**
 * Generates a structurally valid Indonesian NIK.
 * The returned NIK will pass validateNIK() from @indodev/toolkit/nik.
 *
 * WARNING: Only pass birthDate with day ≤ 28 to guarantee valid NIK.
 * Female encoding (day + 40) on days > 28 produces invalid day values.
 *
 * @example
 * generateNIK({ gender: 'M', seed: 42 })
 * // A valid 16-digit NIK string with male-encoded day
 *
 * @example
 * generateNIK({ gender: 'F', birthDate: new Date('1990-05-15'), seed: 1 })
 * // '3271015505900001'  (day 15 + 40 = 55 for female)
 */
export function generateNIK(options: NIKMockOptions = {}): string {
  const { gender, birthDate, provinceCode, seed } = options;
  const lcg = createLCG(seed);

  // Province
  const province = provinceCode ?? lcg.nextElement(PROVINCE_CODES);

  // District and sub-district (fixed)
  const kk = '01';
  const ss = '01';

  // Gender
  const resolvedGender: MockGender = gender ?? (lcg.nextInt(2) === 0 ? 'M' : 'F');

  // Birth date
  let day: number, month: number, year: number;

  if (birthDate) {
    day = birthDate.getDate();
    month = birthDate.getMonth() + 1;
    year = birthDate.getFullYear();
  } else {
    // Random date: 1960–2005, day 1–28
    day = lcg.nextRange(1, 28);
    month = lcg.nextRange(1, 12);
    year = lcg.nextRange(1960, 2005);
  }

  // Female encoding: day + 40
  const encodedDay = resolvedGender === 'F' ? day + 40 : day;

  const dd = String(encodedDay).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yy = String(year).slice(-2); // last 2 digits of year

  // Sequential number — fixed to '0001'
  const seq = '0001';

  // NIK format: PP KK SS YY MM DD SEQ (validator reads positions 6-11 as YY-MM-DD)
  return `${province}${kk}${ss}${yy}${mm}${dd}${seq}`;
}
