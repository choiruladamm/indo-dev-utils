import { describe, it, expect } from 'vitest';
import { cleanVIN } from '../clean';

describe('cleanVIN', () => {
  describe('valid inputs', () => {
    it('should remove hyphens', () => {
      expect(cleanVIN('1HGBH-41JXMN-109186')).toBe('1HGBH41JXMN109186');
    });

    it('should remove spaces', () => {
      expect(cleanVIN(' 1hgbh41jxmn109186 ')).toBe('1HGBH41JXMN109186');
    });

    it('should convert to uppercase', () => {
      expect(cleanVIN('1hgbh41jxmn109186')).toBe('1HGBH41JXMN109186');
    });

    it('should remove all non-alphanumeric characters', () => {
      expect(cleanVIN('1HG.BH-41!JXMN@109186')).toBe('1HGBH41JXMN109186');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(cleanVIN('')).toBe('');
    });

    it('should return empty string for non-string input', () => {
      expect(cleanVIN(null as any)).toBe('');
    });

    it('should handle already clean input', () => {
      expect(cleanVIN('1HGBH41JXMN109186')).toBe('1HGBH41JXMN109186');
    });
  });
});
