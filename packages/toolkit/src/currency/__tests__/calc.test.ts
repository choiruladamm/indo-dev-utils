import { describe, it, expect } from 'vitest';
import {
  splitAmount,
  percentageOf,
  difference,
  InvalidSplitError,
} from '../calc';

describe('splitAmount', () => {
  describe('equal split', () => {
    it('should split evenly', () => {
      expect(splitAmount(1500000, 3)).toEqual([500000, 500000, 500000]);
    });

    it('should distribute remainder to first parts', () => {
      expect(splitAmount(10000, 3)).toEqual([3334, 3333, 3333]);
    });

    it('should split into 2 parts', () => {
      expect(splitAmount(1000000, 2)).toEqual([500000, 500000]);
    });

    it('should handle single part', () => {
      expect(splitAmount(1000000, 1)).toEqual([1000000]);
    });

    it('should handle zero amount', () => {
      expect(splitAmount(0, 3)).toEqual([0, 0, 0]);
    });

    it('should handle negative amount', () => {
      expect(splitAmount(-1500000, 3)).toEqual([-500000, -500000, -500000]);
    });
  });

  describe('custom ratios', () => {
    it('should split by custom ratios', () => {
      expect(splitAmount(1000000, 2, { ratios: [70, 30] })).toEqual([
        700000, 300000,
      ]);
    });

    it('should split by three-way ratios', () => {
      expect(splitAmount(1000000, 3, { ratios: [50, 30, 20] })).toEqual([
        500000, 300000, 200000,
      ]);
    });

    it('should handle negative amount with ratios', () => {
      expect(splitAmount(-1000000, 2, { ratios: [70, 30] })).toEqual([
        -700000, -300000,
      ]);
    });

    it('should handle zero amount with ratios', () => {
      expect(splitAmount(0, 2, { ratios: [50, 50] })).toEqual([0, 0]);
    });
  });

  describe('rounding', () => {
    it('should round to ribu', () => {
      expect(splitAmount(1000000, 2, { roundTo: 'ribu' })).toEqual([
        500000, 500000,
      ]);
    });

    it('should round to ratus-ribu', () => {
      expect(splitAmount(1234567, 3, { roundTo: 'ribu' })).toEqual([
        412000, 412000, 412000,
      ]);
    });

    it('should round to juta', () => {
      expect(splitAmount(2500000, 2, { roundTo: 'juta' })).toEqual([
        1000000, 1000000,
      ]);
    });
  });

  describe('error cases', () => {
    it('should throw for parts < 1', () => {
      expect(() => splitAmount(1000000, 0)).toThrow(InvalidSplitError);
    });

    it('should throw for negative parts', () => {
      expect(() => splitAmount(1000000, -1)).toThrow(InvalidSplitError);
    });

    it('should throw for ratio length mismatch', () => {
      expect(() => splitAmount(1000000, 3, { ratios: [50, 50] })).toThrow(
        InvalidSplitError
      );
    });

    it('should throw for ratios not summing to 100', () => {
      expect(() => splitAmount(1000000, 2, { ratios: [50, 60] })).toThrow(
        InvalidSplitError
      );
    });
  });
});

describe('percentageOf', () => {
  it('should calculate basic percentage', () => {
    expect(percentageOf(150000, 1000000)).toBe(15);
  });

  it('should calculate 50%', () => {
    expect(percentageOf(500000, 1000000)).toBe(50);
  });

  it('should handle zero part', () => {
    expect(percentageOf(0, 1000000)).toBe(0);
  });

  it('should handle 100%', () => {
    expect(percentageOf(1000000, 1000000)).toBe(100);
  });

  it('should handle over 100%', () => {
    expect(percentageOf(1500000, 1000000)).toBe(150);
  });

  it('should return 0 for zero total', () => {
    expect(percentageOf(100, 0)).toBe(0);
  });

  it('should handle zero part and zero total', () => {
    expect(percentageOf(0, 0)).toBe(0);
  });

  it('should handle negative part', () => {
    expect(percentageOf(-200000, 1000000)).toBe(-20);
  });

  it('should handle both negative (signs cancel)', () => {
    expect(percentageOf(-200000, -1000000)).toBe(20);
  });
});

describe('difference', () => {
  it('should calculate increase', () => {
    expect(difference(1200000, 1000000)).toEqual({
      absolute: 200000,
      percentage: 20,
      direction: 'increase',
    });
  });

  it('should calculate decrease', () => {
    expect(difference(800000, 1000000)).toEqual({
      absolute: -200000,
      percentage: -20,
      direction: 'decrease',
    });
  });

  it('should handle same values', () => {
    expect(difference(1000000, 1000000)).toEqual({
      absolute: 0,
      percentage: 0,
      direction: 'same',
    });
  });

  it('should handle zero current, non-zero reference', () => {
    const result = difference(0, 1000000);
    expect(result.absolute).toBe(-1000000);
    expect(result.percentage).toBe(-100);
    expect(result.direction).toBe('decrease');
  });

  it('should handle both zero', () => {
    expect(difference(0, 0)).toEqual({
      absolute: 0,
      percentage: 0,
      direction: 'same',
    });
  });

  it('should handle non-zero current, zero reference', () => {
    const result = difference(1000000, 0);
    expect(result.absolute).toBe(1000000);
    expect(result.percentage).toBe(null);
    expect(result.direction).toBe('increase');
  });

  it('should handle negative amounts', () => {
    expect(difference(-500000, 1000000)).toEqual({
      absolute: -1500000,
      percentage: -150,
      direction: 'decrease',
    });
  });
});
