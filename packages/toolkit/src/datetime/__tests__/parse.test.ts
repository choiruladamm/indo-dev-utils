/**
 * Tests for date parsing utilities
 */

import { describe, it, expect } from 'vitest';
import { parseDate } from '../parse';

describe('parseDate', () => {
  describe('Indonesian format (DD-MM-YYYY)', () => {
    it('parses dates with hyphen delimiter', () => {
      const result = parseDate('02-01-2026');
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2026);
      expect(result!.getMonth()).toBe(0); // January (0-indexed)
      expect(result!.getDate()).toBe(2);
    });

    it('parses dates with slash delimiter', () => {
      const result = parseDate('15/06/2024');
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2024);
      expect(result!.getMonth()).toBe(5); // June
      expect(result!.getDate()).toBe(15);
    });

    it('parses dates with dot delimiter', () => {
      const result = parseDate('31.12.2025');
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2025);
      expect(result!.getMonth()).toBe(11); // December
      expect(result!.getDate()).toBe(31);
    });

    it('handles single-digit day and month', () => {
      const result = parseDate('1-1-2026');
      expect(result).not.toBeNull();
      expect(result!.getDate()).toBe(1);
      expect(result!.getMonth()).toBe(0);
    });
  });

  describe('ISO format (YYYY-MM-DD) auto-detection', () => {
    it('parses ISO format when first segment > 31', () => {
      const result = parseDate('2026-01-02');
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2026);
      expect(result!.getMonth()).toBe(0);
      expect(result!.getDate()).toBe(2);
    });

    it('parses ISO format with slash delimiter', () => {
      const result = parseDate('2024/06/15');
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2024);
      expect(result!.getMonth()).toBe(5);
      expect(result!.getDate()).toBe(15);
    });
  });

  describe('Leap year validation', () => {
    it('accepts Feb 29 in leap years', () => {
      expect(parseDate('29-02-2024')).not.toBeNull();
      expect(parseDate('29-02-2020')).not.toBeNull();
      expect(parseDate('29-02-2000')).not.toBeNull();
    });

    it('rejects Feb 29 in non-leap years', () => {
      expect(parseDate('29-02-2023')).toBeNull();
      expect(parseDate('29-02-2025')).toBeNull();
      expect(parseDate('29-02-1900')).toBeNull();
    });

    it('accepts Feb 28 in all years', () => {
      expect(parseDate('28-02-2023')).not.toBeNull();
      expect(parseDate('28-02-2024')).not.toBeNull();
    });
  });

  describe('Month day validation', () => {
    it('rejects invalid days for months with 30 days', () => {
      expect(parseDate('31-04-2026')).toBeNull(); // April has 30 days
      expect(parseDate('31-06-2026')).toBeNull(); // June has 30 days
      expect(parseDate('31-09-2026')).toBeNull(); // September has 30 days
      expect(parseDate('31-11-2026')).toBeNull(); // November has 30 days
    });

    it('accepts valid days for months with 31 days', () => {
      expect(parseDate('31-01-2026')).not.toBeNull();
      expect(parseDate('31-03-2026')).not.toBeNull();
      expect(parseDate('31-05-2026')).not.toBeNull();
      expect(parseDate('31-07-2026')).not.toBeNull();
      expect(parseDate('31-08-2026')).not.toBeNull();
      expect(parseDate('31-10-2026')).not.toBeNull();
      expect(parseDate('31-12-2026')).not.toBeNull();
    });

    it('rejects day 0', () => {
      expect(parseDate('00-01-2026')).toBeNull();
    });

    it('rejects month 0', () => {
      expect(parseDate('01-00-2026')).toBeNull();
    });

    it('rejects month > 12', () => {
      expect(parseDate('01-13-2026')).toBeNull();
    });
  });

  describe('Invalid inputs', () => {
    it('rejects 2-digit years', () => {
      expect(parseDate('02-01-26')).toBeNull();
      expect(parseDate('02/01/99')).toBeNull();
    });

    it('rejects time components', () => {
      expect(parseDate('02-01-2026 14:30:00')).toBeNull();
      expect(parseDate('02-01-2026 14:30')).toBeNull();
      expect(parseDate('02-01-2026T14:30:00')).toBeNull();
    });

    it('rejects empty strings', () => {
      expect(parseDate('')).toBeNull();
      expect(parseDate('   ')).toBeNull();
    });

    it('rejects invalid formats', () => {
      expect(parseDate('invalid')).toBeNull();
      expect(parseDate('2026')).toBeNull();
      expect(parseDate('01-2026')).toBeNull();
      expect(parseDate('01-02-03-2026')).toBeNull();
    });

    it('rejects non-numeric segments', () => {
      expect(parseDate('aa-01-2026')).toBeNull();
      expect(parseDate('01-bb-2026')).toBeNull();
      expect(parseDate('01-01-cccc')).toBeNull();
    });

    it('rejects negative numbers', () => {
      expect(parseDate('-01-01-2026')).toBeNull();
      expect(parseDate('01--1-2026')).toBeNull();
    });

    it('rejects out-of-range years', () => {
      expect(parseDate('01-01-999')).toBeNull(); // 3-digit year
      expect(parseDate('01-01-10000')).toBeNull(); // 5-digit year
    });
  });

  describe('Edge cases', () => {
    it('handles whitespace trimming', () => {
      expect(parseDate('  02-01-2026  ')).not.toBeNull();
      expect(parseDate('\t15-06-2024\n')).not.toBeNull();
    });

    it('creates date at midnight (no time component)', () => {
      const result = parseDate('02-01-2026');
      expect(result!.getHours()).toBe(0);
      expect(result!.getMinutes()).toBe(0);
      expect(result!.getSeconds()).toBe(0);
      expect(result!.getMilliseconds()).toBe(0);
    });
  });
});
