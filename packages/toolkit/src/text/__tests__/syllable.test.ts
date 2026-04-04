import { describe, it, expect } from 'vitest';
import { countSyllables } from '../syllable';

describe('countSyllables', () => {
  describe('Indonesian words', () => {
    it('counts syllables in "buku" (bu-ku)', () => {
      expect(countSyllables('buku')).toBe(2);
    });

    it('counts syllables in "matahari" (ma-ta-ha-ri)', () => {
      expect(countSyllables('matahari')).toBe(4);
    });

    it('counts dipthong "au" as single syllable in "pulau"', () => {
      expect(countSyllables('pulau')).toBe(2);
    });

    it('counts dipthong "ai" as single syllable in "pantai"', () => {
      expect(countSyllables('pantai')).toBe(2);
    });

    it('counts dipthong "oi" as single syllable in "amboi"', () => {
      expect(countSyllables('amboi')).toBe(2);
    });

    it('counts syllables in "saya" (sa-ya)', () => {
      expect(countSyllables('saya')).toBe(2);
    });

    it('counts syllables in "indonesia" (in-do-ne-si-a)', () => {
      expect(countSyllables('indonesia')).toBe(4);
    });
  });

  describe('English words', () => {
    it('counts syllables in "hello" (hel-lo)', () => {
      expect(countSyllables('hello')).toBe(2);
    });

    it('counts syllables in "beautiful" (beau-ti-ful)', () => {
      expect(countSyllables('beautiful')).toBe(3);
    });

    it('counts syllables in "world"', () => {
      expect(countSyllables('world')).toBe(1);
    });

    it('counts syllables in "rhythm" (no vowels)', () => {
      expect(countSyllables('rhythm')).toBe(1);
    });

    it('handles silent e in "make"', () => {
      expect(countSyllables('make')).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('returns 0 for empty string', () => {
      expect(countSyllables('')).toBe(0);
    });

    it('returns 1 for single vowel', () => {
      expect(countSyllables('a')).toBe(1);
    });

    it('returns 1 for single consonant', () => {
      expect(countSyllables('b')).toBe(1);
    });

    it('handles mixed case input', () => {
      expect(countSyllables('Buku')).toBe(2);
    });

    it('handles text with numbers (ignores them)', () => {
      expect(countSyllables('buku123')).toBe(2);
    });

    it('handles text with special characters (ignores them)', () => {
      expect(countSyllables('bu-ku')).toBe(2);
    });

    it('returns 0 for string with only special characters', () => {
      expect(countSyllables('123!@#')).toBe(0);
    });
  });
});
