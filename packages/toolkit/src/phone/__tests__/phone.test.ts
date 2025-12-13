/**
 * Test suite for Phone module
 *
 * Comprehensive test coverage following TDD approach
 * Pattern: Similar to currency module test structure
 *
 * @module phone/__tests__
 */

import { describe, expect, it } from 'vitest';
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

// =============================================================================
// 1. validatePhoneNumber() - Phone number validation
// =============================================================================

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

// =============================================================================
// 2. isMobileNumber() - Check if number is mobile
// =============================================================================

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
  });
});

// =============================================================================
// 3. isLandlineNumber() - Check if number is landline
// =============================================================================

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

// =============================================================================
// 4. formatPhoneNumber() - Format to different styles
// =============================================================================

describe('formatPhoneNumber', () => {
  const testPhone = '081234567890';

  describe('format to international', () => {
    it('should format national to international', () => {
      expect(formatPhoneNumber(testPhone, 'international')).toBe(
        '+62 812-3456-7890'
      );
    });

    it('should format e164 to international', () => {
      expect(formatPhoneNumber('6281234567890', 'international')).toBe(
        '+62 812-3456-7890'
      );
    });

    it('should keep already international format', () => {
      expect(formatPhoneNumber('+6281234567890', 'international')).toBe(
        '+62 812-3456-7890'
      );
    });

    it('should handle with separators', () => {
      expect(formatPhoneNumber('0812-3456-7890', 'international')).toBe(
        '+62 812-3456-7890'
      );
    });
  });

  describe('format to national', () => {
    it('should format international to national', () => {
      expect(formatPhoneNumber('+6281234567890', 'national')).toBe(
        '0812-3456-7890'
      );
    });

    it('should format e164 to national', () => {
      expect(formatPhoneNumber('6281234567890', 'national')).toBe(
        '0812-3456-7890'
      );
    });

    it('should format already national', () => {
      expect(formatPhoneNumber(testPhone, 'national')).toBe('0812-3456-7890');
    });

    it('should handle with separators', () => {
      expect(formatPhoneNumber('0812 3456 7890', 'national')).toBe(
        '0812-3456-7890'
      );
    });
  });

  describe('format to e164', () => {
    it('should format national to e164', () => {
      expect(formatPhoneNumber(testPhone, 'e164')).toBe('6281234567890');
    });

    it('should format international to e164', () => {
      expect(formatPhoneNumber('+62 812-3456-7890', 'e164')).toBe(
        '6281234567890'
      );
    });

    it('should keep already e164 format', () => {
      expect(formatPhoneNumber('6281234567890', 'e164')).toBe('6281234567890');
    });

    it('should remove all separators', () => {
      expect(formatPhoneNumber('0812-3456-7890', 'e164')).toBe(
        '6281234567890'
      );
    });
  });

  describe('format to display (same as national)', () => {
    it('should format to display format', () => {
      expect(formatPhoneNumber(testPhone, 'display')).toBe('0812-3456-7890');
    });
  });

  describe('edge cases', () => {
    it('should return original for invalid input', () => {
      expect(formatPhoneNumber('invalid', 'national')).toBe('invalid');
      expect(formatPhoneNumber('1234', 'international')).toBe('1234');
      expect(formatPhoneNumber('', 'e164')).toBe('');
    });

    it('should handle landline numbers', () => {
      expect(formatPhoneNumber('0212345678', 'international')).toBe(
        '+62 21-2345678'
      );
      expect(formatPhoneNumber('0212345678', 'national')).toBe('021-2345678');
      expect(formatPhoneNumber('0212345678', 'e164')).toBe('62212345678');
    });

    it('should handle minimum length mobile', () => {
      expect(formatPhoneNumber('0812345678', 'national')).toBe('0812-345678');
    });

    it('should handle maximum length mobile', () => {
      expect(formatPhoneNumber('0812345678901', 'national')).toBe(
        '0812-3456-78901'
      );
    });
  });
});

// =============================================================================
// 5. toInternational() - Convert to international format
// =============================================================================

describe('toInternational', () => {
  describe('conversion from various formats', () => {
    it('should convert from national', () => {
      expect(toInternational('081234567890')).toBe('+62 812-3456-7890');
    });

    it('should convert from e164', () => {
      expect(toInternational('6281234567890')).toBe('+62 812-3456-7890');
    });

    it('should handle already international', () => {
      expect(toInternational('+6281234567890')).toBe('+62 812-3456-7890');
    });

    it('should handle with separators', () => {
      expect(toInternational('0812-3456-7890')).toBe('+62 812-3456-7890');
      expect(toInternational('0812 3456 7890')).toBe('+62 812-3456-7890');
    });
  });

  describe('different operators', () => {
    it('should convert Telkomsel', () => {
      expect(toInternational('081234567890')).toBe('+62 812-3456-7890');
      expect(toInternational('082134567890')).toBe('+62 821-3456-7890');
    });

    it('should convert XL', () => {
      expect(toInternational('081734567890')).toBe('+62 817-3456-7890');
    });

    it('should convert Indosat', () => {
      expect(toInternational('081434567890')).toBe('+62 814-3456-7890');
    });
  });

  describe('landline conversion', () => {
    it('should convert Jakarta landline', () => {
      expect(toInternational('0212345678')).toBe('+62 21-2345678');
    });

    it('should convert Bandung landline', () => {
      expect(toInternational('0221234567')).toBe('+62 22-1234567');
    });
  });

  describe('edge cases', () => {
    it('should return original for invalid input', () => {
      expect(toInternational('invalid')).toBe('invalid');
      expect(toInternational('1234')).toBe('1234');
    });
  });
});

// =============================================================================
// 6. toNational() - Convert to national format
// =============================================================================

describe('toNational', () => {
  describe('conversion from various formats', () => {
    it('should convert from international', () => {
      expect(toNational('+6281234567890')).toBe('0812-3456-7890');
    });

    it('should convert from e164', () => {
      expect(toNational('6281234567890')).toBe('0812-3456-7890');
    });

    it('should format already national', () => {
      expect(toNational('081234567890')).toBe('0812-3456-7890');
    });

    it('should handle with separators', () => {
      expect(toNational('+62 812 3456 7890')).toBe('0812-3456-7890');
      expect(toNational('62-812-3456-7890')).toBe('0812-3456-7890');
    });
  });

  describe('different operators', () => {
    it('should convert Telkomsel', () => {
      expect(toNational('+6281234567890')).toBe('0812-3456-7890');
      expect(toNational('+6282134567890')).toBe('0821-3456-7890');
    });

    it('should convert XL', () => {
      expect(toNational('+6281734567890')).toBe('0817-3456-7890');
    });

    it('should convert Indosat', () => {
      expect(toNational('+6281434567890')).toBe('0814-3456-7890');
    });
  });

  describe('landline conversion', () => {
    it('should convert Jakarta landline', () => {
      expect(toNational('+62212345678')).toBe('021-2345678');
    });

    it('should convert Bandung landline', () => {
      expect(toNational('+62221234567')).toBe('022-1234567');
    });
  });

  describe('edge cases', () => {
    it('should return original for invalid input', () => {
      expect(toNational('invalid')).toBe('invalid');
      expect(toNational('1234')).toBe('1234');
    });
  });
});

// =============================================================================
// 7. toE164() - Convert to E164 format
// =============================================================================

describe('toE164', () => {
  describe('conversion from various formats', () => {
    it('should convert from national', () => {
      expect(toE164('081234567890')).toBe('6281234567890');
    });

    it('should convert from international', () => {
      expect(toE164('+62 812-3456-7890')).toBe('6281234567890');
    });

    it('should keep already e164', () => {
      expect(toE164('6281234567890')).toBe('6281234567890');
    });

    it('should remove all separators', () => {
      expect(toE164('0812-3456-7890')).toBe('6281234567890');
      expect(toE164('0812 3456 7890')).toBe('6281234567890');
      expect(toE164('+62 (812) 3456-7890')).toBe('6281234567890');
    });
  });

  describe('different operators', () => {
    it('should convert Telkomsel', () => {
      expect(toE164('081234567890')).toBe('6281234567890');
      expect(toE164('082134567890')).toBe('6282134567890');
    });

    it('should convert XL', () => {
      expect(toE164('081734567890')).toBe('6281734567890');
    });

    it('should convert Indosat', () => {
      expect(toE164('081434567890')).toBe('6281434567890');
    });
  });

  describe('landline conversion', () => {
    it('should convert Jakarta landline', () => {
      expect(toE164('0212345678')).toBe('62212345678');
    });

    it('should convert Bandung landline', () => {
      expect(toE164('0221234567')).toBe('62221234567');
    });
  });

  describe('edge cases', () => {
    it('should return original for invalid input', () => {
      expect(toE164('invalid')).toBe('invalid');
      expect(toE164('1234')).toBe('1234');
    });

    it('should handle empty string', () => {
      expect(toE164('')).toBe('');
    });
  });
});

// =============================================================================
// 8. cleanPhoneNumber() - Remove separators
// =============================================================================

describe('cleanPhoneNumber', () => {
  describe('removing separators', () => {
    it('should remove spaces', () => {
      expect(cleanPhoneNumber('0812 3456 7890')).toBe('081234567890');
    });

    it('should remove dashes', () => {
      expect(cleanPhoneNumber('0812-3456-7890')).toBe('081234567890');
    });

    it('should remove parentheses', () => {
      expect(cleanPhoneNumber('(0812) 3456-7890')).toBe('081234567890');
    });

    it('should remove dots', () => {
      expect(cleanPhoneNumber('0812.3456.7890')).toBe('081234567890');
    });

    it('should remove mixed separators', () => {
      expect(cleanPhoneNumber('+62 (812) 3456-7890')).toBe('+6281234567890');
      expect(cleanPhoneNumber('0812 - 3456 . 7890')).toBe('081234567890');
    });
  });

  describe('preserving valid characters', () => {
    it('should preserve leading +', () => {
      expect(cleanPhoneNumber('+62 812 3456 7890')).toBe('+6281234567890');
    });

    it('should preserve digits', () => {
      expect(cleanPhoneNumber('081234567890')).toBe('081234567890');
    });

    it('should preserve + at start only', () => {
      expect(cleanPhoneNumber('+6281234567890')).toBe('+6281234567890');
    });
  });

  describe('edge cases', () => {
    it('should handle already clean number', () => {
      expect(cleanPhoneNumber('081234567890')).toBe('081234567890');
    });

    it('should handle empty string', () => {
      expect(cleanPhoneNumber('')).toBe('');
    });

    it('should handle only separators', () => {
      expect(cleanPhoneNumber('---')).toBe('');
      expect(cleanPhoneNumber('   ')).toBe('');
    });

    it('should handle multiple spaces', () => {
      expect(cleanPhoneNumber('0812    3456    7890')).toBe('081234567890');
    });
  });
});

// =============================================================================
// 9. maskPhoneNumber() - Mask for privacy
// =============================================================================

describe('maskPhoneNumber', () => {
  const testPhone = '081234567890';

  describe('default masking', () => {
    it('should mask with default options', () => {
      const masked = maskPhoneNumber(testPhone);
      expect(masked).toBe('0812****7890');
    });

    it('should show 4 chars at start and end by default', () => {
      const masked = maskPhoneNumber(testPhone);
      expect(masked.startsWith('0812')).toBe(true);
      expect(masked.endsWith('7890')).toBe(true);
      expect(masked).toContain('*');
    });
  });

  describe('custom mask character', () => {
    it('should mask with custom character', () => {
      expect(maskPhoneNumber(testPhone, { char: 'X' })).toBe('0812XXXX7890');
    });

    it('should mask with dot', () => {
      expect(maskPhoneNumber(testPhone, { char: '.' })).toBe('0812....7890');
    });

    it('should mask with dash', () => {
      expect(maskPhoneNumber(testPhone, { char: '-' })).toBe('0812----7890');
    });
  });

  describe('custom start and end', () => {
    it('should mask with custom start', () => {
      const masked = maskPhoneNumber(testPhone, { start: 3, end: 4 });
      expect(masked).toBe('081*****7890');
    });

    it('should mask with custom end', () => {
      const masked = maskPhoneNumber(testPhone, { start: 4, end: 3 });
      expect(masked).toBe('0812*****890');
    });

    it('should mask with both custom', () => {
      const masked = maskPhoneNumber(testPhone, { start: 5, end: 3 });
      expect(masked).toBe('08123****890');
    });

    it('should mask showing more characters', () => {
      const masked = maskPhoneNumber(testPhone, { start: 6, end: 4 });
      expect(masked).toBe('081234**7890');
    });

    it('should mask showing less characters', () => {
      const masked = maskPhoneNumber(testPhone, { start: 2, end: 2 });
      expect(masked).toBe('08********90');
    });
  });

  describe('with separator', () => {
    it('should mask with dash separator', () => {
      const masked = maskPhoneNumber(testPhone, { separator: '-' });
      expect(masked).toBe('0812-****-7890');
    });

    it('should mask with space separator', () => {
      const masked = maskPhoneNumber(testPhone, { separator: ' ' });
      expect(masked).toBe('0812 **** 7890');
    });

    it('should combine separator with custom char', () => {
      const masked = maskPhoneNumber(testPhone, {
        char: 'X',
        separator: '-',
      });
      expect(masked).toBe('0812-XXXX-7890');
    });

    it('should combine all options', () => {
      const masked = maskPhoneNumber(testPhone, {
        start: 3,
        end: 3,
        char: '•',
        separator: ' ',
      });
      expect(masked).toBe('081 •••••• 890');
    });
  });

  describe('edge cases', () => {
    it('should return original if start + end >= length', () => {
      const masked = maskPhoneNumber(testPhone, { start: 6, end: 6 });
      expect(masked).toBe(testPhone);
    });

    it('should handle short numbers', () => {
      const masked = maskPhoneNumber('0812345678', { start: 4, end: 4 });
      expect(masked).toBe('0812**5678');
    });

    it('should handle minimum masking (1 char masked)', () => {
      const masked = maskPhoneNumber('081234567890', {
        start: 5,
        end: 6,
      });
      expect(masked).toBe('08123*567890');
    });

    it('should handle invalid phone gracefully', () => {
      const masked = maskPhoneNumber('1234');
      // Should still mask even if invalid
      expect(masked).toContain('*');
    });

    it('should handle international format', () => {
      const masked = maskPhoneNumber('+6281234567890');
      expect(masked.startsWith('+628')).toBe(true);
      expect(masked).toContain('*');
    });
  });
});

// =============================================================================
// 10. getOperator() - Detect mobile operator
// =============================================================================

describe('getOperator', () => {
  describe('Telkomsel detection', () => {
    it('should detect 0811 prefix', () => {
      expect(getOperator('081134567890')).toBe('Telkomsel');
    });

    it('should detect 0812 prefix', () => {
      expect(getOperator('081234567890')).toBe('Telkomsel');
    });

    it('should detect 0813 prefix', () => {
      expect(getOperator('081334567890')).toBe('Telkomsel');
    });

    it('should detect 0821 prefix', () => {
      expect(getOperator('082134567890')).toBe('Telkomsel');
    });

    it('should detect 0822 prefix', () => {
      expect(getOperator('082234567890')).toBe('Telkomsel');
    });

    it('should detect 0823 prefix', () => {
      expect(getOperator('082334567890')).toBe('Telkomsel');
    });

    it('should detect 0851 prefix', () => {
      expect(getOperator('085134567890')).toBe('Telkomsel');
    });

    it('should detect 0852 prefix', () => {
      expect(getOperator('085234567890')).toBe('Telkomsel');
    });

    it('should detect 0853 prefix', () => {
      expect(getOperator('085334567890')).toBe('Telkomsel');
    });
  });

  describe('XL detection', () => {
    it('should detect 0817 prefix', () => {
      expect(getOperator('081734567890')).toBe('XL');
    });

    it('should detect 0818 prefix', () => {
      expect(getOperator('081834567890')).toBe('XL');
    });

    it('should detect 0819 prefix', () => {
      expect(getOperator('081934567890')).toBe('XL');
    });

    it('should detect 0877 prefix', () => {
      expect(getOperator('087734567890')).toBe('XL');
    });

    it('should detect 0878 prefix', () => {
      expect(getOperator('087834567890')).toBe('XL');
    });
  });

  describe('Indosat detection (including former Tri)', () => {
    it('should detect 0814 prefix', () => {
      expect(getOperator('081434567890')).toBe('Indosat');
    });

    it('should detect 0815 prefix', () => {
      expect(getOperator('081534567890')).toBe('Indosat');
    });

    it('should detect 0816 prefix', () => {
      expect(getOperator('081634567890')).toBe('Indosat');
    });

    it('should detect 0855 prefix', () => {
      expect(getOperator('085534567890')).toBe('Indosat');
    });

    it('should detect 0856 prefix', () => {
      expect(getOperator('085634567890')).toBe('Indosat');
    });

    it('should detect 0857 prefix', () => {
      expect(getOperator('085734567890')).toBe('Indosat');
    });

    it('should detect 0858 prefix', () => {
      expect(getOperator('085834567890')).toBe('Indosat');
    });

    it('should detect former Tri 0895 prefix', () => {
      expect(getOperator('089534567890')).toBe('Indosat');
    });

    it('should detect former Tri 0896 prefix', () => {
      expect(getOperator('089634567890')).toBe('Indosat');
    });

    it('should detect former Tri 0897 prefix', () => {
      expect(getOperator('089734567890')).toBe('Indosat');
    });

    it('should detect former Tri 0898 prefix', () => {
      expect(getOperator('089834567890')).toBe('Indosat');
    });

    it('should detect former Tri 0899 prefix', () => {
      expect(getOperator('089934567890')).toBe('Indosat');
    });
  });

  describe('Smartfren detection', () => {
    it('should detect 0881 prefix', () => {
      expect(getOperator('088134567890')).toBe('Smartfren');
    });

    it('should detect 0882 prefix', () => {
      expect(getOperator('088234567890')).toBe('Smartfren');
    });

    it('should detect 0883 prefix', () => {
      expect(getOperator('088334567890')).toBe('Smartfren');
    });

    it('should detect 0884 prefix', () => {
      expect(getOperator('088434567890')).toBe('Smartfren');
    });

    it('should detect 0885 prefix', () => {
      expect(getOperator('088534567890')).toBe('Smartfren');
    });

    it('should detect 0886 prefix', () => {
      expect(getOperator('088634567890')).toBe('Smartfren');
    });

    it('should detect 0887 prefix', () => {
      expect(getOperator('088734567890')).toBe('Smartfren');
    });

    it('should detect 0888 prefix', () => {
      expect(getOperator('088834567890')).toBe('Smartfren');
    });

    it('should detect 0889 prefix', () => {
      expect(getOperator('088934567890')).toBe('Smartfren');
    });
  });

  describe('Axis detection', () => {
    it('should detect 0831 prefix', () => {
      expect(getOperator('083134567890')).toBe('Axis');
    });

    it('should detect 0832 prefix', () => {
      expect(getOperator('083234567890')).toBe('Axis');
    });

    it('should detect 0833 prefix', () => {
      expect(getOperator('083334567890')).toBe('Axis');
    });

    it('should detect 0838 prefix', () => {
      expect(getOperator('083834567890')).toBe('Axis');
    });
  });

  describe('international format', () => {
    it('should detect from international format', () => {
      expect(getOperator('+6281234567890')).toBe('Telkomsel');
      expect(getOperator('+6281734567890')).toBe('XL');
      expect(getOperator('+6281434567890')).toBe('Indosat');
    });

    it('should detect from e164 format', () => {
      expect(getOperator('6281234567890')).toBe('Telkomsel');
      expect(getOperator('6281734567890')).toBe('XL');
    });
  });

  describe('with separators', () => {
    it('should detect with dashes', () => {
      expect(getOperator('0812-3456-7890')).toBe('Telkomsel');
    });

    it('should detect with spaces', () => {
      expect(getOperator('0812 3456 7890')).toBe('Telkomsel');
    });

    it('should detect with mixed separators', () => {
      expect(getOperator('+62 812-3456-7890')).toBe('Telkomsel');
    });
  });

  describe('edge cases', () => {
    it('should return null for landline', () => {
      expect(getOperator('0212345678')).toBe(null);
      expect(getOperator('0221234567')).toBe(null);
    });

    it('should return null for invalid number', () => {
      expect(getOperator('1234')).toBe(null);
      expect(getOperator('')).toBe(null);
      expect(getOperator('invalid')).toBe(null);
    });

    it('should return null for unknown prefix', () => {
      expect(getOperator('080012345678')).toBe(null);
      expect(getOperator('090012345678')).toBe(null);
    });
  });
});

// =============================================================================
// 11. parsePhoneNumber() - Parse and extract all info
// =============================================================================

describe('parsePhoneNumber', () => {
  describe('parsing valid mobile number', () => {
    it('should parse Telkomsel number completely', () => {
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
      expect(info?.region).toBeNull();
    });

    it('should parse XL number', () => {
      const info = parsePhoneNumber('081734567890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('XL');
      expect(info?.isMobile).toBe(true);
    });

    it('should parse Indosat number', () => {
      const info = parsePhoneNumber('081434567890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Indosat');
      expect(info?.isMobile).toBe(true);
    });

    it('should parse former Tri (now Indosat) number', () => {
      const info = parsePhoneNumber('089534567890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Indosat');
      expect(info?.isMobile).toBe(true);
    });

    it('should parse Smartfren number', () => {
      const info = parsePhoneNumber('088134567890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Smartfren');
      expect(info?.isMobile).toBe(true);
    });

    it('should parse Axis number', () => {
      const info = parsePhoneNumber('083134567890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Axis');
      expect(info?.isMobile).toBe(true);
    });
  });

  describe('parsing international format', () => {
    it('should parse with + prefix', () => {
      const info = parsePhoneNumber('+6281234567890');

      expect(info).not.toBeNull();
      expect(info?.countryCode).toBe('62');
      expect(info?.operator).toBe('Telkomsel');
      expect(info?.formatted.national).toBe('0812-3456-7890');
    });

    it('should parse without + prefix', () => {
      const info = parsePhoneNumber('6281234567890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
    });

    it('should parse with separators', () => {
      const info = parsePhoneNumber('+62 812-3456-7890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
      expect(info?.number).toBe('81234567890');
    });
  });

  describe('parsing landline numbers', () => {
    it('should parse Jakarta landline', () => {
      const info = parsePhoneNumber('0212345678');

      expect(info).not.toBeNull();
      expect(info?.isLandline).toBe(true);
      expect(info?.isMobile).toBe(false);
      expect(info?.operator).toBe(null);
      expect(info?.region).toBe('Jakarta');
      expect(info?.formatted.national).toBe('021-2345678');
      expect(info?.formatted.international).toBe('+62 21-2345678');
    });

    it('should parse Bandung landline', () => {
      const info = parsePhoneNumber('0221234567');

      expect(info).not.toBeNull();
      expect(info?.isLandline).toBe(true);
      expect(info?.region).toBe('Bandung');
    });

    it('should parse Surabaya landline', () => {
      const info = parsePhoneNumber('0311234567');

      expect(info).not.toBeNull();
      expect(info?.isLandline).toBe(true);
      expect(info?.region).toBe('Surabaya');
    });

    it('should parse Medan landline', () => {
      const info = parsePhoneNumber('0611234567');

      expect(info).not.toBeNull();
      expect(info?.isLandline).toBe(true);
      expect(info?.region).toBe('Medan');
    });

    it('should parse Semarang landline', () => {
      const info = parsePhoneNumber('0241234567');

      expect(info).not.toBeNull();
      expect(info?.isLandline).toBe(true);
      expect(info?.region).toBe('Semarang');
    });
  });

  describe('parsing with separators', () => {
    it('should parse with dashes', () => {
      const info = parsePhoneNumber('0812-3456-7890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
      expect(info?.number).toBe('81234567890');
    });

    it('should parse with spaces', () => {
      const info = parsePhoneNumber('0812 3456 7890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
    });

    it('should parse with mixed separators', () => {
      const info = parsePhoneNumber('0812 (3456) 7890');

      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
    });
  });

  describe('edge cases', () => {
    it('should return null for invalid number', () => {
      expect(parsePhoneNumber('1234')).toBeNull();
      expect(parsePhoneNumber('')).toBeNull();
      expect(parsePhoneNumber('invalid')).toBeNull();
    });

    it('should return null for wrong country code', () => {
      expect(parsePhoneNumber('+1234567890')).toBeNull();
    });

    it('should parse minimum length mobile', () => {
      const info = parsePhoneNumber('0812345678');
      expect(info).not.toBeNull();
      expect(info?.isMobile).toBe(true);
    });

    it('should parse maximum length mobile', () => {
      const info = parsePhoneNumber('0812345678901');
      expect(info).not.toBeNull();
      expect(info?.isMobile).toBe(true);
    });

    it('should handle unknown area code for landline', () => {
      const info = parsePhoneNumber('0991234567');
      // Should still parse but region might be undefined or "Unknown"
      expect(info).not.toBeNull();
      expect(info?.isLandline).toBe(true);
    });
  });
});

// =============================================================================
// 12. End-to-End Workflows
// =============================================================================

describe('end-to-end workflows', () => {
  describe('complete phone processing pipeline', () => {
    it('should work with validation -> parse -> format -> mask', () => {
      const phone = '081234567890';

      // Step 1: Validate
      expect(validatePhoneNumber(phone)).toBe(true);

      // Step 2: Parse
      const info = parsePhoneNumber(phone);
      expect(info).not.toBeNull();
      expect(info?.operator).toBe('Telkomsel');
      expect(info?.isMobile).toBe(true);

      // Step 3: Format
      const international = formatPhoneNumber(phone, 'international');
      expect(international).toBe('+62 812-3456-7890');

      // Step 4: Mask for display
      const masked = maskPhoneNumber(phone, { separator: '-' });
      expect(masked).toContain('*');
      expect(masked).toContain('-');
    });

    it('should handle user input normalization flow', () => {
      const userInput = '+62 (812) 3456-7890';

      // Clean input
      const cleaned = cleanPhoneNumber(userInput);
      expect(cleaned).toBe('+6281234567890');

      // Validate
      expect(validatePhoneNumber(cleaned)).toBe(true);

      // Parse for display
      const info = parsePhoneNumber(cleaned);
      expect(info?.operator).toBe('Telkomsel');

      // Format for storage (E164)
      const e164 = toE164(cleaned);
      expect(e164).toBe('6281234567890');
    });
  });

  describe('handling various input formats consistently', () => {
    it('should normalize different formats to same output', () => {
      const formats = [
        '081234567890',
        '+6281234567890',
        '6281234567890',
        '0812-3456-7890',
        '+62 812-3456-7890',
        '0812 3456 7890',
      ];

      formats.forEach((format) => {
        const info = parsePhoneNumber(format);
        expect(info?.operator).toBe('Telkomsel');
        expect(info?.formatted.e164).toBe('6281234567890');
        expect(info?.formatted.national).toBe('0812-3456-7890');
        expect(info?.formatted.international).toBe('+62 812-3456-7890');
      });
    });

    it('should handle format conversions consistently', () => {
      const phone = '081234567890';

      const international = toInternational(phone);
      const national = toNational(international);
      const e164 = toE164(national);

      expect(international).toBe('+62 812-3456-7890');
      expect(national).toBe('0812-3456-7890');
      expect(e164).toBe('6281234567890');

      // Round trip should work
      expect(toNational(toInternational(phone))).toBe('0812-3456-7890');
      expect(toE164(toInternational(toNational(phone)))).toBe('6281234567890');
    });
  });

  describe('operator detection across all functions', () => {
    const operators = [
      { phone: '081234567890', name: 'Telkomsel' },
      { phone: '081734567890', name: 'XL' },
      { phone: '081434567890', name: 'Indosat' },
      { phone: '089534567890', name: 'Indosat' },
      { phone: '088134567890', name: 'Smartfren' },
      { phone: '083134567890', name: 'Axis' },
    ];

    operators.forEach(({ phone, name }) => {
      it(`should consistently detect ${name}`, () => {
        expect(getOperator(phone)).toBe(name);

        const info = parsePhoneNumber(phone);
        expect(info?.operator).toBe(name);

        const international = toInternational(phone);
        expect(getOperator(international)).toBe(name);

        const e164 = toE164(phone);
        expect(getOperator(e164)).toBe(name);
      });
    });
  });

  describe('landline handling across all functions', () => {
    const landline = '0212345678';

    it('should consistently identify as landline', () => {
      expect(validatePhoneNumber(landline)).toBe(true);
      expect(isMobileNumber(landline)).toBe(false);
      expect(isLandlineNumber(landline)).toBe(true);
      expect(getOperator(landline)).toBe(null);

      const info = parsePhoneNumber(landline);
      expect(info?.isLandline).toBe(true);
      expect(info?.isMobile).toBe(false);
      expect(info?.operator).toBe(null);
      expect(info?.region).toBe('Jakarta');
    });

    it('should format landline correctly', () => {
      expect(formatPhoneNumber(landline, 'national')).toBe('021-2345678');
      expect(formatPhoneNumber(landline, 'international')).toBe(
        '+62 21-2345678'
      );
      expect(formatPhoneNumber(landline, 'e164')).toBe('62212345678');
    });
  });
});