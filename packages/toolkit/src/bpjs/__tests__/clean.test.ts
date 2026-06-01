import { describe, it, expect } from 'vitest';
import { cleanBPJS } from '../clean';

describe('cleanBPJS', () => {
  it('removes dashes from formatted kesehatan number', () => {
    expect(cleanBPJS('0001-2345-67890')).toBe('0001234567890');
  });

  it('removes dashes from formatted ketenagakerjaan number', () => {
    expect(cleanBPJS('1234-567-8901')).toBe('12345678901');
  });

  it('removes spaces', () => {
    expect(cleanBPJS('00012 34567 890')).toBe('0001234567890');
  });

  it('removes prefix text', () => {
    expect(cleanBPJS('BPJS: 12345678901')).toBe('12345678901');
  });

  it('returns unchanged already-clean string', () => {
    expect(cleanBPJS('0001234567890')).toBe('0001234567890');
  });

  it('returns empty string for empty input', () => {
    expect(cleanBPJS('')).toBe('');
  });

  it('returns empty string for non-string input', () => {
    expect(cleanBPJS(null as any)).toBe('');
    expect(cleanBPJS(undefined as any)).toBe('');
  });

  it('returns empty string for all-alpha input', () => {
    expect(cleanBPJS('BPJSKESEHATAN')).toBe('');
  });
});