import { PIIOptions } from './types';
import { scanPII } from './scanner';
import { MAX_DEPTH, CIRCULAR_PLACEHOLDER } from './constants';

const DEFAULT_OPTIONS: Required<PIIOptions> = {
  explicitKeys: [],
  autoDetectPII: true,
  maskChar: '*',
  maskStrategy: 'partial',
  replacementText: '',
  escapeForLog: false,
};

/**
 * Anonymizes PII in a string by replacing with masked version.
 *
 * Scans text for PII patterns and replaces detected values with
 * masked equivalents. Use for data sharing, logging, or display.
 *
 * @param text - Text containing PII to anonymize
 * @param options - Anonymization options
 * @returns Text with PII replaced (original value not recoverable)
 *
 * @example
 * ```typescript
 * anonymizeString("NIK 3271054108750001");
// "NIK ***************"
 * ```
 *
 * @example
 * For API response sanitization:
 * ```typescript
 * const response = { name: "Budi", nik: "3271054108750001" };
 * const sanitized = anonymizeString(JSON.stringify(response));
 * // Useful before logging or returning to client
 * ```
 */
export function anonymizeString(text: string, options?: PIIOptions): string {
  if (!text || typeof text !== 'string') {
    return text;
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!opts.autoDetectPII && opts.explicitKeys.length === 0) {
    return opts.escapeForLog ? escapeForLog(text) : text;
  }

  const findings = scanPII(text);

  if (findings.length === 0) {
    return opts.escapeForLog ? escapeForLog(text) : text;
  }

  let result = '';
  let lastIndex = 0;

  for (const finding of findings) {
    result += text.slice(lastIndex, finding.startIndex);
    result += applyMask(finding.value, opts);
    lastIndex = finding.endIndex;
  }

  result += text.slice(lastIndex);

  return opts.escapeForLog ? escapeForLog(result) : result;
}

/**
 * Recursively anonymizes PII in an object or array.
 *
 * Deep-scans nested structures (objects, arrays) for string values
 * containing PII and replaces them with masked version. Handles
 * circular references and preserves non-PII data types.
 *
 * @param payload - Object, array, or primitive to anonymize
 * @param options - Anonymization options
 * @returns Same structure with PII values replaced
 *
 * @example
 * ```typescript
 * const user = {
 *   name: "Budi",
 *   id: "3271054108750001",
 *   email: "budi@email.com"
 * };
 * anonymizePDP(user);
 * // { name: "Budi", id: "***********", email: "***@***.com" }
 * ```
 *
 * @example
 * For API response sanitization:
 * ```typescript
 * const response = {
 *   data: { name: "Budi", nik: "3271054108750001" },
 *   meta: { timestamp: "2024-01-01" }
 * };
 * anonymizePDP(response);
 * // Only string values with PII are masked, meta preserved
 * ```
 */
export function anonymizePDP<T>(payload: T, options?: PIIOptions): T {
  if (payload === null || payload === undefined) {
    return payload;
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const seen = new WeakSet<object>();

  return traverse(payload, opts, 0, seen);
}

function traverse<T>(value: T, opts: Required<PIIOptions>, depth: number, seen: WeakSet<object>): T {
  if (depth > MAX_DEPTH) {
    return value;
  }

  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    return anonymizeString(value, opts) as unknown as T;
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'function') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => traverse(item, opts, depth + 1, seen)) as unknown as T;
  }

  if (typeof value === 'object') {
    if (seen.has(value as object)) {
      return CIRCULAR_PLACEHOLDER as unknown as T;
    }
    seen.add(value as object);

    const result: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      const keyMatch = opts.explicitKeys.some(k => {
        if (typeof k === 'string') {
          return key.toLowerCase().includes(k.toLowerCase());
        }
        return k.test(key);
      });

      if (opts.autoDetectPII || keyMatch) {
        const val = (value as Record<string, unknown>)[key];

        if (typeof val === 'string' && keyMatch) {
          result[key] = opts.maskChar.repeat(val.length);
        } else {
          result[key] = traverse(val, opts, depth + 1, seen);
        }
      } else {
        result[key] = traverse((value as Record<string, unknown>)[key], opts, depth + 1, seen);
      }
    }
    return result as unknown as T;
  }

  return value;
}

function applyMask(value: string, opts: Required<PIIOptions>): string {
  if (opts.replacementText) {
    return opts.replacementText;
  }

  if (opts.maskStrategy === 'full') {
    return opts.maskChar.repeat(value.length);
  }

  const len = value.length;
  if (len <= 4) {
    return opts.maskChar.repeat(len);
  }

  const visibleStart = Math.min(4, Math.floor(len * 0.3));
  const visibleEnd = visibleStart;
  const maskedMiddle = len - visibleStart - visibleEnd;

  if (maskedMiddle <= 0) {
    return opts.maskChar.repeat(len);
  }

  return value.slice(0, visibleStart) + opts.maskChar.repeat(maskedMiddle) + value.slice(len - visibleEnd);
}

function escapeForLog(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"');
}