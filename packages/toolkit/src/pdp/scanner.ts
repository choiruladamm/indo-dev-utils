import { PIIFinding, PIIType, PIIConfidence } from './types';
import {
  NIK_SCAN_PATTERN,
  NPWP_SCAN_PATTERN,
  PHONE_SCAN_PATTERN,
  EMAIL_SCAN_PATTERN,
  PASSPORT_SCAN_PATTERN,
  BPJS_SCAN_PATTERN,
  BANK_ACCOUNT_SCAN_PATTERN,
} from './constants';

interface RawMatch {
  type: PIIType;
  value: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Scans text for Personally Identifiable Information (PII).
 *
 * Detects Indonesian-specific PII types:
 * - NIK (National ID number)
 * - NPWP (Tax ID number)
 * - Phone numbers (Indonesian format)
 * - Email addresses
 * - Passport numbers
 * - BPJS ID numbers
 * - Bank account numbers
 *
 * @param text - Text to scan for PII
 * @returns Array of PII findings with type, value, position, and confidence
 *
 * @example
 * ```typescript
 * const text = "NIK saya 3271054108750001, email budi@email.com";
 * const findings = scanPII(text);
 * // [{ type: 'nik', value: '3271054108750001', startIndex: 10, ... },
 * //  { type: 'email', value: 'budi@email.com', startIndex: 34, ... }]
 * ```
 *
 * @example
 * For data privacy audit:
 * ```typescript
 * const doc = "Kirim ke Jl. Sudirman 45, NIK 3271054108750001";
 * const piiLocations = scanPII(doc);
 * // Use findings to mask/redact before sharing
 * ```
 */
export function scanPII(text: string): PIIFinding[] {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const rawMatches: RawMatch[] = [];
  const patterns: Array<{ type: PIIType; pattern: RegExp }> = [
    { type: 'nik', pattern: NIK_SCAN_PATTERN },
    { type: 'npwp', pattern: NPWP_SCAN_PATTERN },
    { type: 'phone', pattern: PHONE_SCAN_PATTERN },
    { type: 'email', pattern: EMAIL_SCAN_PATTERN },
    { type: 'passport', pattern: PASSPORT_SCAN_PATTERN },
    { type: 'bpjs', pattern: BPJS_SCAN_PATTERN },
    { type: 'bank-account', pattern: BANK_ACCOUNT_SCAN_PATTERN },
  ];

  for (const { type, pattern } of patterns) {
    for (const match of text.matchAll(pattern)) {
      const value = match[1] || match[0];
      rawMatches.push({
        type,
        value,
        startIndex: match.index!,
        endIndex: match.index! + value.length,
      });
    }
  }

  const resolved = resolveOverlaps(rawMatches);

  return resolved.map(m => ({
    type: m.type,
    value: m.value,
    startIndex: m.startIndex,
    endIndex: m.endIndex,
    confidence: calculateConfidence(m.type, m.value),
  })).sort((a, b) => a.startIndex - b.startIndex);
}

function resolveOverlaps(matches: RawMatch[]): RawMatch[] {
  if (matches.length === 0) return [];

  const typePriority: Record<PIIType, number> = {
    email: 1,
    nik: 2,
    npwp: 3,
    phone: 4,
    passport: 5,
    bpjs: 6,
    'bank-account': 7,
  };

  const sorted = [...matches].sort((a, b) => {
    if (a.startIndex !== b.startIndex) {
      return a.startIndex - b.startIndex;
    }
    if (a.endIndex !== b.endIndex) {
      return b.endIndex - a.endIndex;
    }
    return (typePriority[a.type] || 999) - (typePriority[b.type] || 999);
  });

  const result: RawMatch[] = [];

  for (const match of sorted) {
    const last = result[result.length - 1];

    if (last && match.startIndex < last.endIndex) {
      const lastPriority = typePriority[last.type] || 999;
      const matchPriority = typePriority[match.type] || 999;

      if (matchPriority < lastPriority) {
        result[result.length - 1] = match;
      }
    } else {
      result.push(match);
    }
  }

  return result;
}

function calculateConfidence(type: PIIType, value: string): PIIConfidence {
  const cleanValue = value.replace(/[-.]+/g, '');

  switch (type) {
    case 'nik':
      return /^\d{16}$/.test(cleanValue) ? 'high' : 'low';

    case 'npwp':
      return /^\d{15}$/.test(cleanValue) ? 'high' : 'medium';

    case 'phone': {
      return 'high';
    }

    case 'email':
      return value.includes('@') && value.includes('.') ? 'high' : 'low';

    case 'passport':
      return /^[A-Z]{1,2}\d{6,8}$/i.test(value) ? 'high' : 'low';

    case 'bpjs':
      return value.startsWith('000') || value.startsWith('BPJS') ? 'high' : 'medium';

    case 'bank-account':
      return /^\d{10,16}$/.test(cleanValue) ? 'medium' : 'low';

    default:
      return 'low';
  }
}