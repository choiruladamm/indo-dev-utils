/**
 * Tests for timezone utilities
 */

import { describe, it, expect } from 'vitest';
import { getIndonesianTimezone } from '../timezone';

describe('getIndonesianTimezone', () => {
  describe('IANA timezone names', () => {
    describe('WIB (UTC+7)', () => {
      it('returns WIB for Asia/Jakarta', () => {
        expect(getIndonesianTimezone('Asia/Jakarta')).toBe('WIB');
      });

      it('returns WIB for Asia/Pontianak', () => {
        expect(getIndonesianTimezone('Asia/Pontianak')).toBe('WIB');
      });
    });

    describe('WITA (UTC+8)', () => {
      it('returns WITA for Asia/Makassar', () => {
        expect(getIndonesianTimezone('Asia/Makassar')).toBe('WITA');
      });

      it('returns WITA for Asia/Denpasar', () => {
        expect(getIndonesianTimezone('Asia/Denpasar')).toBe('WITA');
      });

      it('returns WITA for Asia/Manado', () => {
        expect(getIndonesianTimezone('Asia/Manado')).toBe('WITA');
      });

      it('returns WITA for Asia/Palu', () => {
        expect(getIndonesianTimezone('Asia/Palu')).toBe('WITA');
      });
    });

    describe('WIT (UTC+9)', () => {
      it('returns WIT for Asia/Jayapura', () => {
        expect(getIndonesianTimezone('Asia/Jayapura')).toBe('WIT');
      });
    });

    describe('non-Indonesian timezones', () => {
      it('returns null for America/New_York', () => {
        expect(getIndonesianTimezone('America/New_York')).toBeNull();
      });

      it('returns null for Europe/London', () => {
        expect(getIndonesianTimezone('Europe/London')).toBeNull();
      });

      it('returns null for Asia/Tokyo', () => {
        expect(getIndonesianTimezone('Asia/Tokyo')).toBeNull();
      });

      it('returns null for UTC', () => {
        expect(getIndonesianTimezone('UTC')).toBeNull();
      });

      it('returns null for Etc/GMT', () => {
        expect(getIndonesianTimezone('Etc/GMT')).toBeNull();
      });
    });

    describe('case sensitivity', () => {
      it('is case-sensitive for timezone names', () => {
        expect(getIndonesianTimezone('asia/jakarta')).toBeNull();
        expect(getIndonesianTimezone('ASIA/JAKARTA')).toBeNull();
        expect(getIndonesianTimezone('Asia/jakarta')).toBeNull();
      });
    });
  });

  describe('numeric offset (hours)', () => {
    describe('valid Indonesian offsets', () => {
      it('returns WIB for 7', () => {
        expect(getIndonesianTimezone(7)).toBe('WIB');
      });

      it('returns WITA for 8', () => {
        expect(getIndonesianTimezone(8)).toBe('WITA');
      });

      it('returns WIT for 9', () => {
        expect(getIndonesianTimezone(9)).toBe('WIT');
      });
    });

    describe('non-Indonesian offsets', () => {
      it('returns null for 0 (UTC)', () => {
        expect(getIndonesianTimezone(0)).toBeNull();
      });

      it('returns null for negative offsets', () => {
        expect(getIndonesianTimezone(-5)).toBeNull();
        expect(getIndonesianTimezone(-8)).toBeNull();
      });

      it('returns null for other positive offsets', () => {
        expect(getIndonesianTimezone(1)).toBeNull();
        expect(getIndonesianTimezone(5)).toBeNull();
        expect(getIndonesianTimezone(6)).toBeNull();
        expect(getIndonesianTimezone(10)).toBeNull();
        expect(getIndonesianTimezone(12)).toBeNull();
      });
    });

    describe('invalid numeric inputs', () => {
      it('returns null for NaN', () => {
        expect(getIndonesianTimezone(NaN)).toBeNull();
      });

      it('returns null for Infinity', () => {
        expect(getIndonesianTimezone(Infinity)).toBeNull();
      });

      it('returns null for non-integer numbers', () => {
        expect(getIndonesianTimezone(7.5)).toBeNull();
        expect(getIndonesianTimezone(8.25)).toBeNull();
      });

      it('returns null for float offsets', () => {
        expect(getIndonesianTimezone(7.0)).toBe('WIB'); // 7.0 is integer
        expect(getIndonesianTimezone(7.0001)).toBeNull();
      });
    });
  });

  describe('offset strings', () => {
    describe('valid Indonesian offset strings', () => {
      it('returns WIB for +07:00', () => {
        expect(getIndonesianTimezone('+07:00')).toBe('WIB');
      });

      it('returns WIB for +0700', () => {
        expect(getIndonesianTimezone('+0700')).toBe('WIB');
      });

      it('returns WITA for +08:00', () => {
        expect(getIndonesianTimezone('+08:00')).toBe('WITA');
      });

      it('returns WITA for +0800', () => {
        expect(getIndonesianTimezone('+0800')).toBe('WITA');
      });

      it('returns WIT for +09:00', () => {
        expect(getIndonesianTimezone('+09:00')).toBe('WIT');
      });

      it('returns WIT for +0900', () => {
        expect(getIndonesianTimezone('+0900')).toBe('WIT');
      });
    });

    describe('negative offset strings', () => {
      it('returns null for -05:00', () => {
        expect(getIndonesianTimezone('-05:00')).toBeNull();
      });

      it('returns null for -0500', () => {
        expect(getIndonesianTimezone('-0500')).toBeNull();
      });

      it('returns null for -00:00', () => {
        expect(getIndonesianTimezone('-00:00')).toBeNull();
      });
    });

    describe('offset strings with minutes', () => {
      it('returns null for offsets with non-zero minutes', () => {
        expect(getIndonesianTimezone('+07:30')).toBeNull();
        expect(getIndonesianTimezone('+08:45')).toBeNull();
        expect(getIndonesianTimezone('+05:30')).toBeNull(); // India
      });

      it('accepts :00 minutes', () => {
        expect(getIndonesianTimezone('+07:00')).toBe('WIB');
        expect(getIndonesianTimezone('+08:00')).toBe('WITA');
      });
    });

    describe('invalid offset strings', () => {
      it('returns null for malformed strings', () => {
        expect(getIndonesianTimezone('07:00')).toBeNull(); // missing sign
        expect(getIndonesianTimezone('+7')).toBeNull(); // too short
        expect(getIndonesianTimezone('+070')).toBeNull(); // odd length
        expect(getIndonesianTimezone('+07000')).toBeNull(); // too long
      });

      it('returns null for empty string', () => {
        expect(getIndonesianTimezone('')).toBeNull();
      });

      it('returns null for whitespace', () => {
        expect(getIndonesianTimezone('   ')).toBeNull();
      });
    });
  });

  describe('whitespace handling', () => {
    it('trims whitespace from string inputs', () => {
      expect(getIndonesianTimezone('  Asia/Jakarta  ')).toBe('WIB');
      expect(getIndonesianTimezone('\tAsia/Makassar\n')).toBe('WITA');
      expect(getIndonesianTimezone('  +07:00  ')).toBe('WIB');
    });
  });

  describe('edge cases', () => {
    it('returns null for null input', () => {
      // @ts-expect-error Testing null input
      expect(getIndonesianTimezone(null)).toBeNull();
    });

    it('returns null for undefined input', () => {
      // @ts-expect-error Testing undefined input
      expect(getIndonesianTimezone(undefined)).toBeNull();
    });

    it('returns null for object input', () => {
      // @ts-expect-error Testing object input
      expect(getIndonesianTimezone({})).toBeNull();
    });

    it('returns null for array input', () => {
      // @ts-expect-error Testing array input
      expect(getIndonesianTimezone([])).toBeNull();
    });

    it('returns null for boolean input', () => {
      // @ts-expect-error Testing boolean input
      expect(getIndonesianTimezone(true)).toBeNull();
    });
  });
});
