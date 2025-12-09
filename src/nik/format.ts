import { MaskOptions } from './types';

/**
 * Formats a NIK with separators for better readability.
 *
 * Groups the NIK into logical segments: province, regency, district,
 * year, month, day, and serial number.
 *
 * @param nik - The 16-digit NIK string to format
 * @param separator - Character to use as separator
 * @returns Formatted NIK string, or original string if invalid format
 *
 * @example
 * Default separator (dash):
 * ```typescript
 * formatNIK('3201234567890123');
 * // '32-01-23-45-67-89-0123'
 * ```
 *
 * @example
 * Custom separator:
 * ```typescript
 * formatNIK('3201234567890123', ' ');
 * // '32 01 23 45 67 89 0123'
 * ```
 *
 * @example
 * Invalid NIK returns as-is:
 * ```typescript
 * formatNIK('1234');
 * // '1234'
 * ```
 *
 * @public
 */
export function formatNIK(nik: string, separator: string = '-'): string {
  if (!/^\d{16}$/.test(nik)) {
    return nik;
  }

  // Format: PP-KK-DD-YY-MM-DD-XXXX
  // PP = Province (2 digits)
  // KK = Regency (2 digits)
  // DD = District (2 digits)
  // YY = Year (2 digits)
  // MM = Month (2 digits)
  // DD = Day (2 digits, +40 for female)
  // XXXX = Serial number (4 digits)
  return [
    nik.substring(0, 2), // Province
    nik.substring(2, 4), // Regency
    nik.substring(4, 6), // District
    nik.substring(6, 8), // Year
    nik.substring(8, 10), // Month
    nik.substring(10, 12), // Day
    nik.substring(12, 16), // Serial
  ].join(separator);
}

/**
 * Masks a NIK to protect privacy while keeping partial visibility.
 *
 * By default, shows the first 4 and last 4 digits, masking the middle 8.
 * Optionally formats the masked NIK with separators.
 *
 * @param nik - The 16-digit NIK string to mask
 * @param options - Masking configuration options
 * @returns Masked NIK string, or original string if invalid format
 *
 * @example
 * Default masking (first 4, last 4):
 * ```typescript
 * maskNIK('3201234567890123');
 * // '3201********0123'
 * ```
 *
 * @example
 * Custom mask character:
 * ```typescript
 * maskNIK('3201234567890123', { char: 'X' });
 * // '3201XXXXXXXX0123'
 * ```
 *
 * @example
 * With separator:
 * ```typescript
 * maskNIK('3201234567890123', { separator: '-' });
 * // '32-01-**-**-**-**-0123'
 * ```
 *
 * @example
 * Custom start and end:
 * ```typescript
 * maskNIK('3201234567890123', { start: 6, end: 4 });
 * // '320123******0123'
 * ```
 *
 * @public
 */
export function maskNIK(nik: string, options: MaskOptions = {}): string {
  if (!/^\d{16}$/.test(nik)) {
    return nik;
  }

  const { start = 4, end = 4, char = '*', separator } = options;

  if (start + end >= 16) {
    return nik;
  }

  if (separator) {
    // Format with separator first, then apply masking
    const formatted = formatNIK(nik, separator);
    const parts = formatted.split(separator);

    // Calculate which parts to mask
    // Format: PP-KK-DD-YY-MM-DD-XXXX (7 parts)
    // Mask parts based on character positions
    let charCount = 0;
    const maskedParts = parts.map((part) => {
      const partStart = charCount;
      const partEnd = charCount + part.length;
      charCount += part.length;

      // Check if this part should be fully/partially masked
      if (partEnd <= start) {
        // Fully visible (before start)
        return part;
      } else if (partStart >= 16 - end) {
        // Fully visible (after end)
        return part;
      } else if (partStart >= start && partEnd <= 16 - end) {
        // Fully masked
        return char.repeat(part.length);
      } else {
        // Partially masked
        return part
          .split('')
          .map((ch, idx) => {
            const pos = partStart + idx;
            if (pos < start || pos >= 16 - end) {
              return ch;
            }
            return char;
          })
          .join('');
      }
    });

    return maskedParts.join(separator);
  }

  // Without separator: simple masking
  const startPart = nik.substring(0, start);
  const endPart = nik.substring(16 - end);
  const maskLength = 16 - start - end;
  return startPart + char.repeat(maskLength) + endPart;
}