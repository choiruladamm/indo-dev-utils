import { describe, it, expect } from 'vitest';
import { isPrivatePlate, isPublicPlate, isDiplomatPlate } from '../type-check';

describe('Plate Type Checks', () => {
  describe('isPrivatePlate', () => {
    it('should return true for valid private plate', () => {
      expect(isPrivatePlate('B 1234 ABC')).toBe(true);
      expect(isPrivatePlate('DA 1234 XYZ')).toBe(true);
      expect(isPrivatePlate('B 1234 U')).toBe(true);
      expect(isPrivatePlate('B 1234 T')).toBe(true);
    });

    it('should return false for diplomat plate', () => {
      expect(isPrivatePlate('CD 1234 AB')).toBe(false);
    });

    it('should return false for invalid plate', () => {
      expect(isPrivatePlate('invalid')).toBe(false);
      expect(isPrivatePlate('')).toBe(false);
    });
  });

  describe('isPublicPlate', () => {
    it('should return false for single letter suffix plates (treated as private)', () => {
      expect(isPublicPlate('B 1234 U')).toBe(false);
      expect(isPublicPlate('B 1234 T')).toBe(false);
    });

    it('should return false for invalid plate', () => {
      expect(isPublicPlate('invalid')).toBe(false);
    });
  });

  describe('isDiplomatPlate', () => {
    it('should return true for CD prefix', () => {
      expect(isDiplomatPlate('CD 1234 AB')).toBe(true);
    });

    it('should return true for CC prefix', () => {
      expect(isDiplomatPlate('CC 1234 AB')).toBe(true);
    });

    it('should return true for KL prefix', () => {
      expect(isDiplomatPlate('KL 1234 XY')).toBe(true);
    });

    it('should return false for private plate', () => {
      expect(isDiplomatPlate('B 1234 ABC')).toBe(false);
    });

    it('should return false for invalid plate', () => {
      expect(isDiplomatPlate('invalid')).toBe(false);
    });
  });
});
