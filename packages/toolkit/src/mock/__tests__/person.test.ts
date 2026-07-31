import { describe, it, expect } from 'vitest';
import { generateMockPerson, createMockFactory } from '../generators/person';
import { validateNIK, parseNIK } from '../../nik';
import { validatePhoneNumber } from '../../phone';
import { validateNPWP } from '../../npwp';
import { validatePlate } from '../../plate';
import { validateEmail } from '../../email-validator';
import { validateBPJS, detectBPJSType } from '../../bpjs';
import { validateVIN } from '../../vin';

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

  it('AC-6: default MockPerson shape has no bpjs key (v0.9.0 snapshot preserved)', () => {
    const person = generateMockPerson({ seed: 42 });
    expect(Object.keys(person).sort()).toEqual(
      ['birthDate', 'email', 'gender', 'name', 'nik', 'npwp', 'phone', 'plate'].sort(),
    );
    expect('bpjs' in person).toBe(false);
  });

  it('AC-7: includeBPJS: true adds a valid Kesehatan BPJS number', () => {
    const person = generateMockPerson({ seed: 42, includeBPJS: true });
    expect(person.bpjs).toBeDefined();
    expect(validateBPJS(person.bpjs!, 'kesehatan')).toBe(true);
    expect(detectBPJSType(person.bpjs!)).toBe('kesehatan');
  });

  it('includeBPJS: true with bpjsScheme: ketenagakerjaan produces valid Ketenagakerjaan', () => {
    const person = generateMockPerson({ seed: 7, includeBPJS: true, bpjsScheme: 'ketenagakerjaan' });
    expect(person.bpjs).toBeDefined();
    expect(validateBPJS(person.bpjs!, 'ketenagakerjaan')).toBe(true);
    expect(detectBPJSType(person.bpjs!)).toBe('ketenagakerjaan');
  });

  it('AC-8: same seed same options produces same person-with-bpjs output', () => {
    const a = generateMockPerson({ seed: 100, includeBPJS: true });
    const b = generateMockPerson({ seed: 100, includeBPJS: true });
    expect(a).toEqual(b);
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

  it('factory.generateBPJS produces valid output for both schemes', () => {
    const factory = createMockFactory(11);
    const k = factory.generateBPJS();
    expect(validateBPJS(k, 'kesehatan')).toBe(true);
    const tk = factory.generateBPJS({ scheme: 'ketenagakerjaan' });
    expect(validateBPJS(tk, 'ketenagakerjaan')).toBe(true);
  });

  it('factory.generateVIN produces a valid 17-char VIN', () => {
    const factory = createMockFactory(22);
    const vin = factory.generateVIN();
    expect(vin).toHaveLength(17);
    expect(vin).not.toMatch(/[IOQ]/);
    expect(validateVIN(vin)).toBe(true);
  });

  it('factory.generateVIN with manufacturerPrefix honors the prefix', () => {
    const factory = createMockFactory(33);
    const vin = factory.generateVIN({ manufacturerPrefix: '1HG' });
    expect(vin.startsWith('1HG')).toBe(true);
    expect(validateVIN(vin)).toBe(true);
  });

  it('factory.generateMockPerson with includeBPJS produces a person with a valid bpjs field', () => {
    const factory = createMockFactory(44);
    const person = factory.generateMockPerson({ includeBPJS: true });
    expect(person.bpjs).toBeDefined();
    expect(validateBPJS(person.bpjs!, 'kesehatan')).toBe(true);
  });
});
