import { describe, expect, it } from 'vitest';
import { toWords } from '../words';

describe('toWords', () => {
  describe('basic numbers (0-999)', () => {
    it('should convert 0 to "nol rupiah"', () => {
      expect(toWords(0)).toBe('nol rupiah');
    });

    it('should convert 1 to "satu rupiah"', () => {
      expect(toWords(1)).toBe('satu rupiah');
    });

    it('should convert 10 to "sepuluh rupiah"', () => {
      expect(toWords(10)).toBe('sepuluh rupiah');
    });

    it('should convert 11 to "sebelas rupiah"', () => {
      expect(toWords(11)).toBe('sebelas rupiah');
    });

    it('should convert 20 to "dua puluh rupiah"', () => {
      expect(toWords(20)).toBe('dua puluh rupiah');
    });

    it('should convert 25 to "dua puluh lima rupiah"', () => {
      expect(toWords(25)).toBe('dua puluh lima rupiah');
    });

    it('should convert 100 to "seratus rupiah"', () => {
      expect(toWords(100)).toBe('seratus rupiah');
    });

    it('should convert 123 to "seratus dua puluh tiga rupiah"', () => {
      expect(toWords(123)).toBe('seratus dua puluh tiga rupiah');
    });

    it('should convert 999 to "sembilan ratus sembilan puluh sembilan rupiah"', () => {
      expect(toWords(999)).toBe(
        'sembilan ratus sembilan puluh sembilan rupiah'
      );
    });
  });

  describe('thousands (ribu)', () => {
    it('should convert 1000 to "seribu rupiah"', () => {
      expect(toWords(1000)).toBe('seribu rupiah');
    });

    it('should convert 2000 to "dua ribu rupiah"', () => {
      expect(toWords(2000)).toBe('dua ribu rupiah');
    });

    it('should convert 15000 to "lima belas ribu rupiah"', () => {
      expect(toWords(15000)).toBe('lima belas ribu rupiah');
    });

    it('should convert 25000 to "dua puluh lima ribu rupiah"', () => {
      expect(toWords(25000)).toBe('dua puluh lima ribu rupiah');
    });

    it('should convert 123000 to "seratus dua puluh tiga ribu rupiah"', () => {
      expect(toWords(123000)).toBe('seratus dua puluh tiga ribu rupiah');
    });

    it('should convert 123456 to full words', () => {
      expect(toWords(123456)).toBe(
        'seratus dua puluh tiga ribu empat ratus lima puluh enam rupiah'
      );
    });
  });

  describe('millions (juta)', () => {
    it('should convert 1000000 to "satu juta rupiah"', () => {
      expect(toWords(1000000)).toBe('satu juta rupiah');
    });

    it('should convert 2000000 to "dua juta rupiah"', () => {
      expect(toWords(2000000)).toBe('dua juta rupiah');
    });

    it('should convert 1500000 to "satu juta lima ratus ribu rupiah"', () => {
      expect(toWords(1500000)).toBe('satu juta lima ratus ribu rupiah');
    });

    it('should convert 1234567 to full words', () => {
      expect(toWords(1234567)).toBe(
        'satu juta dua ratus tiga puluh empat ribu lima ratus enam puluh tujuh rupiah'
      );
    });
  });

  describe('billions (miliar)', () => {
    it('should convert 1000000000 to "satu miliar rupiah"', () => {
      expect(toWords(1000000000)).toBe('satu miliar rupiah');
    });

    it('should convert 2500000000 to complex words', () => {
      expect(toWords(2500000000)).toBe('dua miliar lima ratus juta rupiah');
    });
  });

  describe('trillions (triliun)', () => {
    it('should convert 1000000000000 to "satu triliun rupiah"', () => {
      expect(toWords(1000000000000)).toBe('satu triliun rupiah');
    });
  });

  describe('with options', () => {
    it('should uppercase first letter when uppercase: true', () => {
      expect(toWords(1500000, { uppercase: true })).toBe(
        'Satu juta lima ratus ribu rupiah'
      );
    });

    it('should omit "rupiah" when withCurrency: false', () => {
      expect(toWords(1500000, { withCurrency: false })).toBe(
        'satu juta lima ratus ribu'
      );
    });

    it('should combine both options', () => {
      expect(toWords(1500000, { uppercase: true, withCurrency: false })).toBe(
        'Satu juta lima ratus ribu'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle negative numbers', () => {
      expect(toWords(-1500000)).toBe('minus satu juta lima ratus ribu rupiah');
    });

    it('should handle decimal by flooring (ignore decimals)', () => {
      expect(toWords(1500000.99)).toBe('satu juta lima ratus ribu rupiah');
    });
  });
});
