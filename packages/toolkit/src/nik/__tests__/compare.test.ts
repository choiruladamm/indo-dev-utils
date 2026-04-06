import { describe, it, expect } from 'vitest';
import { compareNIK } from '../utils';

describe('compareNIK', () => {
  const validNIK = '3201018901310123';

  describe('identical NIKs', () => {
    it('should return true for identical NIKs', () => {
      expect(compareNIK(validNIK, validNIK)).toBe(true);
    });
  });

  describe('same person, different format', () => {
    it('should return true for same person with dash format', () => {
      expect(compareNIK(validNIK, '3201-01-89-01-31-0123')).toBe(true);
    });

    it('should return true for same person with dot format', () => {
      expect(compareNIK(validNIK, '3201.01.89.01.31.0123')).toBe(true);
    });

    it('should return true for same person with space format', () => {
      expect(compareNIK(validNIK, '3201 01 89 01 31 0123')).toBe(true);
    });

    it('should return true for same person with mixed format', () => {
      expect(compareNIK(validNIK, '3201-01.89-01-31-0123')).toBe(true);
    });
  });

  describe('different serial number', () => {
    it('should return false for different last digit', () => {
      expect(compareNIK(validNIK, '3201018901310124')).toBe(false);
    });

    it('should return false for completely different serial', () => {
      expect(compareNIK(validNIK, '3201018901319999')).toBe(false);
    });
  });

  describe('different birth date', () => {
    it('should return false for different year', () => {
      expect(compareNIK(validNIK, '3201019001310123')).toBe(false);
    });

    it('should return false for different month', () => {
      expect(compareNIK(validNIK, '3201028901310123')).toBe(false);
    });

    it('should return false for different day', () => {
      expect(compareNIK(validNIK, '3201018801310123')).toBe(false);
    });
  });

  describe('different gender', () => {
    it('should return false for different gender (same day, +40 offset)', () => {
      const maleNIK = '3201018901310123';
      const femaleNIK = '3201018901710123';
      expect(compareNIK(maleNIK, femaleNIK)).toBe(false);
    });
  });

  describe('different location', () => {
    it('should return false for different province', () => {
      expect(compareNIK(validNIK, '3101018901310123')).toBe(false);
    });

    it('should return false for different regency', () => {
      expect(compareNIK(validNIK, '3202018901310123')).toBe(false);
    });

    it('should return false for different district', () => {
      expect(compareNIK(validNIK, '3201028901310123')).toBe(false);
    });
  });

  describe('invalid inputs', () => {
    it('should return false for invalid first NIK', () => {
      expect(compareNIK('invalid', validNIK)).toBe(false);
    });

    it('should return false for invalid second NIK', () => {
      expect(compareNIK(validNIK, 'invalid')).toBe(false);
    });

    it('should return false for both invalid', () => {
      expect(compareNIK('invalid', 'invalid')).toBe(false);
    });

    it('should return false for empty strings', () => {
      expect(compareNIK('', '')).toBe(false);
    });

    it('should return false for null', () => {
      expect(compareNIK(null as any, validNIK)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(compareNIK(undefined as any, validNIK)).toBe(false);
    });

    it('should return false for too short NIK', () => {
      expect(compareNIK('1234', validNIK)).toBe(false);
    });
  });
});
