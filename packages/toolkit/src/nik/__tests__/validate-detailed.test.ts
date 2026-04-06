import { describe, it, expect } from 'vitest';
import { validateNIKDetailed } from '../validate-detailed';

describe('validateNIKDetailed', () => {
  const validNIK = '3201018901310123';

  describe('valid NIK', () => {
    it('should return no errors for valid NIK', () => {
      const result = validateNIKDetailed(validNIK);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.nik).toBe(validNIK);
    });

    it('should clean and return valid NIK with separators', () => {
      const result = validateNIKDetailed('3201-01-89-01-31-0123');
      expect(result.isValid).toBe(true);
      expect(result.nik).toBe(validNIK);
    });

    it('should handle different valid NIK formats', () => {
      const formats = [
        '3201018901310123',
        '32-01-01-89-01-31-0123',
        '3201.01.89.01.31.0123',
        '3201 01 89 01 31 0123',
      ];

      formats.forEach((nik) => {
        const result = validateNIKDetailed(nik);
        expect(result.isValid).toBe(true);
        expect(result.nik).toBe('3201018901310123');
      });
    });
  });

  describe('INVALID_FORMAT', () => {
    it('should return INVALID_FORMAT for wrong length (too short)', () => {
      const result = validateNIKDetailed('1234');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_FORMAT');
      expect(result.errors[0].message).toBe('NIK must be exactly 16 digits');
      expect(result.nik).toBeNull();
    });

    it('should return INVALID_FORMAT for 15 digits', () => {
      const result = validateNIKDetailed('320101890131012');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_FORMAT');
    });

    it('should return INVALID_FORMAT for 17 digits', () => {
      const result = validateNIKDetailed('32010189013101234');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_FORMAT');
    });

    it('should return INVALID_FORMAT for empty string', () => {
      const result = validateNIKDetailed('');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_FORMAT');
    });

    it('should return INVALID_FORMAT for no digits', () => {
      const result = validateNIKDetailed('invalid');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_FORMAT');
    });

    it('should return INVALID_FORMAT for null', () => {
      const result = validateNIKDetailed(null as any);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_FORMAT');
    });
  });

  describe('INVALID_PROVINCE', () => {
    it('should return INVALID_PROVINCE for unknown code 99', () => {
      const result = validateNIKDetailed('9912345678901234');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_PROVINCE');
      expect(result.errors[0].message).toContain('99');
    });

    it('should return INVALID_PROVINCE for code 00', () => {
      const result = validateNIKDetailed('0012345678901234');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_PROVINCE');
    });
  });

  describe('INVALID_DATE', () => {
    it('should return INVALID_DATE for invalid date like Feb 30', () => {
      const result = validateNIKDetailed('3201019002300123');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_DATE');
    });

    it('should return INVALID_DATE for invalid month', () => {
      const result = validateNIKDetailed('3201019013010123');
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_DATE');
    });
  });

  describe('FUTURE_DATE', () => {
    it('should return FUTURE_DATE for future birth date', () => {
      const futureNIK = '3201012612310123';
      const result = validateNIKDetailed(futureNIK);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].code).toBe('FUTURE_DATE');
    });
  });

  describe('multiple errors', () => {
    it('should return error for completely invalid NIK', () => {
      const result = validateNIKDetailed('9999999999999999');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(1);
    });
  });
});
