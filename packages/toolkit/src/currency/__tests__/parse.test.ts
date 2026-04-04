import { describe, expect, it } from 'vitest';
import { parseRupiah } from '../parse';

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
