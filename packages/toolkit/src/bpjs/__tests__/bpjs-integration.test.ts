import { describe, it, expect } from 'vitest';
import {
  validateBPJS,
  detectBPJSType,
  formatBPJS,
  parseBPJS,
  maskBPJS,
  cleanBPJS,
  InvalidBPJSError,
} from '../index';

describe('BPJS integration', () => {
  describe('full round-trip: kesehatan', () => {
    const raw = '0001234567890';
    const formatted = '0001-2345-67890';

    it('cleanBPJS → validateBPJS → formatBPJS round-trip', () => {
      const cleaned = cleanBPJS(formatted);
      expect(validateBPJS(cleaned, 'kesehatan')).toBe(true);
      expect(formatBPJS(cleaned, 'kesehatan')).toBe(formatted);
    });

    it('parseBPJS(formatted).raw === cleanBPJS(formatted)', () => {
      expect(parseBPJS(formatted)?.raw).toBe(cleanBPJS(formatted));
    });

    it('parseBPJS(formatted).formatted === formatBPJS(raw)', () => {
      const parsed = parseBPJS(formatted)!;
      expect(parsed.formatted).toBe(formatBPJS(raw, 'kesehatan'));
    });

    it('maskBPJS output length === raw length', () => {
      const masked = maskBPJS(raw);
      expect(masked.length).toBe(raw.length);
    });
  });

  describe('full round-trip: ketenagakerjaan', () => {
    const raw = '12345678901';
    const formatted = '1234-567-8901';

    it('cleanBPJS → validateBPJS → formatBPJS round-trip', () => {
      const cleaned = cleanBPJS(formatted);
      expect(validateBPJS(cleaned, 'ketenagakerjaan')).toBe(true);
      expect(formatBPJS(cleaned, 'ketenagakerjaan')).toBe(formatted);
    });

    it('parseBPJS(formatted).raw === cleanBPJS(formatted)', () => {
      expect(parseBPJS(formatted)?.raw).toBe(cleanBPJS(formatted));
    });

    it('parseBPJS(formatted).formatted === formatBPJS(raw)', () => {
      const parsed = parseBPJS(formatted)!;
      expect(parsed.formatted).toBe(formatBPJS(raw, 'ketenagakerjaan'));
    });
  });

  describe('InvalidBPJSError', () => {
    it('is exported and catchable', () => {
      let caught: unknown;
      try {
        formatBPJS('12345', 'kesehatan');
      } catch (e) {
        caught = e;
      }
      expect(caught).toBeInstanceOf(InvalidBPJSError);
      expect((caught as InvalidBPJSError).code).toBe('INVALID_BPJS');
    });

    it('has default message', () => {
      const err = new InvalidBPJSError();
      expect(err.message).toBe('Invalid BPJS number');
    });

    it('has custom message when provided', () => {
      const err = new InvalidBPJSError('Custom message');
      expect(err.message).toBe('Custom message');
    });

    it('has name of InvalidBPJSError', () => {
      const err = new InvalidBPJSError();
      expect(err.name).toBe('InvalidBPJSError');
    });
  });

  describe('detectBPJSType', () => {
    it('type detected matches validateBPJS result', () => {
      const n13 = '0001234567890';
      const type = detectBPJSType(n13);
      expect(type).toBe('kesehatan');
      expect(validateBPJS(n13, type!)).toBe(true);
    });

    it('detected type is valid for formatBPJS', () => {
      const n11 = '12345678901';
      const type = detectBPJSType(n11);
      expect(type).toBe('ketenagakerjaan');
      // Should not throw
      expect(formatBPJS(n11, type!)).toBe('1234-567-8901');
    });
  });

  describe('cleanBPJS is used by all functions', () => {
    it('formatBPJS handles prefixed input', () => {
      expect(formatBPJS('BPJS: 0001234567890', 'kesehatan')).toBe('0001-2345-67890');
    });

    it('validateBPJS handles prefixed input', () => {
      expect(validateBPJS('BPJS: 0001234567890', 'kesehatan')).toBe(true);
    });

    it('maskBPJS handles prefixed input', () => {
      expect(maskBPJS('BPJS: 0001234567890')).toBe('0001*******90');
    });
  });
});