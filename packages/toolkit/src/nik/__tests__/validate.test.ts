import { describe, expect, it } from 'vitest';
import { validateNIK } from '../validate';

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
