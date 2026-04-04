import { describe, expect, it } from 'vitest';
import {
  formatPhoneNumber,
  toInternational,
  toNational,
  toE164,
  cleanPhoneNumber,
} from '../format';

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
      expect(formatPhoneNumber('0812-3456-7890', 'e164')).toBe('6281234567890');
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
