import { describe, expect, it } from 'vitest';
import { parsePhoneNumber, getOperator, isProvider } from '../parse';
import { getLandlineRegion } from '../utils';

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

    it('should return null for short number', () => {
      expect(getOperator('081')).toBe(null);
      expect(getOperator('0812')).toBe(null);
    });
  });
});

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

describe('isProvider', () => {
  it('should return true for matching provider', () => {
    expect(isProvider('081234567890', 'Telkomsel')).toBe(true);
    expect(isProvider('081734567890', 'XL')).toBe(true);
    expect(isProvider('081434567890', 'Indosat')).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(isProvider('081234567890', 'telkomsel')).toBe(true);
    expect(isProvider('081234567890', 'TELKOMSEL')).toBe(true);
    expect(isProvider('081734567890', 'xl')).toBe(true);
  });

  it('should return false for non-matching provider', () => {
    expect(isProvider('081234567890', 'XL')).toBe(false);
    expect(isProvider('081734567890', 'Telkomsel')).toBe(false);
  });

  it('should return false for landline', () => {
    expect(isProvider('0212345678', 'Telkomsel')).toBe(false);
  });

  it('should return false for invalid number', () => {
    expect(isProvider('1234', 'Telkomsel')).toBe(false);
    expect(isProvider('', 'Telkomsel')).toBe(false);
  });

  it('should return false for empty provider name', () => {
    expect(isProvider('081234567890', '')).toBe(false);
  });
});

describe('getLandlineRegion', () => {
  describe('valid landline numbers (happy path)', () => {
    it('should return Jakarta for 021', () => {
      expect(getLandlineRegion('0212345678')).toBe('Jakarta');
    });

    it('should return Bandung for 022', () => {
      expect(getLandlineRegion('0221234567')).toBe('Bandung');
    });

    it('should return Surabaya for 031', () => {
      expect(getLandlineRegion('0311234567')).toBe('Surabaya');
    });

    it('should return Yogyakarta for 0274', () => {
      expect(getLandlineRegion('0274123456')).toBe('Yogyakarta');
    });

    it('should return Medan for 061', () => {
      expect(getLandlineRegion('0611234567')).toBe('Medan');
    });

    it('should return Jakarta for +62 format', () => {
      expect(getLandlineRegion('+62212345678')).toBe('Jakarta');
    });

    it('should return Jakarta for 62 format without +', () => {
      expect(getLandlineRegion('62212345678')).toBe('Jakarta');
    });
  });

  describe('mobile and invalid numbers (edge cases)', () => {
    it('should return null for mobile numbers', () => {
      expect(getLandlineRegion('081234567890')).toBe(null);
    });

    it('should return null for unknown area code', () => {
      expect(getLandlineRegion('0991234567')).toBe(null);
    });

    it('should return null for invalid input', () => {
      expect(getLandlineRegion('invalid')).toBe(null);
    });

    it('should return null for empty string', () => {
      expect(getLandlineRegion('')).toBe(null);
    });

    it('should return null for null input', () => {
      expect(getLandlineRegion(null as any)).toBe(null);
    });

    it('should return null for undefined input', () => {
      expect(getLandlineRegion(undefined as any)).toBe(null);
    });
  });
});
