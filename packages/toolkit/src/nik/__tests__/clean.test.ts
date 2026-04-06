import { describe, it, expect } from 'vitest';
import { cleanNIK } from '../clean';

describe('cleanNIK', () => {
  describe('valid separators', () => {
    it('should clean dash-separated NIK', () => {
      expect(cleanNIK('32-01-01-89-01-31-0123')).toBe('3201018901310123');
    });

    it('should clean dot-separated NIK', () => {
      expect(cleanNIK('3201.01.89.01.31.0123')).toBe('3201018901310123');
    });

    it('should clean space-separated NIK', () => {
      expect(cleanNIK('3201 01 89 01 31 0123')).toBe('3201018901310123');
    });

    it('should clean mixed separators', () => {
      expect(cleanNIK('32-01.01.89-01-31-0123')).toBe('3201018901310123');
    });

    it('should return empty for 14-digit result (not valid NIK)', () => {
      expect(cleanNIK('3201-8901.3101 23')).toBe('');
    });
  });

  describe('already clean NIK', () => {
    it('should return 16-digit NIK unchanged', () => {
      expect(cleanNIK('3201018901310123')).toBe('3201018901310123');
    });
  });

  describe('edge cases', () => {
    it('should return empty for too short', () => {
      expect(cleanNIK('1234')).toBe('');
    });

    it('should return empty for no digits', () => {
      expect(cleanNIK('invalid')).toBe('');
    });

    it('should return empty for empty string', () => {
      expect(cleanNIK('')).toBe('');
    });

    it('should return empty for null', () => {
      expect(cleanNIK(null as any)).toBe('');
    });

    it('should return empty for undefined', () => {
      expect(cleanNIK(undefined as any)).toBe('');
    });

    it('should return empty for object', () => {
      expect(cleanNIK({} as any)).toBe('');
    });

    it('should return empty for number', () => {
      expect(cleanNIK(1234567890123456 as any)).toBe('');
    });

    it('should return empty for 15 digits', () => {
      expect(cleanNIK('320101890131012')).toBe('');
    });

    it('should return empty for 17 digits', () => {
      expect(cleanNIK('32010189013101234')).toBe('');
    });
  });
});
