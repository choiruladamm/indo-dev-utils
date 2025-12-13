/**
 * Currency parsing utilities for Indonesian Rupiah.
 *
 * @module currency/parse
 * @packageDocumentation
 */

/**
 * Parses a formatted Rupiah string back to a number.
 *
 * Handles multiple formats:
 * - Standard: "Rp 1.500.000"
 * - No symbol: "1.500.000"
 * - With decimals: "Rp 1.500.000,50"
 * - Compact: "Rp 1,5 juta", "Rp 500 ribu"
 *
 * @param formatted - The formatted Rupiah string to parse
 * @returns Parsed number, or null if invalid
 *
 * @example
 * Standard format:
 * ```typescript
 * parseRupiah('Rp 1.500.000'); // 1500000
 * ```
 *
 * @example
 * With decimals:
 * ```typescript
 * parseRupiah('Rp 1.500.000,50'); // 1500000.50
 * ```
 *
 * @example
 * Compact format:
 * ```typescript
 * parseRupiah('Rp 1,5 juta'); // 1500000
 * parseRupiah('Rp 500 ribu'); // 500000
 * ```
 *
 * @example
 * Invalid input:
 * ```typescript
 * parseRupiah('invalid'); // null
 * ```
 *
 * @public
 */
export function parseRupiah(formatted: string): number | null {
  if (!formatted || typeof formatted !== 'string') {
    return null;
  }

  const cleaned = formatted.trim().toLowerCase();

  // Check for compact units (juta, ribu, miliar, triliun)
  const compactUnits = {
    triliun: 1_000_000_000_000,
    miliar: 1_000_000_000,
    juta: 1_000_000,
    ribu: 1_000,
  };

  for (const [unit, multiplier] of Object.entries(compactUnits)) {
    if (cleaned.includes(unit)) {
      const match = cleaned.match(/(-?\d+[,.]?\d*)/);
      if (match) {
        const num = parseFloat(match[1].replace(',', '.'));
        return num * multiplier;
      }
    }
  }

  // Standard format: remove 'Rp' and spaces
  let numStr = cleaned.replace(/rp/gi, '').trim();

  const hasDot = numStr.includes('.');
  const hasComma = numStr.includes(',');

  if (hasDot && hasComma) {
    // Determine format based on last separator position
    // Indonesian: 1.500.000,50 vs International: 1,500,000.50
    const lastDot = numStr.lastIndexOf('.');
    const lastComma = numStr.lastIndexOf(',');

    if (lastComma > lastDot) {
      numStr = numStr.replace(/\./g, '').replace(',', '.');
    } else {
      numStr = numStr.replace(/,/g, '');
    }
  } else if (hasComma) {
    const parts = numStr.split(',');
    // Decimal if only 1-2 digits after comma
    if (parts.length === 2 && parts[1].length <= 2) {
      numStr = numStr.replace(',', '.');
    } else {
      numStr = numStr.replace(/,/g, '');
    }
  } else if (hasDot) {
    const parts = numStr.split('.');
    // If not decimal format, remove dots (thousands separator)
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 2)) {
      numStr = numStr.replace(/\./g, '');
    }
  }

  const parsed = parseFloat(numStr);
  return isNaN(parsed) ? null : parsed;
}
