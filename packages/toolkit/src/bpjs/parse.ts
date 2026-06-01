import { cleanBPJS } from './clean';
import { detectBPJSType } from './validate';
import { formatBPJS } from './format';
import { BPJSInfo } from './types';

/**
 * Parses a BPJS number of either type. Auto-detects type from digit length.
 * Returns null if the number is invalid for both types.
 *
 * @example
 * parseBPJS('0001234567890')
 * // { type: 'kesehatan', raw: '0001234567890', formatted: '0001-2345-67890' }
 *
 * parseBPJS('0001-2345-67890')
 * // { type: 'kesehatan', raw: '0001234567890', formatted: '0001-2345-67890' }
 *
 * parseBPJS('12345678901')
 * // { type: 'ketenagakerjaan', raw: '12345678901', formatted: '1234-567-8901' }
 *
 * parseBPJS('12345')
 * // null
 */
export function parseBPJS(number: string): BPJSInfo | null {
  if (!number || typeof number !== 'string') return null;

  const raw = cleanBPJS(number);
  const type = detectBPJSType(raw);
  if (!type) return null;

  return {
    type,
    raw,
    formatted: formatBPJS(raw, type),
  };
}
