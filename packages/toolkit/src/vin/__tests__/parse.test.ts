import { describe, it, expect } from 'vitest';
import { parseVIN } from '../parse';

describe('parseVIN', () => {
  describe('valid inputs', () => {
    it('should parse VIN and extract components correctly', () => {
      const result = parseVIN('1G1JC524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.wmi).toBe('1G1');
        expect(result.vds).toBe('JC5247');
        expect(result.checkDigit).toBe('7');
        expect(result.modelYearCode).toBe('1');
        expect(result.plantCode).toBe('7');
        expect(result.serialNumber).toBe('538207');
        expect(result.isValid).toBe(false); // check digit validation varies by VIN
      }
    });

    it('should handle lowercase input', () => {
      const result = parseVIN('1g1jc524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.wmi).toBe('1G1');
      }
    });

    it('should handle uppercase VIN', () => {
      const result = parseVIN('2HGEJ82561H530149');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.wmi).toBe('2HG');
        expect(result.vds).toBe('EJ8256');
      }
    });
  });

  describe('invalid inputs', () => {
    it('should return null for null input', () => {
      expect(parseVIN(null as any)).toBeNull();
    });

    it('should return null for undefined input', () => {
      expect(parseVIN(undefined as any)).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(parseVIN('')).toBeNull();
    });

    it('should return null for wrong length', () => {
      expect(parseVIN('2HGEJ82561H53014')).toBeNull();
      expect(parseVIN('2HGEJ82561H5301491')).toBeNull();
    });

    it('should return null for VIN containing excluded chars I, O, Q', () => {
      expect(parseVIN('1HGCM82633I004704')).toBeNull();
      expect(parseVIN('1HGCM82633O004704')).toBeNull();
      expect(parseVIN('1HGCM82633Q004704')).toBeNull();
    });

    it('should return null for invalid characters', () => {
      expect(parseVIN('1HGCM82633A00470!')).toBeNull();
    });
  });

  describe('component extraction', () => {
    it('should correctly extract wmi', () => {
      const result = parseVIN('1G1JC524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.wmi).toBe('1G1');
      }
    });

    it('should correctly extract vds', () => {
      const result = parseVIN('1G1JC524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.vds).toBe('JC5247');
      }
    });

    it('should correctly extract serial number', () => {
      const result = parseVIN('1G1JC524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.serialNumber).toBe('538207');
      }
    });

    it('should correctly extract model year code', () => {
      const result = parseVIN('1G1JC524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.modelYearCode).toBe('1');
      }
    });

    it('should correctly extract plant code', () => {
      const result = parseVIN('1G1JC524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.plantCode).toBe('7');
      }
    });

    it('should correctly extract check digit', () => {
      const result = parseVIN('1G1JC524717538207');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.checkDigit).toBe('7');
      }
    });
  });
});
