import { createLCG } from '../lcg';
import { NPWPMockOptions } from '../types';

/**
 * Generates a valid NPWP string.
 * Passes validateNPWP() from @indodev/toolkit/npwp.
 *
 * @example
 * generateNPWP({ format: 'formatted', seed: 1 }) // '12.345.678.9-012.345'
 * generateNPWP({ format: 'raw', seed: 1 }) // '123456789012345'
 */
export function generateNPWP(options: NPWPMockOptions = {}): string {
  const { format = 'formatted', seed } = options;
  const lcg = createLCG(seed);

  // 15 random digits
  const digits = lcg.nextDigits(15);

  if (format === 'raw') return digits;

  // Format: XX.XXX.XXX.X-XXX.XXX
  return (
    `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}` +
    `.${digits[8]}-${digits.slice(9, 12)}.${digits.slice(12, 15)}`
  );
}
