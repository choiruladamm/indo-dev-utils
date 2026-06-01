import { describe, it, expect } from 'vitest';
import { generatePlate } from '../generators/plate';
import { validatePlate } from '../../plate';

describe('generatePlate', () => {
  it('generated plate passes validatePlate() — 20 seed verification', () => {
    for (let seed = 1; seed <= 20; seed++) {
      expect(validatePlate(generatePlate({ seed }))).toBe(true);
    }
  });

  it('plate format is PREFIX DIGITS SUFFIX', () => {
    const plate = generatePlate({ seed: 1 });
    expect(plate).toMatch(/^[A-Z]{1,2} \d{4} [A-Z]{2,3}$/);
  });

  it('provided region appears as prefix', () => {
    const plate = generatePlate({ region: 'B', seed: 1 });
    expect(plate.startsWith('B ')).toBe(true);
  });

  it('same seed produces same plate', () => {
    expect(generatePlate({ seed: 42 })).toBe(generatePlate({ seed: 42 }));
  });

  it('type private is accepted (no differentiation implemented)', () => {
    const plate = generatePlate({ type: 'private', seed: 1 });
    expect(plate).toMatch(/^[A-Z]{1,2} \d{4} [A-Z]{2,3}$/);
  });
});
