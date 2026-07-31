import { describe, it, expect } from 'vitest';
import { generateVIN } from '../generators/vin';
import { validateVIN } from '../../vin';
import {
  VIN_LENGTH,
  VIN_CHAR_VALUES,
  VIN_WEIGHTS,
  VIN_MODULUS,
  VIN_CHECK_DIGIT_X,
  VIN_CHECK_DIGIT_INDEX,
} from '../../vin/constants';

function recomputeCheckDigit(vin: string): string {
  let sum = 0;
  for (let i = 0; i < VIN_LENGTH; i++) {
    const val = VIN_CHAR_VALUES[vin[i]];
    if (val === undefined) throw new Error(`undefined char value at index ${i}`);
    sum += val * VIN_WEIGHTS[i];
  }
  const v = sum % VIN_MODULUS;
  return v === 10 ? VIN_CHECK_DIGIT_X : v.toString();
}

describe('generateVIN', () => {
  it('AC-3: returned VIN is 17 chars, has no I/O/Q, and passes validateVIN', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const vin = generateVIN({ seed });
      expect(vin).toHaveLength(VIN_LENGTH);
      expect(vin).not.toMatch(/[IOQ]/);
      expect(validateVIN(vin)).toBe(true);
    }
  });

  it('AC-3: check digit at position 9 is mathematically correct', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const vin = generateVIN({ seed });
      const expected = recomputeCheckDigit(vin);
      expect(vin[VIN_CHECK_DIGIT_INDEX]).toBe(expected);
    }
  });

  it('AC-5: same seed and same options produce identical output', () => {
    expect(generateVIN({ seed: 42 })).toBe(generateVIN({ seed: 42 }));
    expect(generateVIN({ manufacturerPrefix: '1HG', seed: 5 })).toBe(
      generateVIN({ manufacturerPrefix: '1HG', seed: 5 }),
    );
  });

  it('manufacturerPrefix is honored when provided and valid', () => {
    const vin = generateVIN({ manufacturerPrefix: '1HG', seed: 1 });
    expect(vin.startsWith('1HG')).toBe(true);
    expect(validateVIN(vin)).toBe(true);
  });

  it('invalid manufacturer prefix (contains I/O/Q) falls back to random', () => {
    const vin = generateVIN({ manufacturerPrefix: 'IOQ', seed: 1 });
    expect(vin).toHaveLength(VIN_LENGTH);
    expect(validateVIN(vin)).toBe(true);
    expect(vin.startsWith('IOQ')).toBe(false);
  });

  it('short manufacturer prefix (length != 3) falls back to random', () => {
    const vin = generateVIN({ manufacturerPrefix: 'AB', seed: 1 });
    expect(vin).toHaveLength(VIN_LENGTH);
    expect(validateVIN(vin)).toBe(true);
    expect(vin.startsWith('AB')).toBe(false);
  });
});
