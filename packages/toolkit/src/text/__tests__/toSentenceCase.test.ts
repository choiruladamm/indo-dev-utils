import { describe, it, expect } from 'vitest';
import { toSentenceCase } from '../capitalization';

describe('toSentenceCase', () => {
  describe('basic functionality', () => {
    it('capitalizes first letter of single sentence', () => {
      expect(toSentenceCase('joko widodo')).toBe('Joko widodo');
    });

    it('lowercases rest of single sentence', () => {
      expect(toSentenceCase('JOKO WIDODO')).toBe('Joko widodo');
    });

    it('handles mixed case input', () => {
      expect(toSentenceCase('JoKo WiDoDo')).toBe('Joko widodo');
    });

    it('handles already correct sentence case', () => {
      expect(toSentenceCase('Joko widodo')).toBe('Joko widodo');
    });

    it('handles single word', () => {
      expect(toSentenceCase('hello')).toBe('Hello');
    });

    it('handles uppercase single word', () => {
      expect(toSentenceCase('HELLO')).toBe('Hello');
    });
  });

  describe('multiple sentences - period', () => {
    it('capitalizes after period', () => {
      expect(toSentenceCase('hello. world.')).toBe('Hello. World.');
    });

    it('handles multiple periods', () => {
      expect(toSentenceCase('jakarta. surabaya. bandung.')).toBe(
        'Jakarta. Surabaya. Bandung.'
      );
    });

    it('handles long sentence then short', () => {
      expect(toSentenceCase('ini kalimat panjang. pendek.')).toBe(
        'Ini kalimat panjang. Pendek.'
      );
    });

    it('handles sentence without ending period', () => {
      expect(toSentenceCase('hello. world')).toBe('Hello. World');
    });

    it('handles multiple spaces after period', () => {
      expect(toSentenceCase('hello.  world.')).toBe('Hello. World.');
    });
  });

  describe('multiple sentences - exclamation', () => {
    it('capitalizes after exclamation mark', () => {
      expect(toSentenceCase('wow! amazing!')).toBe('Wow! Amazing!');
    });

    it('handles multiple exclamations', () => {
      expect(toSentenceCase('hello! goodbye! farewell!')).toBe(
        'Hello! Goodbye! Farewell!'
      );
    });

    it('handles exclamation with space', () => {
      expect(toSentenceCase('wow! this is great!')).toBe('Wow! This is great!');
    });
  });

  describe('multiple sentences - question mark', () => {
    it('capitalizes after question mark', () => {
      expect(toSentenceCase('siapa anda? saya joko.')).toBe(
        'Siapa anda? Saya joko.'
      );
    });

    it('handles multiple questions', () => {
      expect(toSentenceCase('apa? kenapa? bagaimana?')).toBe(
        'Apa? Kenapa? Bagaimana?'
      );
    });

    it('handles question with long answer', () => {
      expect(
        toSentenceCase('siapa nama anda? nama saya adalah joko widodo.')
      ).toBe('Siapa nama anda? Nama saya adalah joko widodo.');
    });
  });

  describe('mixed punctuation', () => {
    it('handles period, exclamation, and question together', () => {
      expect(toSentenceCase('hello. wow! who are you?')).toBe(
        'Hello. Wow! Who are you?'
      );
    });

    it('handles complex conversation', () => {
      expect(
        toSentenceCase('halo, apa kabar? baik-baik saja. terima kasih!')
      ).toBe('Halo, apa kabar? Baik-baik saja. Terima kasih!');
    });

    it('handles mixed case with mixed punctuation', () => {
      expect(toSentenceCase('HELLO. WOW! WHO?')).toBe('Hello. Wow! Who?');
    });
  });

  describe('edge cases - empty and whitespace', () => {
    it('returns empty string for empty input', () => {
      expect(toSentenceCase('')).toBe('');
    });

    it('handles string with only spaces', () => {
      expect(toSentenceCase('   ')).toBe('');
    });

    it('handles single space', () => {
      expect(toSentenceCase(' ')).toBe('');
    });

    it('trims leading spaces', () => {
      expect(toSentenceCase('  hello world')).toBe('Hello world');
    });

    it('trims trailing spaces', () => {
      expect(toSentenceCase('hello world  ')).toBe('Hello world');
    });

    it('trims leading and trailing spaces', () => {
      expect(toSentenceCase('  hello world  ')).toBe('Hello world');
    });

    it('collapses multiple spaces', () => {
      expect(toSentenceCase('hello    world')).toBe('Hello world');
    });

    it('collapses multiple spaces after punctuation', () => {
      expect(toSentenceCase('hello.    world.')).toBe('Hello. World.');
    });
  });

  describe('edge cases - punctuation', () => {
    it('handles comma (no capitalization)', () => {
      expect(toSentenceCase('hello, world')).toBe('Hello, world');
    });

    it('handles semicolon (no capitalization)', () => {
      expect(toSentenceCase('hello; world')).toBe('Hello; world');
    });

    it('handles colon (no capitalization)', () => {
      expect(toSentenceCase('hello: world')).toBe('Hello: world');
    });

    it('handles dash (no capitalization)', () => {
      expect(toSentenceCase('hello - world')).toBe('Hello - world');
    });

    it('handles parentheses', () => {
      expect(toSentenceCase('hello (world). goodbye.')).toBe(
        'Hello (world). Goodbye.'
      );
    });

    it('handles quotes - capitalizes first letter and after period', () => {
      expect(toSentenceCase('"hello". "world".')).toBe('"Hello". "World".');
    });

    it('handles quotes at start', () => {
      expect(toSentenceCase('"hello world"')).toBe('"Hello world"');
    });

    it('handles quotes in middle - no capitalization', () => {
      expect(toSentenceCase('he said "hello world" to me.')).toBe(
        'He said "hello world" to me.'
      );
    });
  });

  describe('edge cases - consecutive punctuation', () => {
    it('handles double periods (ellipsis-like)', () => {
      expect(toSentenceCase('hello.. world.')).toBe('Hello.. World.');
    });

    it('handles triple periods (ellipsis)', () => {
      expect(toSentenceCase('hello... world.')).toBe('Hello... World.');
    });

    it('handles multiple exclamations', () => {
      expect(toSentenceCase('wow!!! amazing!!!')).toBe('Wow!!! Amazing!!!');
    });

    it('handles multiple question marks', () => {
      expect(toSentenceCase('what??? really???')).toBe('What??? Really???');
    });

    it('handles mixed consecutive punctuation', () => {
      expect(toSentenceCase('what?! really!?')).toBe('What?! Really!?');
    });
  });

  describe('edge cases - abbreviations', () => {
    it('handles common abbreviations at end', () => {
      expect(toSentenceCase('panggil saya dr. joko adalah dokter.')).toBe(
        'Panggil saya dr. Joko adalah dokter.'
      );
    });

    it('handles abbreviations in middle', () => {
      expect(toSentenceCase('dr. joko adalah dokter. beliau hebat.')).toBe(
        'Dr. Joko adalah dokter. Beliau hebat.'
      );
    });

    it('handles multiple abbreviations', () => {
      expect(toSentenceCase('prof. dr. ir. joko widodo.')).toBe(
        'Prof. Dr. Ir. Joko widodo.'
      );
    });

    it('handles common title abbreviations', () => {
      expect(toSentenceCase('mr. smith is here. mrs. jones too.')).toBe(
        'Mr. Smith is here. Mrs. Jones too.'
      );
    });
  });

  describe('edge cases - numbers', () => {
    it('handles numbers at start', () => {
      expect(toSentenceCase('123 adalah angka.')).toBe('123 Adalah angka.');
    });

    it('handles numbers after punctuation', () => {
      expect(toSentenceCase('hello. 456 world.')).toBe('Hello. 456 World.');
    });

    it('handles numbers in middle', () => {
      expect(toSentenceCase('ada 123 orang. mereka senang.')).toBe(
        'Ada 123 orang. Mereka senang.'
      );
    });

    it('handles decimal numbers', () => {
      expect(toSentenceCase('harga 1.500. murah sekali.')).toBe(
        'Harga 1.500. Murah sekali.'
      );
    });
  });

  describe('edge cases - special characters', () => {
    it('handles at symbol', () => {
      expect(toSentenceCase('email @john. kirim sekarang.')).toBe(
        'Email @john. Kirim sekarang.'
      );
    });

    it('handles hashtag', () => {
      expect(toSentenceCase('trending #topic. sangat viral.')).toBe(
        'Trending #topic. Sangat viral.'
      );
    });

    it('handles ampersand', () => {
      expect(toSentenceCase('you & me. forever together.')).toBe(
        'You & me. Forever together.'
      );
    });
  });

  describe('Unicode and international characters', () => {
    it('handles accented characters', () => {
      expect(toSentenceCase('café résumé. très bien.')).toBe(
        'Café résumé. Très bien.'
      );
    });

    it('handles umlauts', () => {
      expect(toSentenceCase('über alles. schön.')).toBe('Über alles. Schön.');
    });

    it('handles mixed Unicode', () => {
      expect(toSentenceCase('école française. très élégant.')).toBe(
        'École française. Très élégant.'
      );
    });
  });

  describe('real-world Indonesian examples', () => {
    it('handles common Indonesian phrases', () => {
      expect(toSentenceCase('SELAMAT PAGI. APA KABAR? BAIK-BAIK SAJA.')).toBe(
        'Selamat pagi. Apa kabar? Baik-baik saja.'
      );
    });

    it('handles formal Indonesian', () => {
      expect(toSentenceCase('DENGAN HORMAT. KAMI SAMPAIKAN HAL BERIKUT.')).toBe(
        'Dengan hormat. Kami sampaikan hal berikut.'
      );
    });

    it('handles Indonesian names and places', () => {
      expect(
        toSentenceCase('JOKO TINGGAL DI JAKARTA. DIA BEKERJA DI BANDUNG.')
      ).toBe('Joko tinggal di jakarta. Dia bekerja di bandung.');
    });

    it('handles Indonesian questions and answers', () => {
      expect(toSentenceCase('SIAPA NAMA ANDA? NAMA SAYA BUDI.')).toBe(
        'Siapa nama anda? Nama saya budi.'
      );
    });
  });

  describe('real-world English examples', () => {
    it('handles simple English conversation', () => {
      expect(toSentenceCase('HELLO. HOW ARE YOU? I AM FINE.')).toBe(
        'Hello. How are you? I am fine.'
      );
    });

    it('handles English with commas', () => {
      expect(toSentenceCase('HELLO, WORLD. GOODBYE, FRIEND.')).toBe(
        'Hello, world. Goodbye, friend.'
      );
    });

    it('handles English exclamations', () => {
      expect(toSentenceCase('WOW! THAT IS AMAZING! INCREDIBLE!')).toBe(
        'Wow! That is amazing! Incredible!'
      );
    });
  });

  describe('performance', () => {
    it('handles very long text efficiently', () => {
      const longText = 'sentence. '.repeat(1000); // 10,000 chars
      const start = performance.now();
      const result = toSentenceCase(longText);
      const end = performance.now();

      expect(result.startsWith('Sentence.')).toBe(true);
      expect(end - start).toBeLessThan(10); // < 10ms
    });

    it('handles text with many punctuation marks', () => {
      const text = 'hello. world! how? '.repeat(500);
      const start = performance.now();
      toSentenceCase(text);
      const end = performance.now();

      expect(end - start).toBeLessThan(10);
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'HELLO. WORLD.';
      const result = toSentenceCase(original);

      expect(original).toBe('HELLO. WORLD.');
      expect(result).toBe('Hello. World.');
    });
  });

  describe('type safety', () => {
    it('accepts string and returns string', () => {
      const text: string = 'hello. world.';
      const result: string = toSentenceCase(text);
      expect(typeof result).toBe('string');
    });
  });

  describe('consistency with capitalize', () => {
    it('matches capitalize for single word', () => {
      const word = 'HELLO';
      expect(toSentenceCase(word)).toBe('Hello');
    });

    it('differs from capitalize for multi-word', () => {
      const text = 'HELLO WORLD';
      expect(toSentenceCase(text)).toBe('Hello world');
      // Note: capitalize would return 'Hello world' too
    });
  });

  describe('edge cases - sentence without ending', () => {
    it('handles sentence without punctuation', () => {
      expect(toSentenceCase('hello world')).toBe('Hello world');
    });

    it('handles multiple sentences, last without punctuation', () => {
      expect(toSentenceCase('hello. world')).toBe('Hello. World');
    });
  });

  describe('edge cases - only punctuation', () => {
    it('handles only period', () => {
      expect(toSentenceCase('.')).toBe('.');
    });

    it('handles only exclamation', () => {
      expect(toSentenceCase('!')).toBe('!');
    });

    it('handles only question mark', () => {
      expect(toSentenceCase('?')).toBe('?');
    });

    it('handles multiple punctuation only', () => {
      expect(toSentenceCase('...!!!')).toBe('...!!!');
    });
  });

  describe('edge cases - newlines (if not normalized)', () => {
    it('handles text with newlines', () => {
      expect(toSentenceCase('hello.\nworld.')).toBe('Hello. World.');
    });

    it('handles text with tabs', () => {
      expect(toSentenceCase('hello.\tworld.')).toBe('Hello. World.');
    });

    it('handles mixed whitespace characters', () => {
      expect(toSentenceCase('hello.  \n\t  world.')).toBe('Hello. World.');
    });
  });
});
