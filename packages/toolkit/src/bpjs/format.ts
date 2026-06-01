import { cleanBPJS } from './clean';
import { validateBPJS } from './validate';
import { BPJSType, InvalidBPJSError } from './types';

/**
 * Formats a BPJS number with standard separators.
 *
 * - kesehatan:        XXXX-XXXX-XXXXX  (4-4-5 groups)
 * - ketenangan:  XXXX-XXX-XXXX    (4-3-4 groups)
 *
 * Accepts pre-formatted input (idempotent).
 *
 * @throws {InvalidBPJSError} if the cleaned number fails validation for the given type
 *
 * @example
 * formatBPJS('0001234567890', 'kesehatan')    // '0001-2345-67890'
 * formatBPJS('12345678901', 'ketenangan') // '1234-567-8901'
 * formatBPJS('0001-2345-67890', 'kesehatan')  // '0001-2345-67890' (idempotent)
 */
export function formatBPJS(number: string, type: BPJSType): string {
  const cleaned = cleanBPJS(number);

  if (!validateBPJS(cleaned, type)) {
    throw new InvalidBPJSError(
      `Invalid BPJS ${type} number: "${number}"`
    );
  }

  if (type === 'kesehatan') {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
  }

  // ketenangan: 4-3-4
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
}
