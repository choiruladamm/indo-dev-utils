import { describe, it, expect } from 'vitest';
import { validateNIK } from '../validate';

describe('validateNIK', () => {
  describe('valid NIKs', () => {
    it('should accept valid 16-digit NIK', () => {
      // Format: 32-01-01-89-01-31-0123
      // Jawa Barat, Bogor, District, 1989, Januari, 31 (Laki-laki), Serial
      expect(validateNIK('3201018901310123')).toBe(true); // ✓ VALID
    });

    it('should accept NIK from different provinces', () => {
      // Same pattern: 01-01-89 (31 Jan 1989)
      expect(validateNIK('3101018901310123')).toBe(true); // ✓ Jakarta
      expect(validateNIK('5101018901310123')).toBe(true); // ✓ Bali
      expect(validateNIK('7101018901310123')).toBe(true); // ✓ Sulawesi Utara
    });

    it('should accept NIK with valid birthdate', () => {
      // Male, 1 Jan 2001 (year:01, month:01, day:01)
      expect(validateNIK('3201010101010123')).toBe(true);

      // Female, 1 Jan 2001 (year:01, month:01, day:41 [01+40])
      expect(validateNIK('3201010101410123')).toBe(true);

      // Male, 31 Dec 1989 (year:89, month:12, day:31)
      expect(validateNIK('3201018912310123')).toBe(true);

      // Female, 15 Aug 1995 (year:95, month:08, day:55 [15+40])
      expect(validateNIK('3201019508550123')).toBe(true);
    });
  });

  describe('invalid NIKs', () => {
    it('should reject NIK with wrong length', () => {
      expect(validateNIK('1234')).toBe(false);
      expect(validateNIK('123456789012345')).toBe(false); // 15 digits
      expect(validateNIK('12345678901234567')).toBe(false); // 17 digits
      expect(validateNIK('')).toBe(false);
    });

    it('should reject NIK with non-digits', () => {
      expect(validateNIK('320123456789012X')).toBe(false);
      expect(validateNIK('320123456789012 ')).toBe(false);
      expect(validateNIK('3201234-67890123')).toBe(false);
    });

    it('should reject NIK with invalid province code', () => {
      expect(validateNIK('9912345678901234')).toBe(false); // Invalid province
    });

    it('should reject NIK with invalid month', () => {
      expect(validateNIK('3201005678901234')).toBe(false); // Month 00
      expect(validateNIK('3201135678901234')).toBe(false); // Month 13
    });

    it('should reject NIK with invalid day', () => {
      expect(validateNIK('3201120088901234')).toBe(false); // Day 00
      expect(validateNIK('3201123288901234')).toBe(false); // Day 32
      expect(validateNIK('3201123288901234')).toBe(false); // Day 32
    });

    it('should reject NIK with invalid date', () => {
      expect(validateNIK('3201123188901234')).toBe(false); // Nov 31 (doesn't exist)
      expect(validateNIK('3201123088901234')).toBe(false); // Feb 30 (doesn't exist)
    });

    it('should reject NIK with future date', () => {
      // Assuming current year is 2024, year 99 would be 2099 (future)
      expect(validateNIK('3201129998901234')).toBe(false);
    });

    it('should reject NIK with date too old', () => {
      // Year 00 would be 1900, which is too old
      expect(validateNIK('3201120008901234')).toBe(false);
    });
  });
});
