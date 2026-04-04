import { describe, it, expect } from 'vitest';
import { maskText } from '../mask';

describe('maskText', () => {
  describe('pattern: all', () => {
    it('masks all characters in a single word', () => {
      expect(maskText('Budi', { pattern: 'all' })).toBe('****');
    });

    it('masks all characters but preserves spaces', () => {
      expect(maskText('Budi Santoso', { pattern: 'all' })).toBe('**** *******');
    });

    it('supports custom mask character', () => {
      expect(maskText('123456789', { pattern: 'all', maskChar: '#' })).toBe(
        '#########'
      );
    });

    it('handles empty string', () => {
      expect(maskText('', { pattern: 'all' })).toBe('');
    });

    it('handles single character', () => {
      expect(maskText('A', { pattern: 'all' })).toBe('*');
    });

    it('handles string with only spaces', () => {
      expect(maskText('   ', { pattern: 'all' })).toBe('   ');
    });
  });

  describe('pattern: middle', () => {
    it('keeps default visibleStart and visibleEnd', () => {
      expect(maskText('ABCDEF', { pattern: 'middle' })).toBe('AB**EF');
    });

    it('supports custom visibleStart and visibleEnd', () => {
      expect(
        maskText('08123456789', {
          pattern: 'middle',
          visibleStart: 4,
          visibleEnd: 3,
        })
      ).toBe('0812****789');
    });

    it('masks all when string is shorter than visible parts', () => {
      expect(
        maskText('AB', {
          pattern: 'middle',
          visibleStart: 2,
          visibleEnd: 2,
        })
      ).toBe('**');
    });

    it('handles string exactly equal to visible parts', () => {
      expect(
        maskText('ABCD', {
          pattern: 'middle',
          visibleStart: 2,
          visibleEnd: 2,
        })
      ).toBe('ABCD');
    });

    it('handles string one char longer than visible parts', () => {
      expect(
        maskText('ABCDE', {
          pattern: 'middle',
          visibleStart: 2,
          visibleEnd: 2,
        })
      ).toBe('AB*DE');
    });

    it('handles empty string', () => {
      expect(maskText('', { pattern: 'middle' })).toBe('');
    });

    it('handles single character', () => {
      expect(maskText('A', { pattern: 'middle' })).toBe('*');
    });

    it('supports custom mask character', () => {
      expect(
        maskText('1234567890', {
          pattern: 'middle',
          maskChar: '#',
          visibleStart: 3,
          visibleEnd: 3,
        })
      ).toBe('123####890');
    });

    it('handles phone number masking', () => {
      expect(
        maskText('081234567890', {
          pattern: 'middle',
          visibleStart: 4,
          visibleEnd: 4,
        })
      ).toBe('0812****7890');
    });
  });

  describe('pattern: email', () => {
    it('masks local part keeping first 2 chars and domain', () => {
      expect(maskText('user@example.com', { pattern: 'email' })).toBe(
        'us**@example.com'
      );
    });

    it('handles short local part (2 chars)', () => {
      expect(maskText('ab@example.com', { pattern: 'email' })).toBe(
        'ab@example.com'
      );
    });

    it('handles single char local part', () => {
      expect(maskText('a@test.com', { pattern: 'email' })).toBe('a*@test.com');
    });

    it('handles longer local part', () => {
      expect(maskText('john.doe@company.org', { pattern: 'email' })).toBe(
        'jo******@company.org'
      );
    });

    it('handles empty string', () => {
      expect(maskText('', { pattern: 'email' })).toBe('');
    });

    it('falls back to middle masking when no @ symbol', () => {
      expect(maskText('notanemail', { pattern: 'email' })).toBe('no********');
    });

    it('supports custom mask character', () => {
      expect(
        maskText('user@example.com', { pattern: 'email', maskChar: '#' })
      ).toBe('us##@example.com');
    });
  });

  describe('default behavior', () => {
    it('uses middle pattern by default', () => {
      expect(maskText('HelloWorld')).toBe('He******ld');
    });

    it('handles undefined text gracefully', () => {
      expect(maskText('' as string)).toBe('');
    });
  });
});
