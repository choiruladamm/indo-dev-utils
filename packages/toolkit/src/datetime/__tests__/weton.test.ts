/**
 * Tests for the Javanese market-day (weton) helper.
 */

import { describe, it, expect } from 'vitest';
import { getWeton } from '../weton';
import { InvalidDateError } from '../types';

const MS_PER_DAY = 86_400_000;

function utcDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month, day));
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

describe('getWeton', () => {
  describe('canonical vectors', () => {
    it('returns Jumat Legi neptu 11 for the anchor (8 July 1633 CE)', () => {
      expect(getWeton(utcDate(1633, 6, 8))).toEqual({
        weekday: 'Jumat',
        pasaran: 'Legi',
        neptu: 11,
      });
    });

    it('returns Jumat Legi neptu 11 for 17 August 1945 (cross-verified with beaudu/weton)', () => {
      // The PRD/SRS cite this as "Jumat Pahing" but the day-count-from-anchor
      // arithmetic, the academic Karjanto & Beauducel (2020) paper, and the
      // reference `beaudu/weton` Octave implementation all agree that
      // 17 Aug 1945 is the SAME weton as the anchor (both are Fridays exactly
      // 113 995 days apart = 35 * 3257 days), i.e. Jumat Legi.
      expect(getWeton(utcDate(1945, 7, 17))).toEqual({
        weekday: 'Jumat',
        pasaran: 'Legi',
        neptu: 11,
      });
    });

    it('returns Senin Pahing neptu 13 for 21 April 1879 (cross-verified with beaudu/weton)', () => {
      // The PRD/SRS cite this as "Senin Legi" but the academic paper and
      // the reference Octave implementation both compute Senin Pahing
      // for this date. We follow the verified algorithm.
      expect(getWeton(utcDate(1879, 3, 21))).toEqual({
        weekday: 'Senin',
        pasaran: 'Pahing',
        neptu: 13,
      });
    });

    it('returns Selasa Kliwon neptu 11 for 3 December 1968', () => {
      expect(getWeton(utcDate(1968, 11, 3))).toEqual({
        weekday: 'Selasa',
        pasaran: 'Kliwon',
        neptu: 11,
      });
    });

    it('returns Sabtu Pon neptu 16 for 27 May 2023', () => {
      expect(getWeton(utcDate(2023, 4, 27))).toEqual({
        weekday: 'Sabtu',
        pasaran: 'Pon',
        neptu: 16,
      });
    });

    it('returns Kamis Kliwon neptu 16 for 1 October 2020', () => {
      expect(getWeton(utcDate(2020, 9, 1))).toEqual({
        weekday: 'Kamis',
        pasaran: 'Kliwon',
        neptu: 16,
      });
    });
  });

  describe('cycle invariants', () => {
    it('produces all 35 unique weton across one full cycle from the anchor', () => {
      const seen = new Set<string>();
      for (let i = 0; i < 35; i++) {
        const w = getWeton(addDays(utcDate(1633, 6, 8), i));
        seen.add(`${w.weekday}|${w.pasaran}`);
      }
      expect(seen.size).toBe(35);
    });

    it('two dates exactly 35 days apart return the same weton (AC-3)', () => {
      const samples = [
        utcDate(1633, 6, 8),
        utcDate(1900, 0, 1),
        utcDate(1945, 7, 17),
        utcDate(2023, 4, 27),
        utcDate(2020, 9, 1),
      ];
      for (const d of samples) {
        expect(getWeton(addDays(d, 35))).toEqual(getWeton(d));
      }
    });

    it('combined neptu is always in [7, 18] for many sample dates (AC-5)', () => {
      for (let year = 1700; year < 2100; year += 7) {
        for (let month = 0; month < 12; month += 3) {
          const w = getWeton(utcDate(year, month, 14));
          expect(w.neptu).toBeGreaterThanOrEqual(7);
          expect(w.neptu).toBeLessThanOrEqual(18);
          expect(Number.isInteger(w.neptu)).toBe(true);
        }
      }
    });
  });

  describe('input validation', () => {
    it('throws InvalidDateError for an invalid Date', () => {
      expect(() => getWeton(new Date('not-a-date'))).toThrow(InvalidDateError);
    });

    it('throws InvalidDateError for pre-anchor dates', () => {
      expect(() => getWeton(utcDate(1633, 6, 7))).toThrow(InvalidDateError);
      expect(() => getWeton(utcDate(1000, 0, 1))).toThrow(InvalidDateError);
    });
  });
});
