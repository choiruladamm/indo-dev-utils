import type { SlugifyOptions } from './types';

/**
 * Generate URL-safe slugs with Indonesian language support
 *
 * This function converts text into URL-friendly slugs by:
 * - Converting to lowercase (configurable)
 * - Replacing spaces with separators (default: hyphen)
 * - Replacing Indonesian conjunctions (& → dan, / → atau)
 * - Removing special characters
 * - Collapsing multiple separators
 * - Trimming leading/trailing separators
 *
 * **Character Handling:**
 * - Alphanumeric (a-z, A-Z, 0-9): Preserved
 * - Spaces: Replaced with separator
 * - Ampersand (&): Replaced with "dan"
 * - Slash (/): Replaced with "atau"
 * - Hyphens (-): Preserved as separators
 * - Other special chars: Removed
 *
 * @param text - The text to convert to slug
 * @param options - Optional configuration
 * @returns The URL-safe slug
 *
 * @example
 * Basic usage:
 * ```typescript
 * slugify('Cara Mudah Belajar TypeScript')
 * // → 'cara-mudah-belajar-typescript'
 *
 * slugify('HELLO WORLD')
 * // → 'hello-world'
 * ```
 *
 * @example
 * Indonesian conjunctions:
 * ```typescript
 * slugify('Ibu & Anak: Tips Kesehatan')
 * // → 'ibu-dan-anak-tips-kesehatan'
 *
 * slugify('Baju Pria/Wanita')
 * // → 'baju-pria-atau-wanita'
 *
 * slugify('A & B / C')
 * // → 'a-dan-b-atau-c'
 * ```
 *
 * @example
 * Special characters removed:
 * ```typescript
 * slugify('Harga Rp 100.000 (Diskon 20%)')
 * // → 'harga-rp-100000-diskon-20'
 *
 * slugify('Email: test@example.com')
 * // → 'email-testexamplecom'
 * ```
 *
 * @example
 * Multiple spaces/separators collapsed:
 * ```typescript
 * slugify('Produk   Terbaru - - - 2024')
 * // → 'produk-terbaru-2024'
 *
 * slugify('  Hello    World  ')
 * // → 'hello-world'
 * ```
 *
 * @example
 * With options:
 * ```typescript
 * slugify('Hello World', { separator: '_' })
 * // → 'hello_world'
 *
 * slugify('Hello World', { lowercase: false })
 * // → 'Hello-World'
 *
 * slugify('C++ Programming', {
 *   replacements: { 'C++': 'cpp' }
 * })
 * // → 'cpp-programming'
 *
 * slugify('Hello-World', { trim: false })
 * // → 'hello-world' (same, but won't trim if leading/trailing)
 * ```
 *
 * @public
 */

export function slugify(text: string, options?: SlugifyOptions): string {
  if (!text) return '';

  const {
    separator = '-',
    lowercase = true,
    replacements = {},
    trim = true,
  } = options || {};

  let result = text;

  // Apply custom replacements first
  for (const [search, replace] of Object.entries(replacements)) {
    result = result.replace(new RegExp(escapeRegex(search), 'g'), replace);
  }

  // Replace Indonesian conjunctions
  result = result.replace(/&/g, ' dan ');
  result = result.replace(/\//g, ' atau ');

  // Convert to lowercase if needed
  if (lowercase) {
    result = result.toLowerCase();
  }

  // Remove chars that should NOT become separators (dots, apostrophes, @, accents, etc)
  result = result.replace(/[.'@éèêëàâäôöûüùïîçñ™®©]/g, '');

  // Replace remaining special chars with separator (everything except alphanumeric, spaces, hyphens)
  result = result.replace(/[^\w\s-]+/g, separator);

  // Replace spaces with separator
  result = result.replace(/\s+/g, separator);

  // Replace existing hyphens with separator (if separator is not hyphen)
  if (separator !== '-') {
    result = result.replace(/-/g, separator);
  }

  // Only when trim: true, collapse multiple separators AND trim edges
  if (trim) {
    const separatorRegex = new RegExp(`\\${separator}+`, 'g');
    result = result.replace(separatorRegex, separator);

    const trimRegex = new RegExp(`^\\${separator}+|\\${separator}+$`, 'g');
    result = result.replace(trimRegex, '');
  }

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
