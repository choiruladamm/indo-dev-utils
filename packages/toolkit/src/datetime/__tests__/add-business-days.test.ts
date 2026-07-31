/**
 * Tests for addBusinessDays.
 */

import { describe, it, expect } from 'vitest';
import { addBusinessDays, isWeekend } from '../calc';
import { InvalidDateError } from '../types';

function utc(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month, day));
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

describe('addBusinessDays', () => {
  it('count of 0 returns a new Date equal to the input (AC-9)', () => {
    const start = utc(2026, 0, 7);
    const out = addBusinessDays(start, 0);
    expect(ymd(out)).toBe(ymd(start));
    expect(out).not.toBe(start);
  });

  it('Friday + 1 working day = next Monday (AC-6)', () => {
    expect(ymd(addBusinessDays(utc(2026, 0, 9), 1))).toBe('2026-01-12');
  });

  it('Wednesday + 2 working days = Friday (AC-7, weekend not crossed)', () => {
    // Standard business-day semantics: Wed + 1 = Thu, + 2 = Fri.
    // The weekend is only skipped when the count *traverses* it,
    // e.g. Wed + 3 = Mon (Thu, Fri, then Sat->Sun snapped to Mon).
    expect(ymd(addBusinessDays(utc(2026, 0, 7), 2))).toBe('2026-01-09');
  });

  it('Wednesday + 3 working days snaps weekend forward to Monday', () => {
    expect(ymd(addBusinessDays(utc(2026, 0, 7), 3))).toBe('2026-01-12');
  });

  it('Monday - 1 working day = previous Friday (AC-8)', () => {
    expect(ymd(addBusinessDays(utc(2026, 0, 12), -1))).toBe('2026-01-09');
  });

  it('Monday - 5 working days', () => {
    // Mon Jan 12 - 5 calendar days = Wed Jan 7. Wed is a weekday, no snap.
    expect(ymd(addBusinessDays(utc(2026, 0, 12), -5))).toBe('2026-01-07');
  });

  it('forward traversal that crosses multiple weekends', () => {
    // Mon Jan 5 + 10 calendar days = Fri Jan 15. Fri is a weekday, no snap.
    expect(ymd(addBusinessDays(utc(2026, 0, 5), 10))).toBe('2026-01-15');
  });

  it('Saturday + 1 working day steps to next Monday (weekend start)', () => {
    // 2026-01-10 is a Saturday
    expect(ymd(addBusinessDays(utc(2026, 0, 10), 1))).toBe('2026-01-12');
  });

  it('Sunday + 1 working day steps to next Monday (weekend start)', () => {
    // 2026-01-11 is a Sunday
    expect(ymd(addBusinessDays(utc(2026, 0, 11), 1))).toBe('2026-01-12');
  });

  it('Saturday - 1 working day steps to previous Friday (weekend start)', () => {
    expect(ymd(addBusinessDays(utc(2026, 0, 10), -1))).toBe('2026-01-09');
  });

  it('result is never a weekend for any non-zero count (AC-10)', () => {
    const start = utc(2026, 0, 5);
    for (let c = -25; c <= 25; c++) {
      if (c === 0) continue;
      const out = addBusinessDays(start, c);
      expect(isWeekend(out)).toBe(false);
    }
  });

  it('throws InvalidDateError for an invalid Date', () => {
    expect(() => addBusinessDays(new Date('not-a-date'), 1)).toThrow(
      InvalidDateError
    );
  });
});
