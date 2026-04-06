import { describe, expect, it } from 'vitest';
import { maskNIK } from '../format';

describe('maskNIK', () => {
  const validNIK = '3201018901310123';

  describe('default masking', () => {
    it('should mask with default options', () => {
      expect(maskNIK(validNIK)).toBe('3201********0123');
    });

    it('should show 4 chars at start and end by default', () => {
      const masked = maskNIK(validNIK);

      expect(masked.startsWith('3201')).toBe(true);
      expect(masked.endsWith('0123')).toBe(true);
      expect(masked).toContain('*');
    });

    it('should have correct length', () => {
      expect(maskNIK(validNIK).length).toBe(16);
    });
  });

  describe('custom mask character', () => {
    it('should mask with X', () => {
      expect(maskNIK(validNIK, { char: 'X' })).toBe('3201XXXXXXXX0123');
    });

    it('should mask with dot', () => {
      expect(maskNIK(validNIK, { char: '.' })).toBe('3201........0123');
    });

    it('should mask with dash', () => {
      expect(maskNIK(validNIK, { char: '-' })).toBe('3201--------0123');
    });

    it('should mask with hash', () => {
      expect(maskNIK(validNIK, { char: '#' })).toBe('3201########0123');
    });

    it('should mask with bullet', () => {
      expect(maskNIK(validNIK, { char: '•' })).toBe('3201••••••••0123');
    });
  });

  describe('custom start and end positions', () => {
    it('should mask with custom start', () => {
      expect(maskNIK(validNIK, { start: 2, end: 4 })).toBe('32**********0123');
    });

    it('should mask with custom end', () => {
      expect(maskNIK(validNIK, { start: 4, end: 2 })).toBe('3201**********23');
    });

    it('should mask with both custom', () => {
      expect(maskNIK(validNIK, { start: 6, end: 4 })).toBe('320101******0123');
    });

    it('should mask showing more characters', () => {
      expect(maskNIK(validNIK, { start: 8, end: 6 })).toBe('32010189**310123');
    });

    it('should mask showing less characters', () => {
      expect(maskNIK(validNIK, { start: 2, end: 2 })).toBe('32************23');
    });

    it('should mask with start only', () => {
      expect(maskNIK(validNIK, { start: 6, end: 0 })).toBe('320101**********');
    });

    it('should mask with end only', () => {
      expect(maskNIK(validNIK, { start: 0, end: 6 })).toBe('**********310123');
    });
  });

  describe('masking with separator', () => {
    it('should mask with dash separator', () => {
      expect(maskNIK(validNIK, { separator: '-' })).toBe(
        '32-01-**-**-**-**-0123'
      );
    });

    it('should mask with space separator', () => {
      expect(maskNIK(validNIK, { separator: ' ' })).toBe(
        '32 01 ** ** ** ** 0123'
      );
    });

    it('should mask with dot separator', () => {
      expect(maskNIK(validNIK, { separator: '.' })).toBe(
        '32.01.**.**.**.**.0123'
      );
    });

    it('should combine separator with custom char', () => {
      expect(maskNIK(validNIK, { char: 'X', separator: '-' })).toBe(
        '32-01-XX-XX-XX-XX-0123'
      );
    });

    it('should combine all options', () => {
      expect(
        maskNIK(validNIK, { start: 6, end: 4, char: '•', separator: '-' })
      ).toBe('32-01-01-••-••-••-0123');
    });
  });

  describe('edge cases', () => {
    it('should return original if start + end >= 16', () => {
      expect(maskNIK(validNIK, { start: 8, end: 8 })).toBe(validNIK);
    });

    it('should return original for invalid NIK', () => {
      expect(maskNIK('1234')).toBe('1234');
    });

    it('should return original for wrong length', () => {
      expect(maskNIK('123456789012345')).toBe('123456789012345');
    });

    it('should return original for non-digits', () => {
      expect(maskNIK('320123456789012X')).toBe('320123456789012X');
    });

    it('should handle female NIK', () => {
      expect(maskNIK('3201019508550123')).toBe('3201********0123');
    });

    it('should mask minimum (1 char masked)', () => {
      expect(maskNIK(validNIK, { start: 7, end: 8 })).toBe('3201018*01310123');
    });

    it('should handle start only with separator', () => {
      expect(maskNIK(validNIK, { start: 6, end: 0, separator: '-' })).toBe(
        '32-01-01-**-**-**-****'
      );
    });

    it('should handle end only with separator', () => {
      expect(maskNIK(validNIK, { start: 0, end: 6, separator: '-' })).toBe(
        '**-**-**-**-**-31-0123'
      );
    });

    it('should mask with boundary on part edge', () => {
      expect(maskNIK(validNIK, { start: 4, end: 4, separator: '-' })).toBe(
        '32-01-**-**-**-**-0123'
      );
    });
  });
});
