import { describe, it, expect } from 'vitest';
import { normalizeWhitespace, sanitize, removeAccents } from '../sanitize';

describe('normalizeWhitespace', () => {
  describe('basic functionality', () => {
    it('collapses multiple spaces to single space', () => {
      expect(normalizeWhitespace('hello    world')).toBe('hello world');
    });

    it('collapses double spaces', () => {
      expect(normalizeWhitespace('hello  world')).toBe('hello world');
    });

    it('handles single space (no change)', () => {
      expect(normalizeWhitespace('hello world')).toBe('hello world');
    });

    it('handles text without spaces', () => {
      expect(normalizeWhitespace('hello')).toBe('hello');
    });
  });

  describe('tab characters', () => {
    it('converts single tab to space', () => {
      expect(normalizeWhitespace('hello\tworld')).toBe('hello world');
    });

    it('converts multiple tabs to single space', () => {
      expect(normalizeWhitespace('hello\t\t\tworld')).toBe('hello world');
    });

    it('handles mixed tabs and spaces', () => {
      expect(normalizeWhitespace('hello  \t  world')).toBe('hello world');
    });
  });

  describe('newline characters', () => {
    it('converts single newline to space', () => {
      expect(normalizeWhitespace('hello\nworld')).toBe('hello world');
    });

    it('converts multiple newlines to single space', () => {
      expect(normalizeWhitespace('hello\n\n\nworld')).toBe('hello world');
    });

    it('handles Windows line endings (CRLF)', () => {
      expect(normalizeWhitespace('hello\r\nworld')).toBe('hello world');
    });

    it('handles Mac line endings (CR)', () => {
      expect(normalizeWhitespace('hello\rworld')).toBe('hello world');
    });
  });

  describe('mixed whitespace types', () => {
    it('handles spaces, tabs, and newlines together', () => {
      expect(normalizeWhitespace('hello  \t\n  world')).toBe('hello world');
    });

    it('handles complex mixed whitespace', () => {
      expect(normalizeWhitespace('line1\n\nline2\t\tline3   line4')).toBe(
        'line1 line2 line3 line4'
      );
    });

    it('normalizes paragraph text', () => {
      expect(
        normalizeWhitespace('paragraph1\n\nparagraph2\n\nparagraph3')
      ).toBe('paragraph1 paragraph2 paragraph3');
    });
  });

  describe('leading and trailing whitespace', () => {
    it('trims leading spaces', () => {
      expect(normalizeWhitespace('  hello world')).toBe('hello world');
    });

    it('trims trailing spaces', () => {
      expect(normalizeWhitespace('hello world  ')).toBe('hello world');
    });

    it('trims both leading and trailing spaces', () => {
      expect(normalizeWhitespace('  hello world  ')).toBe('hello world');
    });

    it('trims leading tabs', () => {
      expect(normalizeWhitespace('\t\thello')).toBe('hello');
    });

    it('trims trailing newlines', () => {
      expect(normalizeWhitespace('hello\n\n')).toBe('hello');
    });

    it('trims mixed leading/trailing whitespace', () => {
      expect(normalizeWhitespace('\n\t  hello world  \t\n')).toBe(
        'hello world'
      );
    });
  });

  describe('edge cases - empty and whitespace only', () => {
    it('returns empty string for empty input', () => {
      expect(normalizeWhitespace('')).toBe('');
    });

    it('returns empty string for spaces only', () => {
      expect(normalizeWhitespace('   ')).toBe('');
    });

    it('returns empty string for tabs only', () => {
      expect(normalizeWhitespace('\t\t\t')).toBe('');
    });

    it('returns empty string for newlines only', () => {
      expect(normalizeWhitespace('\n\n\n')).toBe('');
    });

    it('returns empty string for mixed whitespace only', () => {
      expect(normalizeWhitespace('  \t\n\r  ')).toBe('');
    });
  });

  describe('special whitespace characters', () => {
    it('handles form feed', () => {
      expect(normalizeWhitespace('hello\fworld')).toBe('hello world');
    });

    it('handles vertical tab', () => {
      expect(normalizeWhitespace('hello\vworld')).toBe('hello world');
    });

    it('handles non-breaking space', () => {
      expect(normalizeWhitespace('hello\u00A0world')).toBe('hello world');
    });

    it('handles em space', () => {
      expect(normalizeWhitespace('hello\u2003world')).toBe('hello world');
    });

    it('handles thin space', () => {
      expect(normalizeWhitespace('hello\u2009world')).toBe('hello world');
    });
  });

  describe('real-world scenarios', () => {
    it('normalizes code with inconsistent indentation', () => {
      const code = '  function test() {\n\t\treturn true;\n  }';
      expect(normalizeWhitespace(code)).toBe(
        'function test() { return true; }'
      );
    });

    it('normalizes pasted text from different sources', () => {
      const text = 'Line from Windows\r\nLine from Mac\rLine from Unix\n';
      expect(normalizeWhitespace(text)).toBe(
        'Line from Windows Line from Mac Line from Unix'
      );
    });

    it('normalizes user input with extra spaces', () => {
      const input = '  John    Doe  ';
      expect(normalizeWhitespace(input)).toBe('John Doe');
    });

    it('normalizes multi-line form text', () => {
      const text = 'Address:\n123 Main St\n\nCity: Jakarta';
      expect(normalizeWhitespace(text)).toBe(
        'Address: 123 Main St City: Jakarta'
      );
    });
  });

  describe('preserves content', () => {
    it('preserves single spaces between words', () => {
      expect(normalizeWhitespace('hello world test')).toBe('hello world test');
    });

    it('preserves punctuation', () => {
      expect(normalizeWhitespace('hello, world!')).toBe('hello, world!');
    });

    it('preserves numbers', () => {
      expect(normalizeWhitespace('test 123 abc')).toBe('test 123 abc');
    });

    it('preserves special characters', () => {
      expect(normalizeWhitespace('a + b = c')).toBe('a + b = c');
    });
  });

  describe('performance', () => {
    it('handles very long strings efficiently', () => {
      const longText = 'word '.repeat(10000);
      const start = performance.now();
      normalizeWhitespace(longText);
      const end = performance.now();
      expect(end - start).toBeLessThan(10); // < 10ms
    });

    it('handles many whitespace characters efficiently', () => {
      const text = ' \t\n'.repeat(5000);
      const start = performance.now();
      normalizeWhitespace(text);
      const end = performance.now();
      expect(end - start).toBeLessThan(10);
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'hello    world';
      const result = normalizeWhitespace(original);

      expect(original).toBe('hello    world');
      expect(result).toBe('hello world');
    });
  });

  describe('type safety', () => {
    it('accepts string and returns string', () => {
      const text: string = 'test';
      const result: string = normalizeWhitespace(text);
      expect(typeof result).toBe('string');
    });
  });
});

describe('sanitize', () => {
  describe('default behavior', () => {
    it('removes extra spaces by default', () => {
      expect(sanitize('hello    world')).toBe('hello world');
    });

    it('trims by default', () => {
      expect(sanitize('  hello world  ')).toBe('hello world');
    });

    it('preserves single spaces', () => {
      expect(sanitize('hello world')).toBe('hello world');
    });

    it('preserves content by default', () => {
      expect(sanitize('hello, world!')).toBe('hello, world!');
    });
  });

  describe('removeNewlines option', () => {
    it('removes newlines when enabled', () => {
      expect(sanitize('line1\nline2\nline3', { removeNewlines: true })).toBe(
        'line1 line2 line3'
      );
    });

    it('removes carriage returns', () => {
      expect(sanitize('line1\r\nline2', { removeNewlines: true })).toBe(
        'line1 line2'
      );
    });

    it('preserves newlines by default', () => {
      expect(sanitize('line1\nline2')).toBe('line1\nline2');
    });

    it('collapses multiple newlines to single space', () => {
      expect(sanitize('line1\n\n\nline2', { removeNewlines: true })).toBe(
        'line1 line2'
      );
    });
  });

  describe('removePunctuation option', () => {
    it('removes punctuation when enabled', () => {
      expect(sanitize('Hello, World!', { removePunctuation: true })).toBe(
        'Hello World'
      );
    });

    it('removes various punctuation marks', () => {
      expect(sanitize('a!b@c#d$e%f', { removePunctuation: true })).toBe(
        'abcdef'
      );
    });

    it('removes brackets and quotes', () => {
      expect(
        sanitize('(hello) "world" [test]', { removePunctuation: true })
      ).toBe('hello world test');
    });

    it('preserves punctuation by default', () => {
      expect(sanitize('hello, world!')).toBe('hello, world!');
    });
  });

  describe('allowedChars option', () => {
    it('keeps only letters and numbers', () => {
      expect(sanitize('ABC123!@#', { allowedChars: 'A-Za-z0-9' })).toBe(
        'ABC123'
      );
    });

    it('keeps only lowercase letters', () => {
      expect(sanitize('Hello123!@#', { allowedChars: 'a-z' })).toBe('ello');
    });

    it('keeps only numbers', () => {
      expect(sanitize('abc123def456', { allowedChars: '0-9' })).toBe('123456');
    });

    it('keeps letters, numbers, and spaces', () => {
      expect(sanitize('Hello 123!', { allowedChars: 'A-Za-z0-9 ' })).toBe(
        'Hello 123'
      );
    });

    it('removes all when no chars match', () => {
      expect(sanitize('!!!', { allowedChars: 'a-z' })).toBe('');
    });
  });

  describe('trim option', () => {
    it('trims by default', () => {
      expect(sanitize('  hello  ')).toBe('hello');
    });

    it('keeps spaces when trim: false', () => {
      expect(sanitize('  hello  ', { trim: false })).toBe('  hello  ');
    });

    it('still normalizes spaces with trim: false', () => {
      expect(sanitize('hello    world', { trim: false })).toBe('hello world');
    });
  });

  describe('removeExtraSpaces option', () => {
    it('removes extra spaces by default', () => {
      expect(sanitize('hello    world')).toBe('hello world');
    });

    it('keeps extra spaces when disabled', () => {
      expect(sanitize('hello    world', { removeExtraSpaces: false })).toBe(
        'hello    world'
      );
    });

    it('still trims with removeExtraSpaces: false', () => {
      expect(sanitize('  hello  ', { removeExtraSpaces: false })).toBe('hello');
    });
  });

  describe('combined options', () => {
    it('applies all options together', () => {
      expect(
        sanitize('  Hello,\n  World!  ', {
          removeNewlines: true,
          removePunctuation: true,
          removeExtraSpaces: true,
          trim: true,
        })
      ).toBe('Hello World');
    });

    it('removes punctuation and keeps only letters', () => {
      expect(
        sanitize('Hello, World! 123', {
          removePunctuation: true,
          allowedChars: 'A-Za-z ',
        })
      ).toBe('Hello World');
    });

    it('normalizes complex messy text', () => {
      expect(
        sanitize('  Hello,\n\n  World!!!  \t\t', {
          removeNewlines: true,
          removePunctuation: true,
        })
      ).toBe('Hello World');
    });
  });

  describe('edge cases', () => {
    it('returns empty string for empty input', () => {
      expect(sanitize('')).toBe('');
    });

    it('returns empty string for whitespace only', () => {
      expect(sanitize('   ')).toBe('');
    });

    it('returns empty when all chars removed', () => {
      expect(sanitize('!!!', { removePunctuation: true })).toBe('');
    });

    it('handles single character', () => {
      expect(sanitize('a')).toBe('a');
    });
  });

  describe('real-world scenarios', () => {
    it('cleans up user input', () => {
      const input = '  John   Doe  \n\n  ';
      expect(sanitize(input, { removeNewlines: true })).toBe('John Doe');
    });

    it('sanitizes form data', () => {
      const input = 'Email: test@example.com!!!';
      expect(sanitize(input, { removePunctuation: true })).toBe(
        'Email testexamplecom'
      );
    });

    it('cleans CSV data', () => {
      const input = '  "John Doe"  ,  "123"  ';
      expect(sanitize(input, { removePunctuation: true })).toBe('John Doe 123');
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'hello    world';
      const result = sanitize(original);

      expect(original).toBe('hello    world');
      expect(result).toBe('hello world');
    });
  });
});

describe('removeAccents', () => {
  describe('basic functionality', () => {
    it('removes acute accent', () => {
      expect(removeAccents('café')).toBe('cafe');
    });

    it('removes grave accent', () => {
      expect(removeAccents('è')).toBe('e');
    });

    it('removes circumflex', () => {
      expect(removeAccents('être')).toBe('etre');
    });

    it('removes diaeresis/umlaut', () => {
      expect(removeAccents('naïve')).toBe('naive');
    });

    it('removes tilde', () => {
      expect(removeAccents('señor')).toBe('senor');
    });
  });

  describe('multiple accents', () => {
    it('removes all accents in word', () => {
      expect(removeAccents('résumé')).toBe('resume');
    });

    it('removes accents from multiple words', () => {
      expect(removeAccents('café résumé')).toBe('cafe resume');
    });

    it('handles mixed accented and non-accented', () => {
      expect(removeAccents('hello café world')).toBe('hello cafe world');
    });
  });

  describe('various languages', () => {
    it('handles French accents', () => {
      expect(removeAccents('École française')).toBe('Ecole francaise');
    });

    it('handles Spanish accents', () => {
      expect(removeAccents('Español mañana')).toBe('Espanol manana');
    });

    it('handles German umlauts', () => {
      expect(removeAccents('Zürich über')).toBe('Zurich uber');
    });

    it('handles Portuguese accents', () => {
      expect(removeAccents('São Paulo')).toBe('Sao Paulo');
    });

    it('handles Nordic accents', () => {
      expect(removeAccents('Åse Øst')).toBe('Ase Ost');
    });
  });

  describe('uppercase and lowercase', () => {
    it('handles uppercase accents', () => {
      expect(removeAccents('CAFÉ')).toBe('CAFE');
    });

    it('handles mixed case', () => {
      expect(removeAccents('CaFé')).toBe('CaFe');
    });

    it('preserves case', () => {
      expect(removeAccents('École FRANÇAISE')).toBe('Ecole FRANCAISE');
    });
  });

  describe('edge cases', () => {
    it('returns empty string for empty input', () => {
      expect(removeAccents('')).toBe('');
    });

    it('returns unchanged for no accents', () => {
      expect(removeAccents('hello world')).toBe('hello world');
    });

    it('handles single accented character', () => {
      expect(removeAccents('é')).toBe('e');
    });

    it('handles numbers and punctuation', () => {
      expect(removeAccents('café 123!')).toBe('cafe 123!');
    });
  });

  describe('preserves non-accent characters', () => {
    it('preserves spaces', () => {
      expect(removeAccents('café résumé')).toBe('cafe resume');
    });

    it('preserves punctuation', () => {
      expect(removeAccents('café, résumé!')).toBe('cafe, resume!');
    });

    it('preserves numbers', () => {
      expect(removeAccents('café 123')).toBe('cafe 123');
    });
  });

  describe('real-world usage', () => {
    it('normalizes for search', () => {
      expect(removeAccents('École Française à Montréal')).toBe(
        'Ecole Francaise a Montreal'
      );
    });

    it('normalizes for URL slugs', () => {
      expect(removeAccents('São Paulo - Brasil')).toBe('Sao Paulo - Brasil');
    });

    it('normalizes names', () => {
      expect(removeAccents('José María García')).toBe('Jose Maria Garcia');
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'café';
      const result = removeAccents(original);

      expect(original).toBe('café');
      expect(result).toBe('cafe');
    });
  });

  describe('performance', () => {
    it('handles long strings efficiently', () => {
      const longText = 'café résumé '.repeat(1000);
      const start = performance.now();
      removeAccents(longText);
      const end = performance.now();
      expect(end - start).toBeLessThan(10);
    });
  });
});
