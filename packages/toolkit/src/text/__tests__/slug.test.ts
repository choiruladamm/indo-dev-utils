import { describe, it, expect } from 'vitest';
import { slugify } from '../slug';

describe('slugify', () => {
  describe('basic functionality', () => {
    it('converts simple text to slug', () => {
      expect(slugify('hello world')).toBe('hello-world');
    });

    it('converts uppercase to lowercase', () => {
      expect(slugify('HELLO WORLD')).toBe('hello-world');
    });

    it('converts mixed case to lowercase', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('handles single word', () => {
      expect(slugify('hello')).toBe('hello');
    });

    it('handles multiple words', () => {
      expect(slugify('cara mudah belajar typescript')).toBe(
        'cara-mudah-belajar-typescript'
      );
    });
  });

  describe('Indonesian conjunctions - ampersand (&)', () => {
    it('replaces & with "dan"', () => {
      expect(slugify('ibu & anak')).toBe('ibu-dan-anak');
    });

    it('handles multiple ampersands', () => {
      expect(slugify('a & b & c')).toBe('a-dan-b-dan-c');
    });

    it('handles ampersand without spaces', () => {
      expect(slugify('a&b')).toBe('a-dan-b');
    });

    it('handles ampersand with colons', () => {
      expect(slugify('ibu & anak: tips kesehatan')).toBe(
        'ibu-dan-anak-tips-kesehatan'
      );
    });
  });

  describe('Indonesian conjunctions - slash (/)', () => {
    it('replaces / with "atau"', () => {
      expect(slugify('pria/wanita')).toBe('pria-atau-wanita');
    });

    it('handles multiple slashes', () => {
      expect(slugify('a/b/c')).toBe('a-atau-b-atau-c');
    });

    it('handles slash with spaces', () => {
      expect(slugify('baju pria / wanita')).toBe('baju-pria-atau-wanita');
    });
  });

  describe('Indonesian conjunctions - combined', () => {
    it('handles both & and / together', () => {
      expect(slugify('a & b / c')).toBe('a-dan-b-atau-c');
    });

    it('handles complex combinations', () => {
      expect(slugify('kategori a & b / c & d')).toBe(
        'kategori-a-dan-b-atau-c-dan-d'
      );
    });
  });

  describe('special characters - removal', () => {
    it('removes punctuation', () => {
      expect(slugify('hello, world!')).toBe('hello-world');
    });

    it('removes parentheses', () => {
      expect(slugify('harga (diskon 20%)')).toBe('harga-diskon-20');
    });

    it('removes brackets', () => {
      expect(slugify('item [new]')).toBe('item-new');
    });

    it('removes currency symbols', () => {
      expect(slugify('harga rp 100.000')).toBe('harga-rp-100000');
    });

    it('removes at symbol', () => {
      expect(slugify('email@example.com')).toBe('emailexamplecom');
    });

    it('removes percentage', () => {
      expect(slugify('diskon 20%')).toBe('diskon-20');
    });

    it('removes asterisks', () => {
      expect(slugify('note: *important*')).toBe('note-important');
    });

    it('removes quotes', () => {
      expect(slugify('"hello" world')).toBe('hello-world');
    });

    it('removes apostrophes', () => {
      expect(slugify("it's great")).toBe('its-great');
    });
  });

  describe('special characters - complex removal', () => {
    it('removes multiple types of special chars', () => {
      expect(slugify('hello! world? #great @home')).toBe(
        'hello-world-great-home'
      );
    });

    it('handles unicode special characters', () => {
      expect(slugify('hello™ world®')).toBe('hello-world');
    });

    it('removes emoji placeholders', () => {
      expect(slugify('hello :smile: world')).toBe('hello-smile-world');
    });
  });

  describe('numbers', () => {
    it('preserves numbers', () => {
      expect(slugify('tahun 2024')).toBe('tahun-2024');
    });

    it('handles numbers at start', () => {
      expect(slugify('2024 trends')).toBe('2024-trends');
    });

    it('handles numbers at end', () => {
      expect(slugify('version 2')).toBe('version-2');
    });

    it('handles multiple numbers', () => {
      expect(slugify('1 2 3 test')).toBe('1-2-3-test');
    });

    it('removes decimal points but keeps numbers', () => {
      expect(slugify('price 10.000')).toBe('price-10000');
    });
  });

  describe('multiple spaces', () => {
    it('collapses multiple spaces to single separator', () => {
      expect(slugify('hello    world')).toBe('hello-world');
    });

    it('handles tabs as spaces', () => {
      expect(slugify('hello\tworld')).toBe('hello-world');
    });

    it('handles mixed whitespace', () => {
      expect(slugify('hello  \t  world')).toBe('hello-world');
    });

    it('handles many spaces', () => {
      expect(slugify('a     b     c')).toBe('a-b-c');
    });
  });

  describe('multiple separators', () => {
    it('collapses multiple hyphens', () => {
      expect(slugify('hello---world')).toBe('hello-world');
    });

    it('collapses mixed separators from special chars', () => {
      expect(slugify('produk   terbaru - - - 2024')).toBe(
        'produk-terbaru-2024'
      );
    });

    it('handles consecutive special chars creating separators', () => {
      expect(slugify('hello!!!world')).toBe('hello-world');
    });
  });

  describe('leading and trailing', () => {
    it('trims leading spaces', () => {
      expect(slugify('  hello world')).toBe('hello-world');
    });

    it('trims trailing spaces', () => {
      expect(slugify('hello world  ')).toBe('hello-world');
    });

    it('trims both leading and trailing spaces', () => {
      expect(slugify('  hello world  ')).toBe('hello-world');
    });

    it('trims leading separators', () => {
      expect(slugify('---hello')).toBe('hello');
    });

    it('trims trailing separators', () => {
      expect(slugify('hello---')).toBe('hello');
    });

    it('trims both leading and trailing separators', () => {
      expect(slugify('---hello---')).toBe('hello');
    });
  });

  describe('edge cases - empty and whitespace', () => {
    it('returns empty string for empty input', () => {
      expect(slugify('')).toBe('');
    });

    it('returns empty string for whitespace only', () => {
      expect(slugify('   ')).toBe('');
    });

    it('returns empty string for special chars only', () => {
      expect(slugify('!!!')).toBe('');
    });

    it('returns empty string for separators only', () => {
      expect(slugify('---')).toBe('');
    });
  });

  describe('Unicode and accents', () => {
    it('handles accented characters', () => {
      expect(slugify('café résumé')).toBe('caf-rsum');
    });

    it('handles umlauts', () => {
      expect(slugify('über naïve')).toBe('ber-nave');
    });

    it('removes non-ASCII special characters', () => {
      expect(slugify('hello™ world©')).toBe('hello-world');
    });
  });

  describe('options - separator', () => {
    it('uses underscore separator', () => {
      expect(slugify('hello world', { separator: '_' })).toBe('hello_world');
    });

    it('uses dot separator', () => {
      expect(slugify('hello world', { separator: '.' })).toBe('hello.world');
    });

    it('uses custom separator', () => {
      expect(slugify('hello world', { separator: '|' })).toBe('hello|world');
    });

    it('collapses multiple custom separators', () => {
      expect(slugify('hello___world', { separator: '_' })).toBe('hello_world');
    });

    it('replaces existing hyphens with custom separator', () => {
      expect(slugify('hello-world', { separator: '_' })).toBe('hello_world');
    });
  });

  describe('options - lowercase', () => {
    it('preserves case when lowercase: false', () => {
      expect(slugify('Hello World', { lowercase: false })).toBe('Hello-World');
    });

    it('preserves uppercase when lowercase: false', () => {
      expect(slugify('HELLO WORLD', { lowercase: false })).toBe('HELLO-WORLD');
    });

    it('preserves mixed case when lowercase: false', () => {
      expect(slugify('HeLLo WoRLd', { lowercase: false })).toBe('HeLLo-WoRLd');
    });

    it('lowercases by default', () => {
      expect(slugify('HELLO WORLD')).toBe('hello-world');
    });
  });

  describe('options - replacements', () => {
    it('applies single custom replacement', () => {
      expect(
        slugify('C++ programming', {
          replacements: { 'C++': 'cpp' },
        })
      ).toBe('cpp-programming');
    });

    it('applies multiple custom replacements', () => {
      expect(
        slugify('C++ and C#', {
          replacements: { 'C++': 'cpp', 'C#': 'csharp' },
        })
      ).toBe('cpp-and-csharp');
      // Note: 'and' is English word, not '&' symbol
      // Only '&' gets replaced with 'dan', not the word 'and'
    });

    it('applies replacements before conjunction replacement', () => {
      expect(
        slugify('C++ & C#', {
          replacements: { 'C++': 'cpp', 'C#': 'csharp' },
        })
      ).toBe('cpp-dan-csharp');
      // '&' gets replaced with 'dan'
    });

    it('replacements are case-sensitive', () => {
      expect(
        slugify('c++ programming', {
          replacements: { 'C++': 'cpp' },
        })
      ).toBe('c-programming');
      // Doesn't match because lowercase
    });

    it('replacements happen before other processing', () => {
      expect(
        slugify('Node.js & React', {
          replacements: { 'Node.js': 'nodejs', React: 'reactjs' },
        })
      ).toBe('nodejs-dan-reactjs');
    });

    it('handles overlapping replacements', () => {
      expect(
        slugify('hello world', {
          replacements: { hello: 'hi', world: 'earth' },
        })
      ).toBe('hi-earth');
    });
  });

  describe('options - trim', () => {
    it('trims by default', () => {
      expect(slugify('---hello---')).toBe('hello');
    });

    it('keeps separators when trim: false', () => {
      expect(slugify('---hello---', { trim: false })).toBe('---hello---');
    });

    it('keeps leading separator when trim: false', () => {
      expect(slugify('---hello', { trim: false })).toBe('---hello');
    });

    it('keeps trailing separator when trim: false', () => {
      expect(slugify('hello---', { trim: false })).toBe('hello---');
    });
  });

  describe('options - combined', () => {
    it('handles all options together', () => {
      expect(
        slugify('C++ & Node.js', {
          separator: '_',
          lowercase: false,
          replacements: { 'C++': 'cpp', 'Node.js': 'nodejs' },
          trim: true,
        })
      ).toBe('cpp_dan_nodejs');
    });

    it('custom separator with lowercase: false', () => {
      expect(
        slugify('Hello World', {
          separator: '_',
          lowercase: false,
        })
      ).toBe('Hello_World');
    });

    it('replacements with custom separator', () => {
      expect(
        slugify('C++ programming', {
          separator: '_',
          replacements: { 'C++': 'cpp' },
        })
      ).toBe('cpp_programming');
    });
  });

  describe('real-world Indonesian examples', () => {
    it('handles product titles', () => {
      expect(slugify('Sepatu Olahraga Pria/Wanita (Diskon 50%)')).toBe(
        'sepatu-olahraga-pria-atau-wanita-diskon-50'
      );
    });

    it('handles article titles', () => {
      expect(slugify('Cara Mudah & Cepat Belajar TypeScript')).toBe(
        'cara-mudah-dan-cepat-belajar-typescript'
      );
    });

    it('handles category names', () => {
      expect(slugify('Ibu & Anak: Tips Kesehatan')).toBe(
        'ibu-dan-anak-tips-kesehatan'
      );
    });

    it('handles blog post titles', () => {
      expect(slugify('10 Tempat Wisata di Jakarta (Update 2024)')).toBe(
        '10-tempat-wisata-di-jakarta-update-2024'
      );
    });

    it('handles prices', () => {
      expect(slugify('Harga Rp 1.500.000')).toBe('harga-rp-1500000');
    });
  });

  describe('real-world English examples', () => {
    it('handles tech article titles', () => {
      expect(slugify('How to Build a REST API with Node.js')).toBe(
        'how-to-build-a-rest-api-with-nodejs'
      );
    });

    it('handles product names with versions', () => {
      expect(slugify('iPhone 15 Pro Max (256GB)')).toBe(
        'iphone-15-pro-max-256gb'
      );
    });

    it('handles programming languages', () => {
      expect(
        slugify('C++, Python & JavaScript', {
          replacements: { 'C++': 'cpp' },
        })
      ).toBe('cpp-python-dan-javascript');
    });
  });

  describe('performance', () => {
    it('handles very long strings efficiently', () => {
      const longText = 'word '.repeat(1000);
      const start = performance.now();
      const result = slugify(longText);
      const end = performance.now();

      expect(result.length).toBeGreaterThan(0);
      expect(end - start).toBeLessThan(10); // < 10ms
    });

    it('handles many special characters efficiently', () => {
      const text = 'hello!@#$%^&*()world'.repeat(100);
      const start = performance.now();
      slugify(text);
      const end = performance.now();

      expect(end - start).toBeLessThan(10);
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'Hello World';
      const result = slugify(original);

      expect(original).toBe('Hello World');
      expect(result).toBe('hello-world');
    });

    it('does not modify options object', () => {
      const options = { separator: '_', lowercase: false };
      slugify('Hello World', options);

      expect(options).toEqual({ separator: '_', lowercase: false });
    });
  });

  describe('type safety', () => {
    it('accepts string and optional options', () => {
      const text: string = 'test';
      const result: string = slugify(text);
      expect(result).toBe('test');
    });

    it('returns string type', () => {
      const result = slugify('test');
      expect(typeof result).toBe('string');
    });
  });

  describe('edge cases - additional', () => {
    it('handles null-like inputs gracefully', () => {
      // TypeScript should catch these, but good for runtime safety
      expect(slugify('')).toBe('');
    });

    it('handles very long separator sequences', () => {
      expect(slugify('hello----------world')).toBe('hello-world');
    });

    it('handles mixed special chars and spaces', () => {
      expect(slugify('hello  !!!  world')).toBe('hello-world');
    });

    it('handles numbers with mixed separators', () => {
      expect(slugify('1.000.000,50')).toBe('1000000-50');
      // Indonesian format: titik untuk ribuan, koma untuk desimal
    });

    it('handles emoji removal', () => {
      expect(slugify('hello 😀 world 🎉')).toBe('hello-world');
    });

    it('handles consecutive different special chars', () => {
      expect(slugify('hello!@#$%world')).toBe('hello-world');
    });

    it('handles zero-width characters', () => {
      expect(slugify('hello\u200Bworld')).toBe('hello-world'); // FIXED: treat as space
      // Zero-width space is whitespace, becomes separator
    });
  });

  describe('Indonesian-specific edge cases', () => {
    it('handles "dan" word vs & symbol correctly', () => {
      // 'dan' as word should stay, '&' should become 'dan'
      expect(slugify('ibu dan anak')).toBe('ibu-dan-anak');
      expect(slugify('ibu & anak')).toBe('ibu-dan-anak');
    });

    it('handles "atau" word vs / symbol correctly', () => {
      expect(slugify('pria atau wanita')).toBe('pria-atau-wanita');
      expect(slugify('pria/wanita')).toBe('pria-atau-wanita');
    });

    it('handles conjunctions with no spaces', () => {
      expect(slugify('a&b&c')).toBe('a-dan-b-dan-c');
      expect(slugify('a/b/c')).toBe('a-atau-b-atau-c');
    });
  });

  describe('options - replacements edge cases', () => {
    it('handles replacement that creates special chars', () => {
      expect(
        slugify('test', {
          replacements: { test: 'hello@world' },
        })
      ).toBe('helloworld');
      // @ should be removed after replacement
    });

    it('applies replacements in order (chaining allowed)', () => {
      expect(
        slugify('abc', {
          replacements: { abc: 'def', def: 'ghi' },
        })
      ).toBe('ghi');
    });

    it('handles regex special chars in replacement keys', () => {
      expect(
        slugify('C++ & C#', {
          replacements: { 'C++': 'cpp', 'C#': 'csharp' },
        })
      ).toBe('cpp-dan-csharp');
    });
  });

  describe('separator edge cases', () => {
    it('handles multi-char separator', () => {
      expect(slugify('hello world', { separator: '__' })).toBe('hello__world');
    });

    it('handles separator same as special char in text', () => {
      expect(slugify('hello_world', { separator: '_' })).toBe('hello_world');
    });

    it('handles empty separator (should still work)', () => {
      expect(slugify('hello world', { separator: '' })).toBe('helloworld');
    });
  });
});
