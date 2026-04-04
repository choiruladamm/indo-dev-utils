import { describe, expect, it } from 'vitest';
import { parseNIK } from '../parse';

describe('parseNIK', () => {
  describe('parsing valid NIKs - basic info', () => {
    it('should parse province correctly', () => {
      const info = parseNIK('3201018901310123');

      expect(info).not.toBeNull();
      expect(info?.province.code).toBe('32');
      expect(info?.province.name).toBe('Jawa Barat');
    });

    it('should parse regency correctly', () => {
      const info = parseNIK('3201018901310123');

      expect(info?.regency.code).toBe('01');
      expect(info?.regency.name).toBe('Kab. Bogor');
    });

    it('should parse district correctly', () => {
      const info = parseNIK('3201018901310123');

      expect(info?.district.code).toBe('01');
      expect(info?.district.name).toBeNull(); // No district data
    });

    it('should parse serial number correctly', () => {
      const info = parseNIK('3201018901310123');

      expect(info?.serialNumber).toBe('0123');
    });

    it('should mark as valid', () => {
      const info = parseNIK('3201018901310123');

      expect(info?.isValid).toBe(true);
    });
  });

  describe('parsing valid NIKs - male birth dates', () => {
    it('should parse male NIK correctly', () => {
      const info = parseNIK('3201018901310123');

      expect(info?.gender).toBe('male');
    });

    it('should parse male birth date Jan 31, 1989', () => {
      const info = parseNIK('3201018901310123');

      expect(info?.birthDate).toBeInstanceOf(Date);
      expect(info?.birthDate?.getFullYear()).toBe(1989);
      expect(info?.birthDate?.getMonth()).toBe(0); // January
      expect(info?.birthDate?.getDate()).toBe(31);
    });

    it('should parse male born on Jan 1, 2001', () => {
      const info = parseNIK('3201010101010123');

      expect(info?.gender).toBe('male');
      expect(info?.birthDate?.getFullYear()).toBe(2001);
      expect(info?.birthDate?.getMonth()).toBe(0);
      expect(info?.birthDate?.getDate()).toBe(1);
    });

    it('should parse male born on Dec 31, 1999', () => {
      const info = parseNIK('3201019912310123');

      expect(info?.gender).toBe('male');
      expect(info?.birthDate?.getFullYear()).toBe(1999);
      expect(info?.birthDate?.getMonth()).toBe(11); // December
      expect(info?.birthDate?.getDate()).toBe(31);
    });

    it('should parse male born on Feb 29, 2000 (leap year)', () => {
      const info = parseNIK('3201010002290123');

      expect(info?.gender).toBe('male');
      expect(info?.birthDate?.getFullYear()).toBe(2000);
      expect(info?.birthDate?.getMonth()).toBe(1); // February
      expect(info?.birthDate?.getDate()).toBe(29);
    });
  });

  describe('parsing valid NIKs - female birth dates', () => {
    it('should parse female NIK correctly', () => {
      const info = parseNIK('3201019508550123');

      expect(info?.gender).toBe('female');
    });

    it('should parse female birth date Aug 15, 1995 (day 55)', () => {
      const info = parseNIK('3201019508550123');

      expect(info?.birthDate).toBeInstanceOf(Date);
      expect(info?.birthDate?.getFullYear()).toBe(1995);
      expect(info?.birthDate?.getMonth()).toBe(7); // August
      expect(info?.birthDate?.getDate()).toBe(15);
    });

    it('should parse female born on Jan 1 (day 41)', () => {
      const info = parseNIK('3201010101410123');

      expect(info?.gender).toBe('female');
      expect(info?.birthDate?.getDate()).toBe(1);
    });

    it('should parse female born on Jan 31 (day 71)', () => {
      const info = parseNIK('3201018901710123');

      expect(info?.gender).toBe('female');
      expect(info?.birthDate?.getDate()).toBe(31);
    });

    it('should parse female born on Feb 28 (day 68)', () => {
      const info = parseNIK('3201019002680123');

      expect(info?.gender).toBe('female');
      expect(info?.birthDate?.getMonth()).toBe(1);
      expect(info?.birthDate?.getDate()).toBe(28);
    });

    it('should parse female born on Feb 29 (day 69, leap year)', () => {
      const info = parseNIK('3201010002690123');

      expect(info?.gender).toBe('female');
      expect(info?.birthDate?.getFullYear()).toBe(2000);
      expect(info?.birthDate?.getMonth()).toBe(1);
      expect(info?.birthDate?.getDate()).toBe(29);
    });
  });

  describe('parsing different provinces', () => {
    it('should parse Jakarta NIK', () => {
      const info = parseNIK('3101018901310123');

      expect(info?.province.code).toBe('31');
      expect(info?.province.name).toBe('DKI Jakarta');
    });

    it('should parse Bali NIK', () => {
      const info = parseNIK('5101018901310123');

      expect(info?.province.code).toBe('51');
      expect(info?.province.name).toBe('Bali');
    });

    it('should parse Papua NIK', () => {
      const info = parseNIK('9101018901310123');

      expect(info?.province.code).toBe('91');
      expect(info?.province.name).toBe('Papua');
    });

    it('should parse Aceh NIK', () => {
      const info = parseNIK('1101018901310123');

      expect(info?.province.code).toBe('11');
      expect(info?.province.name).toBe('Aceh');
    });
  });

  describe('parsing with unknown regency', () => {
    it('should return "Unknown" for unmapped regency', () => {
      const info = parseNIK('3299018901310123');

      expect(info?.regency.code).toBe('99');
      expect(info?.regency.name).toBe('Unknown');
    });
  });

  describe('parsing different year ranges', () => {
    it('should parse year 00 as 2000', () => {
      const info = parseNIK('3201010001010123');

      expect(info?.birthDate?.getFullYear()).toBe(2000);
    });

    it('should parse year 30 as 2030', () => {
      const info = parseNIK('3201013001010123');

      expect(info?.birthDate?.getFullYear()).toBe(2030);
    });

    it('should parse year 31 as 1931', () => {
      const info = parseNIK('3201013101010123');

      expect(info?.birthDate?.getFullYear()).toBe(1931);
    });

    it('should parse year 99 as 1999', () => {
      const info = parseNIK('3201019912310123');

      expect(info?.birthDate?.getFullYear()).toBe(1999);
    });
  });

  describe('parsing invalid NIKs', () => {
    it('should return null for wrong length', () => {
      expect(parseNIK('1234')).toBeNull();
      expect(parseNIK('123456789012345')).toBeNull();
    });

    it('should return null for non-digits', () => {
      expect(parseNIK('320123456789012X')).toBeNull();
    });

    it('should return null for invalid province', () => {
      expect(parseNIK('9912345678901234')).toBeNull();
    });

    it('should return null for invalid date', () => {
      expect(parseNIK('3201019002300123')).toBeNull(); // Feb 30
    });

    it('should return null for empty string', () => {
      expect(parseNIK('')).toBeNull();
    });
  });
});
