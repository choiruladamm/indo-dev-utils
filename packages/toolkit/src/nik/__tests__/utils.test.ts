import { describe, it, expect } from 'vitest';
import {
  getAge,
  formatBirthDate,
  isValidForGender,
  isValidForBirthDate,
} from '../utils';

describe('NIK Utils', () => {
  const nikMale = '3201018901310123'; // 89 (year), 01 (month), 31 (day) -> 31-01-1989
  const nikFemale = '3201019501710456'; // 95 (year), 01 (month), 71 (day+40) -> 31-01-1995

  describe('getAge', () => {
    it('should calculate age correctly for male', () => {
      const refDate = new Date(2024, 0, 1);
      expect(getAge(nikMale, refDate)).toBe(34);
    });

    it('should calculate age correctly for female', () => {
      const refDate = new Date(2024, 0, 1);
      expect(getAge(nikFemale, refDate)).toBe(28);
    });

    it('should handle birthday reached', () => {
      const refDate = new Date(2024, 0, 31);
      expect(getAge(nikMale, refDate)).toBe(35);
    });

    it('should return null for invalid NIK', () => {
      expect(getAge('invalid')).toBeNull();
    });
  });

  describe('formatBirthDate', () => {
    it('should format birth date correctly with default options', () => {
      expect(formatBirthDate(nikMale)).toBe('31 Januari 1989');
    });

    it('should format birth date correctly with custom options', () => {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      expect(formatBirthDate(nikMale, options)).toBe('31/01/1989');
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
