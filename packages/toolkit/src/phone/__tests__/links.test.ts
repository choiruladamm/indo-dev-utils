import { describe, expect, it } from 'vitest';
import { generateWALink, generateSmsLink, generateTelLink } from '../links';

describe('generateWALink', () => {
  describe('basic link generation', () => {
    it('should generate link from national format', () => {
      expect(generateWALink('081234567890')).toBe(
        'https://wa.me/6281234567890'
      );
    });

    it('should generate link from international format', () => {
      expect(generateWALink('+6281234567890')).toBe(
        'https://wa.me/6281234567890'
      );
    });

    it('should generate link from e164 format', () => {
      expect(generateWALink('6281234567890')).toBe(
        'https://wa.me/6281234567890'
      );
    });

    it('should generate link with separators', () => {
      expect(generateWALink('0812-3456-7890')).toBe(
        'https://wa.me/6281234567890'
      );
    });
  });

  describe('with message', () => {
    it('should include URL-encoded message', () => {
      expect(generateWALink('081234567890', 'Halo!')).toBe(
        'https://wa.me/6281234567890?text=Halo!'
      );
    });

    it('should encode spaces in message', () => {
      expect(generateWALink('081234567890', 'Pesan ini')).toBe(
        'https://wa.me/6281234567890?text=Pesan%20ini'
      );
    });

    it('should encode special characters in message', () => {
      expect(generateWALink('081234567890', 'Test & more')).toBe(
        'https://wa.me/6281234567890?text=Test%20%26%20more'
      );
    });

    it('should handle Indonesian message', () => {
      expect(generateWALink('081234567890', 'Selamat pagi!')).toBe(
        'https://wa.me/6281234567890?text=Selamat%20pagi!'
      );
    });
  });

  describe('different operators', () => {
    it('should work with XL number', () => {
      expect(generateWALink('081734567890')).toBe(
        'https://wa.me/6281734567890'
      );
    });

    it('should work with Indosat number', () => {
      expect(generateWALink('081434567890')).toBe(
        'https://wa.me/6281434567890'
      );
    });
  });

  describe('edge cases', () => {
    it('should return empty string for invalid number', () => {
      expect(generateWALink('1234')).toBe('');
      expect(generateWALink('')).toBe('');
      expect(generateWALink('invalid')).toBe('');
    });

    it('should return empty string for wrong country code', () => {
      expect(generateWALink('+1234567890')).toBe('');
    });

    it('should return empty string for landlines (WA does not work on landlines)', () => {
      expect(generateWALink('0212345678')).toBe('');
      expect(generateWALink('+62212345678')).toBe('');
      expect(generateWALink('62212345678')).toBe('');
    });
  });
});

describe('generateSmsLink', () => {
  describe('basic link generation', () => {
    it('should generate link from national format', () => {
      expect(generateSmsLink('081234567890')).toBe('sms:+6281234567890');
    });

    it('should generate link from international format', () => {
      expect(generateSmsLink('+6281234567890')).toBe('sms:+6281234567890');
    });

    it('should generate link from e164 format', () => {
      expect(generateSmsLink('6281234567890')).toBe('sms:+6281234567890');
    });

    it('should generate link with separators', () => {
      expect(generateSmsLink('0812-3456-7890')).toBe('sms:+6281234567890');
    });
  });

  describe('with body', () => {
    it('should include URL-encoded body', () => {
      expect(generateSmsLink('081234567890', 'Pesan ini')).toBe(
        'sms:+6281234567890?body=Pesan%20ini'
      );
    });

    it('should encode special characters in body', () => {
      expect(generateSmsLink('081234567890', 'Test & more')).toBe(
        'sms:+6281234567890?body=Test%20%26%20more'
      );
    });

    it('should handle Indonesian body', () => {
      expect(generateSmsLink('081234567890', 'Halo, apa kabar?')).toBe(
        'sms:+6281234567890?body=Halo%2C%20apa%20kabar%3F'
      );
    });
  });

  describe('edge cases', () => {
    it('should return empty string for invalid number', () => {
      expect(generateSmsLink('1234')).toBe('');
      expect(generateSmsLink('')).toBe('');
      expect(generateSmsLink('invalid')).toBe('');
    });

    it('should return empty string for wrong country code', () => {
      expect(generateSmsLink('+1234567890')).toBe('');
    });

    it('should return empty string for landlines (SMS does not work on landlines)', () => {
      expect(generateSmsLink('0212345678')).toBe('');
      expect(generateSmsLink('+62212345678')).toBe('');
    });
  });
});

describe('generateTelLink', () => {
  describe('basic link generation', () => {
    it('should generate link from national format', () => {
      expect(generateTelLink('081234567890')).toBe('tel:+6281234567890');
    });

    it('should generate link from international format', () => {
      expect(generateTelLink('+6281234567890')).toBe('tel:+6281234567890');
    });

    it('should generate link from e164 format', () => {
      expect(generateTelLink('6281234567890')).toBe('tel:+6281234567890');
    });

    it('should generate link with separators', () => {
      expect(generateTelLink('0812-3456-7890')).toBe('tel:+6281234567890');
    });
  });

  describe('different number types', () => {
    it('should work with XL number', () => {
      expect(generateTelLink('081734567890')).toBe('tel:+6281734567890');
    });

    it('should work with Indosat number', () => {
      expect(generateTelLink('081434567890')).toBe('tel:+6281434567890');
    });

    it('should work with landline', () => {
      expect(generateTelLink('0212345678')).toBe('tel:+62212345678');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for invalid number', () => {
      expect(generateTelLink('1234')).toBe('');
      expect(generateTelLink('')).toBe('');
      expect(generateTelLink('invalid')).toBe('');
    });

    it('should return empty string for wrong country code', () => {
      expect(generateTelLink('+1234567890')).toBe('');
    });
  });
});
