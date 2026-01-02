import { describe, it, expect } from 'vitest';
import { capitalize } from '../capitalization';

describe('capitalize', () => {
  describe('basic functionality', () => {
    it('capitalizes first letter of lowercase word', () => {
      expect(capitalize('joko')).toBe('Joko');
    });

    it('capitalizes first letter of single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('handles already capitalized input', () => {
      expect(capitalize('Joko')).toBe('Joko');
    });

    it('lowercases rest of the string', () => {
      expect(capitalize('JOKO')).toBe('Joko');
      expect(capitalize('jOKO')).toBe('Joko');
      expect(capitalize('JoKo')).toBe('Joko');
    });
  });

  describe('multi-word handling', () => {
    it('only affects first word', () => {
      expect(capitalize('joko widodo')).toBe('Joko widodo');
    });

    it('lowercases subsequent words', () => {
      expect(capitalize('joko WIDODO')).toBe('Joko widodo');
    });

    it('handles multiple spaces', () => {
      expect(capitalize('joko  widodo')).toBe('Joko  widodo');
    });

    it('preserves trailing spaces', () => {
      expect(capitalize('joko widodo  ')).toBe('Joko widodo  ');
    });
  });

  describe('edge cases - empty and whitespace', () => {
    it('returns empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles string with only spaces', () => {
      expect(capitalize('   ')).toBe('   ');
    });

    it('handles leading spaces', () => {
      expect(capitalize('  joko')).toBe('  joko');
    });

    it('handles single space', () => {
      expect(capitalize(' ')).toBe(' ');
    });
  });

  describe('edge cases - special characters', () => {
    it('handles numbers at start', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });

    it('handles punctuation at start', () => {
      expect(capitalize('!hello')).toBe('!hello');
    });

    it('handles hyphenated words', () => {
      expect(capitalize('anak-anak')).toBe('Anak-anak');
    });

    it('handles underscores', () => {
      expect(capitalize('hello_world')).toBe('Hello_world');
    });

    it('handles mixed special characters', () => {
      expect(capitalize('@joko123')).toBe('@joko123');
    });
  });

  describe('Unicode and international characters', () => {
    it('handles accented characters', () => {
      expect(capitalize('école')).toBe('École');
    });

    it('handles Indonesian characters', () => {
      expect(capitalize('café')).toBe('Café');
    });

    it('handles umlauts', () => {
      expect(capitalize('über')).toBe('Über');
    });

    it('handles mixed ASCII and Unicode', () => {
      expect(capitalize('résumé')).toBe('Résumé');
    });
  });

  describe('edge cases - numbers', () => {
    it('handles string starting with number', () => {
      expect(capitalize('1st place')).toBe('1st place');
    });

    it('handles only numbers', () => {
      expect(capitalize('12345')).toBe('12345');
    });

    it('handles numbers and letters mixed', () => {
      expect(capitalize('a1b2c3')).toBe('A1b2c3');
    });
  });

  describe('edge cases - punctuation', () => {
    it('handles question mark at start', () => {
      expect(capitalize('?what')).toBe('?what');
    });

    it('handles exclamation at start', () => {
      expect(capitalize('!important')).toBe('!important');
    });

    it('handles comma at start', () => {
      expect(capitalize(',hello')).toBe(',hello');
    });

    it('handles period at start', () => {
      expect(capitalize('.hidden')).toBe('.hidden');
    });
  });

  describe('Indonesian language specific', () => {
    it('handles common Indonesian names', () => {
      expect(capitalize('ahmad')).toBe('Ahmad');
      expect(capitalize('siti')).toBe('Siti');
      expect(capitalize('budi')).toBe('Budi');
    });

    it('handles Indonesian words', () => {
      expect(capitalize('selamat pagi')).toBe('Selamat pagi');
      expect(capitalize('terima kasih')).toBe('Terima kasih');
    });
  });

  describe('performance', () => {
    it('handles very long strings efficiently', () => {
      const longString = 'a'.repeat(10000);
      const start = performance.now();
      const result = capitalize(longString);
      const end = performance.now();

      expect(result.charAt(0)).toBe('A');
      expect(result.charAt(1)).toBe('a');
      expect(end - start).toBeLessThan(1); // < 1ms
    });

    it('handles long multi-word strings', () => {
      const longString = 'word '.repeat(1000);
      const start = performance.now();
      const result = capitalize(longString);
      const end = performance.now();

      expect(result.startsWith('Word ')).toBe(true);
      expect(end - start).toBeLessThan(1);
    });
  });

  describe('type safety', () => {
    it('accepts string type', () => {
      const input: string = 'test';
      const result: string = capitalize(input);
      expect(result).toBe('Test');
    });

    it('returns string type', () => {
      const result = capitalize('test');
      expect(typeof result).toBe('string');
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'joko';
      const result = capitalize(original);

      expect(original).toBe('joko'); // unchanged
      expect(result).toBe('Joko'); // new string
    });
  });

  describe('edge cases - combined scenarios', () => {
    it('handles empty string in production scenario', () => {
      const userInput = '';
      expect(capitalize(userInput)).toBe('');
    });

    it('handles undefined-like empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles whitespace-only input gracefully', () => {
      expect(capitalize('     ')).toBe('     ');
    });
  });
});
