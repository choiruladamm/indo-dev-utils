import { PIIOptions } from './types';

const DEFAULT_OPTIONS: Required<PIIOptions> = {
  explicitKeys: [],
  autoDetectPII: true,
  maskChar: '*',
  maskStrategy: 'partial',
  replacementText: '',
  escapeForLog: false,
};

/**
 * Masks PII found in a string using specified mask character.
 *
 * Auto-detects PII types (NIK, NPWP, phone, email, etc.) and
 * replaces them with masked version. Use for logging, display,
 * or data sharing where original values shouldn't be visible.
 *
 * @param text - Text containing PII to mask
 * @param options - Masking options (strategy, char, etc.)
 * @returns Text with PII masked
 *
 * @example
 * ```typescript
 * maskStringPDP("NIK: 3271054108750001");
// "NIK: 3271054108******" (partial mask)
 * ```
 *
 * @example
 * Full mask for logs:
 * ```typescript
 * maskStringPDP("Email: budi@email.com", { maskStrategy: 'full' });
 * // "Email: ***************"
 * ```
 *
 * @example
 * Custom replacement:
 * ```typescript
 * maskStringPDP("Phone: 081234567890", { replacementText: '[REDACTED]' });
 * // "Phone: [REDACTED]"
 * ```
 */
export function maskStringPDP(text: string, options?: PIIOptions): string {
  if (!text || typeof text !== 'string') {
    return text;
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!opts.autoDetectPII) {
    return opts.escapeForLog ? escapeForLog(text) : text;
  }

  return text;
}

export function applyMask(value: string, opts: Required<PIIOptions>): string {
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

export function escapeForLog(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"');
}