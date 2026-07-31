import { describe, expect, it } from 'vitest';
import { parseCompact } from '../parse-compact';
import { formatCompact } from '../format';

describe('parseCompact', () => {
  describe('core shorthand', () => {
    it('parses "1,5jt" to 1500000', () => {
      expect(parseCompact('1,5jt')).toBe(1500000);
    });

    it('parses "2rb" to 2000', () => {
      expect(parseCompact('2rb')).toBe(2000);
    });

    it('parses "500k" to 500000', () => {
      expect(parseCompact('500k')).toBe(500000);
    });

    it('parses "3 miliar" to 3000000000', () => {
      expect(parseCompact('3 miliar')).toBe(3000000000);
    });

    it('parses "1M" to 1000000000', () => {
      expect(parseCompact('1M')).toBe(1000000000);
    });

    it('parses "2,5jt" (decimal with multiplier) to 2500000', () => {
      expect(parseCompact('2,5jt')).toBe(2500000);
    });

    it('parses "1.500.000jt" (thousands separator with multiplier) to 1500000000000', () => {
      expect(parseCompact('1.500.000jt')).toBe(1500000000000);
    });
  });

  describe('every canonical multiplier', () => {
    it('recognises "rb"', () => {
      expect(parseCompact('2rb')).toBe(2000);
    });

    it('recognises "ribu"', () => {
      expect(parseCompact('2ribu')).toBe(2000);
    });

    it('recognises "k"', () => {
      expect(parseCompact('5k')).toBe(5000);
    });

    it('recognises "jt"', () => {
      expect(parseCompact('1jt')).toBe(1_000_000);
    });

    it('recognises "juta"', () => {
      expect(parseCompact('1juta')).toBe(1_000_000);
    });

    it('recognises "M"', () => {
      expect(parseCompact('1M')).toBe(1_000_000_000);
    });

    it('recognises "miliar"', () => {
      expect(parseCompact('1miliar')).toBe(1_000_000_000);
    });

    it('recognises "milyar"', () => {
      expect(parseCompact('1milyar')).toBe(1_000_000_000);
    });

    it('recognises "T"', () => {
      expect(parseCompact('1T')).toBe(1_000_000_000_000);
    });

    it('recognises "triliun"', () => {
      expect(parseCompact('1triliun')).toBe(1_000_000_000_000);
    });
  });

  describe('case insensitivity and whitespace', () => {
    it('is case-insensitive (uppercase multiplier)', () => {
      expect(parseCompact('  1,5JT  ')).toBe(1500000);
    });

    it('is case-insensitive (lowercase multiplier)', () => {
      expect(parseCompact('1,5jt')).toBe(1500000);
    });

    it('is case-insensitive (mixed case)', () => {
      expect(parseCompact('2Rb')).toBe(2000);
      expect(parseCompact('500K')).toBe(500000);
      expect(parseCompact('3 MiLiAr')).toBe(3_000_000_000);
    });

    it('tolerates leading whitespace', () => {
      expect(parseCompact('   1,5jt')).toBe(1500000);
    });

    it('tolerates trailing whitespace', () => {
      expect(parseCompact('1,5jt   ')).toBe(1500000);
    });

    it('tolerates whitespace between number and multiplier', () => {
      expect(parseCompact('1,5 jt')).toBe(1500000);
      expect(parseCompact('3  miliar')).toBe(3_000_000_000);
    });
  });

  describe('invalid input returns NaN', () => {
    it('returns NaN for unknown multiplier', () => {
      expect(parseCompact('1xyz')).toBeNaN();
    });

    it('returns NaN for garbage text', () => {
      expect(parseCompact('abc')).toBeNaN();
    });

    it('returns NaN for bare number with dot (no multiplier)', () => {
      expect(parseCompact('1.5')).toBeNaN();
    });

    it('returns NaN for bare integer (no multiplier)', () => {
      expect(parseCompact('1500')).toBeNaN();
    });

    it('returns NaN for bare decimal (no multiplier)', () => {
      expect(parseCompact('1,5')).toBeNaN();
    });

    it('returns NaN for empty string', () => {
      expect(parseCompact('')).toBeNaN();
    });

    it('returns NaN for whitespace-only string', () => {
      expect(parseCompact('   ')).toBeNaN();
    });

    it('returns NaN for a number-only with thousands separator and no multiplier', () => {
      expect(parseCompact('1.500.000')).toBeNaN();
    });

    it('returns NaN when number part is empty', () => {
      expect(parseCompact('jt')).toBeNaN();
    });

    it('returns NaN for non-string input', () => {
      // @ts-expect-error: exercising runtime guard against misuse
      expect(parseCompact(null)).toBeNaN();
      // @ts-expect-error: exercising runtime guard against misuse
      expect(parseCompact(undefined)).toBeNaN();
      // @ts-expect-error: exercising runtime guard against misuse
      expect(parseCompact(123)).toBeNaN();
    });
  });

  describe('round-trip with formatCompact', () => {
    it('formatCompact(parseCompact("1,5jt")) represents 1500000', () => {
      const formatted = formatCompact(parseCompact('1,5jt'));
      // Strip the "Rp" symbol and any whitespace, then check the unit word.
      const stripped = formatted.replace(/^Rp\s*/, '').trim();
      // formatCompact(1500000) is "Rp 1,5 juta"; tolerate either form.
      expect(stripped === '1,5 juta' || stripped === '1,5jt').toBe(true);
    });

    it('formatCompact(parseCompact("2rb")) represents 2000', () => {
      // 2000 is below the 100_000 ribu threshold and below 1_000,
      // so formatCompact falls back to dot-grouped integer: "Rp 2.000".
      const formatted = formatCompact(parseCompact('2rb'));
      expect(formatted).toBe('Rp 2.000');
    });

    it('formatCompact(parseCompact("500k")) represents 500000', () => {
      // 500_000 -> "Rp 500 ribu"
      expect(formatCompact(parseCompact('500k'))).toBe('Rp 500 ribu');
    });

    it('formatCompact(parseCompact("3 miliar")) represents 3000000000', () => {
      // 3_000_000_000 -> "Rp 3 miliar"
      expect(formatCompact(parseCompact('3 miliar'))).toBe('Rp 3 miliar');
    });
  });
});
