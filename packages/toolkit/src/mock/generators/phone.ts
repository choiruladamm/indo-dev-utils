import { createLCG } from '../lcg';
import { OPERATOR_SAMPLE_PREFIXES } from '../constants';
import { PhoneMockOptions, PhoneOperator } from '../types';

const OPERATOR_NAMES = Object.keys(OPERATOR_SAMPLE_PREFIXES) as PhoneOperator[];

/**
 * Generates a valid Indonesian mobile phone number.
 * Passes validatePhoneNumber() from @indodev/toolkit/phone.
 *
 * Note: 'international' and 'e164' produce identical output for
 * Indonesian numbers (+62 prefix). This is intentional.
 *
 * @example
 * generatePhone({ format: 'national', operator: 'Telkomsel', seed: 1 })
 * // '08121234567'
 *
 * @example
 * generatePhone({ format: 'international', seed: 5 })
 * // '+628171234567'
 */
export function generatePhone(options: PhoneMockOptions = {}): string {
  const { format = 'national', operator, seed } = options;
  const lcg = createLCG(seed);

  const resolvedOperator: PhoneOperator = operator ?? lcg.nextElement(OPERATOR_NAMES);
  const prefix = OPERATOR_SAMPLE_PREFIXES[resolvedOperator]; // e.g., '0812'

  // Generate 7-digit suffix for total of 11 digits in national format
  const suffix = lcg.nextDigits(7);

  // prefix starts with '0' (4 chars), suffix is 7 chars → national = 11 chars
  const national = `${prefix}${suffix}`;

  if (format === 'national') return national;

  // Strip leading '0', prepend country code
  const digits = national.slice(1); // '812xxxxxxx'
  return `+62${digits}`;
}
