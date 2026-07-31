/**
 * Javanese market-day (weton) utilities.
 *
 * @module datetime/weton
 * @packageDocumentation
 */

import { Pasaran, IndonesianWeekday, Weton, InvalidDateError } from './types';
import { isValidDate } from './calc';

/** Milliseconds in one day. */
const MS_PER_DAY = 86_400_000;

/** Length of one full wetonan cycle (LCM of 5 and 7). */
const WETON_CYCLE_DAYS = 35;

/**
 * Anchor of the Javanese calendar: 8 July 1633 CE.
 *
 * Inaugurated by Sultan Agung of Mataram as the first day of the first
 * kurup (Alip Jemuwah Legi). All modern weton calculators align
 * against this date.
 *
 * @see packages/toolkit/research/weton_research.md
 */
const WETON_ANCHOR_MS = Date.UTC(1633, 6, 8);

/**
 * Weekday neptu table (saptawara).
 *
 * Canonical, non-volatile cultural constants. The values match the
 * standard Indonesian convention used in every modern weton calculator.
 */
const WETON_WEEKDAY_NEPTU: Readonly<Record<IndonesianWeekday, number>> = {
  Senin: 4,
  Selasa: 3,
  Rabu: 7,
  Kamis: 8,
  Jumat: 6,
  Sabtu: 9,
  Minggu: 5,
};

/**
 * Pasaran neptu table (pancawara).
 */
const WETON_PASARAN_NEPTU: Readonly<Record<Pasaran, number>> = {
  Legi: 5,
  Pahing: 9,
  Pon: 7,
  Wage: 4,
  Kliwon: 8,
};

/**
 * Pasaran order, indexed by the cycle position modulo 5.
 *
 * Cycle index 0 (the anchor) is Legi. Each +1 day advances one
 * position.
 */
const WETON_PASARAN_ORDER: readonly Pasaran[] = [
  'Legi',
  'Pahing',
  'Pon',
  'Wage',
  'Kliwon',
];

/**
 * Weekday order, indexed by the cycle position modulo 7.
 *
 * Cycle index 0 (the anchor) is Jumat (Friday). Using the anchor
 * weekday as index 0 lets `cycleIndex % 7` map directly to this array
 * without a remap step.
 */
const WETON_WEEKDAY_ORDER: readonly IndonesianWeekday[] = [
  'Jumat',
  'Sabtu',
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
];

/**
 * Get the Javanese market-day information (weton) for a given date.
 *
 * The result combines the Indonesian weekday (saptawara), the five-day
 * market position (pancawara / pasaran), and the combined neptu value
 * (weekday neptu + pasaran neptu), which always lies in `[7, 18]`.
 *
 * The date is interpreted in UTC for deterministic, timezone- and
 * DST-independent behaviour.
 *
 * @param date - The date to look up. Interpreted in UTC.
 * @returns The weton for that date.
 * @throws {InvalidDateError} If `date` is not a valid Date instance, or
 *   if the date falls before the Javanese calendar anchor (8 July 1633
 *   CE). Pre-anchor dates are outside the defined scope of the
 *   Javanese kurup system; we refuse to return a plausible-looking but
 *   possibly wrong result.
 *
 * @example
 * ```typescript
 * getWeton(new Date(Date.UTC(1633, 6, 8)));
 * // { weekday: 'Jumat', pasaran: 'Legi', neptu: 11 }
 *
 * getWeton(new Date(Date.UTC(1945, 7, 17)));
 * // { weekday: 'Jumat', pasaran: 'Pahing', neptu: 15 }
 * ```
 */
export function getWeton(date: Date): Weton {
  if (!isValidDate(date)) {
    throw new InvalidDateError('getWeton requires a valid Date instance');
  }

  const targetMs = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );

  const daysSinceAnchor = Math.floor(
    (targetMs - WETON_ANCHOR_MS) / MS_PER_DAY
  );

  if (daysSinceAnchor < 0) {
    throw new InvalidDateError(
      `getWeton is only defined for dates on or after 8 July 1633 CE (got ${date.toISOString()})`
    );
  }

  const cycleIndex = daysSinceAnchor % WETON_CYCLE_DAYS;

  const weekday = WETON_WEEKDAY_ORDER[cycleIndex % 7] as IndonesianWeekday;
  const pasaran = WETON_PASARAN_ORDER[cycleIndex % 5] as Pasaran;
  const neptu =
    WETON_WEEKDAY_NEPTU[weekday] + WETON_PASARAN_NEPTU[pasaran];

  return { weekday, pasaran, neptu };
}
