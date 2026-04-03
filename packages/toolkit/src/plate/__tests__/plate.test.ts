import { describe, it, expect } from 'vitest';
import { validatePlate, getRegionFromPlate, formatPlate } from '../index';

describe('Plate Module', () => {
  describe('validatePlate', () => {
    it('should validate standard plates', () => {
      expect(validatePlate('B 1234 ABC')).toBe(true);
      expect(validatePlate('AB 1234 CD')).toBe(true);
      expect(validatePlate('D 1 AA')).toBe(true);
    });

    it('should validate plates without spaces', () => {
      expect(validatePlate('B1234ABC')).toBe(true);
    });

    it('should return false for invalid format', () => {
      expect(validatePlate('1234 B')).toBe(false);
      expect(validatePlate('B 12345 ABC')).toBe(false);
      expect(validatePlate('ABC 123 DEF')).toBe(false);
    });
  });

  describe('getRegionFromPlate', () => {
    it('should return correct region for Jakarta', () => {
      expect(getRegionFromPlate('B 1234 ABC')).toContain('Jakarta');
    });

    it('should return correct region for Yogyakarta', () => {
      expect(getRegionFromPlate('AB 1234 CD')).toBe('Yogyakarta');
    });

    it('should return null for unknown prefix', () => {
      expect(getRegionFromPlate('ZZ 1234 CD')).toBeNull();
    });
  });

  describe('formatPlate', () => {
    it('should format plate with correct spaces', () => {
      expect(formatPlate('b1234abc')).toBe('B 1234 ABC');
    });

    it('should handle already formatted plates', () => {
      expect(formatPlate('B 1234 ABC')).toBe('B 1234 ABC');
    });
  });
});
