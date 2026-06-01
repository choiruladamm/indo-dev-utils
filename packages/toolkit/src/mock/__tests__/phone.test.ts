import { describe, it, expect } from 'vitest';
import { generatePhone } from '../generators/phone';
import { validatePhoneNumber } from '../../phone';

describe('generatePhone', () => {
  it('generated phone passes validatePhoneNumber() — 20 seed verification', () => {
    for (let seed = 1; seed <= 20; seed++) {
      expect(validatePhoneNumber(generatePhone({ seed }))).toBe(true);
    }
  });

  it('national format starts with 0', () => {
    expect(generatePhone({ format: 'national', seed: 1 })).toMatch(/^0/);
  });

  it('national format is 11 digits', () => {
    expect(generatePhone({ format: 'national', seed: 1 })).toHaveLength(11);
  });

  it('international format starts with +62', () => {
    expect(generatePhone({ format: 'international', seed: 1 })).toMatch(/^\+62/);
  });

  it('e164 format starts with +62', () => {
    expect(generatePhone({ format: 'e164', seed: 1 })).toMatch(/^\+62/);
  });

  it('international and e164 produce identical output', () => {
    const seed = 42;
    expect(generatePhone({ format: 'international', seed })).toBe(
      generatePhone({ format: 'e164', seed })
    );
  });

  it('same seed produces same phone number', () => {
    expect(generatePhone({ seed: 42 })).toBe(generatePhone({ seed: 42 }));
  });

  it('telkomsel operator produces 0812 prefix', () => {
    const phone = generatePhone({ operator: 'Telkomsel', seed: 1 });
    expect(phone.slice(0, 4)).toBe('0812');
  });

  it('operator undefined picks random operator', () => {
    const phone = generatePhone({ seed: 1 });
    const validPrefixes = ['0812', '0817', '0814', '0831', '0896', '0881'];
    expect(validPrefixes.some(p => phone.startsWith(p))).toBe(true);
  });
});
