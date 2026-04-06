import { describe, expect, it } from 'vitest';
import {
  validatePhoneNumber,
  isMobileNumber,
  isLandlineNumber,
} from '../validate';

describe('validatePhoneNumber', () => {
  describe('valid mobile numbers - national format (08xx)', () => {
    it('should accept valid Telkomsel numbers', () => {
      expect(validatePhoneNumber('081234567890')).toBe(true);
      expect(validatePhoneNumber('082134567890')).toBe(true);
      expect(validatePhoneNumber('085234567890')).toBe(true);
      expect(validatePhoneNumber('085334567890')).toBe(true);
    });

    it('should accept valid XL numbers', () => {
      expect(validatePhoneNumber('081734567890')).toBe(true);
      expect(validatePhoneNumber('081834567890')).toBe(true);
      expect(validatePhoneNumber('081934567890')).toBe(true);
      expect(validatePhoneNumber('087734567890')).toBe(true);
      expect(validatePhoneNumber('087834567890')).toBe(true);
    });

    it('should accept valid Indosat numbers', () => {
      expect(validatePhoneNumber('081434567890')).toBe(true);
      expect(validatePhoneNumber('081534567890')).toBe(true);
      expect(validatePhoneNumber('081634567890')).toBe(true);
      expect(validatePhoneNumber('085534567890')).toBe(true);
      expect(validatePhoneNumber('085634567890')).toBe(true);
      expect(validatePhoneNumber('085734567890')).toBe(true);
      expect(validatePhoneNumber('085834567890')).toBe(true);
    });

    it('should accept valid Tri (now Indosat) numbers', () => {
      expect(validatePhoneNumber('089534567890')).toBe(true);
      expect(validatePhoneNumber('089634567890')).toBe(true);
      expect(validatePhoneNumber('089734567890')).toBe(true);
      expect(validatePhoneNumber('089834567890')).toBe(true);
      expect(validatePhoneNumber('089934567890')).toBe(true);
    });

    it('should accept valid Smartfren numbers', () => {
      expect(validatePhoneNumber('088134567890')).toBe(true);
      expect(validatePhoneNumber('088234567890')).toBe(true);
      expect(validatePhoneNumber('088334567890')).toBe(true);
      expect(validatePhoneNumber('088834567890')).toBe(true);
      expect(validatePhoneNumber('088934567890')).toBe(true);
    });

    it('should accept valid Axis numbers', () => {
      expect(validatePhoneNumber('083134567890')).toBe(true);
      expect(validatePhoneNumber('083834567890')).toBe(true);
    });

    it('should accept minimum length mobile (10 digits)', () => {
      expect(validatePhoneNumber('0812345678')).toBe(true);
    });

    it('should accept maximum length mobile (13 digits)', () => {
      expect(validatePhoneNumber('0812345678901')).toBe(true);
    });
  });

  describe('valid mobile numbers - international format', () => {
    it('should accept with + prefix', () => {
      expect(validatePhoneNumber('+6281234567890')).toBe(true);
    });

    it('should accept without + prefix', () => {
      expect(validatePhoneNumber('6281234567890')).toBe(true);
    });

    it('should accept with spaces', () => {
      expect(validatePhoneNumber('+62 812 3456 7890')).toBe(true);
      expect(validatePhoneNumber('62 812 3456 7890')).toBe(true);
    });

    it('should accept with dashes', () => {
      expect(validatePhoneNumber('+62-812-3456-7890')).toBe(true);
      expect(validatePhoneNumber('62-812-3456-7890')).toBe(true);
    });

    it('should accept with mixed separators', () => {
      expect(validatePhoneNumber('+62 812-3456-7890')).toBe(true);
      expect(validatePhoneNumber('+62 (812) 3456-7890')).toBe(true);
    });
  });

  describe('valid landline numbers', () => {
    it('should accept Jakarta landline (021)', () => {
      expect(validatePhoneNumber('0212345678')).toBe(true);
      expect(validatePhoneNumber('02187654321')).toBe(true);
    });

    it('should accept Bandung landline (022)', () => {
      expect(validatePhoneNumber('0221234567')).toBe(true);
      expect(validatePhoneNumber('02287654321')).toBe(true);
    });

    it('should accept Surabaya landline (031)', () => {
      expect(validatePhoneNumber('0311234567')).toBe(true);
    });

    it('should accept Medan landline (061)', () => {
      expect(validatePhoneNumber('0611234567')).toBe(true);
    });

    it('should accept Semarang landline (024)', () => {
      expect(validatePhoneNumber('0241234567')).toBe(true);
    });

    it('should accept landline with international format', () => {
      expect(validatePhoneNumber('+62212345678')).toBe(true);
      expect(validatePhoneNumber('62212345678')).toBe(true);
    });
  });

  describe('invalid numbers - wrong length', () => {
    it('should reject too short numbers', () => {
      expect(validatePhoneNumber('1234')).toBe(false);
      expect(validatePhoneNumber('08123')).toBe(false);
      expect(validatePhoneNumber('081234567')).toBe(false); // 9 digits
    });

    it('should reject too long numbers', () => {
      expect(validatePhoneNumber('08123456789012345')).toBe(false);
      expect(validatePhoneNumber('081234567890123456')).toBe(false);
    });
  });

  describe('invalid numbers - wrong prefix', () => {
    it('should reject invalid mobile prefix', () => {
      expect(validatePhoneNumber('080012345678')).toBe(false);
      expect(validatePhoneNumber('084012345678')).toBe(false);
      expect(validatePhoneNumber('090012345678')).toBe(false);
      expect(validatePhoneNumber('070012345678')).toBe(false);
    });

    it('should reject numbers starting with 1', () => {
      expect(validatePhoneNumber('181234567890')).toBe(false);
    });
  });

  describe('invalid numbers - wrong country code', () => {
    it('should reject wrong country code', () => {
      expect(validatePhoneNumber('+11234567890')).toBe(false);
      expect(validatePhoneNumber('+8612345678')).toBe(false);
      expect(validatePhoneNumber('+1234567890')).toBe(false);
    });

    it('should reject country code without number', () => {
      expect(validatePhoneNumber('+62')).toBe(false);
      expect(validatePhoneNumber('62')).toBe(false);
    });
  });

  describe('invalid numbers - bad format', () => {
    it('should reject empty string', () => {
      expect(validatePhoneNumber('')).toBe(false);
    });

    it('should reject alphabetic characters', () => {
      expect(validatePhoneNumber('abcdefg')).toBe(false);
      expect(validatePhoneNumber('081abcd7890')).toBe(false);
    });

    it('should reject special characters (except valid separators)', () => {
      expect(validatePhoneNumber('0812#456#7890')).toBe(false);
      expect(validatePhoneNumber('0812*456*7890')).toBe(false);
    });

    it('should reject only separators', () => {
      expect(validatePhoneNumber('---')).toBe(false);
      expect(validatePhoneNumber('   ')).toBe(false);
    });
  });
});

describe('isMobileNumber', () => {
  describe('should return true for mobile numbers', () => {
    it('should detect national mobile format', () => {
      expect(isMobileNumber('081234567890')).toBe(true);
      expect(isMobileNumber('082134567890')).toBe(true);
      expect(isMobileNumber('085234567890')).toBe(true);
    });

    it('should detect international mobile format', () => {
      expect(isMobileNumber('+6281234567890')).toBe(true);
      expect(isMobileNumber('6281234567890')).toBe(true);
    });

    it('should detect mobile with separators', () => {
      expect(isMobileNumber('0812-3456-7890')).toBe(true);
      expect(isMobileNumber('+62 812 3456 7890')).toBe(true);
    });

    it('should detect all operators', () => {
      expect(isMobileNumber('081734567890')).toBe(true); // XL
      expect(isMobileNumber('081434567890')).toBe(true); // Indosat
      expect(isMobileNumber('089534567890')).toBe(true); // Tri
      expect(isMobileNumber('088134567890')).toBe(true); // Smartfren
      expect(isMobileNumber('083134567890')).toBe(true); // Axis
    });
  });

  describe('should return false for non-mobile numbers', () => {
    it('should reject landline numbers', () => {
      expect(isMobileNumber('0212345678')).toBe(false);
      expect(isMobileNumber('0221234567')).toBe(false);
      expect(isMobileNumber('0311234567')).toBe(false);
    });

    it('should reject invalid numbers', () => {
      expect(isMobileNumber('1234')).toBe(false);
      expect(isMobileNumber('')).toBe(false);
      expect(isMobileNumber('invalid')).toBe(false);
    });

    it('should reject wrong prefix', () => {
      expect(isMobileNumber('090012345678')).toBe(false);
    });

    it('should reject 620 prefix (invalid country code pattern)', () => {
      expect(isMobileNumber('620812345678')).toBe(false);
    });
  });
});

describe('isLandlineNumber', () => {
  describe('should return true for landline numbers', () => {
    it('should detect Jakarta landline', () => {
      expect(isLandlineNumber('0212345678')).toBe(true);
      expect(isLandlineNumber('02187654321')).toBe(true);
    });

    it('should detect Bandung landline', () => {
      expect(isLandlineNumber('0221234567')).toBe(true);
    });

    it('should detect Surabaya landline', () => {
      expect(isLandlineNumber('0311234567')).toBe(true);
    });

    it('should detect international landline format', () => {
      expect(isLandlineNumber('+62212345678')).toBe(true);
      expect(isLandlineNumber('62212345678')).toBe(true);
    });

    it('should detect landline with separators', () => {
      expect(isLandlineNumber('021-2345678')).toBe(true);
      expect(isLandlineNumber('021 234 5678')).toBe(true);
    });
  });

  describe('should return false for non-landline numbers', () => {
    it('should reject mobile numbers', () => {
      expect(isLandlineNumber('081234567890')).toBe(false);
      expect(isLandlineNumber('+6281234567890')).toBe(false);
    });

    it('should reject invalid numbers', () => {
      expect(isLandlineNumber('1234')).toBe(false);
      expect(isLandlineNumber('')).toBe(false);
      expect(isLandlineNumber('invalid')).toBe(false);
    });
  });
});
