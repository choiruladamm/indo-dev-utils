import { createLCG } from '../lcg';
import { BPJSMockOptions, BPJSScheme } from '../types';
import { KESEHATAN_LENGTH, KETENAGAKERJAAN_LENGTH } from '../../bpjs/constants';

const SCHEME_LENGTH: Record<BPJSScheme, number> = {
  kesehatan: KESEHATAN_LENGTH,
  ketenagakerjaan: KETENAGAKERJAAN_LENGTH,
};

/**
 * Generates a structurally valid BPJS number for the requested scheme.
 * Output passes `validateBPJS(value, scheme)` from `@indodev/toolkit/bpjs`.
 *
 * - Default scheme: `kesehatan` (13 digits).
 * - When `seed` is provided, the LCG is re-seeded so output is reproducible.
 *
 * @example
 * generateBPJS()                          // 13-digit Kesehatan number
 * generateBPJS({ scheme: 'ketenagakerjaan', seed: 1 })  // 11-digit Ketenagakerjaan
 */
export function generateBPJS(options: BPJSMockOptions = {}): string {
  const { scheme = 'kesehatan', seed } = options;
  const lcg = createLCG(seed);
  const length = SCHEME_LENGTH[scheme];
  return lcg.nextDigits(length);
}
