import { describe, it, expect } from 'vitest';
import { truncate, extractWords } from '../extract';

describe('truncate', () => {
  describe('basic functionality', () => {
    it('truncates long text to specified length', () => {
      expect(truncate('Ini adalah contoh text yang panjang', 20)).toBe(
        'Ini adalah...'
      );
    });

    it('returns original text if shorter than maxLength', () => {
      expect(truncate('Short text', 20)).toBe('Short text');
    });

    it('returns original text if exactly maxLength', () => {
      expect(truncate('Exact length', 12)).toBe('Exact length');
    });

    it('handles text exactly one char over limit', () => {
      expect(truncate('Hello World!', 11)).toBe('Hello...');
    });
  });

  describe('word boundary handling', () => {
    it('respects word boundaries by default', () => {
      const text = 'Ini adalah contoh text yang panjang';
      const result = truncate(text, 20);

      // Should stop at last complete word before limit
      expect(result).toBe('Ini adalah...');
      expect(result.length).toBeLessThanOrEqual(20);
    });

    it('cuts mid-word when wordBoundary is false', () => {
      const text = 'Ini adalah contoh text yang panjang';
      const result = truncate(text, 20, { wordBoundary: false });

      expect(result).toBe('Ini adalah contoh...');
      expect(result.length).toBeLessThanOrEqual(20);
    });

    it('handles single long word', () => {
      const text = 'Supercalifragilisticexpialidocious';
      const result = truncate(text, 15);

      // Should truncate even single long word
      expect(result).toBe('Supercalifra...');
      expect(result.length).toBeLessThanOrEqual(15);
    });

    it('handles text with no spaces', () => {
      const text = 'HelloWorldThisIsALongText';
      const result = truncate(text, 15, { wordBoundary: true });

      // No spaces found, should truncate anyway
      expect(result).toBe('HelloWorldTh...');
      expect(result.length).toBeLessThanOrEqual(15);
    });
  });

  describe('custom ellipsis', () => {
    it('uses custom ellipsis string', () => {
      const text = 'Ini adalah contoh text yang panjang';
      const result = truncate(text, 20, { ellipsis: '…' });

      expect(result).toBe('Ini adalah contoh…');
      expect(result.endsWith('…')).toBe(true);
    });

    it('uses longer custom ellipsis', () => {
      const text = 'Ini adalah contoh text yang panjang';
      const result = truncate(text, 20, { ellipsis: ' [...]' });

      expect(result).toBe('Ini adalah [...]');
      expect(result.endsWith('[...]')).toBe(true);
      expect(result.length).toBeLessThanOrEqual(20);
    });

    it('handles empty ellipsis', () => {
      const text = 'Ini adalah contoh text yang panjang';
      const result = truncate(text, 20, { ellipsis: '' });

      expect(result).toBe('Ini adalah contoh');
      expect(result.length).toBeLessThanOrEqual(20);
    });

    it('handles ellipsis longer than maxLength', () => {
      const text = 'Hello World';
      const result = truncate(text, 5, { ellipsis: '......' });

      // Should return ellipsis truncated to maxLength
      expect(result).toBe('.....');
      expect(result.length).toBe(5);
    });
  });

  describe('edge cases', () => {
    it('handles empty string', () => {
      expect(truncate('', 10)).toBe('');
    });

    it('handles null-like input gracefully', () => {
      // @ts-expect-error testing runtime behavior
      expect(truncate(null, 10)).toBe('');

      // @ts-expect-error testing runtime behavior
      expect(truncate(undefined, 10)).toBe('');
    });

    it('handles maxLength of 0', () => {
      expect(truncate('Hello', 0)).toBe('');
    });

    it('handles negative maxLength', () => {
      expect(truncate('Hello', -5)).toBe('');
    });

    it('handles maxLength of 1', () => {
      expect(truncate('Hello', 1)).toBe('.');
    });

    it('handles maxLength of 2', () => {
      expect(truncate('Hello', 2)).toBe('..');
    });

    it('handles maxLength of 3 (exactly ellipsis length)', () => {
      expect(truncate('Hello', 3)).toBe('...');
    });

    it('handles maxLength of 4 (one char + ellipsis)', () => {
      expect(truncate('Hello', 4)).toBe('H...');
    });
  });

  describe('whitespace handling', () => {
    it('trims trailing whitespace before ellipsis', () => {
      const text = 'Hello World Test Case';
      const result = truncate(text, 13, { wordBoundary: true });

      // Should be 'Hello...' because 'Hello World...' would be 14 chars
      expect(result).toBe('Hello...');
      expect(result).not.toContain(' ...');
    });

    it('handles multiple spaces', () => {
      const text = 'Hello    World    Test';
      const result = truncate(text, 15, { wordBoundary: true });

      expect(result.endsWith('...')).toBe(true);
      // Word boundary mode will cut at last space, won't preserve multiple internal spaces
    });

    it('handles leading spaces', () => {
      const text = '   Hello World Test';
      const result = truncate(text, 12);

      expect(result.startsWith(' ')).toBe(true);
      expect(result.endsWith('...')).toBe(true);
    });

    it('handles trailing spaces in original text', () => {
      const text = 'Hello World    ';
      const result = truncate(text, 10);

      expect(result).toBe('Hello...');
    });
  });

  describe('Indonesian language examples', () => {
    it('truncates Indonesian sentences correctly', () => {
      const text =
        'Selamat datang di Indonesia, negara kepulauan terbesar di dunia';
      const result = truncate(text, 30);

      expect(result).toBe('Selamat datang di...');
      expect(result.length).toBeLessThanOrEqual(30);
    });

    it('handles Indonesian names', () => {
      const text = 'Presiden Joko Widodo mengunjungi Jakarta Pusat';
      const result = truncate(text, 25);

      expect(result).toBe('Presiden Joko Widodo...');
    });

    it('handles Indonesian hyphenated words', () => {
      const text = 'Anak-anak bermain di taman dengan gembira';
      const result = truncate(text, 25);

      expect(result).toBe('Anak-anak bermain di...');
    });
  });

  describe('combined options', () => {
    it('combines custom ellipsis with wordBoundary false', () => {
      const text = 'Ini adalah contoh text yang panjang';
      const result = truncate(text, 20, {
        ellipsis: '…',
        wordBoundary: false,
      });

      expect(result).toBe('Ini adalah contoh t…');
      expect(result.length).toBe(20);
    });

    it('combines custom ellipsis with wordBoundary true', () => {
      const text = 'Ini adalah contoh text yang panjang';
      const result = truncate(text, 20, {
        ellipsis: '…',
        wordBoundary: true,
      });

      expect(result).toBe('Ini adalah contoh…');
      expect(result.length).toBeLessThanOrEqual(20);
    });
  });

  describe('special characters', () => {
    it('handles text with punctuation', () => {
      const text = 'Hello, World! How are you doing today?';
      const result = truncate(text, 20);

      expect(result).toBe('Hello, World!...');
    });

    it('handles text with numbers', () => {
      const text = 'Product ABC123 costs Rp 100.000 with 20% discount';
      const result = truncate(text, 25);

      expect(result).toBe('Product ABC123 costs...');
    });

    it('handles text with special symbols', () => {
      const text = 'Email: test@example.com & phone: +62-123-456';
      const result = truncate(text, 25);

      expect(result).toBe('Email:...');
    });
  });

  describe('real-world use cases', () => {
    it('truncates product description for card', () => {
      const description =
        'Smartphone terbaru dengan kamera 108MP, layar AMOLED 6.7 inch, dan baterai 5000mAh';
      const result = truncate(description, 50);

      expect(result.length).toBeLessThanOrEqual(50);
      expect(result.endsWith('...')).toBe(true);
    });

    it('truncates blog post preview', () => {
      const content =
        'Dalam artikel ini kita akan membahas cara membuat aplikasi web menggunakan React dan TypeScript';
      const result = truncate(content, 60);

      expect(result.length).toBeLessThanOrEqual(60);
      // The last "word" will be the ellipsis when text is truncated
      expect(result.endsWith('...')).toBe(true);
    });

    it('truncates user comment for notification', () => {
      const comment = 'Terima kasih banyak atas bantuan dan support-nya!';
      const result = truncate(comment, 30);

      expect(result).toBe('Terima kasih banyak atas...');
    });
  });

  describe('performance', () => {
    it('handles very long text efficiently', () => {
      const longText = 'word '.repeat(10000); // 50,000 characters
      const start = performance.now();
      const result = truncate(longText, 50);
      const end = performance.now();

      expect(result.length).toBeLessThanOrEqual(50);
      expect(end - start).toBeLessThan(5); // Should be very fast
    });
  });
});

describe('extractWords', () => {
  describe('basic functionality', () => {
    it('extracts words from simple sentence', () => {
      expect(extractWords('Anak-anak bermain di taman')).toEqual([
        'Anak-anak',
        'bermain',
        'di',
        'taman',
      ]);
    });

    it('extracts words from text with punctuation', () => {
      expect(extractWords('Hello, World! How are you?')).toEqual([
        'Hello',
        'World',
        'How',
        'are',
        'you',
      ]);
    });

    it('handles multiple spaces', () => {
      expect(extractWords('  Hello    World  ')).toEqual(['Hello', 'World']);
    });
  });

  describe('hyphenated word handling', () => {
    it('includes hyphenated words by default', () => {
      expect(
        extractWords('Anak-anak bermain di taman', { includeHyphenated: true })
      ).toEqual(['Anak-anak', 'bermain', 'di', 'taman']);
    });

    it('separates hyphenated words when includeHyphenated is false', () => {
      expect(
        extractWords('Anak-anak bermain di taman', { includeHyphenated: false })
      ).toEqual(['Anak', 'anak', 'bermain', 'di', 'taman']);
    });

    it('handles multiple hyphens in one word', () => {
      expect(extractWords('one-two-three')).toEqual(['one-two-three']);
    });

    it('handles hyphens with spaces (not hyphenated word)', () => {
      expect(extractWords('one - two')).toEqual(['one', 'two']);
    });
  });

  describe('minLength filtering', () => {
    it('filters small words', () => {
      expect(extractWords('Di rumah ada 3 kucing', { minLength: 3 })).toEqual([
        'rumah',
        'ada',
        'kucing',
      ]);
    });

    it('keeps all words when minLength is 0 or 1', () => {
      expect(extractWords('a b c', { minLength: 1 })).toEqual(['a', 'b', 'c']);
    });

    it('filters everything if minLength is huge', () => {
      expect(extractWords('Hello World', { minLength: 100 })).toEqual([]);
    });
  });

  describe('lowercase options', () => {
    it('converts to lowercase when enabled', () => {
      expect(extractWords('Hello WORLD', { lowercase: true })).toEqual([
        'hello',
        'world',
      ]);
    });

    it('preserves case when disabled', () => {
      expect(extractWords('Hello WORLD', { lowercase: false })).toEqual([
        'Hello',
        'WORLD',
      ]);
    });
  });

  describe('edge cases', () => {
    it('handles empty string', () => {
      expect(extractWords('')).toEqual([]);
    });

    it('handles whitespace only', () => {
      expect(extractWords('   ')).toEqual([]);
    });

    it('handles special characters only', () => {
      expect(extractWords('!@#$%^&*()')).toEqual([]);
    });

    it('handles numbers', () => {
      expect(extractWords('123 456')).toEqual(['123', '456']);
    });
  });

  describe('Indonesian complex examples', () => {
    it('handles repeated words correctly', () => {
      const text = 'Kupu-kupu terbang di atas bunga-bunga';
      expect(extractWords(text)).toEqual([
        'Kupu-kupu',
        'terbang',
        'di',
        'atas',
        'bunga-bunga',
      ]);
    });

    it('handles mixed content', () => {
      const text = 'Harga: Rp 50.000,- (lima puluh ribu)';
      // Punctuation removed, so "Rp", "50", "000", "lima", "puluh", "ribu"
      // Note: punctuation removal replaces non-word chars with space.
      // 50.000 -> 50 000
      expect(extractWords(text)).toEqual([
        'Harga',
        'Rp',
        '50',
        '000',
        'lima',
        'puluh',
        'ribu',
      ]);
    });
  });
});
