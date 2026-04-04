import { describe, expect, it } from 'vitest';
import { maskPhoneNumber } from '../format';

describe('maskPhoneNumber', () => {
  const testPhone = '081234567890';

  describe('default masking', () => {
    it('should mask with default options', () => {
      const masked = maskPhoneNumber(testPhone);
      expect(masked).toBe('0812****7890');
    });

    it('should show 4 chars at start and end by default', () => {
      const masked = maskPhoneNumber(testPhone);
      expect(masked.startsWith('0812')).toBe(true);
      expect(masked.endsWith('7890')).toBe(true);
      expect(masked).toContain('*');
    });
  });

  describe('custom mask character', () => {
    it('should mask with custom character', () => {
      expect(maskPhoneNumber(testPhone, { char: 'X' })).toBe('0812XXXX7890');
    });

    it('should mask with dot', () => {
      expect(maskPhoneNumber(testPhone, { char: '.' })).toBe('0812....7890');
    });

    it('should mask with dash', () => {
      expect(maskPhoneNumber(testPhone, { char: '-' })).toBe('0812----7890');
    });
  });

  describe('custom start and end', () => {
    it('should mask with custom start', () => {
      const masked = maskPhoneNumber(testPhone, { start: 3, end: 4 });
      expect(masked).toBe('081*****7890');
    });

    it('should mask with custom end', () => {
      const masked = maskPhoneNumber(testPhone, { start: 4, end: 3 });
      expect(masked).toBe('0812*****890');
    });

    it('should mask with both custom', () => {
      const masked = maskPhoneNumber(testPhone, { start: 5, end: 3 });
      expect(masked).toBe('08123****890');
    });

    it('should mask showing more characters', () => {
      const masked = maskPhoneNumber(testPhone, { start: 6, end: 4 });
      expect(masked).toBe('081234**7890');
    });

    it('should mask showing less characters', () => {
      const masked = maskPhoneNumber(testPhone, { start: 2, end: 2 });
      expect(masked).toBe('08********90');
    });
  });

  describe('with separator', () => {
    it('should mask with dash separator', () => {
      const masked = maskPhoneNumber(testPhone, { separator: '-' });
      expect(masked).toBe('0812-****-7890');
    });

    it('should mask with space separator', () => {
      const masked = maskPhoneNumber(testPhone, { separator: ' ' });
      expect(masked).toBe('0812 **** 7890');
    });

    it('should combine separator with custom char', () => {
      const masked = maskPhoneNumber(testPhone, {
        char: 'X',
        separator: '-',
      });
      expect(masked).toBe('0812-XXXX-7890');
    });

    it('should combine all options', () => {
      const masked = maskPhoneNumber(testPhone, {
        start: 3,
        end: 3,
        char: '•',
        separator: ' ',
      });
      expect(masked).toBe('081 •••••• 890');
    });
  });

  describe('edge cases', () => {
    it('should return original if start + end >= length', () => {
      const masked = maskPhoneNumber(testPhone, { start: 6, end: 6 });
      expect(masked).toBe(testPhone);
    });

    it('should handle short numbers', () => {
      const masked = maskPhoneNumber('0812345678', { start: 4, end: 4 });
      expect(masked).toBe('0812**5678');
    });

    it('should handle minimum masking (1 char masked)', () => {
      const masked = maskPhoneNumber('081234567890', {
        start: 5,
        end: 6,
      });
      expect(masked).toBe('08123*567890');
    });

    it('should handle invalid phone gracefully', () => {
      const masked = maskPhoneNumber('1234');
      // Should still mask even if invalid
      expect(masked).toContain('*');
    });

    it('should handle international format', () => {
      const masked = maskPhoneNumber('+6281234567890');
      expect(masked.startsWith('+628')).toBe(true);
      expect(masked).toContain('*');
    });
  });
});
