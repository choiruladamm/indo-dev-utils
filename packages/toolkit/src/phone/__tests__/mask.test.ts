import { describe, expect, it, vi } from 'vitest';
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
      expect(maskPhoneNumber(testPhone, { maskChar: 'X' })).toBe(
        '0812XXXX7890'
      );
    });

    it('should mask with dot', () => {
      expect(maskPhoneNumber(testPhone, { maskChar: '.' })).toBe(
        '0812....7890'
      );
    });

    it('should mask with dash', () => {
      expect(maskPhoneNumber(testPhone, { maskChar: '-' })).toBe(
        '0812----7890'
      );
    });
  });

  describe('custom visibleStart and visibleEnd', () => {
    it('should mask with custom visibleStart', () => {
      const masked = maskPhoneNumber(testPhone, {
        visibleStart: 3,
        visibleEnd: 4,
      });
      expect(masked).toBe('081*****7890');
    });

    it('should mask with custom visibleEnd', () => {
      const masked = maskPhoneNumber(testPhone, {
        visibleStart: 4,
        visibleEnd: 3,
      });
      expect(masked).toBe('0812*****890');
    });

    it('should mask with both custom', () => {
      const masked = maskPhoneNumber(testPhone, {
        visibleStart: 5,
        visibleEnd: 3,
      });
      expect(masked).toBe('08123****890');
    });

    it('should mask showing more characters', () => {
      const masked = maskPhoneNumber(testPhone, {
        visibleStart: 6,
        visibleEnd: 4,
      });
      expect(masked).toBe('081234**7890');
    });

    it('should mask showing less characters', () => {
      const masked = maskPhoneNumber(testPhone, {
        visibleStart: 2,
        visibleEnd: 2,
      });
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

    it('should combine separator with custom maskChar', () => {
      const masked = maskPhoneNumber(testPhone, {
        maskChar: 'X',
        separator: '-',
      });
      expect(masked).toBe('0812-XXXX-7890');
    });

    it('should combine all options', () => {
      const masked = maskPhoneNumber(testPhone, {
        visibleStart: 3,
        visibleEnd: 3,
        maskChar: '•',
        separator: ' ',
      });
      expect(masked).toBe('081 •••••• 890');
    });
  });

  describe('edge cases', () => {
    it('should return original if visibleStart + visibleEnd >= length', () => {
      const masked = maskPhoneNumber(testPhone, {
        visibleStart: 6,
        visibleEnd: 6,
      });
      expect(masked).toBe(testPhone);
    });

    it('should handle short numbers', () => {
      const masked = maskPhoneNumber('0812345678', {
        visibleStart: 4,
        visibleEnd: 4,
      });
      expect(masked).toBe('0812**5678');
    });

    it('should handle minimum masking (1 char masked)', () => {
      const masked = maskPhoneNumber('081234567890', {
        visibleStart: 5,
        visibleEnd: 6,
      });
      expect(masked).toBe('08123*567890');
    });

    it('should handle invalid phone gracefully', () => {
      const masked = maskPhoneNumber('1234');
      expect(masked).toContain('*');
    });

    it('should handle international format', () => {
      const masked = maskPhoneNumber('+6281234567890');
      expect(masked.startsWith('+628')).toBe(true);
      expect(masked).toContain('*');
    });

    it('should return empty string for empty input', () => {
      const masked = maskPhoneNumber('');
      expect(masked).toBe('');
    });
  });

  describe('backward compatibility (deprecated)', () => {
    it('should still support old option names with deprecation warning', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      expect(maskPhoneNumber(testPhone, { start: 3, end: 4 })).toBe(
        '081*****7890'
      );
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });
});
