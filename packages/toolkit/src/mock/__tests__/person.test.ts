import { describe, it, expect } from 'vitest';
import { generateMockPerson, createMockFactory } from '../generators/person';
import { validateNIK, parseNIK } from '../../nik';
import { validatePhoneNumber } from '../../phone';
import { validateNPWP } from '../../npwp';
import { validatePlate } from '../../plate';
import { validateEmail } from '../../email-validator';

describe('generateMockPerson', () => {
  it('all fields are present in output', () => {
    const person = generateMockPerson({ seed: 42 });
    expect(person).toHaveProperty('name');
    expect(person).toHaveProperty('gender');
    expect(person).toHaveProperty('birthDate');
    expect(person).toHaveProperty('nik');
    expect(person).toHaveProperty('npwp');
    expect(person).toHaveProperty('phone');
    expect(person).toHaveProperty('email');
    expect(person).toHaveProperty('plate');
  });

  it('nik passes validateNIK()', () => {
    const { nik } = generateMockPerson({ seed: 1 });
    expect(validateNIK(nik)).toBe(true);
  });

  it('phone passes validatePhoneNumber()', () => {
    const { phone } = generateMockPerson({ seed: 1 });
    expect(validatePhoneNumber(phone)).toBe(true);
  });

  it('npwp passes validateNPWP()', () => {
    const { npwp } = generateMockPerson({ seed: 1 });
    expect(validateNPWP(npwp)).toBe(true);
  });

  it('email passes validateEmail()', () => {
    const { email } = generateMockPerson({ seed: 1 });
    expect(validateEmail(email)).toBe(true);
  });

  it('plate passes validatePlate()', () => {
    const { plate } = generateMockPerson({ seed: 1 });
    expect(validatePlate(plate)).toBe(true);
  });

  it('NIK gender matches person.gender', () => {
    const personM = generateMockPerson({ gender: 'M', seed: 5 });
    const personF = generateMockPerson({ gender: 'F', seed: 5 });
    expect(parseNIK(personM.nik)?.gender).toBe('male');
    expect(parseNIK(personF.nik)?.gender).toBe('female');
  });

  it('birthDate is ISO 8601 format YYYY-MM-DD', () => {
    const { birthDate } = generateMockPerson({ seed: 1 });
    expect(birthDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('NIK encoded birthDate matches person.birthDate field', () => {
    const { birthDate, nik } = generateMockPerson({ gender: 'M', seed: 99 });
    const parsedNIK = parseNIK(nik);
    expect(parsedNIK).not.toBeNull();
    const parsedDate = parsedNIK!.birthDate;
    expect(parsedDate).toBeInstanceOf(Date);
    const [yr, mo, dt] = birthDate.split('-').map(Number);
    expect(parsedDate!.getFullYear()).toBe(yr);
    expect(parsedDate!.getMonth() + 1).toBe(mo);
    expect(parsedDate!.getDate()).toBe(dt);
  });

  it('same seed produces identical MockPerson', () => {
    expect(generateMockPerson({ seed: 42 })).toEqual(generateMockPerson({ seed: 42 }));
  });
});

describe('createMockFactory', () => {
  it('factory with same seed produces same sequence as repeated generateMockPerson calls', () => {
    const factory = createMockFactory(100);
    const p1 = factory.generateMockPerson();
    const p2 = factory.generateMockPerson();
    // Same seed factory always produces same first two persons
    const factory2 = createMockFactory(100);
    expect(factory2.generateMockPerson()).toEqual(p1);
    expect(factory2.generateMockPerson()).toEqual(p2);
  });

  it('all factory-generated NIKs pass validateNIK()', () => {
    const factory = createMockFactory(77);
    for (let i = 0; i < 10; i++) {
      expect(validateNIK(factory.generateNIK())).toBe(true);
    }
  });

  it('all factory-generated phones pass validatePhoneNumber()', () => {
    const factory = createMockFactory(88);
    for (let i = 0; i < 10; i++) {
      expect(validatePhoneNumber(factory.generatePhone())).toBe(true);
    }
  });

  it('factory.generateNIK with birthDate produces correct encoding', () => {
    const factory = createMockFactory(1);
    const birthDate = new Date('1990-05-15');
    const nik = factory.generateNIK({ gender: 'M', birthDate });
    // NIK format: PP KK SS YY MM DD SEQ — year 90, month 05, day 15
    expect(nik.slice(6, 8)).toBe('90'); // year
    expect(nik.slice(8, 10)).toBe('05'); // month
    expect(nik.slice(10, 12)).toBe('15'); // day
  });
});
