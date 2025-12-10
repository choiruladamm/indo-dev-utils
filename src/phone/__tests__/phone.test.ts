import { describe, it, expect } from 'vitest';
import {
  validatePhoneNumber,
  isMobileNumber,
  isLandlineNumber,
  formatPhoneNumber,
  toInternational,
  toNational,
  toE164,
  cleanPhoneNumber,
  maskPhoneNumber,
  parsePhoneNumber,
  getOperator,
} from '../index';

describe('Phone Module', () => {
  describe('validatePhoneNumber', () => {
    describe('valid mobile numbers', () => {
      it('should accept national format (08xx)', () => {
        expect(validatePhoneNumber('081234567890')).toBe(true);
        expect(validatePhoneNumber('0812345678')).toBe(true);
      });

      it('should accept international format with +', () => {
        expect(validatePhoneNumber('+6281234567890')).toBe(true);
      });

      it('should accept international format without +', () => {
        expect(validatePhoneNumber('6281234567890')).toBe(true);
      });

      it('should accept with separators', () => {
        expect(validatePhoneNumber('0812-3456-7890')).toBe(true);
        expect(validatePhoneNumber('+62 812-3456-7890')).toBe(true);
        expect(validatePhoneNumber('0812 3456 7890')).toBe(true);
      });

      it('should accept various operators', () => {
        expect(validatePhoneNumber('081234567890')).toBe(true); // Telkomsel
        expect(validatePhoneNumber('081734567890')).toBe(true); // XL
        expect(validatePhoneNumber('081434567890')).toBe(true); // Indosat
        expect(validatePhoneNumber('089534567890')).toBe(true); // Tri
        expect(validatePhoneNumber('088134567890')).toBe(true); // Smartfren
        expect(validatePhoneNumber('083134567890')).toBe(true); // Axis
      });
    });

    describe('valid landline numbers', () => {
      it('should accept Jakarta landline', () => {
        expect(validatePhoneNumber('0212345678')).toBe(true);
      });

      it('should accept Bandung landline', () => {
        expect(validatePhoneNumber('0221234567')).toBe(true);
      });
    });

    describe('invalid numbers', () => {
      it('should reject too short numbers', () => {
        expect(validatePhoneNumber('1234')).toBe(false);
        expect(validatePhoneNumber('08123')).toBe(false);
      });

      it('should reject too long numbers', () => {
        expect(validatePhoneNumber('08123456789012345')).toBe(false);
      });

      it('should reject invalid prefix', () => {
        expect(validatePhoneNumber('080012345678')).toBe(false);
        expect(validatePhoneNumber('090012345678')).toBe(false);
      });

      it('should reject wrong country code', () => {
        expect(validatePhoneNumber('+11234567890')).toBe(false);
        expect(validatePhoneNumber('+8612345678')).toBe(false);
      });

      it('should reject empty or invalid input', () => {
        expect(validatePhoneNumber('')).toBe(false);
        expect(validatePhoneNumber('abcdefg')).toBe(false);
      });
    });
  });

  describe('isMobileNumber', () => {
    it('should return true for mobile numbers', () => {
      expect(isMobileNumber('081234567890')).toBe(true);
      expect(isMobileNumber('+6281234567890')).toBe(true);
    });

    it('should return false for landline numbers', () => {
      expect(isMobileNumber('0212345678')).toBe(false);
    });

    it('should return false for invalid numbers', () => {
      expect(isMobileNumber('1234')).toBe(false);
    });
  });

  describe('isLandlineNumber', () => {
    it('should return true for landline numbers', () => {
      expect(isLandlineNumber('0212345678')).toBe(true);
      expect(isLandlineNumber('0221234567')).toBe(true);
    });

    it('should return false for mobile numbers', () => {
      expect(isLandlineNumber('081234567890')).toBe(false);
    });
  });

  describe('formatPhoneNumber', () => {
    const phone = '081234567890';

    it('should format to international', () => {
      const formatted = formatPhoneNumber(phone, 'international');
      expect(formatted).toBe('+62 812-3456-7890');
    });

    it('should format to national', () => {
      const formatted = formatPhoneNumber(phone, 'national');
      expect(formatted).toBe('0812-3456-7890');
    });

    it('should format to e164', () => {
      const formatted = formatPhoneNumber(phone, 'e164');
      expect(formatted).toBe('6281234567890');
    });

    it('should format to display (same as national)', () => {
      const formatted = formatPhoneNumber(phone, 'display');
      expect(formatted).toBe('0812-3456-7890');
    });

    it('should handle already formatted input', () => {
      const formatted = formatPhoneNumber('+62 812-3456-7890', 'national');
      expect(formatted).toBe('0812-3456-7890');
    });

    it('should return original for invalid input', () => {
      expect(formatPhoneNumber('invalid', 'national')).toBe('invalid');
    });
  });

  describe('toInternational', () => {
    it('should convert from national', () => {
      expect(toInternational('081234567890')).toBe('+62 812-3456-7890');
    });

    it('should convert from e164', () => {
      expect(toInternational('6281234567890')).toBe('+62 812-3456-7890');
    });

    it('should handle already international', () => {
      expect(toInternational('+6281234567890')).toBe('+62 812-3456-7890');
    });
  });

  describe('toNational', () => {
    it('should convert from international', () => {
      expect(toNational('+6281234567890')).toBe('0812-3456-7890');
    });

    it('should convert from e164', () => {
      expect(toNational('6281234567890')).toBe('0812-3456-7890');
    });

    it('should format already national', () => {
      expect(toNational('081234567890')).toBe('0812-3456-7890');
    });
  });

  describe('toE164', () => {
    it('should convert from national', () => {
      expect(toE164('081234567890')).toBe('6281234567890');
    });

    it('should convert from international', () => {
      expect(toE164('+62 812-3456-7890')).toBe('6281234567890');
    });

    it('should handle already e164', () => {
      expect(toE164('6281234567890')).toBe('6281234567890');
    });
  });

  describe('cleanPhoneNumber', () => {
    it('should remove spaces', () => {
      expect(cleanPhoneNumber('0812 3456 7890')).toBe('081234567890');
    });

    it('should remove dashes', () => {
      expect(cleanPhoneNumber('0812-3456-7890')).toBe('081234567890');
    });

    it('should preserve leading +', () => {
      expect(cleanPhoneNumber('+62 812 3456 7890')).toBe('+6281234567890');
    });

    it('should handle mixed separators', () => {
      expect(cleanPhoneNumber('+62 (812) 3456-7890')).toBe('+6281234567890');
    });
  });

  describe('maskPhoneNumber', () => {
    const phone = '081234567890';

    it('should mask with default options', () => {
      const masked = maskPhoneNumber(phone);
      expect(masked).toBe('0812****7890');
    });

    it('should mask with custom character', () => {
      const masked = maskPhoneNumber(phone, { char: 'X' });
      expect(masked).toBe('0812XXXX7890');
    });

    it('should mask with separator', () => {
      const masked = maskPhoneNumber(phone, { separator: '-' });
      expect(masked).toBe('0812-****-7890');
    });

    it('should mask with custom start and end', () => {
      const masked = maskPhoneNumber(phone, { start: 5, end: 3 });
      expect(masked).toBe('08123****890');
    });

    it('should return original if start+end >= length', () => {
      const masked = maskPhoneNumber(phone, { start: 6, end: 6 });
      expect(masked).toBe(phone);
    });
  });

  describe('getOperator', () => {
    it('should detect Telkomsel', () => {
      expect(getOperator('081234567890')).toBe('Telkomsel');
      expect(getOperator('082134567890')).toBe('Telkomsel');
      expect(getOperator('085234567890')).toBe('Telkomsel');
    });

    it('should detect XL', () => {
      expect(getOperator('081734567890')).toBe('XL');
      expect(getOperator('087734567890')).toBe('XL');
    });

    it('should detect Indosat (including former Tri prefixes)', () => {
      expect(getOperator('081434567890')).toBe('Indosat');
      expect(getOperator('085634567890')).toBe('Indosat');
      expect(getOperator('089534567890')).toBe('Indosat');
      expect(getOperator('089834567890')).toBe('Indosat');
    });

    it('should detect Smartfren', () => {
      expect(getOperator('088134567890')).toBe('Smartfren');
      expect(getOperator('088834567890')).toBe('Smartfren');
    });

    it('should detect Axis', () => {
      expect(getOperator('083134567890')).toBe('Axis');
      expect(getOperator('083834567890')).toBe('Axis');
    });

    it('should return null for landline', () => {
      expect(getOperator('0212345678')).toBe(null);
    });

    it('should return null for invalid', () => {
      expect(getOperator('1234')).toBe(null);
    });

    it('should handle international format', () => {
      expect(getOperator('+6281234567890')).toBe('Telkomsel');
    });
  });

  describe('parsePhoneNumber', () => {
    it('should parse valid mobile number', () => {
      const info = parsePhoneNumber('081234567890');

      expect(info).not.toBeNull();
      expect(info?.countryCode).toBe('62');
      expect(info?.operator).toBe('Telkomsel');
      expect(info?.number).toBe('81234567890');
      expect(info?.formatted.international).toBe('+62 812-3456-7890');
      expect(info?.formatted.national).toBe('0812-3456-7890');
      expect(info?.formatted.e164).toBe('6281234567890');
      expect(info?.isValid).toBe(true);
      expect(info?.isMobile).toBe(true);
      expect(info?.isLandline).toBe(false);
    });

    it('should parse international format', () => {
      const info = parsePhoneNumber('+6281234567890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
      expect(info?.formatted.national).toBe('0812-3456-7890');
    });

    it('should parse with separators', () => {
      const info = parsePhoneNumber('0812-3456-7890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
      expect(info?.number).toBe('81234567890');
    });

    it('should parse landline with region', () => {
      const info = parsePhoneNumber('0212345678');

      expect(info).not.toBeNull();
      expect(info?.isLandline).toBe(true);
      expect(info?.isMobile).toBe(false);
      expect(info?.operator).toBe(null);
      expect(info?.region).toBe('Jakarta');
    });

    it('should return null for invalid number', () => {
      expect(parsePhoneNumber('1234')).toBeNull();
      expect(parsePhoneNumber('invalid')).toBeNull();
    });
  });

  describe('end-to-end workflow', () => {
    it('should work with complete phone processing pipeline', () => {
      const phone = '081234567890';

      // Step 1: Validate
      expect(validatePhoneNumber(phone)).toBe(true);

      // Step 2: Parse
      const info = parsePhoneNumber(phone);
      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');

      // Step 3: Format
      const formatted = formatPhoneNumber(phone, 'international');
      expect(formatted).toBe('+62 812-3456-7890');

      // Step 4: Mask for display
      const masked = maskPhoneNumber(phone, { separator: '-' });
      expect(masked).toContain('*');
      expect(masked).toContain('-');
    });

    it('should handle various input formats consistently', () => {
      const formats = [
        '081234567890',
        '+6281234567890',
        '6281234567890',
        '0812-3456-7890',
        '+62 812-3456-7890',
      ];

      formats.forEach((format) => {
        const info = parsePhoneNumber(format);
        expect(info?.operator).toBe('Telkomsel');
        expect(info?.formatted.e164).toBe('6281234567890');
      });
    });
  });
});
