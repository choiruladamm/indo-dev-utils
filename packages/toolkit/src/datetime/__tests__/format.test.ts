/**
 * Tests for date formatting utilities
 */

import { describe, it, expect } from 'vitest';
import { formatDate, formatDateRange } from '../format';
import { InvalidDateError, InvalidDateRangeError } from '../types';

describe('formatDate', () => {
  describe('style: full', () => {
    it('formats date with weekday', () => {
      expect(formatDate(new Date('2026-01-02'), 'full')).toBe(
        'Jumat, 2 Januari 2026'
      );
      expect(formatDate(new Date('2026-01-03'), 'full')).toBe(
        'Sabtu, 3 Januari 2026'
      );
      expect(formatDate(new Date('2026-01-04'), 'full')).toBe(
        'Minggu, 4 Januari 2026'
      );
    });

    it('handles all weekdays', () => {
      const dates = [
        { date: '2026-01-04', expected: 'Minggu, 4 Januari 2026' },
        { date: '2026-01-05', expected: 'Senin, 5 Januari 2026' },
        { date: '2026-01-06', expected: 'Selasa, 6 Januari 2026' },
        { date: '2026-01-07', expected: 'Rabu, 7 Januari 2026' },
        { date: '2026-01-08', expected: 'Kamis, 8 Januari 2026' },
        { date: '2026-01-09', expected: 'Jumat, 9 Januari 2026' },
        { date: '2026-01-10', expected: 'Sabtu, 10 Januari 2026' },
      ];

      dates.forEach(({ date, expected }) => {
        expect(formatDate(new Date(date), 'full')).toBe(expected);
      });
    });
  });

  describe('style: long (default)', () => {
    it('formats date without weekday', () => {
      expect(formatDate(new Date('2026-01-02'))).toBe('2 Januari 2026');
      expect(formatDate(new Date('2026-12-31'), 'long')).toBe(
        '31 Desember 2026'
      );
    });

    it('uses long as default', () => {
      expect(formatDate(new Date('2026-01-02'))).toBe('2 Januari 2026');
    });

    it('handles all months', () => {
      const months = [
        { date: '2026-01-15', expected: '15 Januari 2026' },
        { date: '2026-02-15', expected: '15 Februari 2026' },
        { date: '2026-03-15', expected: '15 Maret 2026' },
        { date: '2026-04-15', expected: '15 April 2026' },
        { date: '2026-05-15', expected: '15 Mei 2026' },
        { date: '2026-06-15', expected: '15 Juni 2026' },
        { date: '2026-07-15', expected: '15 Juli 2026' },
        { date: '2026-08-15', expected: '15 Agustus 2026' },
        { date: '2026-09-15', expected: '15 September 2026' },
        { date: '2026-10-15', expected: '15 Oktober 2026' },
        { date: '2026-11-15', expected: '15 November 2026' },
        { date: '2026-12-15', expected: '15 Desember 2026' },
      ];

      months.forEach(({ date, expected }) => {
        expect(formatDate(new Date(date), 'long')).toBe(expected);
      });
    });
  });

  describe('style: medium', () => {
    it('formats with short month name', () => {
      expect(formatDate(new Date('2026-01-02'), 'medium')).toBe('2 Jan 2026');
      expect(formatDate(new Date('2026-02-15'), 'medium')).toBe('15 Feb 2026');
      expect(formatDate(new Date('2026-12-31'), 'medium')).toBe('31 Des 2026');
    });
  });

  describe('style: short', () => {
    it('formats as DD/MM/YYYY', () => {
      expect(formatDate(new Date('2026-01-02'), 'short')).toBe('02/01/2026');
      expect(formatDate(new Date('2026-12-31'), 'short')).toBe('31/12/2026');
    });

    it('pads single-digit day and month', () => {
      expect(formatDate(new Date('2026-01-01'), 'short')).toBe('01/01/2026');
      expect(formatDate(new Date('2026-09-05'), 'short')).toBe('05/09/2026');
    });
  });

  describe('style: weekday', () => {
    it('returns only day name', () => {
      expect(formatDate(new Date('2026-01-02'), 'weekday')).toBe('Jumat');
      expect(formatDate(new Date('2026-01-03'), 'weekday')).toBe('Sabtu');
      expect(formatDate(new Date('2026-01-04'), 'weekday')).toBe('Minggu');
    });

    it('does not include "Hari" prefix', () => {
      const result = formatDate(new Date('2026-01-05'), 'weekday');
      expect(result).toBe('Senin');
      expect(result).not.toContain('Hari');
    });
  });

  describe('style: month', () => {
    it('returns only month name', () => {
      expect(formatDate(new Date('2026-01-02'), 'month')).toBe('Januari');
      expect(formatDate(new Date('2026-02-15'), 'month')).toBe('Februari');
      expect(formatDate(new Date('2026-12-31'), 'month')).toBe('Desember');
    });
  });

  describe('input types', () => {
    it('accepts Date object', () => {
      expect(formatDate(new Date('2026-01-02'))).toBe('2 Januari 2026');
    });

    it('accepts string date', () => {
      expect(formatDate('2026-01-02')).toBe('2 Januari 2026');
    });

    it('accepts number timestamp (milliseconds)', () => {
      const timestamp = new Date('2026-01-02').getTime();
      expect(formatDate(timestamp)).toBe('2 Januari 2026');
    });
  });

  describe('error handling', () => {
    it('throws InvalidDateError for invalid Date object', () => {
      expect(() => formatDate(new Date('invalid'))).toThrow(InvalidDateError);
    });

    it('throws InvalidDateError for invalid string', () => {
      expect(() => formatDate('not a date')).toThrow(InvalidDateError);
    });

    it('throws InvalidDateError for invalid number', () => {
      expect(() => formatDate(NaN)).toThrow(InvalidDateError);
    });

    it('throws InvalidDateError for unknown style', () => {
      // @ts-expect-error Testing unknown style
      expect(() => formatDate(new Date(), 'unknown')).toThrow(InvalidDateError);
    });
  });
});

describe('formatDateRange', () => {
  describe('same day', () => {
    it('returns single date when start and end are same', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-02');
      expect(formatDateRange(start, end)).toBe('2 Januari 2026');
    });

    it('handles same day with different times', () => {
      const start = new Date('2026-01-02T09:00:00');
      const end = new Date('2026-01-02T17:00:00');
      expect(formatDateRange(start, end)).toBe('2 Januari 2026');
    });
  });

  describe('same month and year', () => {
    it('omits redundant month and year', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-05');
      expect(formatDateRange(start, end)).toBe('2 - 5 Januari 2026');
    });

    it('handles medium style', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-05');
      expect(formatDateRange(start, end, 'medium')).toBe('2 - 5 Jan 2026');
    });
  });

  describe('same year, different month', () => {
    it('omits year from start date', () => {
      const start = new Date('2026-01-30');
      const end = new Date('2026-02-02');
      expect(formatDateRange(start, end)).toBe('30 Januari - 2 Februari 2026');
    });

    it('handles month boundary', () => {
      const start = new Date('2026-04-30');
      const end = new Date('2026-05-01');
      expect(formatDateRange(start, end)).toBe('30 April - 1 Mei 2026');
    });

    it('handles medium style', () => {
      const start = new Date('2026-01-30');
      const end = new Date('2026-02-02');
      expect(formatDateRange(start, end, 'medium')).toBe('30 Jan - 2 Feb 2026');
    });
  });

  describe('different year', () => {
    it('shows full format for both dates', () => {
      const start = new Date('2025-12-30');
      const end = new Date('2026-01-02');
      expect(formatDateRange(start, end)).toBe(
        '30 Desember 2025 - 2 Januari 2026'
      );
    });

    it('handles year boundary', () => {
      const start = new Date('2025-12-31');
      const end = new Date('2026-01-01');
      expect(formatDateRange(start, end)).toBe(
        '31 Desember 2025 - 1 Januari 2026'
      );
    });
  });

  describe('style: full', () => {
    it('shows full weekday for both dates', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-05');
      expect(formatDateRange(start, end, 'full')).toBe(
        'Jumat, 2 Januari 2026 - Senin, 5 Januari 2026'
      );
    });

    it('includes weekday even for same day', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-02');
      expect(formatDateRange(start, end, 'full')).toBe(
        'Jumat, 2 Januari 2026 - Jumat, 2 Januari 2026'
      );
    });
  });

  describe('style: short', () => {
    it('always shows full format, no redundancy removal', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-05');
      expect(formatDateRange(start, end, 'short')).toBe(
        '02/01/2026 - 05/01/2026'
      );
    });

    it('shows both dates fully even for same day', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-02');
      expect(formatDateRange(start, end, 'short')).toBe(
        '02/01/2026 - 02/01/2026'
      );
    });

    it('handles different years', () => {
      const start = new Date('2025-12-30');
      const end = new Date('2026-01-02');
      expect(formatDateRange(start, end, 'short')).toBe(
        '30/12/2025 - 02/01/2026'
      );
    });
  });

  describe('error handling', () => {
    it('throws InvalidDateRangeError when end < start', () => {
      const start = new Date('2026-01-05');
      const end = new Date('2026-01-02');
      expect(() => formatDateRange(start, end)).toThrow(InvalidDateRangeError);
    });

    it('throws InvalidDateError for invalid start date', () => {
      expect(() =>
        formatDateRange(new Date('invalid'), new Date('2026-01-02'))
      ).toThrow(InvalidDateError);
    });

    it('throws InvalidDateError for invalid end date', () => {
      expect(() =>
        formatDateRange(new Date('2026-01-02'), new Date('invalid'))
      ).toThrow(InvalidDateError);
    });

    it('accepts end date equal to start date', () => {
      const start = new Date('2026-01-02');
      const end = new Date('2026-01-02');
      expect(() => formatDateRange(start, end)).not.toThrow();
    });
  });

  describe('leap year edge cases', () => {
    it('handles February 29 in leap year', () => {
      const start = new Date('2024-02-29');
      const end = new Date('2024-03-01');
      expect(formatDateRange(start, end)).toBe('29 Februari - 1 Maret 2024');
    });

    it('handles year with leap day in range', () => {
      const start = new Date('2024-02-28');
      const end = new Date('2024-03-01');
      expect(formatDateRange(start, end)).toBe('28 Februari - 1 Maret 2024');
    });
  });
});
