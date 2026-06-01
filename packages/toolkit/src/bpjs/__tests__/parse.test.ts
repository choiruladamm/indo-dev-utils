import { describe, it, expect } from 'vitest';
import { parseBPJS } from '../parse';

describe('parseBPJS', () => {
  it('parses 13-digit number as kesehatan', () => {
    const result = parseBPJS('0001234567890');
    expect(result).toEqual({
      type: 'kesehatan',
      raw: '0001234567890',
      formatted: '0001-2345-67890',
    });
  });

  it('parses formatted kesehatan number (strips separators)', () => {
    const result = parseBPJS('0001-2345-67890');
    expect(result?.raw).toBe('0001234567890');
    expect(result?.formatted).toBe('0001-2345-67890');
  });

  it('parses 11-digit number as ketenagakerjaan', () => {
    const result = parseBPJS('12345678901');
    expect(result).toEqual({
      type: 'ketenagakerjaan',
      raw: '12345678901',
      formatted: '1234-567-8901',
    });
  });

  it('parses formatted ketenagakerjaan number', () => {
    const result = parseBPJS('1234-567-8901');
    expect(result?.type).toBe('ketenagakerjaan');
    expect(result?.raw).toBe('12345678901');
  });

  it('returns null for 9-digit string', () => {
    expect(parseBPJS('123456789')).toBeNull();
  });

  it('returns null for 12-digit string', () => {
    expect(parseBPJS('000123456789')).toBeNull();
  });

  it('returns null for 14-digit string', () => {
    expect(parseBPJS('00012345678901')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseBPJS('')).toBeNull();
  });

  it('returns null for null input', () => {
    expect(parseBPJS(null as any)).toBeNull();
  });

  it('returns null for non-numeric input', () => {
    expect(parseBPJS('BPJSKESEHATAN')).toBeNull();
  });

  it('raw field is always digits-only', () => {
    const result = parseBPJS('0001-2345-67890');
    expect(result?.raw).toMatch(/^\d+$/);
  });

  it('formatted field matches formatBPJS(raw, type)', () => {
    const result = parseBPJS('0001234567890')!;
    expect(result.formatted).toBe('0001-2345-67890');
  });

  it('formatted field matches formatBPJS(raw, type) for ketenagakerjaan', () => {
    const result = parseBPJS('12345678901')!;
    expect(result.formatted).toBe('1234-567-8901');
  });
});