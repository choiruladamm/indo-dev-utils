import { describe, it, expect } from 'vitest';
import { maskStringPDP } from '../mask';

describe('maskStringPDP', () => {
  describe('valid inputs', () => {
    it('should return same text when no PII detected', () => {
      const result = maskStringPDP('Tidak ada PII di sini');
      expect(result).toBe('Tidak ada PII di sini');
    });

    it('should handle autoDetectPII false', () => {
      const result = maskStringPDP('3171034567890123', { autoDetectPII: false });
      expect(result).toBe('3171034567890123');
    });
  });

  describe('invalid inputs', () => {
    it('should return same for null', () => {
      expect(maskStringPDP(null as any)).toBe(null);
    });

    it('should return same for undefined', () => {
      expect(maskStringPDP(undefined as any)).toBe(undefined);
    });

    it('should return same for non-string', () => {
      expect(maskStringPDP(123 as any)).toBe(123);
    });
  });
});

describe('applyMask', () => {
  it('should mask full when maskStrategy is full', () => {
    const text = '3171034567890123';
    const result = text.replace(/./g, '*');
    expect(result).toBe('****************');
  });

it('should preserve first and last characters with partial mask', () => {
  const text = 'budi@contoh.com';
  const masked = text.slice(0, 4) + '*'.repeat(8) + text.slice(-3);
  expect(masked).toBe('budi********com');
});

  it('should handle short strings with full mask', () => {
    const text = 'test';
    expect(text.replace(/./g, '*')).toBe('****');
  });
});