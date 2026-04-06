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
      expect(maskNIK(validNIK, { maskChar: 'X' })).toBe('3201XXXXXXXX0123');
    });

    it('should mask with dot', () => {
      expect(maskNIK(validNIK, { maskChar: '.' })).toBe('3201........0123');
    });

    it('should mask with dash', () => {
      expect(maskNIK(validNIK, { maskChar: '-' })).toBe('3201--------0123');
    });

    it('should mask with hash', () => {
      expect(maskNIK(validNIK, { maskChar: '#' })).toBe('3201########0123');
    });

    it('should mask with bullet', () => {
      expect(maskNIK(validNIK, { maskChar: '•' })).toBe('3201••••••••0123');
    });
  });

  describe('custom visibleStart and visibleEnd positions', () => {
    it('should mask with custom visibleStart', () => {
      expect(maskNIK(validNIK, { visibleStart: 2, visibleEnd: 4 })).toBe(
        '32**********0123'
      );
    });

    it('should mask with custom visibleEnd', () => {
      expect(maskNIK(validNIK, { visibleStart: 4, visibleEnd: 2 })).toBe(
        '3201**********23'
      );
    });

    it('should mask with both custom', () => {
      expect(maskNIK(validNIK, { visibleStart: 6, visibleEnd: 4 })).toBe(
        '320101******0123'
      );
    });

    it('should mask showing more characters', () => {
      expect(maskNIK(validNIK, { visibleStart: 8, visibleEnd: 6 })).toBe(
        '32010189**310123'
      );
    });

    it('should mask showing less characters', () => {
      expect(maskNIK(validNIK, { visibleStart: 2, visibleEnd: 2 })).toBe(
        '32************23'
      );
    });

    it('should mask with visibleStart only', () => {
      expect(maskNIK(validNIK, { visibleStart: 6, visibleEnd: 0 })).toBe(
        '320101**********'
      );
    });

    it('should mask with visibleEnd only', () => {
      expect(maskNIK(validNIK, { visibleStart: 0, visibleEnd: 6 })).toBe(
        '**********310123'
      );
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

    it('should combine separator with custom maskChar', () => {
      expect(maskNIK(validNIK, { maskChar: 'X', separator: '-' })).toBe(
        '32-01-XX-XX-XX-XX-0123'
      );
    });

    it('should combine all options', () => {
      expect(
        maskNIK(validNIK, {
          visibleStart: 6,
          visibleEnd: 4,
          maskChar: '•',
          separator: '-',
        })
      ).toBe('32-01-01-••-••-••-0123');
    });
  });

  describe('edge cases', () => {
    it('should return original if visibleStart + visibleEnd >= 16', () => {
      expect(maskNIK(validNIK, { visibleStart: 8, visibleEnd: 8 })).toBe(
        validNIK
      );
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
      expect(maskNIK(validNIK, { visibleStart: 7, visibleEnd: 8 })).toBe(
        '3201018*01310123'
      );
    });

    it('should handle visibleStart only with separator', () => {
      expect(
        maskNIK(validNIK, { visibleStart: 6, visibleEnd: 0, separator: '-' })
      ).toBe('32-01-01-**-**-**-****');
    });

    it('should handle visibleEnd only with separator', () => {
      expect(
        maskNIK(validNIK, { visibleStart: 0, visibleEnd: 6, separator: '-' })
      ).toBe('**-**-**-**-**-31-0123');
    });

    it('should mask with boundary on part edge', () => {
      expect(
        maskNIK(validNIK, { visibleStart: 4, visibleEnd: 4, separator: '-' })
      ).toBe('32-01-**-**-**-**-0123');
    });
  });

  describe('backward compatibility (deprecated)', () => {
    it('should still support old option names with deprecation warning', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      expect(maskNIK(validNIK, { start: 2, end: 4 })).toBe('32**********0123');
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });
});
