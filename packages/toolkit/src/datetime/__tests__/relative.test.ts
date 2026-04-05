/**
 * Tests for relative time formatting
 */

import { describe, it, expect } from 'vitest';
import { toRelativeTime } from '../relative';
import { InvalidDateError } from '../types';

describe('toRelativeTime', () => {
  // Fixed base date for testing: 2026-01-15 12:00:00
  const baseDate = new Date('2026-01-15T12:00:00');

  describe('exact match', () => {
    it('returns "Sekarang" when dates are identical', () => {
      const date = new Date('2026-01-15T12:00:00');
      expect(toRelativeTime(date, baseDate)).toBe('Sekarang');
    });

    it('returns "Sekarang" for same millisecond', () => {
      expect(toRelativeTime(baseDate, baseDate)).toBe('Sekarang');
    });
  });

  describe('past dates', () => {
    describe('less than 1 minute', () => {
      it('returns "Baru saja" for 59 seconds ago', () => {
        const date = new Date('2026-01-15T11:59:01');
        expect(toRelativeTime(date, baseDate)).toBe('Baru saja');
      });

      it('returns "Baru saja" for 1 second ago', () => {
        const date = new Date('2026-01-15T11:59:59');
        expect(toRelativeTime(date, baseDate)).toBe('Baru saja');
      });
    });

    describe('1-59 minutes', () => {
      it('returns "X menit yang lalu" for 1 minute ago', () => {
        const date = new Date('2026-01-15T11:59:00');
        expect(toRelativeTime(date, baseDate)).toBe('1 menit yang lalu');
      });

      it('returns "X menit yang lalu" for 59 minutes ago', () => {
        const date = new Date('2026-01-15T11:01:00');
        expect(toRelativeTime(date, baseDate)).toBe('59 menit yang lalu');
      });

      it('returns "X menit yang lalu" for 30 minutes ago', () => {
        const date = new Date('2026-01-15T11:30:00');
        expect(toRelativeTime(date, baseDate)).toBe('30 menit yang lalu');
      });
    });

    describe('1-23 hours', () => {
      it('returns "X jam yang lalu" for 1 hour ago', () => {
        const date = new Date('2026-01-15T11:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('1 jam yang lalu');
      });

      it('returns "X jam yang lalu" for 23 hours ago', () => {
        const date = new Date('2026-01-14T13:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('23 jam yang lalu');
      });

      it('returns "X jam yang lalu" for 12 hours ago', () => {
        const date = new Date('2026-01-15T00:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('12 jam yang lalu');
      });
    });

    describe('1 day (24-48 hours)', () => {
      it('returns "Kemarin" for exactly 24 hours ago', () => {
        const date = new Date('2026-01-14T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('Kemarin');
      });

      it('returns "Kemarin" for 36 hours ago', () => {
        const date = new Date('2026-01-13T23:59:00');
        expect(toRelativeTime(date, baseDate)).toBe('Kemarin');
      });
    });

    describe('2-30 days', () => {
      it('returns "X hari yang lalu" for 2 days ago', () => {
        const date = new Date('2026-01-13T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('2 hari yang lalu');
      });

      it('returns "X hari yang lalu" for 30 days ago', () => {
        const date = new Date('2025-12-16T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('30 hari yang lalu');
      });

      it('returns "X hari yang lalu" for 7 days ago', () => {
        const date = new Date('2026-01-08T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('7 hari yang lalu');
      });
    });

    describe('more than 30 days', () => {
      it('falls back to formatDate for 31 days ago', () => {
        const date = new Date('2025-12-15T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('15 Desember 2025');
      });

      it('falls back to formatDate for months ago', () => {
        const date = new Date('2025-06-15T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('15 Juni 2025');
      });
    });
  });

  describe('future dates', () => {
    describe('less than 1 minute', () => {
      it('returns "Baru saja" for 30 seconds from now', () => {
        const date = new Date('2026-01-15T12:00:30');
        expect(toRelativeTime(date, baseDate)).toBe('Baru saja');
      });
    });

    describe('1-59 minutes', () => {
      it('returns "X menit lagi" for 1 minute from now', () => {
        const date = new Date('2026-01-15T12:01:00');
        expect(toRelativeTime(date, baseDate)).toBe('1 menit lagi');
      });

      it('returns "X menit lagi" for 59 minutes from now', () => {
        const date = new Date('2026-01-15T12:59:00');
        expect(toRelativeTime(date, baseDate)).toBe('59 menit lagi');
      });
    });

    describe('1-23 hours', () => {
      it('returns "X jam lagi" for 1 hour from now', () => {
        const date = new Date('2026-01-15T13:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('1 jam lagi');
      });

      it('returns "X jam lagi" for 23 hours from now', () => {
        const date = new Date('2026-01-16T11:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('23 jam lagi');
      });
    });

    describe('1 day (24-48 hours)', () => {
      it('returns "Besok" for exactly 24 hours from now', () => {
        const date = new Date('2026-01-16T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('Besok');
      });

      it('returns "Besok" for 36 hours from now', () => {
        const date = new Date('2026-01-17T00:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('Besok');
      });
    });

    describe('2-30 days', () => {
      it('returns "X hari lagi" for 2 days from now', () => {
        const date = new Date('2026-01-17T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('2 hari lagi');
      });

      it('returns "X hari lagi" for 30 days from now', () => {
        const date = new Date('2026-02-14T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('30 hari lagi');
      });
    });

    describe('more than 30 days', () => {
      it('falls back to formatDate for 31 days from now', () => {
        const date = new Date('2026-02-15T12:00:00');
        expect(toRelativeTime(date, baseDate)).toBe('15 Februari 2026');
      });
    });
  });

  describe('input types', () => {
    it('accepts Date object', () => {
      const date = new Date('2026-01-15T11:00:00');
      expect(toRelativeTime(date, baseDate)).toBe('1 jam yang lalu');
    });

    it('accepts string date', () => {
      expect(toRelativeTime('2026-01-15T11:00:00', baseDate)).toBe(
        '1 jam yang lalu'
      );
    });

    it('accepts number timestamp', () => {
      const timestamp = new Date('2026-01-15T11:00:00').getTime();
      expect(toRelativeTime(timestamp, baseDate)).toBe('1 jam yang lalu');
    });
  });

  describe('default baseDate', () => {
    it('uses current date when baseDate not provided', () => {
      // Just verify it runs without error
      const result = toRelativeTime(new Date());
      expect(typeof result).toBe('string');
      expect(result).toBe('Sekarang');
    });
  });

  describe('error handling', () => {
    it('throws InvalidDateError for invalid date parameter', () => {
      expect(() => toRelativeTime('invalid', baseDate)).toThrow(
        InvalidDateError
      );
    });

    it('throws InvalidDateError for invalid baseDate parameter', () => {
      expect(() => toRelativeTime(baseDate, new Date('invalid'))).toThrow(
        InvalidDateError
      );
    });

    it('throws InvalidDateError for NaN date', () => {
      expect(() => toRelativeTime(NaN, baseDate)).toThrow(InvalidDateError);
    });
  });
});
