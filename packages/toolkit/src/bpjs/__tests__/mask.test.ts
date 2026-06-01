import { describe, it, expect } from 'vitest';
import { maskBPJS } from '../mask';

describe('maskBPJS', () => {
  it('masks middle digits with * by default (visibleStart=4, visibleEnd=2)', () => {
    // 13 digits, default 4+2 = 7 mask chars
    expect(maskBPJS('0001234567890')).toBe('0001*******90');
  });

  it('applies custom visibleStart and visibleEnd', () => {
    expect(maskBPJS('0001234567890', { visibleStart: 2, visibleEnd: 2 })).toBe('00*********90');
  });

  it('applies custom maskChar', () => {
    expect(maskBPJS('0001234567890', { maskChar: 'X' })).toBe('0001XXXXXXX90');
  });

  it('accepts formatted input and operates on raw digits', () => {
    expect(maskBPJS('0001-2345-67890')).toBe('0001*******90');
  });

  it('returns full raw string when visibleStart + visibleEnd >= length', () => {
    // 13-digit number, visibleStart=7, visibleEnd=7 → 14 >= 13
    expect(maskBPJS('0001234567890', { visibleStart: 7, visibleEnd: 7 })).toBe('0001234567890');
  });

  it('returns full raw string when exactly equals length', () => {
    expect(maskBPJS('0001234567890', { visibleStart: 6, visibleEnd: 7 })).toBe('0001234567890');
  });

  it('returns empty string for empty input', () => {
    expect(maskBPJS('')).toBe('');
  });

  it('returns empty string for null input', () => {
    expect(maskBPJS(null as any)).toBe('');
  });

  it('returns empty string for undefined input', () => {
    expect(maskBPJS(undefined as any)).toBe('');
  });

  it('mask length is correct: length - visibleStart - visibleEnd', () => {
    const result = maskBPJS('0001234567890'); // 13 digits, default 4+2
    const masked = result.slice(4, result.length - 2);
    expect(masked).toBe('*******'); // 13 - 4 - 2 = 7 asterisks
  });

  it('ketenagakerjaan 11-digit masks correctly', () => {
    // 11 digits, default 4+2 = 5 mask chars
    expect(maskBPJS('12345678901')).toBe('1234*****01');
  });
});