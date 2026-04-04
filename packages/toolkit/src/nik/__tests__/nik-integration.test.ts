import { describe, expect, it } from 'vitest';
import { validateNIK, parseNIK, formatNIK, maskNIK } from '../index';

describe('end-to-end workflows', () => {
  describe('complete NIK processing pipeline', () => {
    it('should work with validation -> parse -> format -> mask', () => {
      const nik = '3201018901310123';

      // Step 1: Validate
      expect(validateNIK(nik)).toBe(true);

      // Step 2: Parse
      const info = parseNIK(nik);
      expect(info).not.toBeNull();
      expect(info?.province.name).toBe('Jawa Barat');
      expect(info?.gender).toBe('male');
      expect(info?.birthDate?.getFullYear()).toBe(1989);

      // Step 3: Format
      const formatted = formatNIK(nik);
      expect(formatted).toBe('32-01-01-89-01-31-0123');

      // Step 4: Mask
      const masked = maskNIK(nik, { separator: '-' });
      expect(masked).toContain('*');
      expect(masked).toContain('-');
    });

    it('should handle female NIK in complete workflow', () => {
      const nik = '3201019508550123';

      expect(validateNIK(nik)).toBe(true);

      const info = parseNIK(nik);
      expect(info?.gender).toBe('female');
      expect(info?.birthDate?.getDate()).toBe(15);

      const formatted = formatNIK(nik);
      expect(formatted).toBe('32-01-01-95-08-55-0123');

      const masked = maskNIK(nik);
      expect(masked).toBe('3201********0123');
    });

    it('should handle different provinces consistently', () => {
      const niks = [
        '3101018901310123', // Jakarta
        '5101018901310123', // Bali
        '7301018901310123', // Sulawesi Selatan
      ];

      niks.forEach((nik) => {
        expect(validateNIK(nik)).toBe(true);

        const info = parseNIK(nik);
        expect(info).not.toBeNull();
        expect(info?.isValid).toBe(true);

        const formatted = formatNIK(nik);
        expect(formatted.split('-')).toHaveLength(7);

        const masked = maskNIK(nik);
        expect(masked).toContain('*');
      });
    });
  });

  describe('invalid NIK handling across functions', () => {
    const invalidNIK = '1234';

    it('should consistently reject invalid NIK', () => {
      expect(validateNIK(invalidNIK)).toBe(false);
      expect(parseNIK(invalidNIK)).toBeNull();
      expect(formatNIK(invalidNIK)).toBe(invalidNIK);
      expect(maskNIK(invalidNIK)).toBe(invalidNIK);
    });

    it('should handle non-digit NIK consistently', () => {
      const nonDigit = '320123456789012X';

      expect(validateNIK(nonDigit)).toBe(false);
      expect(parseNIK(nonDigit)).toBeNull();
      expect(formatNIK(nonDigit)).toBe(nonDigit);
      expect(maskNIK(nonDigit)).toBe(nonDigit);
    });

    it('should handle invalid province consistently', () => {
      const invalidProvince = '9912345678901234';

      expect(validateNIK(invalidProvince)).toBe(false);
      expect(parseNIK(invalidProvince)).toBeNull();
    });
  });

  describe('year range handling across functions', () => {
    it('should handle year 2000 correctly', () => {
      const nik = '3201010001010123';

      expect(validateNIK(nik)).toBe(true);

      const info = parseNIK(nik);
      expect(info?.birthDate?.getFullYear()).toBe(2000);
    });

    it('should handle year 1999 correctly', () => {
      const nik = '3201019912310123';

      expect(validateNIK(nik)).toBe(true);

      const info = parseNIK(nik);
      expect(info?.birthDate?.getFullYear()).toBe(1999);
    });

    it('should handle year boundary (00/31) correctly', () => {
      const nik2000 = '3201010001010123';
      const nik1931 = '3201013101010123';

      expect(validateNIK(nik2000)).toBe(true);
      expect(validateNIK(nik1931)).toBe(true);

      expect(parseNIK(nik2000)?.birthDate?.getFullYear()).toBe(2000);
      expect(parseNIK(nik1931)?.birthDate?.getFullYear()).toBe(1931);
    });
  });

  describe('leap year handling', () => {
    it('should validate and parse leap year correctly', () => {
      const leapYearNIK = '3201010002290123'; // Feb 29, 2000

      expect(validateNIK(leapYearNIK)).toBe(true);

      const info = parseNIK(leapYearNIK);
      expect(info?.birthDate?.getFullYear()).toBe(2000);
      expect(info?.birthDate?.getMonth()).toBe(1);
      expect(info?.birthDate?.getDate()).toBe(29);
    });

    it('should reject Feb 29 on non-leap year', () => {
      const nonLeapYearNIK = '3201019902290123'; // Feb 29, 1999

      expect(validateNIK(nonLeapYearNIK)).toBe(false);
      expect(parseNIK(nonLeapYearNIK)).toBeNull();
    });
  });
});
