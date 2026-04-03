/**
 * Basic mapping of common informal Indonesian words to formal ones.
 */
const INFORMAL_MAP: Record<string, string> = {
  gw: 'saya',
  gua: 'saya',
  lu: 'kamu',
  lo: 'kamu',
  elo: 'kamu',
  lagi: 'sedang',
  gue: 'saya',
  gwe: 'saya',
  gak: 'tidak',
  ga: 'tidak',
  nggak: 'tidak',
  kalo: 'kalau',
  karna: 'karena',
  tapi: 'tetapi',
  udah: 'sudah',
  dah: 'sudah',
  aja: 'saja',
  banget: 'sekali',
  emang: 'memang',
  pake: 'pakai',
  bikin: 'membuat',
  kasih: 'memberi',
  dapet: 'dapat',
  liat: 'lihat',
  ngasih: 'memberi',
  nyari: 'mencari',
  nanya: 'bertanya',
  bilang: 'berkata',
};

/**
 * Normalizes informal Indonesian text to a more formal version.
 * This is a basic rule-based implementation.
 *
 * @param text - The text to normalize
 * @returns Formalized text
 *
 * @example
 * ```typescript
 * toFormal('gw lagi makan'); // 'saya sedang makan'
 * ```
 */
export function toFormal(text: string): string {
  const words = text.split(/\s+/);
  const formalized = words.map((word) => {
    const lower = word.toLowerCase().replace(/[^\w]/g, '');
    const formal = INFORMAL_MAP[lower];
    if (formal) {
      // Keep capitalization if possible
      if (word[0] === word[0].toUpperCase()) {
        return formal.charAt(0).toUpperCase() + formal.slice(1);
      }
      return formal;
    }
    return word;
  });

  return formalized.join(' ');
}

/**
 * Detects if a text follows "alay" style (unconventional capitalization or number substitution).
 *
 * @param text - The text to check
 * @returns `true` if alay style detected, `false` otherwise
 *
 * @example
 * ```typescript
 * isAlay('AqU sAyAnG qMu'); // true
 * isAlay('Makan 4y4m'); // true
 * ```
 */
export function isAlay(text: string): boolean {
  if (!text) return false;

  // Rule 1: Alternating caps (mOxEd cAsE)
  // More specific: lower-UPPER-lower or UPPER-lower-UPPER, multiple times
  const alternatingCaps = /([a-z][A-Z][a-z]|[A-Z][a-z][A-Z])/.test(text);

  // Rule 2: Number substitution in words
  const numberSub = /\b\w*[0431572]\w*\b/.test(text);

  // Rule 3: Excessive 'q' instead of 'k'
  const qSub = /q/i.test(text) && !/u/i.test(text);

  // Rule 4: Excessive characters (e.g., 'siiaappp')
  const excessiveChars = /(.)\1{2,}/.test(text);

  return alternatingCaps || numberSub || qSub || excessiveChars;
}
