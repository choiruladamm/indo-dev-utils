/**
 * Test suite for Currency module
 *
 * TDD Approach: Write tests first, then implement functions
 *
 * @module currency/__tests__
 */

import { describe, expect, it } from 'vitest';
import {
  formatCompact,
  formatRupiah,
  parseRupiah,
  roundToClean,
  toWords,
} from '../index';

// =============================================================================
// 1. formatRupiah() - Basic currency formatting
// =============================================================================

describe('formatRupiah', () => {
  describe('basic formatting', () => {
    it('should format 1500000 to "Rp 1.500.000"', () => {
      expect(formatRupiah(1500000)).toBe('Rp 1.500.000');
    });

    it('should format 0 to "Rp 0"', () => {
      expect(formatRupiah(0)).toBe('Rp 0');
    });

    it('should format 1000 to "Rp 1.000"', () => {
      expect(formatRupiah(1000)).toBe('Rp 1.000');
    });

    it('should format 999 to "Rp 999"', () => {
      expect(formatRupiah(999)).toBe('Rp 999');
    });

    it('should format large numbers correctly', () => {
      expect(formatRupiah(1234567890)).toBe('Rp 1.234.567.890');
    });

    it('should handle negative numbers', () => {
      expect(formatRupiah(-1500000)).toBe('Rp -1.500.000');
    });
  });

  describe('with options', () => {
    it('should format without symbol when symbol: false', () => {
      expect(formatRupiah(1500000, { symbol: false })).toBe('1.500.000');
    });

    it('should format without space after symbol when spaceAfterSymbol: false', () => {
      expect(formatRupiah(1500000, { spaceAfterSymbol: false })).toBe(
        'Rp1.500.000'
      );
    });

    it('should use custom separator', () => {
      expect(formatRupiah(1500000, { separator: ',' })).toBe('Rp 1,500,000');
    });

    it('should use space as separator', () => {
      expect(formatRupiah(1500000, { separator: ' ' })).toBe('Rp 1 500 000');
    });

    it('should combine multiple options', () => {
      expect(
        formatRupiah(1500000, {
          symbol: false,
          separator: ',',
        })
      ).toBe('1,500,000');
    });
  });

  describe('with decimals', () => {
    it('should format decimals when decimal: true', () => {
      expect(formatRupiah(1500000.5, { decimal: true })).toBe(
        'Rp 1.500.000,50'
      );
    });

    it('should respect precision option', () => {
      expect(formatRupiah(1500000.5, { decimal: true, precision: 2 })).toBe(
        'Rp 1.500.000,50'
      );
    });

    it('should round decimals based on precision', () => {
      expect(formatRupiah(1500000.556, { decimal: true, precision: 2 })).toBe(
        'Rp 1.500.000,56'
      );
    });

    it('should use custom decimal separator', () => {
      expect(
        formatRupiah(1500000.5, {
          decimal: true,
          decimalSeparator: '.',
          separator: ',',
        })
      ).toBe('Rp 1,500,000.50');
    });

    it('should not show decimals when decimal: false (default)', () => {
      expect(formatRupiah(1500000.99)).toBe('Rp 1.500.000');
    });

    it('should handle precision 0', () => {
      expect(formatRupiah(1500000.99, { decimal: true, precision: 0 })).toBe(
        'Rp 1.500.001'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle very small numbers', () => {
      expect(formatRupiah(1)).toBe('Rp 1');
    });

    it('should handle very large numbers', () => {
      expect(formatRupiah(999999999999)).toBe('Rp 999.999.999.999');
    });

    it('should handle decimal-only numbers', () => {
      expect(formatRupiah(0.99, { decimal: true, precision: 2 })).toBe(
        'Rp 0,99'
      );
    });
  });
});

// =============================================================================
// 2. formatCompact() - Compact format (1,5 juta)
// =============================================================================

describe('formatCompact', () => {
  describe('basic compact formatting', () => {
    it('should format 1500000 to "Rp 1,5 juta"', () => {
      expect(formatCompact(1500000)).toBe('Rp 1,5 juta');
    });

    it('should format 1000000 to "Rp 1 juta"', () => {
      expect(formatCompact(1000000)).toBe('Rp 1 juta');
    });

    it('should format 2000000 to "Rp 2 juta"', () => {
      expect(formatCompact(2000000)).toBe('Rp 2 juta');
    });

    it('should format 500000 to "Rp 500 ribu"', () => {
      expect(formatCompact(500000)).toBe('Rp 500 ribu');
    });

    it('should format 150000 to "Rp 150 ribu"', () => {
      expect(formatCompact(150000)).toBe('Rp 150 ribu');
    });

    it('should format 1500 to "Rp 1.500"', () => {
      expect(formatCompact(1500)).toBe('Rp 1.500');
    });

    it('should format 999 to "Rp 999"', () => {
      expect(formatCompact(999)).toBe('Rp 999');
    });
  });

  describe('grammar rules', () => {
    it('should NOT show "1,0 juta" (bad grammar)', () => {
      expect(formatCompact(1000000)).not.toBe('Rp 1,0 juta');
      expect(formatCompact(1000000)).toBe('Rp 1 juta');
    });

    it('should handle 1,1 juta correctly', () => {
      expect(formatCompact(1100000)).toBe('Rp 1,1 juta');
    });

    it('should handle 2,5 juta correctly', () => {
      expect(formatCompact(2500000)).toBe('Rp 2,5 juta');
    });

    it('should format 100 ribu without decimal', () => {
      expect(formatCompact(100000)).toBe('Rp 100 ribu');
    });

    it('should format 150 ribu without decimal', () => {
      expect(formatCompact(150000)).toBe('Rp 150 ribu');
    });
  });

  describe('large numbers', () => {
    it('should format billions (miliar)', () => {
      expect(formatCompact(1000000000)).toBe('Rp 1 miliar');
    });

    it('should format 1,5 miliar', () => {
      expect(formatCompact(1500000000)).toBe('Rp 1,5 miliar');
    });

    it('should format trillions (triliun)', () => {
      expect(formatCompact(1000000000000)).toBe('Rp 1 triliun');
    });
  });

  describe('edge cases', () => {
    it('should handle 0', () => {
      expect(formatCompact(0)).toBe('Rp 0');
    });

    it('should handle negative numbers', () => {
      expect(formatCompact(-1500000)).toBe('Rp -1,5 juta');
    });

    it('should handle numbers less than 1000', () => {
      expect(formatCompact(500)).toBe('Rp 500');
    });
  });
});

// =============================================================================
// 3. parseRupiah() - Parse formatted string back to number
// =============================================================================

describe('parseRupiah', () => {
  describe('basic parsing', () => {
    it('should parse "Rp 1.500.000" to 1500000', () => {
      expect(parseRupiah('Rp 1.500.000')).toBe(1500000);
    });

    it('should parse "1.500.000" to 1500000', () => {
      expect(parseRupiah('1.500.000')).toBe(1500000);
    });

    it('should parse "Rp1.500.000" (no space) to 1500000', () => {
      expect(parseRupiah('Rp1.500.000')).toBe(1500000);
    });

    it('should parse "1500000" (no separator) to 1500000', () => {
      expect(parseRupiah('1500000')).toBe(1500000);
    });
  });

  describe('with decimals', () => {
    it('should parse "Rp 1.500.000,50" to 1500000.50', () => {
      expect(parseRupiah('Rp 1.500.000,50')).toBe(1500000.5);
    });

    it('should parse "1.500.000,99" to 1500000.99', () => {
      expect(parseRupiah('1.500.000,99')).toBe(1500000.99);
    });

    it('should handle different decimal separator', () => {
      expect(parseRupiah('Rp 1,500,000.50')).toBe(1500000.5);
    });
  });

  describe('compact format', () => {
    it('should parse "Rp 1,5 juta" to 1500000', () => {
      expect(parseRupiah('Rp 1,5 juta')).toBe(1500000);
    });

    it('should parse "Rp 2 juta" to 2000000', () => {
      expect(parseRupiah('Rp 2 juta')).toBe(2000000);
    });

    it('should parse "Rp 500 ribu" to 500000', () => {
      expect(parseRupiah('Rp 500 ribu')).toBe(500000);
    });

    it('should parse "Rp 1 miliar" to 1000000000', () => {
      expect(parseRupiah('Rp 1 miliar')).toBe(1000000000);
    });

    it('should parse "Rp 1,5 miliar" to 1500000000', () => {
      expect(parseRupiah('Rp 1,5 miliar')).toBe(1500000000);
    });
  });

  describe('edge cases', () => {
    it('should return null for invalid input', () => {
      expect(parseRupiah('invalid')).toBe(null);
    });

    it('should return null for empty string', () => {
      expect(parseRupiah('')).toBe(null);
    });

    it('should handle negative numbers', () => {
      expect(parseRupiah('Rp -1.500.000')).toBe(-1500000);
    });

    it('should handle "Rp 0"', () => {
      expect(parseRupiah('Rp 0')).toBe(0);
    });

    it('should be case insensitive for units', () => {
      expect(parseRupiah('Rp 1,5 JUTA')).toBe(1500000);
      expect(parseRupiah('Rp 500 RIBU')).toBe(500000);
    });
  });
});

// =============================================================================
// 4. toWords() - Convert to Indonesian words (terbilang)
// =============================================================================

describe('toWords', () => {
  describe('basic numbers (0-999)', () => {
    it('should convert 0 to "nol rupiah"', () => {
      expect(toWords(0)).toBe('nol rupiah');
    });

    it('should convert 1 to "satu rupiah"', () => {
      expect(toWords(1)).toBe('satu rupiah');
    });

    it('should convert 10 to "sepuluh rupiah"', () => {
      expect(toWords(10)).toBe('sepuluh rupiah');
    });

    it('should convert 11 to "sebelas rupiah"', () => {
      expect(toWords(11)).toBe('sebelas rupiah');
    });

    it('should convert 20 to "dua puluh rupiah"', () => {
      expect(toWords(20)).toBe('dua puluh rupiah');
    });

    it('should convert 25 to "dua puluh lima rupiah"', () => {
      expect(toWords(25)).toBe('dua puluh lima rupiah');
    });

    it('should convert 100 to "seratus rupiah"', () => {
      expect(toWords(100)).toBe('seratus rupiah');
    });

    it('should convert 123 to "seratus dua puluh tiga rupiah"', () => {
      expect(toWords(123)).toBe('seratus dua puluh tiga rupiah');
    });

    it('should convert 999 to "sembilan ratus sembilan puluh sembilan rupiah"', () => {
      expect(toWords(999)).toBe(
        'sembilan ratus sembilan puluh sembilan rupiah'
      );
    });
  });

  describe('thousands (ribu)', () => {
    it('should convert 1000 to "seribu rupiah"', () => {
      expect(toWords(1000)).toBe('seribu rupiah');
    });

    it('should convert 2000 to "dua ribu rupiah"', () => {
      expect(toWords(2000)).toBe('dua ribu rupiah');
    });

    it('should convert 15000 to "lima belas ribu rupiah"', () => {
      expect(toWords(15000)).toBe('lima belas ribu rupiah');
    });

    it('should convert 25000 to "dua puluh lima ribu rupiah"', () => {
      expect(toWords(25000)).toBe('dua puluh lima ribu rupiah');
    });

    it('should convert 123000 to "seratus dua puluh tiga ribu rupiah"', () => {
      expect(toWords(123000)).toBe('seratus dua puluh tiga ribu rupiah');
    });

    it('should convert 123456 to "seratus dua puluh tiga ribu empat ratus lima puluh enam rupiah"', () => {
      expect(toWords(123456)).toBe(
        'seratus dua puluh tiga ribu empat ratus lima puluh enam rupiah'
      );
    });
  });

  describe('millions (juta)', () => {
    it('should convert 1000000 to "satu juta rupiah"', () => {
      expect(toWords(1000000)).toBe('satu juta rupiah');
    });

    it('should convert 2000000 to "dua juta rupiah"', () => {
      expect(toWords(2000000)).toBe('dua juta rupiah');
    });

    it('should convert 1500000 to "satu juta lima ratus ribu rupiah"', () => {
      expect(toWords(1500000)).toBe('satu juta lima ratus ribu rupiah');
    });

    it('should convert 1234567 to full words', () => {
      expect(toWords(1234567)).toBe(
        'satu juta dua ratus tiga puluh empat ribu lima ratus enam puluh tujuh rupiah'
      );
    });
  });

  describe('billions (miliar)', () => {
    it('should convert 1000000000 to "satu miliar rupiah"', () => {
      expect(toWords(1000000000)).toBe('satu miliar rupiah');
    });

    it('should convert 2500000000 to complex words', () => {
      expect(toWords(2500000000)).toBe('dua miliar lima ratus juta rupiah');
    });
  });

  describe('trillions (triliun)', () => {
    it('should convert 1000000000000 to "satu triliun rupiah"', () => {
      expect(toWords(1000000000000)).toBe('satu triliun rupiah');
    });
  });

  describe('with options', () => {
    it('should uppercase first letter when uppercase: true', () => {
      expect(toWords(1500000, { uppercase: true })).toBe(
        'Satu juta lima ratus ribu rupiah'
      );
    });

    it('should omit "rupiah" when withCurrency: false', () => {
      expect(toWords(1500000, { withCurrency: false })).toBe(
        'satu juta lima ratus ribu'
      );
    });

    it('should combine both options', () => {
      expect(toWords(1500000, { uppercase: true, withCurrency: false })).toBe(
        'Satu juta lima ratus ribu'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle negative numbers', () => {
      expect(toWords(-1500000)).toBe('minus satu juta lima ratus ribu rupiah');
    });

    it('should handle decimal by flooring (ignore decimals)', () => {
      expect(toWords(1500000.99)).toBe('satu juta lima ratus ribu rupiah');
    });
  });
});

// =============================================================================
// 5. roundToClean() - Round to clean numbers
// =============================================================================

describe('roundToClean', () => {
  describe('round to ribu (thousands)', () => {
    it('should round 1234567 to 1235000', () => {
      expect(roundToClean(1234567, 'ribu')).toBe(1235000);
    });

    it('should round 1234 to 1000', () => {
      expect(roundToClean(1234, 'ribu')).toBe(1000);
    });

    it('should round 1500 to 2000', () => {
      expect(roundToClean(1500, 'ribu')).toBe(2000);
    });
  });

  describe('round to ratus-ribu (hundred thousands)', () => {
    it('should round 1234567 to 1200000', () => {
      expect(roundToClean(1234567, 'ratus-ribu')).toBe(1200000);
    });

    it('should round 1750000 to 1800000', () => {
      expect(roundToClean(1750000, 'ratus-ribu')).toBe(1800000);
    });

    it('should round 150000 to 200000', () => {
      expect(roundToClean(150000, 'ratus-ribu')).toBe(200000);
    });
  });

  describe('round to juta (millions)', () => {
    it('should round 1234567 to 1000000', () => {
      expect(roundToClean(1234567, 'juta')).toBe(1000000);
    });

    it('should round 1500000 to 2000000', () => {
      expect(roundToClean(1500000, 'juta')).toBe(2000000);
    });

    it('should round 750000 to 1000000', () => {
      expect(roundToClean(750000, 'juta')).toBe(1000000);
    });
  });

  describe('edge cases', () => {
    it('should handle 0', () => {
      expect(roundToClean(0, 'ribu')).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(roundToClean(-1234567, 'ribu')).toBe(-1235000);
    });

    it('should default to ribu when no unit provided', () => {
      expect(roundToClean(1234567)).toBe(1235000);
    });
  });
});
