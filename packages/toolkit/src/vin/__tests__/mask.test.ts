import { describe, it, expect } from 'vitest';
import { maskVIN } from '../mask';

describe('maskVIN', () => {
  const validVIN = '1HGBH41JXMN109186';

  describe('valid inputs', () => {
    it('should mask serial section by default (positions 12-17)', () => {
      expect(maskVIN(validVIN)).toBe('1HGBH41JXMN******');
    });

    it('should respect custom visibleEnd', () => {
      expect(maskVIN(validVIN, { visibleEnd: 2 })).toBe('1HGBH41JXMN****86');
      expect(maskVIN(validVIN, { visibleEnd: 6 })).toBe('1HGBH41JXMN109186');
    });

    it('should respect custom maskChar', () => {
      expect(maskVIN(validVIN, { maskChar: '#' })).toBe('1HGBH41JXMN######');
    });

    it('should respect custom visibleStart', () => {
      expect(maskVIN(validVIN, { visibleStart: 10 })).toBe('1HGBH41JXM*******');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for invalid VIN', () => {
      expect(maskVIN('invalid')).toBe('');
      expect(maskVIN('1HGBH41JXMN10918')).toBe('');
    });

    it('should return empty string for empty input', () => {
      expect(maskVIN('')).toBe('');
    });

    it('should return empty string for non-string input', () => {
      expect(maskVIN(null as any)).toBe('');
    });
  });
});
