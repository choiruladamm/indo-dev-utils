import { describe, it, expect } from 'vitest';
import {
  validateNPWP,
  formatNPWP,
  parseNPWP,
  maskNPWP,
  cleanNPWP,
  isNIKBasedNPWP,
} from '../index';

describe('NPWP Module', () => {
  const npwp15 = '012345678012000';
  const npwpFormatted = '01.234.567.8-012.000';
  const npwp16 = '1234567890123456';

  describe('validateNPWP', () => {
    it('should validate 15-digit NPWP', () => {
      expect(validateNPWP(npwp15)).toBe(true);
      expect(validateNPWP(npwpFormatted)).toBe(true);
    });

    it('should validate 16-digit NPWP', () => {
      expect(validateNPWP(npwp16)).toBe(true);
    });

    it('should return false for invalid length', () => {
      expect(validateNPWP('12345')).toBe(false);
    });
  });

  describe('formatNPWP', () => {
    it('should format 15-digit NPWP correctly', () => {
      expect(formatNPWP(npwp15)).toBe(npwpFormatted);
    });

    it('should return 16-digit NPWP as is', () => {
      expect(formatNPWP(npwp16)).toBe(npwp16);
    });
  });

  describe('parseNPWP', () => {
    it('should parse 15-digit NPWP correctly', () => {
      const info = parseNPWP(npwp15);
      expect(info).not.toBeNull();
      expect(info?.type).toBe('01');
      expect(info?.taxOfficeCode).toBe('012');
      expect(info?.branchCode).toBe('000');
      expect(info?.isNikBased).toBe(false);
    });

    it('should parse 16-digit NPWP correctly', () => {
      const info = parseNPWP(npwp16);
      expect(info).not.toBeNull();
      expect(info?.isNikBased).toBe(true);
      expect(info?.branchCode).toBe('3456');
    });
  });

  describe('maskNPWP', () => {
    it('should mask NPWP correctly', () => {
      const masked = maskNPWP(npwp15);
      expect(masked).toBe('01**********000');
    });

    it('should preserve formatting if input was formatted', () => {
      const masked = maskNPWP(npwpFormatted);
      expect(masked).toBe('01.***.***.*-***.000');
    });
  });

  describe('cleanNPWP', () => {
    it('should remove dots and dashes', () => {
      expect(cleanNPWP('01.234.567.8-012.000')).toBe('012345678012000');
      expect(cleanNPWP('01-234-567-8-012-345')).toBe('012345678012345');
    });

    it('should return digits only', () => {
      expect(cleanNPWP('01.234.567.8-012.000')).toBe('012345678012000');
    });

    it('should return empty string for empty input', () => {
      expect(cleanNPWP('')).toBe('');
    });

    it('should handle already clean input', () => {
      expect(cleanNPWP('012345678012000')).toBe('012345678012000');
    });
  });

  describe('isNIKBasedNPWP', () => {
    it('should return true for 16-digit NIK-based NPWP', () => {
      expect(isNIKBasedNPWP('3201234567890003')).toBe(true);
      expect(isNIKBasedNPWP(npwp16)).toBe(true);
    });

    it('should return false for 15-digit standard NPWP', () => {
      expect(isNIKBasedNPWP('012345678012000')).toBe(false);
      expect(isNIKBasedNPWP(npwpFormatted)).toBe(false);
    });

    it('should return false for invalid NPWP', () => {
      expect(isNIKBasedNPWP('invalid')).toBe(false);
      expect(isNIKBasedNPWP('')).toBe(false);
    });
  });
});
