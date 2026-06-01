import { describe, it, expect } from 'vitest';
import { formatBPJS } from '../format';
import { InvalidBPJSError } from '../types';

describe('formatBPJS', () => {
  describe('kesehatan', () => {
    it('formats 13-digit number as XXXX-XXXX-XXXXX', () => {
      expect(formatBPJS('0001234567890', 'kesehatan')).toBe('0001-2345-67890');
    });

    it('is idempotent — formatted input yields same output', () => {
      expect(formatBPJS('0001-2345-67890', 'kesehatan')).toBe('0001-2345-67890');
    });

    it('formats raw number without separators', () => {
      const raw = '0001234567890';
      expect(formatBPJS(raw, 'kesehatan')).toBe('0001-2345-67890');
    });

    it('throws InvalidBPJSError for 12-digit number', () => {
      expect(() => formatBPJS('000123456789', 'kesehatan')).toThrow(InvalidBPJSError);
    });

    it('throws InvalidBPJSError for 14-digit number', () => {
      expect(() => formatBPJS('00012345678901', 'kesehatan')).toThrow(InvalidBPJSError);
    });

    it('throws InvalidBPJSError for empty string', () => {
      expect(() => formatBPJS('', 'kesehatan')).toThrow(InvalidBPJSError);
    });

    it('throws InvalidBPJSError for non-numeric string', () => {
      expect(() => formatBPJS('BPJSKESEHATAN', 'kesehatan')).toThrow(InvalidBPJSError);
    });
  });

  describe('ketenagakerjaan', () => {
    it('formats 11-digit number as XXXX-XXX-XXXX', () => {
      expect(formatBPJS('12345678901', 'ketenagakerjaan')).toBe('1234-567-8901');
    });

    it('is idempotent — formatted input yields same output', () => {
      expect(formatBPJS('1234-567-8901', 'ketenagakerjaan')).toBe('1234-567-8901');
    });

    it('throws InvalidBPJSError for wrong type (13-digit passed as ketenagakerjaan)', () => {
      expect(() =>
        formatBPJS('0001234567890', 'ketenagakerjaan')
      ).toThrow(InvalidBPJSError);
    });

    it('throws InvalidBPJSError for 10-digit number', () => {
      expect(() => formatBPJS('1234567890', 'ketenagakerjaan')).toThrow(InvalidBPJSError);
    });

    it('throws InvalidBPJSError for empty string', () => {
      expect(() => formatBPJS('', 'ketenagakerjaan')).toThrow(InvalidBPJSError);
    });
  });
});