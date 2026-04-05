/**
 * Integration tests for datetime module
 */

import { describe, it, expect } from 'vitest';
import {
  parseDate,
  formatDate,
  formatDateRange,
  toRelativeTime,
  getAge,
} from '../';

describe('DateTime Integration - Phase 1', () => {
  describe('parseDate with calc utilities', () => {
    it('validates leap year through parsing', () => {
      // Feb 29 in leap year should parse
      const leapDate = parseDate('29-02-2024');
      expect(leapDate).not.toBeNull();
      expect(leapDate!.getDate()).toBe(29);
      expect(leapDate!.getMonth()).toBe(1); // February (0-indexed)

      // Feb 29 in non-leap year should fail
      const nonLeapDate = parseDate('29-02-2023');
      expect(nonLeapDate).toBeNull();
    });

    it('validates month lengths through parsing', () => {
      // April has 30 days
      expect(parseDate('30-04-2026')).not.toBeNull();
      expect(parseDate('31-04-2026')).toBeNull();

      // May has 31 days
      expect(parseDate('31-05-2026')).not.toBeNull();
    });
  });

  describe('parseDate with isValidDate', () => {
    it('returns Date object that passes isValidDate', () => {
      const parsed = parseDate('15-06-2024');
      expect(parsed).not.toBeNull();
      expect(parsed instanceof Date).toBe(true);
      expect(!Number.isNaN(parsed!.getTime())).toBe(true);
    });
  });
});

describe('DateTime Integration - Phase 2', () => {
  describe('parseDate → formatDate round-trip', () => {
    it('round-trips Indonesian format dates', () => {
      const original = '15-06-2024';
      const parsed = parseDate(original);
      expect(parsed).not.toBeNull();

      // Format back to string (short style matches DD/MM/YYYY)
      const formatted = formatDate(parsed!, 'short');
      expect(formatted).toBe('15/06/2024');
    });

    it('round-trips leap year dates', () => {
      const original = '29-02-2024';
      const parsed = parseDate(original);
      expect(parsed).not.toBeNull();

      const formatted = formatDate(parsed!, 'long');
      expect(formatted).toBe('29 Februari 2024');
    });

    it('preserves date accuracy through round-trip', () => {
      const testCases = [
        '01-01-2026',
        '15-06-2024',
        '31-12-2025',
        '29-02-2024', // Leap year
      ];

      testCases.forEach((original) => {
        const parsed = parseDate(original);
        expect(parsed).not.toBeNull();

        // Parse the formatted short date back
        const formatted = formatDate(parsed!, 'short');
        const reparsed = parseDate(formatted.replace(/\//g, '-'));
        expect(reparsed).not.toBeNull();
        expect(reparsed!.getTime()).toBe(parsed!.getTime());
      });
    });
  });

  describe('formatDate with various inputs', () => {
    it('accepts Date from parseDate output', () => {
      const parsed = parseDate('25-12-2026');
      expect(parsed).not.toBeNull();

      expect(formatDate(parsed!, 'full')).toBe('Jumat, 25 Desember 2026');
      expect(formatDate(parsed!, 'long')).toBe('25 Desember 2026');
      expect(formatDate(parsed!, 'medium')).toBe('25 Des 2026');
      expect(formatDate(parsed!, 'short')).toBe('25/12/2026');
    });
  });

  describe('formatDateRange integration', () => {
    it('formats ranges from parsed dates', () => {
      const start = parseDate('01-01-2026');
      const end = parseDate('05-01-2026');

      expect(start).not.toBeNull();
      expect(end).not.toBeNull();

      expect(formatDateRange(start!, end!)).toBe('1 - 5 Januari 2026');
    });

    it('handles month boundaries with parsed dates', () => {
      const start = parseDate('30-01-2026');
      const end = parseDate('02-02-2026');

      expect(start).not.toBeNull();
      expect(end).not.toBeNull();

      expect(formatDateRange(start!, end!)).toBe(
        '30 Januari - 2 Februari 2026'
      );
    });
  });
});

describe('DateTime Integration - Phase 3', () => {
  describe('toRelativeTime with formatDate fallback', () => {
    it('falls back to formatDate for dates > 30 days ago', () => {
      const baseDate = new Date('2026-01-15');
      const oldDate = new Date('2025-12-01');

      const result = toRelativeTime(oldDate, baseDate);
      expect(result).toBe('1 Desember 2025');
    });

    it('falls back to formatDate for future dates > 30 days ahead', () => {
      const baseDate = new Date('2026-01-15');
      const futureDate = new Date('2026-02-20');

      const result = toRelativeTime(futureDate, baseDate);
      expect(result).toBe('20 Februari 2026');
    });
  });

  describe('getAge with parseDate', () => {
    it('calculates age from parsed birth date', () => {
      const birthDate = parseDate('15-06-1990');
      expect(birthDate).not.toBeNull();

      const age = getAge(birthDate!, { fromDate: new Date('2024-06-15') }) as {
        years: number;
        months: number;
        days: number;
      };
      expect(age.years).toBe(34);
      expect(age.months).toBe(0);
      expect(age.days).toBe(0);
    });

    it('calculates age with months and days from parsed date', () => {
      const birthDate = parseDate('15-06-1990');
      expect(birthDate).not.toBeNull();

      const age = getAge(birthDate!, {
        fromDate: new Date('2024-09-20'),
        asString: true,
      });
      expect(age).toBe('34 Tahun 3 Bulan 5 Hari');
    });
  });

  describe('getAge with leap year birthdays', () => {
    it('handles Feb 29 birthday in leap years', () => {
      const birthDate = parseDate('29-02-2020');
      expect(birthDate).not.toBeNull();

      // In 2024 (leap year), age should be exactly 4
      const age = getAge(birthDate!, {
        fromDate: new Date('2024-02-29'),
        asString: true,
      });
      expect(age).toBe('4 Tahun');
    });

    it('handles Feb 29 birthday in non-leap years', () => {
      const birthDate = parseDate('29-02-2020');
      expect(birthDate).not.toBeNull();

      // In 2023 (non-leap year), treat as Feb 28
      const age = getAge(birthDate!, {
        fromDate: new Date('2023-02-28'),
        asString: true,
      });
      expect(age).toBe('2 Tahun 11 Bulan 30 Hari');
    });
  });
});
