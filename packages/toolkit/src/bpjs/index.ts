/**
 * BPJS (Social Security) number utilities.
 *
 * Validates, formats, parses, and masks Indonesian BPJS numbers:
 * - BPJS Kesehatan: 13 numeric digits
 * - BPJS Ketenagakerjaan: 11 numeric digits
 *
 * All operations are format-based (no external data, no API calls).
 *
 * @example
 * ```typescript
 * import { validateBPJSKesehatan, formatBPJS, parseBPJS } from '@indodev/toolkit/bpjs';
 *
 * validateBPJSKesehatan('0001234567890');    // true
 * formatBPJS('0001234567890', 'kesehatan');  // '0001-2345-67890'
 * parseBPJS('12345678901');
 * // { type: 'ketenagakerjaan', raw: '12345678901', formatted: '1234-567-8901' }
 * ```
 *
 * @module bpjs
 * @packageDocumentation
 */

export { validateBPJS, validateBPJSKesehatan, validateBPJSKetenagakerjaan, detectBPJSType } from './validate';
export { formatBPJS } from './format';
export { parseBPJS } from './parse';
export { maskBPJS } from './mask';
export { cleanBPJS } from './clean';
export { InvalidBPJSError } from './types';
export type { BPJSType, BPJSInfo, BPJSMaskOptions } from './types';
