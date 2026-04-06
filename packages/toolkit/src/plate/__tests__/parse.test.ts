import { describe, it, expect } from 'vitest';
import { parsePlate } from '../parse';

describe('parsePlate', () => {
  describe('valid inputs', () => {
    it('should parse valid private plate with 1 letter prefix', () => {
      const result = parsePlate('B 1234 ABC');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('B');
        expect(result.number).toBe('1234');
        expect(result.suffix).toBe('ABC');
        expect(result.type).toBe('private');
        expect(result.formatted).toBe('B 1234 ABC');
        expect(result.isValid).toBe(true);
      }
    });

    it('should parse valid private plate with 2 letter prefix', () => {
      const result = parsePlate('AB 1234 CD');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('AB');
        expect(result.number).toBe('1234');
        expect(result.suffix).toBe('CD');
        expect(result.type).toBe('private');
        expect(result.formatted).toBe('AB 1234 CD');
        expect(result.isValid).toBe(true);
      }
    });

    it('should parse valid plate with 4 digit number', () => {
      const result = parsePlate('D 9999 XYZ');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('D');
        expect(result.number).toBe('9999');
        expect(result.suffix).toBe('XYZ');
        expect(result.isValid).toBe(true);
      }
    });

    it('should parse plate without spaces', () => {
      const result = parsePlate('B1234ABC');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('B');
        expect(result.number).toBe('1234');
        expect(result.suffix).toBe('ABC');
        expect(result.formatted).toBe('B 1234 ABC');
      }
    });

    it('should handle lowercase input', () => {
      const result = parsePlate('b 1234 abc');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('B');
        expect(result.isValid).toBe(true);
      }
    });

    it('should parse plate with single digit number', () => {
      const result = parsePlate('AB 1 CD');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('AB');
        expect(result.number).toBe('1');
        expect(result.suffix).toBe('CD');
        expect(result.type).toBe('private');
        expect(result.isValid).toBe(true);
      }
    });

    it('should parse diplomat plate starting with CD', () => {
      const result = parsePlate('CD 1234 AB');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('CD');
        expect(result.type).toBe('diplomat');
        expect(result.isValid).toBe(true);
      }
    });

    it('should parse diplomat plate starting with CC', () => {
      const result = parsePlate('CC 5678 XY');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('CC');
        expect(result.type).toBe('diplomat');
      }
    });

    it('should parse diplomat plate starting with KL', () => {
      const result = parsePlate('KL 9012 MN');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('KL');
        expect(result.type).toBe('diplomat');
      }
    });
  });

  describe('invalid inputs', () => {
    it('should return null for null input', () => {
      expect(parsePlate(null as any)).toBeNull();
    });

    it('should return null for undefined input', () => {
      expect(parsePlate(undefined as any)).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(parsePlate('')).toBeNull();
    });

    it('should return null for invalid plate format', () => {
      expect(parsePlate('invalid')).toBeNull();
      expect(parsePlate('123 ABC')).toBeNull();
      expect(parsePlate('AB XYZ 123')).toBeNull();
    });

    it('should return null for plate with too many digits', () => {
      expect(parsePlate('B 123456 ABC')).toBeNull();
    });

    it('should return null for plate with too many prefix letters', () => {
      expect(parsePlate('ABC 1234 DE')).toBeNull();
    });

    it('should return null for plate with too many suffix letters', () => {
      expect(parsePlate('B 1234 ABCD')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should parse plate with no suffix', () => {
      const result = parsePlate('B 1234');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('B');
        expect(result.number).toBe('1234');
        expect(result.suffix).toBe('');
      }
    });

    it('should handle extra whitespace', () => {
      const result = parsePlate('  B  1234  ABC  ');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.prefix).toBe('B');
        expect(result.number).toBe('1234');
        expect(result.suffix).toBe('ABC');
      }
    });
  });
});
