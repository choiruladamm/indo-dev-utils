import { describe, it, expect } from 'vitest';
import {
  getAge,
  formatBirthDate,
  isValidForGender,
  isValidForBirthDate,
} from '../utils';

describe('NIK Utils', () => {
  const nikMale = '3201018901310123';
  const nikFemale = '3201019501710456';

  describe('getAge', () => {
    it('should calculate age correctly for male', () => {
      const refDate = new Date(2024, 0, 1);
      const age = getAge(nikMale, { referenceDate: refDate });
      expect(age).toEqual({ years: 34, months: 11, days: 1 });
    });

    it('should calculate age correctly for female', () => {
      const refDate = new Date(2024, 0, 1);
      const age = getAge(nikFemale, { referenceDate: refDate });
      expect(age).toEqual({ years: 28, months: 11, days: 1 });
    });

    it('should handle birthday reached', () => {
      const refDate = new Date(2024, 0, 31);
      const age = getAge(nikMale, { referenceDate: refDate });
      expect(age).toEqual({ years: 35, months: 0, days: 0 });
    });

    it('should return null for invalid NIK', () => {
      expect(getAge('invalid')).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(getAge('')).toBeNull();
    });

    it('should return object by default (no asString)', () => {
      const refDate = new Date(2026, 3, 6);
      const age = getAge(nikMale, { referenceDate: refDate });
      expect(typeof age).toBe('object');
      expect(age).toHaveProperty('years');
      expect(age).toHaveProperty('months');
      expect(age).toHaveProperty('days');
    });

    describe('asString option', () => {
      it('should return formatted string when asString is true', () => {
        const refDate = new Date(2026, 3, 6);
        const age = getAge(nikMale, { referenceDate: refDate, asString: true });
        expect(typeof age).toBe('string');
        expect(age).toContain('Tahun');
        expect(age).toContain('Bulan');
        expect(age).toContain('Hari');
      });

      it('should omit zero components', () => {
        const refDate = new Date(2024, 0, 31);
        const age = getAge(nikMale, { referenceDate: refDate, asString: true });
        expect(age).toBe('35 Tahun');
      });

      it('should handle same day (0 years)', () => {
        const birthNIK = '3201262604260123';
        const refDate = new Date(2026, 3, 26);
        const age = getAge(birthNIK, {
          referenceDate: refDate,
          asString: true,
        });
        expect(age).toContain('0 Hari');
      });
    });

    describe('age calculation edge cases', () => {
      it('should handle month boundary correctly', () => {
        const nik = '3201010112240123';
        const refDate = new Date(2025, 1, 1);
        const age = getAge(nik, { referenceDate: refDate });
        expect(age).not.toBeNull();
        expect(age!.years).toBeGreaterThanOrEqual(0);
      });

      it('should handle day boundary correctly', () => {
        const refDate = new Date(2026, 3, 6);
        const age = getAge(nikMale, { referenceDate: refDate });
        expect(age).toEqual({ years: 37, months: 2, days: 6 });
      });

      it('should handle leap year birth date', () => {
        const leapYearNIK = '3201019602290123';
        const refDate = new Date(2026, 3, 6);
        const age = getAge(leapYearNIK, { referenceDate: refDate });
        expect(age).not.toBeNull();
        expect(age!.years).toBeGreaterThan(20);
      });
    });
  });

  describe('formatBirthDate', () => {
    it('should format birth date correctly', () => {
      expect(formatBirthDate(nikMale)).toBe('31 Januari 1989');
    });

    it('should format female birth date correctly', () => {
      expect(formatBirthDate(nikFemale)).toBe('31 Januari 1995');
    });

    it('should return null for invalid NIK', () => {
      expect(formatBirthDate('invalid')).toBeNull();
    });
  });

  describe('isValidForGender', () => {
    it('should return true for correct male gender', () => {
      expect(isValidForGender(nikMale, 'male')).toBe(true);
    });

    it('should return false for incorrect male gender', () => {
      expect(isValidForGender(nikMale, 'female')).toBe(false);
    });

    it('should return true for correct female gender', () => {
      expect(isValidForGender(nikFemale, 'female')).toBe(true);
    });

    it('should return false for incorrect female gender', () => {
      expect(isValidForGender(nikFemale, 'male')).toBe(false);
    });
  });

  describe('isValidForBirthDate', () => {
    it('should return true for correct birth date', () => {
      const birthDate = new Date(1989, 0, 31);
      expect(isValidForBirthDate(nikMale, birthDate)).toBe(true);
    });

    it('should return false for incorrect birth date', () => {
      const birthDate = new Date(1990, 0, 1);
      expect(isValidForBirthDate(nikMale, birthDate)).toBe(false);
    });
  });
});
