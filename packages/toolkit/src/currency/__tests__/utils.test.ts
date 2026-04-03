import { describe, it, expect } from 'vitest';
import { formatAccounting, calculateTax, addRupiahSymbol } from '../index';

describe('Currency Utils', () => {
  describe('formatAccounting', () => {
    it('should format positive amount normally', () => {
      expect(formatAccounting(1500000)).toBe('Rp 1.500.000');
    });

    it('should format negative amount with parentheses', () => {
      expect(formatAccounting(-1500000)).toBe('(Rp 1.500.000)');
    });

    it('should follow options', () => {
      expect(formatAccounting(-1500000, { symbol: false })).toBe('(1.500.000)');
    });
  });

  describe('calculateTax', () => {
    it('should calculate 11% tax by default', () => {
      expect(calculateTax(1000000)).toBe(110000);
    });

    it('should calculate custom tax rate', () => {
      expect(calculateTax(1000000, 0.1)).toBe(100000);
    });
  });

  describe('addRupiahSymbol', () => {
    it('should add symbol to number', () => {
      expect(addRupiahSymbol(1000000)).toBe('Rp 1.000.000');
    });

    it('should add symbol to string', () => {
      expect(addRupiahSymbol('1.000.000')).toBe('Rp 1.000.000');
    });

    it('should not double symbol', () => {
      expect(addRupiahSymbol('Rp 1.000.000')).toBe('Rp 1.000.000');
    });
  });
});
