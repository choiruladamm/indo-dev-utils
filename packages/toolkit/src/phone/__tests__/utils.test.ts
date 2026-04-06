import { describe, it, expect } from 'vitest';
import {
  normalizePhoneNumber,
  comparePhones,
  getLandlineRegion,
} from '../utils';

describe('normalizePhoneNumber', () => {
  describe('valid inputs (happy path)', () => {
    it('should normalize +62 prefix to national format', () => {
      expect(normalizePhoneNumber('+6281234567890')).toBe('081234567890');
    });

    it('should normalize 62 prefix (without +) to national format', () => {
      expect(normalizePhoneNumber('6281234567890')).toBe('081234567890');
    });

    it('should return national format unchanged', () => {
      expect(normalizePhoneNumber('081234567890')).toBe('081234567890');
    });

    it('should normalize XL number (+62)', () => {
      expect(normalizePhoneNumber('+6281734567890')).toBe('081734567890');
    });

    it('should normalize Indosat number (62)', () => {
      expect(normalizePhoneNumber('6281434567890')).toBe('081434567890');
    });
  });

  describe('invalid inputs (edge cases)', () => {
    it('should return empty string for empty string', () => {
      expect(normalizePhoneNumber('')).toBe('');
    });

    it('should return empty string for 620 prefix (invalid)', () => {
      expect(normalizePhoneNumber('620812345678')).toBe('');
    });

    it('should return empty string for invalid format', () => {
      expect(normalizePhoneNumber('invalid')).toBe('');
    });

    it('should return empty string for unrecognized patterns', () => {
      expect(normalizePhoneNumber('123456')).toBe('');
    });

    it('should return empty string for null input', () => {
      expect(normalizePhoneNumber(null as any)).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(normalizePhoneNumber(undefined as any)).toBe('');
    });
  });
});

describe('comparePhones', () => {
  describe('same number in different formats (happy path)', () => {
    it('should match national vs international with +', () => {
      expect(comparePhones('081234567890', '+6281234567890')).toBe(true);
    });

    it('should match national vs international without +', () => {
      expect(comparePhones('081234567890', '6281234567890')).toBe(true);
    });

    it('should match numbers with separators', () => {
      expect(comparePhones('0812-3456-7890', '+62 812-3456-7890')).toBe(true);
    });

    it('should match landline numbers', () => {
      expect(comparePhones('0212345678', '+62212345678')).toBe(true);
    });

    it('should match XL numbers', () => {
      expect(comparePhones('081734567890', '6281734567890')).toBe(true);
    });

    it('should match Smartfren numbers', () => {
      expect(comparePhones('088134567890', '+6288134567890')).toBe(true);
    });
  });

  describe('different numbers (included in happy path)', () => {
    it('should return false for different numbers', () => {
      expect(comparePhones('081234567890', '081234567891')).toBe(false);
    });

    it('should return false for different operators', () => {
      expect(comparePhones('081234567890', '081734567890')).toBe(false);
    });

    it('should return false for different area codes', () => {
      expect(comparePhones('0212345678', '0221234567')).toBe(false);
    });
  });

  describe('invalid inputs (edge cases)', () => {
    it('should return false when one input is invalid', () => {
      expect(comparePhones('invalid', '081234567890')).toBe(false);
    });

    it('should return false for empty strings', () => {
      expect(comparePhones('', '')).toBe(false);
    });

    it('should return false when one is empty', () => {
      expect(comparePhones('081234567890', '')).toBe(false);
    });

    it('should return false for null first input', () => {
      expect(comparePhones(null as any, '081234567890')).toBe(false);
    });

    it('should return false for undefined second input', () => {
      expect(comparePhones('081234567890', undefined as any)).toBe(false);
    });

    it('should return false for both null', () => {
      expect(comparePhones(null as any, undefined as any)).toBe(false);
    });
  });
});

describe('getLandlineRegion', () => {
  describe('valid landline numbers (happy path)', () => {
    it('should return Jakarta for 021', () => {
      expect(getLandlineRegion('0212345678')).toBe('Jakarta');
    });

    it('should return Bandung for 022', () => {
      expect(getLandlineRegion('0221234567')).toBe('Bandung');
    });

    it('should return Surabaya for 031', () => {
      expect(getLandlineRegion('0311234567')).toBe('Surabaya');
    });

    it('should return Yogyakarta for 0274', () => {
      expect(getLandlineRegion('0274123456')).toBe('Yogyakarta');
    });

    it('should return Jakarta for +62 format', () => {
      expect(getLandlineRegion('+62212345678')).toBe('Jakarta');
    });

    it('should return Jakarta for 62 format without +', () => {
      expect(getLandlineRegion('62212345678')).toBe('Jakarta');
    });

    it('should return Medan for 061', () => {
      expect(getLandlineRegion('0611234567')).toBe('Medan');
    });

    it('should handle landline with separator', () => {
      expect(getLandlineRegion('021-2345678')).toBe('Jakarta');
    });
  });

  describe('mobile and invalid numbers (edge cases)', () => {
    it('should return null for mobile numbers', () => {
      expect(getLandlineRegion('081234567890')).toBe(null);
    });

    it('should return null for unknown area code', () => {
      expect(getLandlineRegion('0991234567')).toBe(null);
    });

    it('should return null for invalid input', () => {
      expect(getLandlineRegion('invalid')).toBe(null);
    });

    it('should return null for empty string', () => {
      expect(getLandlineRegion('')).toBe(null);
    });

    it('should return null for null input', () => {
      expect(getLandlineRegion(null as any)).toBe(null);
    });

    it('should return null for undefined input', () => {
      expect(getLandlineRegion(undefined as any)).toBe(null);
    });
  });
});
