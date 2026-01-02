import { describe, it, expect } from 'vitest';
import { compareStrings, similarity } from '../compare';

describe('compareStrings', () => {
  describe('basic functionality', () => {
    it('returns true for identical strings', () => {
      expect(compareStrings('Hello', 'Hello')).toBe(true);
    });

    it('returns false for different strings', () => {
      expect(compareStrings('Hello', 'World')).toBe(false);
    });

    it('defaults to case-insensitive comparison (as per implementation)', () => {
      // Note: Implementation defaults options to false/undefined
      // if caseSensitive defaults to false in destructuring, then matches default behavior
      expect(compareStrings('Hello', 'hello')).toBe(true);
    });
  });

  describe('case sensitivity', () => {
    it('ignores case by default', () => {
      expect(compareStrings('Hello', 'HELLO')).toBe(true);
    });

    it('respects case when caseSensitive is true', () => {
      expect(compareStrings('Hello', 'hello', { caseSensitive: true })).toBe(
        false
      );
    });
  });

  describe('whitespace handling', () => {
    it('respects whitespace by default', () => {
      expect(compareStrings('Hello World', 'Hello   World')).toBe(false);
    });

    it('ignores whitespace differences when enabled', () => {
      expect(
        compareStrings('Hello   World', 'Hello World', {
          ignoreWhitespace: true,
        })
      ).toBe(true);
    });

    it('ignores leading/trailing whitespace when ignoreWhitespace is true', () => {
      expect(
        compareStrings('  Hello World  ', 'Hello World', {
          ignoreWhitespace: true,
        })
      ).toBe(true);
    });

    it('handles tabs and newlines', () => {
      expect(
        compareStrings('Hello\tWorld', 'Hello World', {
          ignoreWhitespace: true,
        })
      ).toBe(true);
    });
  });

  describe('accent handling', () => {
    it('respects accents by default', () => {
      expect(compareStrings('café', 'cafe')).toBe(false);
    });

    it('ignores accents when enabled', () => {
      expect(compareStrings('café', 'cafe', { ignoreAccents: true })).toBe(
        true
      );
    });

    it('ignores accents combined with case insensitivity', () => {
      expect(compareStrings('CAFÉ', 'cafe', { ignoreAccents: true })).toBe(
        true
      );
    });
  });

  describe('edge cases', () => {
    it('handles empty strings', () => {
      expect(compareStrings('', '')).toBe(true);
    });

    it('handles mismatched empty strings', () => {
      expect(compareStrings('a', '')).toBe(false);
    });

    it('treats null/undefined as empty string (robustness)', () => {
      // @ts-expect-error testing runtime behavior
      expect(compareStrings(null, '')).toBe(true);
      // @ts-expect-error testing runtime behavior
      expect(compareStrings(undefined, '')).toBe(true);
    });
  });

  describe('Indonesian context', () => {
    it('compares Indonesian text ignoring structure', () => {
      // Case insensitive match
      expect(compareStrings('Jalan Sudirman', 'jalan sudirman')).toBe(true);
    });

    it('compares loose user input', () => {
      const dbValue = 'Jakarta Selatan';
      const userInput = '  jakarta   selatan  ';
      expect(
        compareStrings(dbValue, userInput, { ignoreWhitespace: true })
      ).toBe(true);
    });
  });
});

describe('similarity', () => {
  it('returns 1.0 for identical strings', () => {
    expect(similarity('hello', 'hello')).toBe(1.0);
  });

  it('returns 0.0 for completely different strings', () => {
    // 'abc' vs 'xyz' -> 3 edits, max length 3 -> 1 - 3/3 = 0
    expect(similarity('abc', 'xyz')).toBe(0.0);
  });

  it('calculates correct score for single char difference', () => {
    // 'hello' vs 'hallo' -> 1 substitution, max length 5 -> 1 - 1/5 = 0.8
    expect(similarity('hello', 'hallo')).toBe(0.8);
  });

  it('calculates correct score for insertion', () => {
    // 'hello' vs 'hell' -> 1 deletion, max length 5 -> 1 - 1/5 = 0.8
    expect(similarity('hello', 'hell')).toBe(0.8);
  });

  it('calculates correct score for completely different words', () => {
    // 'kitten' vs 'sitting' (classic Levenshtein example)
    // distance is 3:
    // k -> s (sub)
    // i -> i (match)
    // t -> t (match)
    // t -> t (match)
    // e -> i (sub)
    // n -> n (match)
    // + g (insert)
    // Max length 7 ('sitting')
    // Score = 1 - 3/7 ≈ 0.5714
    expect(similarity('kitten', 'sitting')).toBeCloseTo(0.5714, 4);
  });

  it('handles empty strings', () => {
    expect(similarity('', '')).toBe(1.0);
    expect(similarity('a', '')).toBe(0.0);
    expect(similarity('', 'a')).toBe(0.0);
  });

  it('is case sensitive', () => {
    // 'Hello' vs 'hello' -> 1 substitution (H -> h)
    // 1 - 1/5 = 0.8
    expect(similarity('Hello', 'hello')).toBe(0.8);
  });

  it('handles Indonsian typo example', () => {
    // 'Jakarta' vs 'Jakart' -> 1 deletion
    expect(similarity('Jakarta', 'Jakart')).toBeCloseTo(0.857, 3);

    // 'Surabaya' vs 'Surabaja' (old spelling) -> 1 sub
    expect(similarity('Surabaya', 'Surabaja')).toBe(0.875);
  });
});
