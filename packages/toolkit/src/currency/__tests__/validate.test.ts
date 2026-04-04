import { describe, it, expect } from 'vitest';
import { validateRupiah } from '../validate';

describe('validateRupiah', () => {
  describe('valid formats', () => {
    it('should accept standard format with Rp', () => {
      expect(validateRupiah('Rp 1.500.000')).toBe(true);
    });

    it('should accept standard format without Rp', () => {
      expect(validateRupiah('1.500.000')).toBe(true);
    });

    it('should accept compact format', () => {
      expect(validateRupiah('Rp 1,5 juta')).toBe(true);
    });

    it('should accept negative with new format', () => {
      expect(validateRupiah('-Rp 1.500.000')).toBe(true);
    });

    it('should accept negative with legacy format', () => {
      expect(validateRupiah('Rp -1.500.000')).toBe(true);
    });

    it('should accept zero', () => {
      expect(validateRupiah('Rp 0')).toBe(true);
    });

    it('should accept compact negative', () => {
      expect(validateRupiah('-Rp 1,5 juta')).toBe(true);
    });

    it('should accept with extra whitespace', () => {
      expect(validateRupiah('  Rp 1.500.000  ')).toBe(true);
    });

    it('should accept miliar format', () => {
      expect(validateRupiah('Rp 2,5 miliar')).toBe(true);
    });

    it('should accept triliun format', () => {
      expect(validateRupiah('Rp 1 triliun')).toBe(true);
    });
  });

  describe('invalid formats', () => {
    it('should reject letters only', () => {
      expect(validateRupiah('abc')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validateRupiah('')).toBe(false);
    });

    it('should reject Rp only', () => {
      expect(validateRupiah('Rp')).toBe(false);
    });

    it('should reject Rp with letters', () => {
      expect(validateRupiah('Rp abc')).toBe(false);
    });

    it('should reject number with trailing letters', () => {
      expect(validateRupiah('1.500.000abc')).toBe(false);
    });

    it('should reject whitespace only', () => {
      expect(validateRupiah('   ')).toBe(false);
    });
  });
});
