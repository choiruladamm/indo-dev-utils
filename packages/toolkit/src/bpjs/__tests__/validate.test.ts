import { describe, it, expect } from 'vitest';
import {
  validateBPJS,
  validateBPJSKesehatan,
  validateBPJSKetenagakerjaan,
  detectBPJSType,
} from '../validate';

describe('validateBPJS', () => {
  describe('kesehatan', () => {
    it('returns true for 13-digit numeric string', () => {
      expect(validateBPJS('0001234567890', 'kesehatan')).toBe(true);
    });

    it('returns true for formatted string with dashes', () => {
      expect(validateBPJS('0001-2345-67890', 'kesehatan')).toBe(true);
    });

    it('returns false for 12-digit string', () => {
      expect(validateBPJS('000123456789', 'kesehatan')).toBe(false);
    });

    it('returns false for 14-digit string', () => {
      expect(validateBPJS('00012345678901', 'kesehatan')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(validateBPJS('', 'kesehatan')).toBe(false);
    });

    it('returns false for null', () => {
      expect(validateBPJS(null as any, 'kesehatan')).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(validateBPJS(undefined as any, 'kesehatan')).toBe(false);
    });

    it('returns false for non-numeric string', () => {
      expect(validateBPJS('BPJSKESEHATAN', 'kesehatan')).toBe(false);
    });
  });

  describe('ketenagakerjaan', () => {
    it('returns true for 11-digit numeric string', () => {
      expect(validateBPJS('12345678901', 'ketenagakerjaan')).toBe(true);
    });

    it('returns true for formatted string', () => {
      expect(validateBPJS('1234-567-8901', 'ketenagakerjaan')).toBe(true);
    });

    it('returns false for 10-digit string', () => {
      expect(validateBPJS('1234567890', 'ketenagakerjaan')).toBe(false);
    });

    it('returns false for 13-digit string (kesehatan length)', () => {
      expect(validateBPJS('0001234567890', 'ketenagakerjaan')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(validateBPJS('', 'ketenagakerjaan')).toBe(false);
    });

    it('returns false for null', () => {
      expect(validateBPJS(null as any, 'ketenagakerjaan')).toBe(false);
    });
  });
});

describe('validateBPJSKesehatan', () => {
  it('returns true for valid 13-digit number', () => {
    expect(validateBPJSKesehatan('0001234567890')).toBe(true);
  });

  it('returns false for 12-digit number', () => {
    expect(validateBPJSKesehatan('000123456789')).toBe(false);
  });

  it('returns false for 14-digit number', () => {
    expect(validateBPJSKesehatan('00012345678901')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(validateBPJSKesehatan('')).toBe(false);
  });

  it('returns false for null', () => {
    expect(validateBPJSKesehatan(null as any)).toBe(false);
  });
});

describe('validateBPJSKetenagakerjaan', () => {
  it('returns true for valid 11-digit number', () => {
    expect(validateBPJSKetenagakerjaan('12345678901')).toBe(true);
  });

  it('returns false for 10-digit number', () => {
    expect(validateBPJSKetenagakerjaan('1234567890')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(validateBPJSKetenagakerjaan('')).toBe(false);
  });

  it('returns false for null', () => {
    expect(validateBPJSKetenagakerjaan(null as any)).toBe(false);
  });
});

describe('detectBPJSType', () => {
  it('returns kesehatan for 13-digit input', () => {
    expect(detectBPJSType('0001234567890')).toBe('kesehatan');
  });

  it('returns ketenagakerjaan for 11-digit input', () => {
    expect(detectBPJSType('12345678901')).toBe('ketenagakerjaan');
  });

  it('returns ketenagakerjaan for formatted 11-digit input', () => {
    expect(detectBPJSType('1234-567-8901')).toBe('ketenagakerjaan');
  });

  it('returns null for 9-digit input', () => {
    expect(detectBPJSType('123456789')).toBe(null);
  });

  it('returns null for 14-digit input', () => {
    expect(detectBPJSType('00012345678901')).toBe(null);
  });

  it('returns null for 12-digit input', () => {
    expect(detectBPJSType('000123456789')).toBe(null);
  });

  it('returns null for empty string', () => {
    expect(detectBPJSType('')).toBe(null);
  });

  it('returns null for null input', () => {
    expect(detectBPJSType(null as any)).toBe(null);
  });

  it('returns null for non-numeric input', () => {
    expect(detectBPJSType('BPJSKESEHATAN')).toBe(null);
  });
});