import { describe, it, expect } from 'vitest';
import { validateNIK, parseNIK, formatNIK, maskNIK } from '../index';

describe('NIK Module Integration', () => {
  // Valid NIK: Province:32, Reg:01, Dist:01, Year:89, Month:01, Day:31, Serial:0123
  const validNIK = '3201018901310123';

  describe('validateNIK', () => {
    it('should validate a correct NIK', () => {
      expect(validateNIK(validNIK)).toBe(true);
    });

    it('should reject invalid NIK', () => {
      expect(validateNIK('1234')).toBe(false);
    });
  });

  describe('parseNIK', () => {
    it('should parse a valid NIK', () => {
      const parsed = parseNIK(validNIK);

      expect(parsed).not.toBeNull();
      expect(parsed?.province.code).toBe('32');
      expect(parsed?.province.name).toBe('Jawa Barat');
      expect(parsed?.regency.code).toBe('01');
      expect(parsed?.gender).toBe('male');
      expect(parsed?.birthDate).toBeInstanceOf(Date);
      expect(parsed?.serialNumber).toBe('0123');
      expect(parsed?.isValid).toBe(true);
    });

    it('should parse female NIK correctly', () => {
      // Female: Day 55 = 15 + 40
      const femaleNIK = '3201019508550123';
      const parsed = parseNIK(femaleNIK);

      expect(parsed?.gender).toBe('female');
      expect(parsed?.birthDate?.getDate()).toBe(15);
    });

    it('should return null for invalid NIK', () => {
      expect(parseNIK('1234')).toBeNull();
      expect(parseNIK('9999999999999999')).toBeNull();
    });
  });

  describe('formatNIK', () => {
    it('should format NIK with default separator', () => {
      const formatted = formatNIK(validNIK);
      expect(formatted).toBe('32-01-01-89-01-31-0123');
    });

    it('should format NIK with custom separator', () => {
      const formatted = formatNIK(validNIK, ' ');
      expect(formatted).toBe('32 01 01 89 01 31 0123');
    });

    it('should return as-is for invalid NIK', () => {
      const invalid = '1234';
      expect(formatNIK(invalid)).toBe(invalid);
    });
  });

  describe('maskNIK', () => {
    it('should mask NIK with default options', () => {
      const masked = maskNIK(validNIK);
      expect(masked).toBe('3201********0123');
      expect(masked.length).toBe(16);
    });

    it('should mask with custom character', () => {
      const masked = maskNIK(validNIK, { char: 'X' });
      expect(masked).toBe('3201XXXXXXXX0123');
    });

    it('should mask with separator', () => {
      const masked = maskNIK(validNIK, { separator: '-' });
      expect(masked).toBe('32-01-**-**-**-**-0123');
    });

    it('should mask with custom start and end', () => {
      const masked = maskNIK(validNIK, { start: 6, end: 4 });
      expect(masked).toBe('320101******0123');
      expect(masked.length).toBe(16);
    });

    it('should return as-is for invalid NIK', () => {
      const invalid = '1234';
      expect(maskNIK(invalid)).toBe(invalid);
    });

    it('should return unmasked if start + end >= 16', () => {
      const masked = maskNIK(validNIK, { start: 8, end: 8 });
      expect(masked).toBe(validNIK);
    });
  });

  describe('end-to-end workflow', () => {
    it('should work with complete NIK processing pipeline', () => {
      const nik = '3201018901310123';

      // Step 1: Validate
      expect(validateNIK(nik)).toBe(true);

      // Step 2: Parse
      const info = parseNIK(nik);
      expect(info).not.toBeNull();
      expect(info?.province.name).toBe('Jawa Barat');
      expect(info?.gender).toBe('male');

      // Step 3: Format
      const formatted = formatNIK(nik);
      expect(formatted).toBe('32-01-01-89-01-31-0123');

      // Step 4: Mask for display
      const masked = maskNIK(nik, { separator: '-' });
      expect(masked).toContain('*');
      expect(masked).toContain('-');
    });

    it('should handle female NIK in complete workflow', () => {
      const femaleNIK = '3201019508550123';

      expect(validateNIK(femaleNIK)).toBe(true);

      const info = parseNIK(femaleNIK);
      expect(info?.gender).toBe('female');

      const formatted = formatNIK(femaleNIK);
      expect(formatted).toBe('32-01-01-95-08-55-0123');

      const masked = maskNIK(femaleNIK);
      expect(masked).toBe('3201********0123');
    });
  });
});
