/**
 * Test suite for NIK module
 *
 * TDD approach with comprehensive coverage
 * Pattern: Similar to currency and phone module test structure
 *
 * @module nik/__tests__
 */

import { describe, expect, it } from 'vitest';
import { validateNIK, parseNIK, formatNIK, maskNIK } from '../index';

// =============================================================================
// 1. validateNIK() - NIK validation
// =============================================================================

describe('validateNIK', () => {
  describe('valid NIKs - basic format', () => {
    it('should accept valid 16-digit NIK', () => {
      expect(validateNIK('3201018901310123')).toBe(true);
    });

    it('should accept NIK with all digits', () => {
      expect(validateNIK('1201018901230123')).toBe(true);
    });
  });

  describe('valid NIKs - different provinces', () => {
    it('should accept Aceh (11)', () => {
      expect(validateNIK('1101018901310123')).toBe(true);
    });

    it('should accept Sumatera Utara (12)', () => {
      expect(validateNIK('1201018901310123')).toBe(true);
    });

    it('should accept Sumatera Barat (13)', () => {
      expect(validateNIK('1301018901310123')).toBe(true);
    });

    it('should accept Riau (14)', () => {
      expect(validateNIK('1401018901310123')).toBe(true);
    });

    it('should accept Jambi (15)', () => {
      expect(validateNIK('1501018901310123')).toBe(true);
    });

    it('should accept Sumatera Selatan (16)', () => {
      expect(validateNIK('1601018901310123')).toBe(true);
    });

    it('should accept Bengkulu (17)', () => {
      expect(validateNIK('1701018901310123')).toBe(true);
    });

    it('should accept Lampung (18)', () => {
      expect(validateNIK('1801018901310123')).toBe(true);
    });

    it('should accept Kepulauan Bangka Belitung (19)', () => {
      expect(validateNIK('1901018901310123')).toBe(true);
    });

    it('should accept Kepulauan Riau (21)', () => {
      expect(validateNIK('2101018901310123')).toBe(true);
    });

    it('should accept DKI Jakarta (31)', () => {
      expect(validateNIK('3101018901310123')).toBe(true);
    });

    it('should accept Jawa Barat (32)', () => {
      expect(validateNIK('3201018901310123')).toBe(true);
    });

    it('should accept Jawa Tengah (33)', () => {
      expect(validateNIK('3301018901310123')).toBe(true);
    });

    it('should accept DI Yogyakarta (34)', () => {
      expect(validateNIK('3401018901310123')).toBe(true);
    });

    it('should accept Jawa Timur (35)', () => {
      expect(validateNIK('3501018901310123')).toBe(true);
    });

    it('should accept Banten (36)', () => {
      expect(validateNIK('3601018901310123')).toBe(true);
    });

    it('should accept Bali (51)', () => {
      expect(validateNIK('5101018901310123')).toBe(true);
    });

    it('should accept Nusa Tenggara Barat (52)', () => {
      expect(validateNIK('5201018901310123')).toBe(true);
    });

    it('should accept Nusa Tenggara Timur (53)', () => {
      expect(validateNIK('5301018901310123')).toBe(true);
    });

    it('should accept Kalimantan Barat (61)', () => {
      expect(validateNIK('6101018901310123')).toBe(true);
    });

    it('should accept Kalimantan Tengah (62)', () => {
      expect(validateNIK('6201018901310123')).toBe(true);
    });

    it('should accept Kalimantan Selatan (63)', () => {
      expect(validateNIK('6301018901310123')).toBe(true);
    });

    it('should accept Kalimantan Timur (64)', () => {
      expect(validateNIK('6401018901310123')).toBe(true);
    });

    it('should accept Kalimantan Utara (65)', () => {
      expect(validateNIK('6501018901310123')).toBe(true);
    });

    it('should accept Sulawesi Utara (71)', () => {
      expect(validateNIK('7101018901310123')).toBe(true);
    });

    it('should accept Sulawesi Tengah (72)', () => {
      expect(validateNIK('7201018901310123')).toBe(true);
    });

    it('should accept Sulawesi Selatan (73)', () => {
      expect(validateNIK('7301018901310123')).toBe(true);
    });

    it('should accept Sulawesi Tenggara (74)', () => {
      expect(validateNIK('7401018901310123')).toBe(true);
    });

    it('should accept Gorontalo (75)', () => {
      expect(validateNIK('7501018901310123')).toBe(true);
    });

    it('should accept Sulawesi Barat (76)', () => {
      expect(validateNIK('7601018901310123')).toBe(true);
    });

    it('should accept Maluku (81)', () => {
      expect(validateNIK('8101018901310123')).toBe(true);
    });

    it('should accept Maluku Utara (82)', () => {
      expect(validateNIK('8201018901310123')).toBe(true);
    });

    it('should accept Papua (91)', () => {
      expect(validateNIK('9101018901310123')).toBe(true);
    });

    it('should accept Papua Barat (92)', () => {
      expect(validateNIK('9201018901310123')).toBe(true);
    });

    it('should accept Papua Selatan (93)', () => {
      expect(validateNIK('9301018901310123')).toBe(true);
    });

    it('should accept Papua Tengah (94)', () => {
      expect(validateNIK('9401018901310123')).toBe(true);
    });

    it('should accept Papua Pegunungan (95)', () => {
      expect(validateNIK('9501018901310123')).toBe(true);
    });

    it('should accept Papua Barat Daya (96)', () => {
      expect(validateNIK('9601018901310123')).toBe(true);
    });
  });

  describe('valid NIKs - male birth dates', () => {
    it('should accept male born on Jan 1', () => {
      expect(validateNIK('3201010101010123')).toBe(true);
    });

    it('should accept male born on Jan 31', () => {
      expect(validateNIK('3201018901310123')).toBe(true);
    });

    it('should accept male born on Feb 28', () => {
      expect(validateNIK('3201019002280123')).toBe(true);
    });

    it('should accept male born on Feb 29 (leap year)', () => {
      expect(validateNIK('3201010002290123')).toBe(true); // Year 2000
      expect(validateNIK('3201019602290123')).toBe(true); // Year 1996
    });

    it('should accept male born on Dec 31', () => {
      expect(validateNIK('3201018912310123')).toBe(true);
    });

    it('should accept male born in different months', () => {
      expect(validateNIK('3201019001150123')).toBe(true); // Jan 15
      expect(validateNIK('3201019002150123')).toBe(true); // Feb 15
      expect(validateNIK('3201019003150123')).toBe(true); // Mar 15
      expect(validateNIK('3201019004150123')).toBe(true); // Apr 15
      expect(validateNIK('3201019005150123')).toBe(true); // May 15
      expect(validateNIK('3201019006150123')).toBe(true); // Jun 15
      expect(validateNIK('3201019007150123')).toBe(true); // Jul 15
      expect(validateNIK('3201019008150123')).toBe(true); // Aug 15
      expect(validateNIK('3201019009150123')).toBe(true); // Sep 15
      expect(validateNIK('3201019010150123')).toBe(true); // Oct 15
      expect(validateNIK('3201019011150123')).toBe(true); // Nov 15
      expect(validateNIK('3201019012150123')).toBe(true); // Dec 15
    });
  });

  describe('valid NIKs - female birth dates', () => {
    it('should accept female born on Jan 1 (day 41)', () => {
      expect(validateNIK('3201010101410123')).toBe(true);
    });

    it('should accept female born on Jan 15 (day 55)', () => {
      expect(validateNIK('3201019001550123')).toBe(true);
    });

    it('should accept female born on Jan 31 (day 71)', () => {
      expect(validateNIK('3201018901710123')).toBe(true);
    });

    it('should accept female born on Feb 28 (day 68)', () => {
      expect(validateNIK('3201019002680123')).toBe(true);
    });

    it('should accept female born on Feb 29 (day 69, leap year)', () => {
      expect(validateNIK('3201010002690123')).toBe(true); // Year 2000
      expect(validateNIK('3201019602690123')).toBe(true); // Year 1996
    });

    it('should accept female born on Dec 31 (day 71)', () => {
      expect(validateNIK('3201018912710123')).toBe(true);
    });

    it('should accept female born in Aug 15 (day 55)', () => {
      expect(validateNIK('3201019508550123')).toBe(true);
    });
  });

  describe('valid NIKs - different year ranges', () => {
    it('should accept year 00 (2000)', () => {
      expect(validateNIK('3201010001010123')).toBe(true);
    });

    it('should accept year 24 (2024)', () => {
      expect(validateNIK('3201012401010123')).toBe(true);
    });

    it('should accept year 31 (1931)', () => {
      expect(validateNIK('3201013101010123')).toBe(true);
    });

    it('should accept year 89 (1989)', () => {
      expect(validateNIK('3201018901310123')).toBe(true);
    });

    it('should accept year 95 (1995)', () => {
      expect(validateNIK('3201019508150123')).toBe(true);
    });

    it('should accept year 99 (1999)', () => {
      expect(validateNIK('3201019912310123')).toBe(true);
    });

    it('should accept recent years', () => {
      expect(validateNIK('3201012001010123')).toBe(true); // 2020
      expect(validateNIK('3201012101010123')).toBe(true); // 2021
      expect(validateNIK('3201012201010123')).toBe(true); // 2022
    });
  });

  describe('invalid NIKs - wrong length', () => {
    it('should reject empty string', () => {
      expect(validateNIK('')).toBe(false);
    });

    it('should reject too short', () => {
      expect(validateNIK('1234')).toBe(false);
      expect(validateNIK('123456789012345')).toBe(false); // 15 digits
    });

    it('should reject too long', () => {
      expect(validateNIK('12345678901234567')).toBe(false); // 17 digits
      expect(validateNIK('123456789012345678')).toBe(false); // 18 digits
    });
  });

  describe('invalid NIKs - non-digits', () => {
    it('should reject with letters', () => {
      expect(validateNIK('320123456789012X')).toBe(false);
      expect(validateNIK('A201234567890123')).toBe(false);
    });

    it('should reject with spaces', () => {
      expect(validateNIK('3201234567890 23')).toBe(false);
      expect(validateNIK('3201 2345 6789 0123')).toBe(false);
    });

    it('should reject with separators', () => {
      expect(validateNIK('3201-2345-6789-0123')).toBe(false);
      expect(validateNIK('32.01.23.45.67.89.0123')).toBe(false);
    });

    it('should reject with special characters', () => {
      expect(validateNIK('3201@34567890123')).toBe(false);
      expect(validateNIK('3201#34567890123')).toBe(false);
    });
  });

  describe('invalid NIKs - invalid province', () => {
    it('should reject province 00', () => {
      expect(validateNIK('0001018901310123')).toBe(false);
    });

    it('should reject province 99', () => {
      expect(validateNIK('9901018901310123')).toBe(false);
    });

    it('should reject province 10', () => {
      expect(validateNIK('1001018901310123')).toBe(false);
    });

    it('should reject province 20', () => {
      expect(validateNIK('2001018901310123')).toBe(false);
    });

    it('should reject province 30', () => {
      expect(validateNIK('3001018901310123')).toBe(false);
    });

    it('should reject province 37-50', () => {
      expect(validateNIK('3701018901310123')).toBe(false);
      expect(validateNIK('4001018901310123')).toBe(false);
      expect(validateNIK('5001018901310123')).toBe(false);
    });

    it('should reject province 54-60', () => {
      expect(validateNIK('5401018901310123')).toBe(false);
      expect(validateNIK('6001018901310123')).toBe(false);
    });

    it('should reject province 66-70', () => {
      expect(validateNIK('6601018901310123')).toBe(false);
      expect(validateNIK('7001018901310123')).toBe(false);
    });

    it('should reject province 77-80', () => {
      expect(validateNIK('7701018901310123')).toBe(false);
      expect(validateNIK('8001018901310123')).toBe(false);
    });

    it('should reject province 83-90', () => {
      expect(validateNIK('8301018901310123')).toBe(false);
      expect(validateNIK('9001018901310123')).toBe(false);
    });

    it('should reject province 97-98', () => {
      expect(validateNIK('9701018901310123')).toBe(false);
      expect(validateNIK('9801018901310123')).toBe(false);
    });
  });

  describe('invalid NIKs - invalid month', () => {
    it('should reject month 00', () => {
      expect(validateNIK('3201019000010123')).toBe(false);
    });

    it('should reject month 13', () => {
      expect(validateNIK('3201019013010123')).toBe(false);
    });

    it('should reject month 99', () => {
      expect(validateNIK('3201019099010123')).toBe(false);
    });
  });

  describe('invalid NIKs - invalid day', () => {
    it('should reject day 00', () => {
      expect(validateNIK('3201010100000123')).toBe(false);
    });

    it('should reject day 32', () => {
      expect(validateNIK('3201010132000123')).toBe(false);
    });

    it('should reject day 99', () => {
      expect(validateNIK('3201010199000123')).toBe(false);
    });

    it('should reject female with day 40 (day 0)', () => {
      expect(validateNIK('3201010140000123')).toBe(false);
    });

    it('should reject female with day 72 (day 32)', () => {
      expect(validateNIK('3201010172000123')).toBe(false);
    });
  });

  describe('invalid NIKs - invalid dates', () => {
    it('should reject Feb 30', () => {
      expect(validateNIK('3201019002300123')).toBe(false);
    });

    it('should reject Feb 31', () => {
      expect(validateNIK('3201019002310123')).toBe(false);
    });

    it('should reject Feb 29 on non-leap year', () => {
      expect(validateNIK('3201019902290123')).toBe(false); // 1999
      expect(validateNIK('3201019502290123')).toBe(false); // 1995
    });

    it('should reject Apr 31', () => {
      expect(validateNIK('3201019004310123')).toBe(false);
    });

    it('should reject Jun 31', () => {
      expect(validateNIK('3201019006310123')).toBe(false);
    });

    it('should reject Sep 31', () => {
      expect(validateNIK('3201019009310123')).toBe(false);
    });

    it('should reject Nov 31', () => {
      expect(validateNIK('3201019011310123')).toBe(false);
    });
  });

  describe('invalid NIKs - future dates', () => {
    it('should reject future dates', () => {
      const nextYear = new Date().getFullYear() + 1;
      const yearStr = (nextYear % 100).toString().padStart(2, '0');
      const futureNIK = `320101${yearStr}01010123`;
      expect(validateNIK(futureNIK)).toBe(false);
    });
  });

  describe('invalid NIKs - dates too old', () => {
    it('should reject year 31 as 1931 but pass validation', () => {
      // Year 31 = 1931, which is >= 1900, so it should PASS
      expect(validateNIK('3201013101010123')).toBe(true);
    });

    // NOTE: Cannot test year before 1900 because:
    // - Logic: year > 30 → 1900 + year
    // - Minimum possible year: 1931 (year code 31)
    // - All years 00-30 map to 2000-2030
    // - The check `testDate < new Date(1900, 0, 1)` will never trigger
    // with current year parsing logic
  });
});

// =============================================================================
// 2. parseNIK() - Parse and extract NIK information
// =============================================================================

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

// =============================================================================
// 3. formatNIK() - Format NIK with separators
// =============================================================================

describe('formatNIK', () => {
  const validNIK = '3201018901310123';

  describe('basic formatting', () => {
    it('should format with default separator (dash)', () => {
      expect(formatNIK(validNIK)).toBe('32-01-01-89-01-31-0123');
    });

    it('should format correctly by segments', () => {
      const formatted = formatNIK(validNIK);
      const parts = formatted.split('-');

      expect(parts).toHaveLength(7);
      expect(parts[0]).toBe('32'); // Province
      expect(parts[1]).toBe('01'); // Regency
      expect(parts[2]).toBe('01'); // District
      expect(parts[3]).toBe('89'); // Year
      expect(parts[4]).toBe('01'); // Month
      expect(parts[5]).toBe('31'); // Day
      expect(parts[6]).toBe('0123'); // Serial
    });
  });

  describe('custom separators', () => {
    it('should format with space separator', () => {
      expect(formatNIK(validNIK, ' ')).toBe('32 01 01 89 01 31 0123');
    });

    it('should format with dot separator', () => {
      expect(formatNIK(validNIK, '.')).toBe('32.01.01.89.01.31.0123');
    });

    it('should format with slash separator', () => {
      expect(formatNIK(validNIK, '/')).toBe('32/01/01/89/01/31/0123');
    });

    it('should format with underscore separator', () => {
      expect(formatNIK(validNIK, '_')).toBe('32_01_01_89_01_31_0123');
    });

    it('should format with pipe separator', () => {
      expect(formatNIK(validNIK, '|')).toBe('32|01|01|89|01|31|0123');
    });

    it('should format with empty string (no separator)', () => {
      expect(formatNIK(validNIK, '')).toBe('3201018901310123');
    });
  });

  describe('edge cases', () => {
    it('should return original for invalid NIK', () => {
      expect(formatNIK('1234')).toBe('1234');
    });

    it('should return original for wrong length', () => {
      expect(formatNIK('123456789012345')).toBe('123456789012345');
    });

    it('should return original for non-digits', () => {
      expect(formatNIK('320123456789012X')).toBe('320123456789012X');
    });

    it('should return original for empty string', () => {
      expect(formatNIK('')).toBe('');
    });

    it('should handle female NIK', () => {
      expect(formatNIK('3201019508550123')).toBe('32-01-01-95-08-55-0123');
    });
  });
});

// =============================================================================
// 4. maskNIK() - Mask NIK for privacy
// =============================================================================

describe('maskNIK', () => {
  const validNIK = '3201018901310123';

  describe('default masking', () => {
    it('should mask with default options', () => {
      expect(maskNIK(validNIK)).toBe('3201********0123');
    });

    it('should show 4 chars at start and end by default', () => {
      const masked = maskNIK(validNIK);

      expect(masked.startsWith('3201')).toBe(true);
      expect(masked.endsWith('0123')).toBe(true);
      expect(masked).toContain('*');
    });

    it('should have correct length', () => {
      expect(maskNIK(validNIK).length).toBe(16);
    });
  });

  describe('custom mask character', () => {
    it('should mask with X', () => {
      expect(maskNIK(validNIK, { char: 'X' })).toBe('3201XXXXXXXX0123');
    });

    it('should mask with dot', () => {
      expect(maskNIK(validNIK, { char: '.' })).toBe('3201........0123');
    });

    it('should mask with dash', () => {
      expect(maskNIK(validNIK, { char: '-' })).toBe('3201--------0123');
    });

    it('should mask with hash', () => {
      expect(maskNIK(validNIK, { char: '#' })).toBe('3201########0123');
    });

    it('should mask with bullet', () => {
      expect(maskNIK(validNIK, { char: '•' })).toBe('3201••••••••0123');
    });
  });

  describe('custom start and end positions', () => {
    it('should mask with custom start', () => {
      expect(maskNIK(validNIK, { start: 2, end: 4 })).toBe('32**********0123');
    });

    it('should mask with custom end', () => {
      expect(maskNIK(validNIK, { start: 4, end: 2 })).toBe('3201**********23');
    });

    it('should mask with both custom', () => {
      expect(maskNIK(validNIK, { start: 6, end: 4 })).toBe('320101******0123');
    });

    it('should mask showing more characters', () => {
      expect(maskNIK(validNIK, { start: 8, end: 6 })).toBe('32010189**310123');
    });

    it('should mask showing less characters', () => {
      expect(maskNIK(validNIK, { start: 2, end: 2 })).toBe('32************23');
    });

    it('should mask with start only', () => {
      expect(maskNIK(validNIK, { start: 6, end: 0 })).toBe('320101**********');
    });

    it('should mask with end only', () => {
      expect(maskNIK(validNIK, { start: 0, end: 6 })).toBe('**********310123');
    });
  });

  describe('masking with separator', () => {
    it('should mask with dash separator', () => {
      expect(maskNIK(validNIK, { separator: '-' })).toBe(
        '32-01-**-**-**-**-0123'
      );
    });

    it('should mask with space separator', () => {
      expect(maskNIK(validNIK, { separator: ' ' })).toBe(
        '32 01 ** ** ** ** 0123'
      );
    });

    it('should mask with dot separator', () => {
      expect(maskNIK(validNIK, { separator: '.' })).toBe(
        '32.01.**.**.**.**.0123'
      );
    });

    it('should combine separator with custom char', () => {
      expect(maskNIK(validNIK, { char: 'X', separator: '-' })).toBe(
        '32-01-XX-XX-XX-XX-0123'
      );
    });

    it('should combine all options', () => {
      expect(
        maskNIK(validNIK, { start: 6, end: 4, char: '•', separator: '-' })
      ).toBe('32-01-01-••-••-••-0123');
    });
  });

  describe('edge cases', () => {
    it('should return original if start + end >= 16', () => {
      expect(maskNIK(validNIK, { start: 8, end: 8 })).toBe(validNIK);
    });

    it('should return original for invalid NIK', () => {
      expect(maskNIK('1234')).toBe('1234');
    });

    it('should return original for wrong length', () => {
      expect(maskNIK('123456789012345')).toBe('123456789012345');
    });

    it('should return original for non-digits', () => {
      expect(maskNIK('320123456789012X')).toBe('320123456789012X');
    });

    it('should handle female NIK', () => {
      expect(maskNIK('3201019508550123')).toBe('3201********0123');
    });

    it('should mask minimum (1 char masked)', () => {
      expect(maskNIK(validNIK, { start: 7, end: 8 })).toBe('3201018*01310123');
    });
  });
});

// =============================================================================
// 5. End-to-End Workflows
// =============================================================================

describe('end-to-end workflows', () => {
  describe('complete NIK processing pipeline', () => {
    it('should work with validation -> parse -> format -> mask', () => {
      const nik = '3201018901310123';

      // Step 1: Validate
      expect(validateNIK(nik)).toBe(true);

      // Step 2: Parse
      const info = parseNIK(nik);
      expect(info).not.toBeNull();
      expect(info?.province.name).toBe('Jawa Barat');
      expect(info?.gender).toBe('male');
      expect(info?.birthDate?.getFullYear()).toBe(1989);

      // Step 3: Format
      const formatted = formatNIK(nik);
      expect(formatted).toBe('32-01-01-89-01-31-0123');

      // Step 4: Mask
      const masked = maskNIK(nik, { separator: '-' });
      expect(masked).toContain('*');
      expect(masked).toContain('-');
    });

    it('should handle female NIK in complete workflow', () => {
      const nik = '3201019508550123';

      expect(validateNIK(nik)).toBe(true);

      const info = parseNIK(nik);
      expect(info?.gender).toBe('female');
      expect(info?.birthDate?.getDate()).toBe(15);

      const formatted = formatNIK(nik);
      expect(formatted).toBe('32-01-01-95-08-55-0123');

      const masked = maskNIK(nik);
      expect(masked).toBe('3201********0123');
    });

    it('should handle different provinces consistently', () => {
      const niks = [
        '3101018901310123', // Jakarta
        '5101018901310123', // Bali
        '7301018901310123', // Sulawesi Selatan
      ];

      niks.forEach((nik) => {
        expect(validateNIK(nik)).toBe(true);

        const info = parseNIK(nik);
        expect(info).not.toBeNull();
        expect(info?.isValid).toBe(true);

        const formatted = formatNIK(nik);
        expect(formatted.split('-')).toHaveLength(7);

        const masked = maskNIK(nik);
        expect(masked).toContain('*');
      });
    });
  });

  describe('invalid NIK handling across functions', () => {
    const invalidNIK = '1234';

    it('should consistently reject invalid NIK', () => {
      expect(validateNIK(invalidNIK)).toBe(false);
      expect(parseNIK(invalidNIK)).toBeNull();
      expect(formatNIK(invalidNIK)).toBe(invalidNIK);
      expect(maskNIK(invalidNIK)).toBe(invalidNIK);
    });

    it('should handle non-digit NIK consistently', () => {
      const nonDigit = '320123456789012X';

      expect(validateNIK(nonDigit)).toBe(false);
      expect(parseNIK(nonDigit)).toBeNull();
      expect(formatNIK(nonDigit)).toBe(nonDigit);
      expect(maskNIK(nonDigit)).toBe(nonDigit);
    });

    it('should handle invalid province consistently', () => {
      const invalidProvince = '9912345678901234';

      expect(validateNIK(invalidProvince)).toBe(false);
      expect(parseNIK(invalidProvince)).toBeNull();
    });
  });

  describe('year range handling across functions', () => {
    it('should handle year 2000 correctly', () => {
      const nik = '3201010001010123';

      expect(validateNIK(nik)).toBe(true);

      const info = parseNIK(nik);
      expect(info?.birthDate?.getFullYear()).toBe(2000);
    });

    it('should handle year 1999 correctly', () => {
      const nik = '3201019912310123';

      expect(validateNIK(nik)).toBe(true);

      const info = parseNIK(nik);
      expect(info?.birthDate?.getFullYear()).toBe(1999);
    });

    it('should handle year boundary (00/31) correctly', () => {
      const nik2000 = '3201010001010123';
      const nik1931 = '3201013101010123';

      expect(validateNIK(nik2000)).toBe(true);
      expect(validateNIK(nik1931)).toBe(true);

      expect(parseNIK(nik2000)?.birthDate?.getFullYear()).toBe(2000);
      expect(parseNIK(nik1931)?.birthDate?.getFullYear()).toBe(1931);
    });
  });

  describe('leap year handling', () => {
    it('should validate and parse leap year correctly', () => {
      const leapYearNIK = '3201010002290123'; // Feb 29, 2000

      expect(validateNIK(leapYearNIK)).toBe(true);

      const info = parseNIK(leapYearNIK);
      expect(info?.birthDate?.getFullYear()).toBe(2000);
      expect(info?.birthDate?.getMonth()).toBe(1);
      expect(info?.birthDate?.getDate()).toBe(29);
    });

    it('should reject Feb 29 on non-leap year', () => {
      const nonLeapYearNIK = '3201019902290123'; // Feb 29, 1999

      expect(validateNIK(nonLeapYearNIK)).toBe(false);
      expect(parseNIK(nonLeapYearNIK)).toBeNull();
    });
  });
});
