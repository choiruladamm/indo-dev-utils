import { describe, it, expect } from 'vitest';
import { normalizeWhitespace, stripNonAlphanumeric } from '../normalize';

describe('normalizeWhitespace', () => {
  describe('valid inputs', () => {
    it('collapses multiple spaces', () => {
      expect(normalizeWhitespace('Budi   pergi')).toBe('Budi pergi');
    });

    it('trims leading whitespace', () => {
      expect(normalizeWhitespace('  Budi')).toBe('Budi');
    });

    it('trims trailing whitespace', () => {
      expect(normalizeWhitespace('Budi  ')).toBe('Budi');
    });

    it('normalizes tabs to spaces', () => {
      expect(normalizeWhitespace('Budi\tpergi')).toBe('Budi pergi');
    });

    it('normalizes newlines to spaces', () => {
      expect(normalizeWhitespace('Budi\npergi')).toBe('Budi pergi');
    });

    it('handles multiple whitespace types', () => {
      expect(normalizeWhitespace('  Budi\t\npergi  ')).toBe('Budi pergi');
    });
  });

  describe('invalid inputs', () => {
    it('returns empty string as-is', () => {
      expect(normalizeWhitespace('')).toBe('');
    });

    it('returns null as-is', () => {
      expect(normalizeWhitespace(null as unknown as string)).toBe(null);
    });

    it('returns undefined as-is', () => {
      expect(normalizeWhitespace(undefined as unknown as string)).toBe(undefined);
    });
  });

  describe('edge cases', () => {
    it('handles single word', () => {
      expect(normalizeWhitespace('Budi')).toBe('Budi');
    });

    it('handles all whitespace', () => {
      expect(normalizeWhitespace('   \t\n  ')).toBe('');
    });

    it('handles already normalized text', () => {
      expect(normalizeWhitespace('Budi pergi')).toBe('Budi pergi');
    });
  });
});

describe('stripNonAlphanumeric', () => {
  describe('valid inputs', () => {
    it('removes special characters', () => {
      expect(stripNonAlphanumeric('Budi123@#$%')).toBe('Budi123');
    });

    it('keeps spaces', () => {
      expect(stripNonAlphanumeric('Hello! World?')).toBe('Hello World');
    });

    it('keeps numbers', () => {
      expect(stripNonAlphanumeric('Test123')).toBe('Test123');
    });

    it('removes punctuation only', () => {
      expect(stripNonAlphanumeric('a1@b2#c3')).toBe('a1b2c3');
    });
  });

  describe('invalid inputs', () => {
    it('returns empty string as-is', () => {
      expect(stripNonAlphanumeric('')).toBe('');
    });

    it('returns null as-is', () => {
      expect(stripNonAlphanumeric(null as unknown as string)).toBe(null);
    });

    it('returns undefined as-is', () => {
      expect(stripNonAlphanumeric(undefined as unknown as string)).toBe(undefined);
    });
  });

  describe('edge cases', () => {
    it('handles all special characters', () => {
      expect(stripNonAlphanumeric('!@#$%^&*()')).toBe('');
    });

    it('handles letters and numbers only', () => {
      expect(stripNonAlphanumeric('abc123')).toBe('abc123');
    });

    it('handles unicode characters', () => {
      const result = stripNonAlphanumeric('Budić');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});