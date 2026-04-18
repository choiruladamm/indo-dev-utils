/**
 * Tests for formatPercentage function.
 *
 * @module currency/__tests__/percentage
 */

import { formatPercentage } from '../format';

describe('formatPercentage', () => {
  describe('valid inputs', () => {
    test('basic decimal → percentage', () => {
      expect(formatPercentage(0.11)).toBe('11%');
    });

    test('decimal with rounding', () => {
      expect(formatPercentage(0.115)).toBe('11,5%');
    });

    test('custom decimal places (2 decimals)', () => {
      expect(formatPercentage(0.1152, { decimals: 2 })).toBe('11,52%');
    });

    test('zero value', () => {
      expect(formatPercentage(0)).toBe('0%');
    });

    test('full percentage (1 → 100%)', () => {
      expect(formatPercentage(1)).toBe('100%');
    });

    test('negative percentage', () => {
      expect(formatPercentage(-0.11)).toBe('-11%');
    });

    test('symbol toggle (symbol: false)', () => {
      expect(formatPercentage(0.11, { symbol: false })).toBe('11');
    });

    test('custom decimal separator', () => {
      expect(formatPercentage(0.115, { decimalSeparator: '.' })).toBe('11.5%');
    });

    test('isPercentage mode', () => {
      expect(formatPercentage(11.5, { isPercentage: true })).toBe('11,5%');
    });

    test('large percentages (>100%)', () => {
      expect(formatPercentage(2.5)).toBe('250%');
    });

    test('very small percentages (0.001 → 0,1%)', () => {
      expect(formatPercentage(0.001)).toBe('0,1%');
    });

    test('rounding edge cases', () => {
      expect(formatPercentage(0.119)).toBe('11,9%');
      expect(formatPercentage(0.1114, { decimals: 2 })).toBe('11,14%');
    });

    test('Infinity handling', () => {
      expect(formatPercentage(Infinity)).toBe('0%');
      expect(formatPercentage(-Infinity)).toBe('-0%');
    });

    test('isPercentage with large values (100 → 100%)', () => {
      expect(formatPercentage(100, { isPercentage: true })).toBe('100%');
    });
  });

  describe('edge cases', () => {
    test('NaN returns 0%', () => {
      expect(formatPercentage(NaN)).toBe('0%');
    });

    test('negative zero', () => {
      expect(formatPercentage(-0)).toBe('0%');
    });

    test('very small decimal below 0.1%', () => {
      expect(formatPercentage(0.0001)).toBe('0%');
    });
  });
});
