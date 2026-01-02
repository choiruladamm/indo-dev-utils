import { describe, it, expect } from 'vitest';
import { toTitleCase } from '../capitalization';

describe('toTitleCase', () => {
  describe('basic functionality', () => {
    it('capitalizes each word', () => {
      expect(toTitleCase('joko widodo')).toBe('Joko Widodo');
    });

    it('handles all caps input', () => {
      expect(toTitleCase('JOKO WIDODO')).toBe('Joko Widodo');
    });

    it('handles all lowercase input', () => {
      expect(toTitleCase('joko widodo')).toBe('Joko Widodo');
    });

    it('handles mixed case input', () => {
      expect(toTitleCase('jOkO WiDoDo')).toBe('Joko Widodo');
    });

    it('handles single word', () => {
      expect(toTitleCase('joko')).toBe('Joko');
    });

    it('handles two words', () => {
      expect(toTitleCase('joko widodo')).toBe('Joko Widodo');
    });

    it('handles multiple words', () => {
      expect(toTitleCase('presiden republik indonesia')).toBe(
        'Presiden Republik Indonesia'
      );
    });
  });

  describe('Indonesian particles - lowercase', () => {
    it('keeps "di" lowercase in middle', () => {
      expect(toTitleCase('rumah di jakarta')).toBe('Rumah di Jakarta');
    });

    it('keeps "ke" lowercase in middle', () => {
      expect(toTitleCase('pergi ke sekolah')).toBe('Pergi ke Sekolah');
    });

    it('keeps "dari" lowercase in middle', () => {
      expect(toTitleCase('berasal dari bandung')).toBe('Berasal dari Bandung');
    });

    it('keeps "untuk" lowercase in middle', () => {
      expect(toTitleCase('buku untuk anak')).toBe('Buku untuk Anak');
    });

    it('keeps "dan" lowercase in middle', () => {
      expect(toTitleCase('ibu dan anak')).toBe('Ibu dan Anak');
    });

    it('keeps "atau" lowercase in middle', () => {
      expect(toTitleCase('pagi atau sore')).toBe('Pagi atau Sore');
    });

    it('keeps "yang" lowercase in middle', () => {
      expect(toTitleCase('orang yang baik')).toBe('Orang yang Baik');
    });

    it('keeps "dengan" lowercase in middle', () => {
      expect(toTitleCase('bersama dengan teman')).toBe('Bersama dengan Teman');
    });

    it('keeps "sebagai" lowercase in middle', () => {
      expect(toTitleCase('bekerja sebagai guru')).toBe('Bekerja sebagai Guru');
    });

    it('keeps "oleh" lowercase in middle', () => {
      expect(toTitleCase('dibuat oleh anak')).toBe('Dibuat oleh Anak');
    });

    it('keeps "pada" lowercase in middle', () => {
      expect(toTitleCase('terjadi pada malam hari')).toBe(
        'Terjadi pada Malam Hari'
      );
    });

    it('keeps "dalam" lowercase in middle', () => {
      expect(toTitleCase('hidup dalam damai')).toBe('Hidup dalam Damai');
    });
  });

  describe('Indonesian particles - first word capitalized', () => {
    it('capitalizes "dari" at start', () => {
      expect(toTitleCase('dari jakarta ke bandung')).toBe(
        'Dari Jakarta ke Bandung'
      );
    });

    it('capitalizes "untuk" at start', () => {
      expect(toTitleCase('untuk anak indonesia')).toBe('Untuk Anak Indonesia');
    });

    it('capitalizes "di" at start', () => {
      expect(toTitleCase('di rumah saja')).toBe('Di Rumah Saja');
    });

    it('capitalizes "ke" at start', () => {
      expect(toTitleCase('ke sekolah pagi ini')).toBe('Ke Sekolah Pagi Ini');
    });
  });

  describe('Indonesian particles - multiple in sentence', () => {
    it('handles multiple particles', () => {
      expect(toTitleCase('dari jakarta ke bandung dan surabaya')).toBe(
        'Dari Jakarta ke Bandung dan Surabaya'
      );
    });

    it('handles complex sentence with many particles', () => {
      expect(toTitleCase('buku untuk anak dan orang tua di indonesia')).toBe(
        'Buku untuk Anak dan Orang Tua di Indonesia'
      );
    });

    it('handles consecutive particles', () => {
      expect(toTitleCase('untuk dan dengan teman')).toBe(
        'Untuk dan dengan Teman'
      );
    });
  });

  describe('acronyms - preserved uppercase', () => {
    it('preserves PT', () => {
      expect(toTitleCase('pt maju jaya')).toBe('PT Maju Jaya');
    });

    it('preserves CV', () => {
      expect(toTitleCase('cv sukses makmur')).toBe('CV Sukses Makmur');
    });

    it('preserves Tbk', () => {
      expect(toTitleCase('pt mandiri tbk')).toBe('PT Mandiri Tbk');
    });

    it('preserves DKI', () => {
      expect(toTitleCase('dki jakarta')).toBe('DKI Jakarta');
    });

    it('preserves TNI', () => {
      expect(toTitleCase('tni angkatan darat')).toBe('TNI Angkatan Darat');
    });

    it('preserves POLRI', () => {
      expect(toTitleCase('polri jawa barat')).toBe('POLRI Jawa Barat');
    });

    it('preserves BCA', () => {
      expect(toTitleCase('bank bca')).toBe('Bank BCA');
    });

    it('preserves multiple acronyms', () => {
      expect(toTitleCase('pt bank bca tbk')).toBe('PT Bank BCA Tbk');
    });
  });

  describe('acronyms - with particles', () => {
    it('combines acronyms and particles', () => {
      expect(toTitleCase('pt dari jakarta')).toBe('PT dari Jakarta');
    });

    it('handles complex organization names', () => {
      expect(toTitleCase('pt bank bca tbk untuk indonesia')).toBe(
        'PT Bank BCA Tbk untuk Indonesia'
      );
    });
  });

  describe('hyphenated words', () => {
    it('capitalizes both parts of simple hyphen', () => {
      expect(toTitleCase('anak-anak')).toBe('Anak-Anak');
    });

    it('capitalizes hyphenated word at start', () => {
      expect(toTitleCase('anak-anak bermain')).toBe('Anak-Anak Bermain');
    });

    it('capitalizes hyphenated word in middle', () => {
      expect(toTitleCase('bermain dengan anak-anak')).toBe(
        'Bermain dengan Anak-Anak'
      );
    });

    it('handles multiple hyphenated words', () => {
      expect(toTitleCase('anak-anak dan orang-orang')).toBe(
        'Anak-Anak dan Orang-Orang'
      );
    });

    it('handles triple hyphenated word', () => {
      expect(toTitleCase('satu-dua-tiga')).toBe('Satu-Dua-Tiga');
    });

    it('handles hyphenated acronyms', () => {
      expect(toTitleCase('pt-cv-ud')).toBe('PT-CV-UD');
    });

    it('handles hyphenated with particles', () => {
      expect(toTitleCase('makan-makan di rumah')).toBe('Makan-Makan di Rumah');
    });
  });

  describe('edge cases - empty and whitespace', () => {
    it('returns empty string for empty input', () => {
      expect(toTitleCase('')).toBe('');
    });

    it('handles single space', () => {
      expect(toTitleCase(' ')).toBe('');
    });

    it('handles multiple spaces only', () => {
      expect(toTitleCase('     ')).toBe('');
    });

    it('trims leading spaces', () => {
      expect(toTitleCase('  joko widodo')).toBe('Joko Widodo');
    });

    it('trims trailing spaces', () => {
      expect(toTitleCase('joko widodo  ')).toBe('Joko Widodo');
    });

    it('trims leading and trailing spaces', () => {
      expect(toTitleCase('  joko widodo  ')).toBe('Joko Widodo');
    });

    it('collapses multiple spaces between words', () => {
      expect(toTitleCase('joko    widodo')).toBe('Joko Widodo');
    });

    it('handles mixed whitespace', () => {
      expect(toTitleCase('  joko   widodo  ')).toBe('Joko Widodo');
    });
  });

  describe('edge cases - special characters', () => {
    it('handles numbers in text', () => {
      expect(toTitleCase('tahun 2024 indonesia')).toBe('Tahun 2024 Indonesia');
    });

    it('handles punctuation', () => {
      expect(toTitleCase('joko, widodo!')).toBe('Joko, Widodo!');
    });

    it('preserves parentheses', () => {
      expect(toTitleCase('pt mandiri (persero)')).toBe('PT Mandiri (persero)');
    });

    it('handles apostrophes', () => {
      expect(toTitleCase("it's a test")).toBe("It's a Test");
    });

    it('handles quotes', () => {
      expect(toTitleCase('"hello world"')).toBe('"hello World"');
    });
  });

  describe('options - preserveAcronyms', () => {
    it('preserves acronyms by default', () => {
      expect(toTitleCase('pt bca')).toBe('PT BCA');
    });

    it('respects preserveAcronyms: true', () => {
      expect(toTitleCase('pt bca', { preserveAcronyms: true })).toBe('PT BCA');
    });

    it('ignores acronyms when preserveAcronyms: false', () => {
      expect(toTitleCase('pt bca', { preserveAcronyms: false })).toBe('Pt Bca');
    });

    it('handles mixed case acronyms with preserveAcronyms: false', () => {
      expect(toTitleCase('PT BCA Tbk', { preserveAcronyms: false })).toBe(
        'Pt Bca Tbk'
      );
    });
  });

  describe('options - strict mode', () => {
    it('non-strict mode by default', () => {
      expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
    });

    it('strict: true forces lowercase first', () => {
      expect(toTitleCase('HELLO WORLD', { strict: true })).toBe('Hello World');
    });

    it('strict: false allows passthrough', () => {
      expect(toTitleCase('HeLLo WoRLd', { strict: false })).toBe('Hello World');
    });
  });

  describe('options - custom exceptions', () => {
    it('applies single custom exception', () => {
      expect(toTitleCase('mobil dari jepang', { exceptions: ['jepang'] })).toBe(
        'Mobil dari jepang'
      );
    });

    it('applies multiple custom exceptions', () => {
      expect(
        toTitleCase('from tokyo to osaka', {
          exceptions: ['from', 'to'],
        })
      ).toBe('From Tokyo to Osaka');
    });

    it('exceptions work in middle of sentence', () => {
      expect(
        toTitleCase('going from tokyo to osaka', {
          exceptions: ['from', 'to'],
        })
      ).toBe('Going from Tokyo to Osaka');
    });

    it('first word always capitalized even if in exceptions', () => {
      expect(
        toTitleCase('to infinity and beyond', {
          exceptions: ['to', 'and'],
        })
      ).toBe('To Infinity and Beyond');
    });

    it('custom exceptions override defaults when at start', () => {
      expect(toTitleCase('dari tokyo', { exceptions: ['tokyo'] })).toBe(
        'Dari tokyo'
      );
    });

    it('combines built-in and custom exceptions', () => {
      expect(
        toTitleCase('buku dari jepang untuk anak', {
          exceptions: ['jepang'],
        })
      ).toBe('Buku dari jepang untuk Anak');
    });

    it('handles empty exceptions array', () => {
      expect(toTitleCase('dari jakarta', { exceptions: [] })).toBe(
        'Dari Jakarta'
      );
    });
  });

  describe('options - combined', () => {
    it('handles all options together', () => {
      expect(
        toTitleCase('PT dari tokyo', {
          preserveAcronyms: false,
          strict: true,
          exceptions: ['tokyo'],
        })
      ).toBe('Pt dari tokyo');
    });

    it('preserveAcronyms + exceptions', () => {
      expect(
        toTitleCase('pt mandiri untuk jepang', {
          preserveAcronyms: true,
          exceptions: ['jepang'],
        })
      ).toBe('PT Mandiri untuk jepang');
    });
  });

  describe('Unicode and international characters', () => {
    it('handles accented characters', () => {
      expect(toTitleCase('café résumé')).toBe('Café Résumé');
    });

    it('handles Indonesian diacritics', () => {
      expect(toTitleCase('naïve approach')).toBe('Naïve Approach');
    });

    it('handles mixed Unicode', () => {
      expect(toTitleCase('école française')).toBe('École Française');
    });
  });

  describe('real-world Indonesian examples', () => {
    it('handles common phrases', () => {
      expect(toTitleCase('selamat pagi indonesia')).toBe(
        'Selamat Pagi Indonesia'
      );
    });

    it('handles addresses', () => {
      expect(toTitleCase('jalan sudirman jakarta')).toBe(
        'Jalan Sudirman Jakarta'
      );
    });

    it('handles organization names', () => {
      expect(toTitleCase('pt telkom indonesia tbk')).toBe(
        'PT Telkom Indonesia Tbk'
      );
    });

    it('handles government entities', () => {
      expect(toTitleCase('dki jakarta provinsi')).toBe('DKI Jakarta Provinsi');
    });

    it('handles full names', () => {
      expect(toTitleCase('ir. joko widodo')).toBe('Ir. Joko Widodo');
    });

    it('handles book titles', () => {
      expect(toTitleCase('buku untuk anak dan orang tua')).toBe(
        'Buku untuk Anak dan Orang Tua'
      );
    });
  });

  describe('performance', () => {
    it('handles long strings efficiently', () => {
      const longString = 'word '.repeat(1000);
      const start = performance.now();
      toTitleCase(longString);
      const end = performance.now();
      expect(end - start).toBeLessThan(10); // < 10ms for 1000 words
    });

    it('handles many acronyms efficiently', () => {
      const text = 'pt cv ud pd tbk '.repeat(100);
      const start = performance.now();
      toTitleCase(text);
      const end = performance.now();
      expect(end - start).toBeLessThan(5);
    });

    it('handles many particles efficiently', () => {
      const text = 'dari ke dan atau untuk '.repeat(100);
      const start = performance.now();
      toTitleCase(text);
      const end = performance.now();
      expect(end - start).toBeLessThan(5);
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'joko widodo';
      const result = toTitleCase(original);

      expect(original).toBe('joko widodo');
      expect(result).toBe('Joko Widodo');
    });

    it('does not modify options object', () => {
      const options = { preserveAcronyms: true, exceptions: ['test'] };
      toTitleCase('test case', options);

      expect(options).toEqual({ preserveAcronyms: true, exceptions: ['test'] });
    });
  });

  describe('type safety', () => {
    it('accepts string and optional options', () => {
      const text: string = 'test';
      const result: string = toTitleCase(text);
      expect(result).toBe('Test');
    });

    it('accepts valid options', () => {
      const result = toTitleCase('test', {
        preserveAcronyms: true,
        strict: false,
        exceptions: ['word'],
      });
      expect(typeof result).toBe('string');
    });
  });
});
