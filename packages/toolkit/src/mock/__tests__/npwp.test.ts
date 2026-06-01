import { describe, it, expect } from 'vitest';
import { generateNPWP } from '../generators/npwp';
import { validateNPWP } from '../../npwp';

describe('generateNPWP', () => {
  it('generated NPWP passes validateNPWP() — 20 seed verification', () => {
    for (let seed = 1; seed <= 20; seed++) {
      expect(validateNPWP(generateNPWP({ seed }))).toBe(true);
    }
  });

  it('formatted NPWP matches XX.XXX.XXX.X-XXX.XXX pattern', () => {
    const npwp = generateNPWP({ format: 'formatted', seed: 1 });
    expect(npwp).toMatch(/^\d{2}\.\d{3}\.\d{3}\.\d-\d{3}\.\d{3}$/);
  });

  it('raw NPWP is 15 numeric digits', () => {
    const npwp = generateNPWP({ format: 'raw', seed: 1 });
    expect(npwp).toMatch(/^\d{15}$/);
  });

  it('same seed produces same NPWP', () => {
    expect(generateNPWP({ seed: 42 })).toBe(generateNPWP({ seed: 42 }));
  });

  it('default format is formatted', () => {
    const npwp = generateNPWP({ seed: 1 });
    expect(npwp).toMatch(/\./); // has dot separators
  });
});
