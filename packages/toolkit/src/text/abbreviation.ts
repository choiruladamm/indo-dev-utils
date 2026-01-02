import { ABBREVIATIONS } from './constants';
import type { ExpandOptions } from './types';

/**
 * Expand Indonesian abbreviations to their full form
 *
 * This function expands common Indonesian abbreviations like:
 * - Address: Jl. → Jalan, Kec. → Kecamatan
 * - Titles: Dr. → Doktor, S.H. → Sarjana Hukum
 * - Honorifics: Bpk. → Bapak, Yth. → Yang Terhormat
 * - Organizations: PT. → Perseroan Terbatas
 * - Common: dll. → dan lain-lain
 *
 * **Features:**
 * - Case-insensitive matching (Jl. = jl. = JL.)
 * - Mode filtering (all, address, title, org)
 * - Custom mapping support
 * - Preserves surrounding text
 * - Multiple abbreviations in one string
 *
 * @param text - The text containing abbreviations to expand
 * @param options - Optional configuration
 * @returns Text with abbreviations expanded
 *
 * @example
 * Basic usage:
 * ```typescript
 * expandAbbreviation('Jl. Sudirman No. 123')
 * // → 'Jalan Sudirman Nomor 123'
 *
 * expandAbbreviation('Dr. Joko Widodo, S.H.')
 * // → 'Doktor Joko Widodo, Sarjana Hukum'
 * ```
 *
 * @example
 * Address abbreviations:
 * ```typescript
 * expandAbbreviation('Kab. Bogor, Kec. Ciawi')
 * // → 'Kabupaten Bogor, Kecamatan Ciawi'
 *
 * expandAbbreviation('Jl. Merdeka Gg. 5 No. 10')
 * // → 'Jalan Merdeka Gang 5 Nomor 10'
 * ```
 *
 * @example
 * Academic titles:
 * ```typescript
 * expandAbbreviation('Prof. Dr. Ir. Ahmad')
 * // → 'Profesor Doktor Insinyur Ahmad'
 *
 * expandAbbreviation('Saya lulusan S.T. dari ITB')
 * // → 'Saya lulusan Sarjana Teknik dari ITB'
 * ```
 *
 * @example
 * Honorifics:
 * ```typescript
 * expandAbbreviation('Yth. Bpk. H. Ahmad')
 * // → 'Yang Terhormat Bapak Haji Ahmad'
 * ```
 *
 * @example
 * Organizations:
 * ```typescript
 * expandAbbreviation('PT. Maju Jaya Tbk.')
 * // → 'Perseroan Terbatas Maju Jaya Terbuka'
 * ```
 *
 * @example
 * Mode filtering:
 * ```typescript
 * expandAbbreviation('Dr. Joko di Jl. Sudirman', { mode: 'address' })
 * // → 'Dr. Joko di Jalan Sudirman'
 * // Only expands address abbreviations
 *
 * expandAbbreviation('Prof. Dr. di Jl. Sudirman', { mode: 'title' })
 * // → 'Profesor Doktor di Jl. Sudirman'
 * // Only expands title abbreviations
 * ```
 *
 * @example
 * Custom mappings:
 * ```typescript
 * expandAbbreviation('BUMN adalah perusahaan negara', {
 *   customMap: { 'BUMN': 'Badan Usaha Milik Negara' }
 * })
 * // → 'Badan Usaha Milik Negara adalah perusahaan negara'
 * ```
 *
 * @example
 * Case sensitivity:
 * ```typescript
 * expandAbbreviation('jl. sudirman')
 * // → 'Jalan sudirman' (default: preserves surrounding case)
 *
 * expandAbbreviation('JL. SUDIRMAN')
 * // → 'Jalan SUDIRMAN'
 * ```
 *
 * @public
 */
export function expandAbbreviation(
  text: string,
  options?: ExpandOptions
): string {
  if (!text) return text;

  const { mode = 'all', customMap = {}, preserveCase = false } = options || {};

  // Combine built-in and custom abbreviations
  const abbreviationsMap = {
    ...getAbbreviationsByMode(mode),
    ...customMap,
  };

  let result = text;

  // Sort by length (longest first) to avoid partial replacements
  // Example: Replace "S.H." before "S." to avoid "Sarjana.H."
  const sortedAbbrevs = Object.keys(abbreviationsMap).sort(
    (a, b) => b.length - a.length
  );

  for (const abbrev of sortedAbbrevs) {
    const expansion = abbreviationsMap[abbrev];

    // Create case-insensitive regex with word boundaries
    // Handle word boundaries intelligently:
    // - If starts with word char, add \b prefix
    // - If ends with word char, add \b suffix
    // - If ends with dot, don't add \b suffix (dots are non-word chars)
    const startBoundary = /^\w/.test(abbrev) ? '\\b' : '';
    const endBoundary = /\w$/.test(abbrev) ? '\\b' : '';

    const regex = new RegExp(
      `${startBoundary}${escapeRegex(abbrev)}${endBoundary}`,
      'gi'
    );

    result = result.replace(regex, (match) => {
      // If preserveCase is false, use the expansion as-is
      if (!preserveCase) {
        return expansion;
      }

      // If preserveCase is true, try to match case of original
      return matchCase(match, expansion);
    });
  }

  return result;
}

/**
 * Get abbreviations filtered by mode
 */
function getAbbreviationsByMode(
  mode: 'all' | 'address' | 'title' | 'org'
): Record<string, string> {
  if (mode === 'all') {
    return ABBREVIATIONS;
  }

  const filtered: Record<string, string> = {};

  // Define which abbreviations belong to which category
  const addressAbbrevs = [
    'Jl.',
    'Gg.',
    'No.',
    'Kp.',
    'Ds.',
    'Kel.',
    'Kec.',
    'Kab.',
    'Kota',
    'Prov.',
    'Prop.',
    'Rt.',
    'Rw.',
    'Blok',
    'Komp.',
    'Perumahan',
    'Perum.',
  ];

  const titleAbbrevs = [
    'Dr.',
    'Ir.',
    'Prof.',
    'Drs.',
    'Dra.',
    'S.Pd.',
    'S.H.',
    'S.E.',
    'S.T.',
    'S.Kom.',
    'S.Si.',
    'S.Sos.',
    'S.I.Kom.',
    'S.S.',
    'S.Psi.',
    'S.Farm.',
    'S.Ked.',
    'M.Sc.',
    'M.M.',
    'M.Pd.',
    'M.T.',
    'M.Kom.',
    'M.Si.',
    'M.H.',
    'M.A.',
    'MBA',
  ];

  const orgAbbrevs = [
    'PT.',
    'CV.',
    'UD.',
    'PD.',
    'Tbk.',
    'Koperasi',
    'Yayasan',
  ];

  // Filter based on mode
  for (const [abbrev, expansion] of Object.entries(ABBREVIATIONS)) {
    if (mode === 'address' && addressAbbrevs.includes(abbrev)) {
      filtered[abbrev] = expansion;
    } else if (mode === 'title' && titleAbbrevs.includes(abbrev)) {
      filtered[abbrev] = expansion;
    } else if (mode === 'org' && orgAbbrevs.includes(abbrev)) {
      filtered[abbrev] = expansion;
    }
  }

  return filtered;
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Match the case pattern of original string to replacement
 * - ALL CAPS → ALL CAPS
 * - Title Case → Title Case
 * - lowercase → lowercase
 */
function matchCase(original: string, replacement: string): string {
  // Check if original is all uppercase
  if (original === original.toUpperCase()) {
    return replacement.toUpperCase();
  }

  // Check if original is all lowercase
  if (original === original.toLowerCase()) {
    return replacement.toLowerCase();
  }

  // Check if original is title case (first letter uppercase)
  if (original.charAt(0) === original.charAt(0).toUpperCase()) {
    return (
      replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase()
    );
  }

  // Default: return as-is
  return replacement;
}

/**
 * Contract full forms to abbreviations (reverse of expand)
 *
 * @param text - The text containing full forms to contract
 * @param options - Optional configuration
 * @returns Text with full forms contracted
 *
 * @example
 * ```typescript
 * contractAbbreviation('Jalan Sudirman Nomor 123')
 * // → 'Jl. Sudirman No. 123'
 *
 * contractAbbreviation('Doktor Ahmad, Sarjana Hukum')
 * // → 'Dr. Ahmad, S.H.'
 * ```
 *
 * @public
 */
export function contractAbbreviation(
  text: string,
  options?: { mode?: 'all' | 'address' | 'title' | 'org' }
): string {
  if (!text) return text;

  const { mode = 'all' } = options || {};

  // Get abbreviations and create reverse mapping
  const abbreviationsMap = getAbbreviationsByMode(mode);
  const reverseMap: Record<string, string> = {};

  for (const [abbrev, expansion] of Object.entries(abbreviationsMap)) {
    reverseMap[expansion] = abbrev;
  }

  let result = text;

  // Sort by length (longest first) to avoid partial replacements
  const sortedExpansions = Object.keys(reverseMap).sort(
    (a, b) => b.length - a.length
  );

  for (const expansion of sortedExpansions) {
    const abbrev = reverseMap[expansion];

    // Case-insensitive replace
    const regex = new RegExp(`\\b${escapeRegex(expansion)}\\b`, 'gi');

    result = result.replace(regex, abbrev);
  }

  return result;
}
