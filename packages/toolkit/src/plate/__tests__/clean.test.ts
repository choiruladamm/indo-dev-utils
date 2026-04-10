import { describe, it, expect } from 'vitest';
import { cleanPlate } from '../clean';

describe('cleanPlate', () => {
  describe('valid inputs', () => {
    it('should remove spaces', () => {
      expect(cleanPlate('B 1234 ABC')).toBe('B1234ABC');
    });

    it('should remove hyphens', () => {
      expect(cleanPlate('DA-1234-XYZ')).toBe('DA1234XYZ');
    });

    it('should convert to uppercase', () => {
      expect(cleanPlate('b 1234 abc')).toBe('B1234ABC');
    });

    it('should remove multiple separators', () => {
      expect(cleanPlate('B-1234-ABC')).toBe('B1234ABC');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(cleanPlate('')).toBe('');
    });

    it('should return empty string for non-string input', () => {
      expect(cleanPlate(null as any)).toBe('');
      expect(cleanPlate(undefined as any)).toBe('');
    });

    it('should handle already clean input', () => {
      expect(cleanPlate('B1234ABC')).toBe('B1234ABC');
    });
  });
});
