import { describe, it, expect } from 'vitest';
import {
  generateWALink,
  generateSmsLink,
  generateTelLink,
  isProvider,
} from '../index';

describe('Phone Utils', () => {
  const phone = '081234567890'; // Telkomsel

  describe('generateWALink', () => {
    it('should generate WA link correctly', () => {
      expect(generateWALink(phone)).toBe('https://wa.me/6281234567890');
    });

    it('should generate WA link with message', () => {
      expect(generateWALink(phone, 'Halo apa kabar?')).toBe(
        'https://wa.me/6281234567890?text=Halo%20apa%20kabar%3F'
      );
    });

    it('should return empty string for invalid phone', () => {
      expect(generateWALink('invalid')).toBe('');
    });
  });

  describe('generateSmsLink', () => {
    it('should generate SMS link correctly', () => {
      expect(generateSmsLink(phone)).toBe('sms:+6281234567890');
    });

    it('should generate SMS link with body', () => {
      expect(generateSmsLink(phone, 'Testing sms')).toBe(
        'sms:+6281234567890?body=Testing%20sms'
      );
    });
  });

  describe('generateTelLink', () => {
    it('should generate tel link correctly', () => {
      expect(generateTelLink(phone)).toBe('tel:+6281234567890');
    });
  });

  describe('isProvider', () => {
    it('should return true for correct provider', () => {
      expect(isProvider(phone, 'Telkomsel')).toBe(true);
    });

    it('should return true for correct provider (case insensitive)', () => {
      expect(isProvider(phone, 'telkomsel')).toBe(true);
    });

    it('should return false for incorrect provider', () => {
      expect(isProvider(phone, 'XL')).toBe(false);
    });

    it('should return false for non-mobile number', () => {
      expect(isProvider('0212345678', 'Telkomsel')).toBe(false);
    });
  });
});
