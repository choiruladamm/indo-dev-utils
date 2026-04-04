import { describe, expect, it } from 'vitest';
import { formatNIK } from '../format';

describe('formatNIK', () => {
  const validNIK = '3201018901310123';

  describe('basic formatting', () => {
    it('should format with default separator (dash)', () => {
      expect(formatNIK(validNIK)).toBe('32-01-01-89-01-31-0123');
    });

    it('should format correctly by segments', () => {
      const formatted = formatNIK(validNIK);
      const parts = formatted.split('-');

      expect(parts).toHaveLength(7);
      expect(parts[0]).toBe('32'); // Province
      expect(parts[1]).toBe('01'); // Regency
      expect(parts[2]).toBe('01'); // District
      expect(parts[3]).toBe('89'); // Year
      expect(parts[4]).toBe('01'); // Month
      expect(parts[5]).toBe('31'); // Day
      expect(parts[6]).toBe('0123'); // Serial
    });
  });

  describe('custom separators', () => {
    it('should format with space separator', () => {
      expect(formatNIK(validNIK, ' ')).toBe('32 01 01 89 01 31 0123');
    });

    it('should format with dot separator', () => {
      expect(formatNIK(validNIK, '.')).toBe('32.01.01.89.01.31.0123');
    });

    it('should format with slash separator', () => {
      expect(formatNIK(validNIK, '/')).toBe('32/01/01/89/01/31/0123');
    });

    it('should format with underscore separator', () => {
      expect(formatNIK(validNIK, '_')).toBe('32_01_01_89_01_31_0123');
    });

    it('should format with pipe separator', () => {
      expect(formatNIK(validNIK, '|')).toBe('32|01|01|89|01|31|0123');
    });

    it('should format with empty string (no separator)', () => {
      expect(formatNIK(validNIK, '')).toBe('3201018901310123');
    });
  });

  describe('edge cases', () => {
    it('should return original for invalid NIK', () => {
      expect(formatNIK('1234')).toBe('1234');
    });

    it('should return original for wrong length', () => {
      expect(formatNIK('123456789012345')).toBe('123456789012345');
    });

    it('should return original for non-digits', () => {
      expect(formatNIK('320123456789012X')).toBe('320123456789012X');
    });

    it('should return original for empty string', () => {
      expect(formatNIK('')).toBe('');
    });

    it('should handle female NIK', () => {
      expect(formatNIK('3201019508550123')).toBe('32-01-01-95-08-55-0123');
    });
  });
});
