import type { MaskOptions } from './types';

/**
 * Mask sensitive text based on predefined patterns or custom configuration
 *
 * This function provides privacy-compliant data display by masking portions
 * of text while keeping certain parts visible. Supports multiple masking
 * patterns for different use cases.
 *
 * **Available Patterns:**
 * - `all`: Masks all characters (preserves spaces)
 * - `middle`: Keeps start and end characters visible, masks the middle
 * - `email`: Keeps first 2 chars of local part and full domain visible
 *
 * @param text - The text to mask
 * @param options - Masking configuration options
 * @returns The masked text
 *
 * @example
 * Mask all characters:
 * ```typescript
 * maskText('Budi Santoso', { pattern: 'all' })
 * // → '**** *******'
 *
 * maskText('123456789', { pattern: 'all', maskChar: '#' })
 * // → '#########'
 * ```
 *
 * @example
 * Mask middle portion:
 * ```typescript
 * maskText('08123456789', { pattern: 'middle', visibleStart: 4, visibleEnd: 3 })
 * // → '0812****789'
 *
 * maskText('ABCDEF', { pattern: 'middle' })
 * // → 'AB**EF' (defaults: visibleStart=2, visibleEnd=2)
 * ```
 *
 * @example
 * Mask email:
 * ```typescript
 * maskText('user@example.com', { pattern: 'email' })
 * // → 'us**@example.com'
 *
 * maskText('a@test.com', { pattern: 'email' })
 * // → 'a*@test.com'
 * ```
 *
 * @example
 * Edge cases:
 * ```typescript
 * maskText('')
 * // → ''
 *
 * maskText('AB', { pattern: 'middle', visibleStart: 2, visibleEnd: 2 })
 * // → '**' (string too short, mask all)
 * ```
 *
 * @public
 */
export function maskText(text: string, options?: MaskOptions): string {
  if (!text) return text;

  const {
    pattern = 'middle',
    maskChar = '*',
    visibleStart = 2,
    visibleEnd = 2,
  } = options || {};

  switch (pattern) {
    case 'all':
      return maskAll(text, maskChar);
    case 'email':
      return maskEmail(text, maskChar);
    case 'middle':
    default:
      return maskMiddle(text, maskChar, visibleStart, visibleEnd);
  }
}

/**
 * Mask all characters while preserving spaces
 */
function maskAll(text: string, maskChar: string): string {
  return text
    .split('')
    .map((char) => (char === ' ' ? ' ' : maskChar))
    .join('');
}

/**
 * Mask middle portion, keeping start and end visible
 */
function maskMiddle(
  text: string,
  maskChar: string,
  visibleStart: number,
  visibleEnd: number
): string {
  const length = text.length;
  const totalVisible = visibleStart + visibleEnd;

  if (length < totalVisible) {
    return maskChar.repeat(length);
  }

  const start = text.slice(0, visibleStart);
  const middle = maskChar.repeat(length - totalVisible);
  const end = text.slice(length - visibleEnd);

  return start + middle + end;
}

/**
 * Mask email local part, keeping first 2 chars and domain visible
 */
function maskEmail(text: string, maskChar: string): string {
  const atIndex = text.indexOf('@');

  if (atIndex === -1) {
    return maskMiddle(text, maskChar, 2, 0);
  }

  const localPart = text.slice(0, atIndex);
  const domain = text.slice(atIndex);

  if (localPart.length <= 2) {
    const maskedLocal =
      localPart + maskChar.repeat(Math.max(0, 2 - localPart.length));
    return maskedLocal + domain;
  }

  const visibleLocal = localPart.slice(0, 2);
  const maskedLocal = visibleLocal + maskChar.repeat(localPart.length - 2);

  return maskedLocal + domain;
}
