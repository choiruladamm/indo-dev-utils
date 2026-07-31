/**
 * Compact amount parser for Indonesian Rupiah shorthand.
 *
 * @module currency/parse-compact
 * @packageDocumentation
 */

/**
 * Multiplier shorthands accepted by {@link parseCompact}.
 *
 * Keys are matched case-insensitively as a single trailing word
 * (letters only) on the input. Values are the numeric multiplier
 * applied to the prefix number. Linguistic, not regulatory — the
 * Indonesian vocabulary is stable.
 *
 * @internal
 */
const COMPACT_MULTIPLIERS: Readonly<Record<string, number>> = {
  triliun: 1_000_000_000_000,
  T: 1_000_000_000_000,
  miliar: 1_000_000_000,
  milyar: 1_000_000_000,
  M: 1_000_000_000,
  juta: 1_000_000,
  jt: 1_000_000,
  ribu: 1_000,
  rb: 1_000,
  k: 1_000,
};

/**
 * Returns the multiplier for a lowercased trailing word, picking the
 * longest matching key so that e.g. "milyar" is never misread as "m".
 *
 * @param word - Lowercased trailing word from the input
 * @returns The multiplier, or `null` if no shorthand matches
 * @internal
 */
function resolveMultiplier(word: string): number | null {
  // Keys sorted by descending length so the longest match wins.
  const keys = Object.keys(COMPACT_MULTIPLIERS).sort(
    (a, b) => b.length - a.length
  );

  for (const key of keys) {
    if (word === key.toLowerCase()) {
      return COMPACT_MULTIPLIERS[key];
    }
  }

  return null;
}

/**
 * Parses a compact Indonesian amount string into a number.
 *
 * Inverse of {@link formatCompact}. Accepts the common multiplier
 * shorthands (`rb`, `ribu`, `k`, `jt`, `juta`, `M`, `miliar`, `milyar`,
 * `T`, `triliun`) case-insensitively, with optional whitespace
 * between the number and the multiplier.
 *
 * Comma (`,`) is the decimal separator and dot (`.`) is the
 * thousands separator, matching the rest of the currency module.
 *
 * Returns `NaN` for any input that cannot be unambiguously parsed:
 * missing multiplier, unknown multiplier, garbage text, or empty
 * string. Bare numeric input (e.g. `"1.5"`, `"1500"`) is **not** a
 * compact amount and also returns `NaN`.
 *
 * @param input - The compact amount string to parse
 * @returns The parsed number, or `NaN` if the input is invalid
 *
 * @example
 * Basic parse with a juta multiplier:
 * ```ts
 * parseCompact('1,5jt'); // 1500000
 * ```
 *
 * @example
 * Long-form million and thousand:
 * ```ts
 * parseCompact('3 miliar'); // 3000000000
 * parseCompact('2rb');      // 2000
 * ```
 *
 * @example
 * Case-insensitive and whitespace-tolerant:
 * ```ts
 * parseCompact('  1,5JT  '); // 1500000
 * ```
 *
 * @example
 * Returns `NaN` for invalid input:
 * ```ts
 * parseCompact('abc'); // NaN
 * parseCompact('1500'); // NaN  (no multiplier)
 * ```
 *
 * @public
 */
export function parseCompact(input: string): number {
  if (typeof input !== 'string') {
    return Number.NaN;
  }

  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return Number.NaN;
  }

  // Split into number part (prefix) and trailing multiplier word.
  // The number part may contain digits, dots (thousands), and at most
  // one comma (decimal). The multiplier is a single contiguous run of
  // letters at the end, optionally separated from the number by
  // whitespace.
  const match = trimmed.match(/^([\d.,]+)\s*([A-Za-z]+)\s*$/);
  if (!match) {
    return Number.NaN;
  }

  const [, rawNumber, rawWord] = match;
  const word = rawWord.toLowerCase();

  const multiplier = resolveMultiplier(word);
  if (multiplier === null) {
    return Number.NaN;
  }

  // Normalise Indonesian format: dot = thousands, comma = decimal.
  // The regex above already ensures at most one comma; we only need
  // to strip the thousand-separators and swap the decimal separator.
  const hasComma = rawNumber.includes(',');
  const normalised = hasComma
    ? rawNumber.replace(/\./g, '').replace(',', '.')
    : rawNumber.replace(/\./g, '');

  return Number(normalised) * multiplier;
}
