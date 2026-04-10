import { describe, it, expect } from 'vitest';
import { maskPlate } from '../mask';

describe('maskPlate', () => {
  describe('valid inputs', () => {
    it('should mask private plate with default options', () => {
      expect(maskPlate('B 1234 ABC')).toBe('B****ABC');
      expect(maskPlate('DA 1234 XYZ')).toBe('D*****XYZ');
    });

    it('should mask public plate', () => {
      expect(maskPlate('B 1234 U')).toBe('B**34U');
    });

    it('should mask diplomat plate', () => {
      expect(maskPlate('CD 1234 AB')).toBe('C****4AB');
    });

    it('should respect custom visibleStart', () => {
      expect(maskPlate('B 1234 ABC', { visibleStart: 2 })).toBe('B1***ABC');
    });

    it('should respect custom visibleEnd', () => {
      expect(maskPlate('B 1234 ABC', { visibleEnd: 4 })).toBe('B***4ABC');
    });

    it('should respect custom maskChar', () => {
      expect(maskPlate('B 1234 ABC', { maskChar: '#' })).toBe('B####ABC');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(maskPlate('')).toBe('');
    });

    it('should return empty string for invalid plate', () => {
      expect(maskPlate('INVALID')).toBe('');
    });

    it('should handle non-string input', () => {
      expect(maskPlate(null as any)).toBe('');
      expect(maskPlate(undefined as any)).toBe('');
    });
  });
});
