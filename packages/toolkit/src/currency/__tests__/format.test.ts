import { describe, expect, it } from 'vitest';
import { formatRupiah, formatCompact } from '../format';

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
