import type { RoundUnit, SplitOptions } from './types';

/**
 * Invalid split error thrown when split parameters are invalid.
 *
 * @public
 */
export class InvalidSplitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidSplitError';
  }
}

/**
 * Splits an amount into equal or custom-ratio parts.
 *
 * @param amount - The amount to split
 * @param parts - Number of parts to split into
 * @param options - Split options (ratios, rounding)
 * @returns Array of split amounts
 *
 * @example
 * Equal split:
 * ```typescript
 * splitAmount(1500000, 3); // [500000, 500000, 500000]
 * ```
 *
 * @example
 * Custom ratios:
 * ```typescript
 * splitAmount(1000000, 2, { ratios: [70, 30] }); // [700000, 300000]
 * ```
 *
 * @example
 * With rounding:
 * ```typescript
 * splitAmount(1234567, 3, { roundTo: 'ribu' }); // [412000, 411000, 411000]
 * ```
 *
 * @public
 */
export function splitAmount(
  amount: number,
  parts: number,
  options?: SplitOptions
): number[] {
  if (parts < 1) {
    throw new InvalidSplitError('Parts must be at least 1');
  }

  if (parts === 1) {
    return [amount];
  }

  const { ratios, roundTo } = options || {};

  if (ratios) {
    if (ratios.length !== parts) {
      throw new InvalidSplitError(
        `Ratios length (${ratios.length}) must match parts count (${parts})`
      );
    }

    const sum = ratios.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 100) > 0.01) {
      throw new InvalidSplitError(`Ratios must sum to 100 (got ${sum})`);
    }

    let result = ratios.map((r) => amount * (r / 100));

    if (roundTo) {
      result = result.map((v) => roundToClean(v, roundTo));
    }

    return result;
  }

  const base = Math.floor(amount / parts);
  const remainder = amount - base * parts;

  const result: number[] = [];
  for (let i = 0; i < parts; i++) {
    result.push(base + (i < remainder ? 1 : 0));
  }

  if (roundTo) {
    return result.map((v) => roundToClean(v, roundTo));
  }

  return result;
}

/**
 * Calculates what percentage a part is of a total.
 *
 * @param part - The part value
 * @param total - The total value
 * @returns Percentage as number (e.g., 15 for 15%)
 *
 * @example
 * ```typescript
 * percentageOf(150000, 1000000); // 15
 * percentageOf(0, 1000000); // 0
 * percentageOf(100, 0); // 0 (not NaN)
 * ```
 *
 * @public
 */
export function percentageOf(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

/**
 * Calculates absolute and percentage difference between two amounts.
 *
 * @param amount1 - The new/current amount
 * @param amount2 - The original/reference amount
 * @returns Object with absolute difference, percentage, and direction
 *
 * @example
 * ```typescript
 * difference(1200000, 1000000);
 * // { absolute: 200000, percentage: 20, direction: 'increase' }
 *
 * difference(0, 1000000);
 * // { absolute: -1000000, percentage: null, direction: 'decrease' }
 * ```
 *
 * @public
 */
export function difference(
  amount1: number,
  amount2: number
): {
  absolute: number;
  percentage: number | null;
  direction: 'increase' | 'decrease' | 'same';
} {
  const absolute = amount1 - amount2;

  let percentage: number | null;
  if (amount2 === 0) {
    percentage = amount1 === 0 ? 0 : null;
  } else {
    percentage = (absolute / amount2) * 100;
  }

  const direction: 'increase' | 'decrease' | 'same' =
    absolute > 0 ? 'increase' : absolute < 0 ? 'decrease' : 'same';

  return { absolute, percentage, direction };
}

/**
 * Rounds a number to a clean currency amount.
 * Internal helper — also exported from utils.ts for public API.
 */
function roundToClean(amount: number, unit: RoundUnit): number {
  const divisors: Record<RoundUnit, number> = {
    ribu: 1000,
    'ratus-ribu': 100000,
    juta: 1000000,
  };

  return Math.round(amount / divisors[unit]) * divisors[unit];
}
