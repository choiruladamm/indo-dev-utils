/**
 * Validates whether a string is a valid Rupiah format.
 *
 * Accepts standard, compact, and negative formats.
 *
 * @param formatted - The string to validate
 * @returns `true` if valid Rupiah format, `false` otherwise
 *
 * @example
 * ```typescript
 * validateRupiah('Rp 1.500.000'); // true
 * validateRupiah('1.500.000'); // true
 * validateRupiah('Rp 1,5 juta'); // true
 * validateRupiah('abc'); // false
 * validateRupiah(''); // false
 * ```
 *
 * @public
 */
export function validateRupiah(formatted: string): boolean {
  if (!formatted || typeof formatted !== 'string') {
    return false;
  }

  const trimmed = formatted.trim();

  if (!trimmed) return false;

  const compactUnits = ['triliun', 'miliar', 'juta', 'ribu'];

  // Check for compact format
  for (const unit of compactUnits) {
    if (trimmed.toLowerCase().includes(unit)) {
      return /-?\d+[,.]?\d*\s*(ribu|juta|miliar|triliun)/i.test(trimmed);
    }
  }

  // Standard format: remove optional Rp prefix and optional negative sign
  let cleaned = trimmed.replace(/^(-?\s*)?Rp\s*/i, '');

  // Remove negative sign if still present
  cleaned = cleaned.replace(/^\s*-/, '');

  cleaned = cleaned.trim();

  if (!cleaned) return false;

  // Must be digits with dots and/or commas
  if (!/^[0-9.,]+$/.test(cleaned)) return false;

  // Must have at least one digit
  if (!/\d/.test(cleaned)) return false;

  return true;
}
