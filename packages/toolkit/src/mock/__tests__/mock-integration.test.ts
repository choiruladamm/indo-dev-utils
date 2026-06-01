import { describe, it, expect } from 'vitest';
import {
  generateNIK, generatePhone, generateNPWP, generatePlate,
  generateEmail, generateName, generateMockPerson, createMockFactory,
} from '../index';
import { validateNIK } from '../../nik';
import { validatePhoneNumber } from '../../phone';
import { validateNPWP } from '../../npwp';
import { validatePlate } from '../../plate';
import { validateEmail } from '../../email-validator';

describe('mock module integration', () => {
  it('all top-level generators are exported from index', () => {
    expect(typeof generateNIK).toBe('function');
    expect(typeof generatePhone).toBe('function');
    expect(typeof generateNPWP).toBe('function');
    expect(typeof generatePlate).toBe('function');
    expect(typeof generateEmail).toBe('function');
    expect(typeof generateName).toBe('function');
    expect(typeof generateMockPerson).toBe('function');
    expect(typeof createMockFactory).toBe('function');
  });

  it('10 different seeds produce 10 different NIKs', () => {
    const niks = new Set(Array.from({ length: 10 }, (_, i) => generateNIK({ seed: i + 1 })));
    expect(niks.size).toBe(10);
  });

  it('createMockFactory is usable for test setup pattern', () => {
    const factory = createMockFactory(0);
    const results = Array.from({ length: 5 }, () => factory.generateMockPerson());
    // All 5 persons are different
    const niks = new Set(results.map(p => p.nik));
    expect(niks.size).toBe(5);
  });

  it('all validateCoverage generators pass their validators', () => {
    const validators = [
      { gen: generateNIK, validate: validateNIK },
      { gen: generatePhone, validate: validatePhoneNumber },
      { gen: generateNPWP, validate: validateNPWP },
      { gen: generatePlate, validate: validatePlate },
      { gen: generateEmail, validate: validateEmail },
    ];
    for (const { gen, validate } of validators) {
      for (let seed = 1; seed <= 5; seed++) {
        expect(validate(gen({ seed }))).toBe(true);
      }
    }
  });
});
