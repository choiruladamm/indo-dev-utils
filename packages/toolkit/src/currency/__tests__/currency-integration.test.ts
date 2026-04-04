import { describe, expect, it } from 'vitest';
import {
  formatRupiah,
  formatCompact,
  parseRupiah,
  toWords,
  roundToClean,
  formatAccounting,
  calculateTax,
  addRupiahSymbol,
} from '../index';

describe('end-to-end workflows', () => {
  describe('complete currency processing pipeline', () => {
    it('should work with format -> parse -> round -> words', () => {
      const amount = 1500000;

      // Format
      const formatted = formatRupiah(amount);
      expect(formatted).toBe('Rp 1.500.000');

      // Parse back
      const parsed = parseRupiah(formatted);
      expect(parsed).toBe(1500000);

      // Round
      const rounded = roundToClean(amount, 'juta');
      expect(rounded).toBe(2000000);

      // Convert to words
      const words = toWords(amount);
      expect(words).toBe('satu juta lima ratus ribu rupiah');
    });

    it('should handle compact format round-trip', () => {
      const amount = 2500000;

      const compact = formatCompact(amount);
      expect(compact).toBe('Rp 2,5 juta');

      const parsed = parseRupiah(compact);
      expect(parsed).toBe(2500000);
    });
  });

  describe('accounting workflow', () => {
    it('should handle debit and credit formatting', () => {
      const debit = 5000000;
      const credit = -2500000;

      expect(formatAccounting(debit)).toBe('Rp 5.000.000');
      expect(formatAccounting(credit)).toBe('(Rp 2.500.000)');
    });

    it('should calculate and format tax', () => {
      const base = 1000000;
      const tax = calculateTax(base, 0.11);

      expect(tax).toBe(110000);
      expect(formatRupiah(base + tax)).toBe('Rp 1.110.000');
    });
  });

  describe('display pipeline', () => {
    it('should format for different display contexts', () => {
      const amount = 1250000;

      // Full format for invoice
      expect(formatRupiah(amount)).toBe('Rp 1.250.000');

      // Compact for dashboard
      expect(formatCompact(amount)).toBe('Rp 1,3 juta');

      // Accounting for financial report
      expect(formatAccounting(amount)).toBe('Rp 1.250.000');

      // Words for legal document
      expect(toWords(amount, { uppercase: true })).toBe(
        'Satu juta dua ratus lima puluh ribu rupiah'
      );
    });
  });

  describe('input normalization', () => {
    it('should handle various input formats consistently', () => {
      const inputs = [
        'Rp 1.500.000',
        '1.500.000',
        'Rp1.500.000',
        'Rp 1,5 juta',
      ];

      inputs.forEach((input) => {
        const parsed = parseRupiah(input);
        expect(parsed).toBeGreaterThan(0);

        const formatted = formatRupiah(parsed!);
        expect(formatted).toBe('Rp 1.500.000');
      });
    });
  });

  describe('rounding and display', () => {
    it('should round then format for estimates', () => {
      const exact = 1234567;

      const rounded = roundToClean(exact, 'ratus-ribu');
      expect(rounded).toBe(1200000);

      const formatted = formatCompact(rounded);
      expect(formatted).toBe('Rp 1,2 juta');
    });
  });

  describe('addRupiahSymbol utility', () => {
    it('should add symbol to formatted number string', () => {
      expect(addRupiahSymbol('1.000.000')).toBe('Rp 1.000.000');
    });

    it('should not double-add symbol', () => {
      expect(addRupiahSymbol('Rp 1.000.000')).toBe('Rp 1.000.000');
    });

    it('should work with number input', () => {
      expect(addRupiahSymbol(1000000)).toBe('Rp 1.000.000');
    });
  });
});
