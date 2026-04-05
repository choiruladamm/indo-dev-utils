/**
 * Tests for datetime calculation utilities
 */

import { describe, it, expect } from 'vitest';
import {
  isLeapYear,
  daysInMonth,
  isValidDate,
  isWeekend,
  isWorkingDay,
  getAge,
} from '../calc';
import { InvalidDateError } from '../types';

describe('isLeapYear', () => {
  it('returns true for typical leap years', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2020)).toBe(true);
    expect(isLeapYear(2004)).toBe(true);
    expect(isLeapYear(2000)).toBe(true);
  });

  it('returns false for non-leap years', () => {
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2025)).toBe(false);
    expect(isLeapYear(2019)).toBe(false);
  });

  it('returns false for years divisible by 100 but not 400', () => {
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2100)).toBe(false);
    expect(isLeapYear(1800)).toBe(false);
  });

  it('returns false for invalid inputs', () => {
    expect(isLeapYear(NaN)).toBe(false);
    expect(isLeapYear(Infinity)).toBe(false);
    expect(isLeapYear(-Infinity)).toBe(false);
    expect(isLeapYear(2024.5)).toBe(false); // Non-integer
    expect(isLeapYear(-2024)).toBe(true); // Negative year still valid
  });
});

describe('daysInMonth', () => {
  it('returns 31 for months with 31 days', () => {
    expect(daysInMonth(1, 2026)).toBe(31); // January
    expect(daysInMonth(3, 2026)).toBe(31); // March
    expect(daysInMonth(5, 2026)).toBe(31); // May
    expect(daysInMonth(7, 2026)).toBe(31); // July
    expect(daysInMonth(8, 2026)).toBe(31); // August
    expect(daysInMonth(10, 2026)).toBe(31); // October
    expect(daysInMonth(12, 2026)).toBe(31); // December
  });

  it('returns 30 for months with 30 days', () => {
    expect(daysInMonth(4, 2026)).toBe(30); // April
    expect(daysInMonth(6, 2026)).toBe(30); // June
    expect(daysInMonth(9, 2026)).toBe(30); // September
    expect(daysInMonth(11, 2026)).toBe(30); // November
  });

  it('returns 28 for February in non-leap years', () => {
    expect(daysInMonth(2, 2023)).toBe(28);
    expect(daysInMonth(2, 2025)).toBe(28);
    expect(daysInMonth(2, 1900)).toBe(28);
  });

  it('returns 29 for February in leap years', () => {
    expect(daysInMonth(2, 2024)).toBe(29);
    expect(daysInMonth(2, 2020)).toBe(29);
    expect(daysInMonth(2, 2000)).toBe(29);
  });

  it('returns 0 for invalid months', () => {
    expect(daysInMonth(0, 2026)).toBe(0);
    expect(daysInMonth(13, 2026)).toBe(0);
    expect(daysInMonth(-1, 2026)).toBe(0);
  });

  it('returns 0 for invalid years', () => {
    expect(daysInMonth(1, NaN)).toBe(0);
    expect(daysInMonth(1, Infinity)).toBe(0);
    expect(daysInMonth(1, 2024.5)).toBe(0); // Non-integer year
  });
});

describe('isValidDate', () => {
  it('returns true for valid Date objects', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date('2026-01-01'))).toBe(true);
    expect(isValidDate(new Date(0))).toBe(true);
    expect(isValidDate(new Date(1704067200000))).toBe(true);
  });

  it('returns false for invalid Date objects', () => {
    expect(isValidDate(new Date('invalid'))).toBe(false);
    expect(isValidDate(new Date(NaN))).toBe(false);
    expect(isValidDate(new Date(''))).toBe(false);
  });

  it('returns false for non-Date values', () => {
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate('2024-01-01')).toBe(false);
    expect(isValidDate(1704067200000)).toBe(false);
    expect(isValidDate({})).toBe(false);
    expect(isValidDate([])).toBe(false);
    expect(isValidDate(true)).toBe(false);
  });
});

describe('isWeekend', () => {
  it('returns true for Saturday', () => {
    expect(isWeekend(new Date('2026-01-03'))).toBe(true);
    expect(isWeekend(new Date('2026-01-10'))).toBe(true);
  });

  it('returns true for Sunday', () => {
    expect(isWeekend(new Date('2026-01-04'))).toBe(true);
    expect(isWeekend(new Date('2026-01-11'))).toBe(true);
  });

  it('returns false for weekdays', () => {
    expect(isWeekend(new Date('2026-01-05'))).toBe(false); // Monday
    expect(isWeekend(new Date('2026-01-06'))).toBe(false); // Tuesday
    expect(isWeekend(new Date('2026-01-07'))).toBe(false); // Wednesday
    expect(isWeekend(new Date('2026-01-08'))).toBe(false); // Thursday
    expect(isWeekend(new Date('2026-01-09'))).toBe(false); // Friday
  });
});

describe('isWorkingDay', () => {
  it('returns true for Monday-Friday', () => {
    expect(isWorkingDay(new Date('2026-01-05'))).toBe(true); // Monday
    expect(isWorkingDay(new Date('2026-01-06'))).toBe(true); // Tuesday
    expect(isWorkingDay(new Date('2026-01-07'))).toBe(true); // Wednesday
    expect(isWorkingDay(new Date('2026-01-08'))).toBe(true); // Thursday
    expect(isWorkingDay(new Date('2026-01-09'))).toBe(true); // Friday
  });

  it('returns false for Saturday', () => {
    expect(isWorkingDay(new Date('2026-01-03'))).toBe(false);
  });

  it('returns false for Sunday', () => {
    expect(isWorkingDay(new Date('2026-01-04'))).toBe(false);
  });
});

describe('getAge', () => {
  describe('as object (default)', () => {
    it('calculates exact birthday', () => {
      const birthDate = new Date('1990-06-15');
      const fromDate = new Date('2024-06-15');
      const age = getAge(birthDate, { fromDate }) as {
        years: number;
        months: number;
        days: number;
      };

      expect(age.years).toBe(34);
      expect(age.months).toBe(0);
      expect(age.days).toBe(0);
    });

    it('calculates age with months and days', () => {
      const birthDate = new Date('1990-06-15');
      const fromDate = new Date('2024-09-20');
      const age = getAge(birthDate, { fromDate }) as {
        years: number;
        months: number;
        days: number;
      };

      expect(age.years).toBe(34);
      expect(age.months).toBe(3);
      expect(age.days).toBe(5);
    });

    it('handles leap year birthdays', () => {
      const birthDate = new Date('2020-02-29');
      const fromDate = new Date('2024-02-29');
      const age = getAge(birthDate, { fromDate }) as {
        years: number;
        months: number;
        days: number;
      };

      expect(age.years).toBe(4);
      expect(age.months).toBe(0);
      expect(age.days).toBe(0);
    });

    it('handles birth date at year boundary', () => {
      const birthDate = new Date('2023-12-31');
      const fromDate = new Date('2024-01-01');
      const age = getAge(birthDate, { fromDate }) as {
        years: number;
        months: number;
        days: number;
      };

      expect(age.years).toBe(0);
      expect(age.months).toBe(0);
      expect(age.days).toBe(1);
    });

    it('handles month boundary correctly', () => {
      const birthDate = new Date('2024-01-31');
      const fromDate = new Date('2024-02-28');
      const age = getAge(birthDate, { fromDate }) as {
        years: number;
        months: number;
        days: number;
      };

      expect(age.years).toBe(0);
      expect(age.months).toBe(0);
      expect(age.days).toBe(28);
    });
  });

  describe('as string', () => {
    it('formats full age string', () => {
      const birthDate = new Date('1990-06-15');
      const fromDate = new Date('2024-09-20');
      const age = getAge(birthDate, { fromDate, asString: true });

      expect(age).toBe('34 Tahun 3 Bulan 5 Hari');
    });

    it('omits zero years', () => {
      const birthDate = new Date('2024-01-15');
      const fromDate = new Date('2024-06-20');
      const age = getAge(birthDate, { fromDate, asString: true });

      expect(age).toBe('5 Bulan 5 Hari');
    });

    it('omits zero years and months', () => {
      const birthDate = new Date('2024-01-01');
      const fromDate = new Date('2024-01-15');
      const age = getAge(birthDate, { fromDate, asString: true });

      expect(age).toBe('14 Hari');
    });

    it('handles same day as 0 Hari', () => {
      const birthDate = new Date('2024-01-15');
      const fromDate = new Date('2024-01-15');
      const age = getAge(birthDate, { fromDate, asString: true });

      expect(age).toBe('0 Hari');
    });
  });

  describe('input types', () => {
    it('accepts Date object', () => {
      const age = getAge(new Date('1990-06-15'), {
        fromDate: new Date('2024-06-15'),
      }) as { years: number };
      expect(age.years).toBe(34);
    });

    it('accepts string date', () => {
      const age = getAge('1990-06-15', { fromDate: '2024-06-15' }) as {
        years: number;
      };
      expect(age.years).toBe(34);
    });

    it('accepts number timestamp', () => {
      const birthTimestamp = new Date('1990-06-15').getTime();
      const fromTimestamp = new Date('2024-06-15').getTime();
      const age = getAge(birthTimestamp, { fromDate: fromTimestamp }) as {
        years: number;
      };
      expect(age.years).toBe(34);
    });
  });

  describe('default fromDate', () => {
    it('uses current date when fromDate not provided', () => {
      const today = new Date();
      const birthDate = new Date(
        today.getFullYear() - 10,
        today.getMonth(),
        today.getDate()
      );
      const age = getAge(birthDate) as { years: number };

      expect(age.years).toBe(10);
    });
  });

  describe('error handling', () => {
    it('throws InvalidDateError when birth date is in the future', () => {
      const birthDate = new Date('2030-01-01');
      const fromDate = new Date('2024-01-01');
      expect(() => getAge(birthDate, { fromDate })).toThrow(InvalidDateError);
    });

    it('throws InvalidDateError for invalid birthDate', () => {
      expect(() => getAge('invalid', { fromDate: new Date() })).toThrow(
        InvalidDateError
      );
    });

    it('throws InvalidDateError for invalid fromDate', () => {
      expect(() => getAge(new Date(), { fromDate: 'invalid' })).toThrow(
        InvalidDateError
      );
    });
  });
});
