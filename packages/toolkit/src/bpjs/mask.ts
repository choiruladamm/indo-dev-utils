import { cleanBPJS } from './clean';
import { BPJSMaskOptions } from './types';

/**
 * Masks a BPJS number for privacy-safe display.
 * Always operates on the raw (digits-only) string.
 *
 * Defaults: visibleStart=4, visibleEnd=2, maskChar='*'
 *
 * If visibleStart + visibleEnd >= raw.length, returns the full raw string unmasked.
 *
 * @example
 * maskBPJS('0001234567890')
 * // '0001*******90'
 *
 * maskBPJS('0001234567890', { visibleStart: 4, visibleEnd: 4, maskChar: 'X' })
 * // '0001XXXXXR7890'  — note: 13 - 4 - 4 = 5 mask chars
 *
 * maskBPJS('0001-2345-67890')  // accepts formatted input
 * // '0001*******90'
 *
 * maskBPJS('')
 * // ''
 */
export function maskBPJS(number: string, options: BPJSMaskOptions = {}): string {
  if (!number || typeof number !== 'string') return '';

  const raw = cleanBPJS(number);
  if (!raw) return '';

  const { visibleStart = 4, visibleEnd = 2, maskChar = '*' } = options;

  if (visibleStart + visibleEnd >= raw.length) return raw;

  const maskLength = raw.length - visibleStart - visibleEnd;
  return (
    raw.slice(0, visibleStart) +
    maskChar.repeat(maskLength) +
    raw.slice(raw.length - visibleEnd)
  );
}
