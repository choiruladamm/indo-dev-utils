import { describe, it, expect } from 'vitest';
import { validateVIN } from '../validate';

describe('validateVIN', () => {
  it('should return true for a valid VIN', () => {
    // Valid Honda Civic VIN (example)
    expect(validateVIN('1HGCM82633A004352')).toBe(true);
  });

  it('should return false for a VIN with invalid characters (I, O, Q)', () => {
    expect(validateVIN('1HGCM82I33A004352')).toBe(false);
    expect(validateVIN('1HGCM82O33A004352')).toBe(false);
    expect(validateVIN('1HGCM82Q33A004352')).toBe(false);
  });

  it('should return false for a VIN with incorrect length', () => {
    expect(validateVIN('1HGCM82633A00435')).toBe(false);
    expect(validateVIN('1HGCM82633A0043522')).toBe(false);
  });

  it('should return false for a VIN with invalid checksum', () => {
    // Changing one digit to invalidate checksum
    expect(validateVIN('1HGCM82633A004353')).toBe(false);
  });

  it('should return true for a VIN with check digit X', () => {
    // Example VIN where check digit is X at position 9
    expect(validateVIN('1M8GDM9AXKP042788')).toBe(true);
  });

  it('should handle empty or null input', () => {
    expect(validateVIN('')).toBe(false);
    // @ts-expect-error - testing invalid input
    expect(validateVIN(null)).toBe(false);
  });
});
