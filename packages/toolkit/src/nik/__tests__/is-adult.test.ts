import { describe, it, expect } from 'vitest';
import { isAdult } from '../utils';

describe('isAdult', () => {
  const validMaleNIK = '3201018901310123';

  describe('default minAge (17)', () => {
    it('should return true for adult male born 1989 (ref 2026-04-06, age 37)', () => {
      expect(isAdult(validMaleNIK)).toBe(true);
    });

    it('should return true for age exactly 17 with reference date', () => {
      const nik17 = '3201090109010123';
      expect(isAdult(nik17, 17)).toBe(true);
    });

    it('should return false for minor', () => {
      const minorNIK = '3210252604250123';
      expect(isAdult(minorNIK)).toBe(false);
    });
  });

  describe('custom minAge', () => {
    it('should return true for age 37 with minAge 21', () => {
      expect(isAdult(validMaleNIK, 21)).toBe(true);
    });

    it('should return false for age 37 with minAge 40', () => {
      expect(isAdult(validMaleNIK, 40)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return false for invalid NIK', () => {
      expect(isAdult('invalid')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isAdult('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isAdult(null as any)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isAdult(undefined as any)).toBe(false);
    });

    it('should return false for too short NIK', () => {
      expect(isAdult('1234')).toBe(false);
    });
  });
});
