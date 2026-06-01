import { describe, it, expect } from 'vitest';
import { generateNIK } from '../generators/nik';
import { validateNIK, parseNIK } from '../../nik';

describe('generateNIK', () => {
  it('generated NIK passes validateNIK() — 20 seed verification', () => {
    for (let seed = 1; seed <= 20; seed++) {
      expect(validateNIK(generateNIK({ seed }))).toBe(true);
    }
  });

  it('returns 16-character string', () => {
    expect(generateNIK({ seed: 1 })).toHaveLength(16);
  });

  it('returns only digits', () => {
    expect(generateNIK({ seed: 1 })).toMatch(/^\d{16}$/);
  });

  it('same seed produces same NIK', () => {
    expect(generateNIK({ seed: 42 })).toBe(generateNIK({ seed: 42 }));
  });

  it('male gender: day in positions 10-11 is ≤ 31', () => {
    const nik = generateNIK({ gender: 'M', seed: 1 });
    const day = parseInt(nik.slice(10, 12));
    expect(day).toBeGreaterThanOrEqual(1);
    expect(day).toBeLessThanOrEqual(31);
  });

  it('female gender: day in positions 10-11 is 41–68', () => {
    const nik = generateNIK({ gender: 'F', seed: 1 });
    const day = parseInt(nik.slice(10, 12));
    expect(day).toBeGreaterThanOrEqual(41);
    expect(day).toBeLessThanOrEqual(68);
  });

  it('parseNIK().gender matches provided gender option', () => {
    const nikM = generateNIK({ gender: 'M', seed: 5 });
    const nikF = generateNIK({ gender: 'F', seed: 5 });
    expect(parseNIK(nikM)?.gender).toBe('male');
    expect(parseNIK(nikF)?.gender).toBe('female');
  });

  it('provided provinceCode appears in first 2 digits', () => {
    const nik = generateNIK({ provinceCode: '31', seed: 1 });
    expect(nik.slice(0, 2)).toBe('31');
  });

  it('provided birthDate is encoded correctly in NIK', () => {
    const birthDate = new Date('1990-05-15');
    const nik = generateNIK({ gender: 'M', birthDate, seed: 1 });
    // NIK format: PP KK SS YY MM DD SEQ — day 15 (male, not +40), month 05, year 90
    expect(nik.slice(6, 8)).toBe('90'); // year 90
    expect(nik.slice(8, 10)).toBe('05'); // month 05
    expect(nik.slice(10, 12)).toBe('15'); // day 15, male
  });

  it('provided birthDate with female gender: day + 40 encoded', () => {
    const birthDate = new Date('1990-05-15');
    const nik = generateNIK({ gender: 'F', birthDate, seed: 1 });
    // Day 15 + 40 = 55, NIK format: PP KK SS YY MM DD SEQ
    expect(nik.slice(6, 8)).toBe('90'); // year 90
    expect(nik.slice(8, 10)).toBe('05'); // month 05
    expect(nik.slice(10, 12)).toBe('55'); // day 55 for female
  });

  it('seed undefined uses Date.now() — non-deterministic', () => {
    const nik1 = generateNIK({});
    const nik2 = generateNIK({});
    // These may or may not be equal (depends on timing)
    // The point is they don't throw
    expect(nik1).toMatch(/^\d{16}$/);
    expect(nik2).toMatch(/^\d{16}$/);
  });
});
