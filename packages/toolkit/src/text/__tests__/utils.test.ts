import { describe, it, expect } from 'vitest';
import { profanityFilter, removeStopwords, toFormal, isAlay } from '../index';

describe('Text Utils Improvements', () => {
  describe('profanityFilter', () => {
    it('should mask profanity words', () => {
      expect(profanityFilter('kamu anjing banget')).toBe('kamu ****** banget');
    });

    it('should be case insensitive', () => {
      expect(profanityFilter('Dasar ANJING')).toBe('Dasar ******');
    });

    it('should use custom mask', () => {
      expect(profanityFilter('anjing', '#')).toBe('######');
    });
  });

  describe('removeStopwords', () => {
    it('should remove common stopwords', () => {
      expect(removeStopwords('saya sedang makan nasi')).toBe('makan nasi');
    });

    it('should handle different capitalization', () => {
      expect(removeStopwords('Ada gajah Di Balik batu')).toBe('gajah batu');
    });
  });

  describe('toFormal', () => {
    it('should convert informal words', () => {
      expect(toFormal('gw lagi makan')).toBe('saya sedang makan');
      expect(toFormal('lo mau kemana')).toBe('kamu mau kemana');
    });

    it('should preserve capitalization', () => {
      expect(toFormal('Gw lagi makan')).toBe('Saya sedang makan');
    });
  });

  describe('isAlay', () => {
    it('should detect alternating caps', () => {
      expect(isAlay('AqU sAyAnG qMu')).toBe(true);
    });

    it('should detect number substitution', () => {
      expect(isAlay('makan 4y4m')).toBe(true);
    });

    it('should detect excessive characters', () => {
      expect(isAlay('siiaappp')).toBe(true);
    });

    it('should return false for normal text', () => {
      expect(isAlay('Saya sedang makan nasi.')).toBe(false);
      expect(isAlay('Ini Adalah Judul Buku')).toBe(false);
    });
  });
});
