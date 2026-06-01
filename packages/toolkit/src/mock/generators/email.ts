import { createLCG } from '../lcg';
import { FIRST_NAMES_MALE, LAST_NAMES, EMAIL_DOMAINS } from '../constants';
import { EmailMockOptions } from '../types';

/**
 * Generates a realistic Indonesian email address.
 * Passes validateEmail() from @indodev/toolkit/email-validator.
 *
 * Design: Email is gender-neutral. Local part uses male first names
 * regardless of any gender context. This avoids gender inference.
 *
 * @example
 * generateEmail({ domain: 'gmail.com', seed: 1 }) // 'budi.santoso42@gmail.com'
 */
export function generateEmail(options: EmailMockOptions = {}): string {
  const { domain, seed } = options;
  const lcg = createLCG(seed);

  const resolvedDomain = domain ?? lcg.nextElement(EMAIL_DOMAINS);

  // Use male names as baseline (gender-neutral for email purposes)
  const first = lcg.nextElement(FIRST_NAMES_MALE).toLowerCase();
  const last = lcg.nextElement(LAST_NAMES).toLowerCase();
  const num = lcg.nextRange(10, 99); // 2-digit number

  return `${first}.${last}${num}@${resolvedDomain}`;
}
