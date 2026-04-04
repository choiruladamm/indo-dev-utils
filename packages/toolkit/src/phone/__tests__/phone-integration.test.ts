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
import { generateWALink, generateSmsLink, generateTelLink } from '../links';

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

  describe('link generation pipeline', () => {
    it('should generate all link types from same number', () => {
      const phone = '081234567890';

      expect(generateWALink(phone)).toBe('https://wa.me/6281234567890');
      expect(generateSmsLink(phone)).toBe('sms:+6281234567890');
      expect(generateTelLink(phone)).toBe('tel:+6281234567890');
    });

    it('should generate WhatsApp link with message', () => {
      const phone = '081234567890';
      const link = generateWALink(phone, 'Halo!');

      expect(link).toContain('https://wa.me/6281234567890');
      expect(link).toContain('text=');
    });

    it('should generate SMS link with body', () => {
      const phone = '081234567890';
      const link = generateSmsLink(phone, 'Test message');

      expect(link).toContain('sms:+6281234567890');
      expect(link).toContain('body=');
    });

    it('should return empty links for invalid number', () => {
      expect(generateWALink('invalid')).toBe('');
      expect(generateSmsLink('invalid')).toBe('');
      expect(generateTelLink('invalid')).toBe('');
    });
  });
});
