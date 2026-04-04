import { describe, expect, it } from 'vitest';
import { roundToClean } from '../utils';

describe('roundToClean', () => {
  describe('round to ribu (thousands)', () => {
    it('should round 1234567 to 1235000', () => {
      expect(roundToClean(1234567, 'ribu')).toBe(1235000);
    });

    it('should round 1234 to 1000', () => {
      expect(roundToClean(1234, 'ribu')).toBe(1000);
    });

    it('should round 1500 to 2000', () => {
      expect(roundToClean(1500, 'ribu')).toBe(2000);
    });
  });

  describe('round to ratus-ribu (hundred thousands)', () => {
    it('should round 1234567 to 1200000', () => {
      expect(roundToClean(1234567, 'ratus-ribu')).toBe(1200000);
    });

    it('should round 1750000 to 1800000', () => {
      expect(roundToClean(1750000, 'ratus-ribu')).toBe(1800000);
    });

    it('should round 150000 to 200000', () => {
      expect(roundToClean(150000, 'ratus-ribu')).toBe(200000);
    });
  });

  describe('round to juta (millions)', () => {
    it('should round 1234567 to 1000000', () => {
      expect(roundToClean(1234567, 'juta')).toBe(1000000);
    });

    it('should round 1500000 to 2000000', () => {
      expect(roundToClean(1500000, 'juta')).toBe(2000000);
    });

    it('should round 750000 to 1000000', () => {
      expect(roundToClean(750000, 'juta')).toBe(1000000);
    });
  });

  describe('edge cases', () => {
    it('should handle 0', () => {
      expect(roundToClean(0, 'ribu')).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(roundToClean(-1234567, 'ribu')).toBe(-1235000);
    });

    it('should default to ribu when no unit provided', () => {
      expect(roundToClean(1234567)).toBe(1235000);
    });
  });
});
