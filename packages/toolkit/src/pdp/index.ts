/**
 * PDP (Perlindungan Data Pribadi) — Indonesian Personal Data Protection utilities.
 *
 * Scans, masks, and anonymizes Personally Identifiable Information (PII) in
 * strings or structured values. All operations are pattern-based; no external
 * data, no API calls, no side effects.
 *
 * @example
 * ```typescript
 * import { scanPII, maskStringPDP, anonymizeString, anonymizePDP } from '@indodev/toolkit/pdp';
 *
 * // Scan a string for PII
 * const findings = scanPII('NIK: 3271054108750001, email: a@b.com');
 * // [{ type: 'nik', value: '3271054108750001', ... }, { type: 'email', value: 'a@b.com', ... }]
 *
 * // Mask PII in a string
 * maskStringPDP('Hubungi 081234567890'); // 'Hubungi 0812****7890'
 *
 * // Anonymize a single string
 * anonymizeString('Email saya a@b.com'); // 'Email saya ******'
 *
 * // Anonymize structured data (deep, key-aware)
 * anonymizePDP({ user: { nik: '3271054108750001', name: 'Budi' } });
 * // { user: { nik: '************0001', name: 'Budi' } }
 * ```
 *
 * @module pdp
 * @packageDocumentation
 */

export type { PIIType, PIIFinding, PIIOptions, PIIConfidence } from './types';
export { scanPII } from './scanner';
export { maskStringPDP } from './mask';
export { anonymizeString, anonymizePDP } from './anonymize';