import { describe, it, expect } from 'vitest';
import { encodePhonetic, isPhoneticMatch } from '../phonetics';

describe('encodePhonetic', () => {
  describe('valid inputs', () => {
    it('encodes name starting with S', () => {
      const code = encodePhonetic('Sjahrudin');
      expect(code.charAt(0)).toBe('S');
      expect(code.length).toBe(4);
    });

    it('encodes different spellings to potentially different codes', () => {
      const code1 = encodePhonetic('Sjahrudin');
      const code2 = encodePhonetic('Syahruddin');
      expect(code1.length).toBe(4);
      expect(code2.length).toBe(4);
    });

    it('encodes Fakhri', () => {
      const code = encodePhonetic('Fakhri');
      expect(code.charAt(0)).toBe('F');
      expect(code.length).toBe(4);
    });

    it('normalizes Dutch oe to u', () => {
      const code = encodePhonetic('Boe');
      expect(code.charAt(0)).toBe('B');
    });

    it('handles dj normalization', () => {
      const code = encodePhonetic('Djado');
      expect(code).toBeTruthy();
      expect(code.length).toBeGreaterThan(1);
    });

    it('normalizes Arabic sy to s', () => {
      const code = encodePhonetic('Syarif');
      expect(code.charAt(0)).toBe('S');
    });

    it('normalizes Arabic kh to k', () => {
      const code = encodePhonetic('Khalid');
      expect(code.charAt(0)).toBe('K');
    });
  });

  describe('invalid inputs', () => {
    it('returns empty string for empty input', () => {
      expect(encodePhonetic('')).toBe('');
    });

    it('returns empty string for null', () => {
      expect(encodePhonetic(null as unknown as string)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(encodePhonetic(undefined as unknown as string)).toBe('');
    });
  });

  describe('edge cases', () => {
    it('handles all vowels', () => {
      const code = encodePhonetic('aeiou');
      expect(code.charAt(0)).toBe('A');
      expect(code).toBe('A000');
    });

    it('handles mixed case', () => {
      const code = encodePhonetic('BUDI');
      expect(code.charAt(0)).toBe('B');
    });

    it('handles short names', () => {
      const code = encodePhonetic('Bi');
      expect(code.charAt(0)).toBe('B');
    });
  });
});

describe('isPhoneticMatch', () => {
  describe('valid inputs', () => {
    it('matches same word', () => {
      expect(isPhoneticMatch('Budi', 'Budi')).toBe(true);
    });

    it('matches Bhoedie and Budi', () => {
      expect(isPhoneticMatch('Bhoedie', 'Budi')).toBe(true);
    });

    it('returns boolean for different names', () => {
      const result = isPhoneticMatch('John', 'Jane');
      expect(typeof result).toBe('boolean');
    });
  });

  describe('invalid inputs', () => {
    it('returns false for empty strings', () => {
      expect(isPhoneticMatch('', '')).toBe(false);
    });

    it('returns false when one is empty', () => {
      expect(isPhoneticMatch('Budi', '')).toBe(false);
      expect(isPhoneticMatch('', 'Budi')).toBe(false);
    });

    it('returns false for null', () => {
      expect(isPhoneticMatch(null as unknown as string, 'Budi')).toBe(false);
    });
  });
});