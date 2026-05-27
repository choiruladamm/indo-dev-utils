import { describe, it, expect } from 'vitest';
import { scanPII } from '../scanner';

describe('scanPII', () => {
  describe('valid inputs', () => {
    it('should detect NIK in text', () => {
      const findings = scanPII('NIK Budi: 3171034567890123');
      expect(findings).toHaveLength(1);
      expect(findings[0].type).toBe('nik');
      expect(findings[0].value).toBe('3171034567890123');
      expect(findings[0].confidence).toBe('high');
    });

    it('should detect NPWP in text', () => {
      const findings = scanPII('NPWP: 01.234.567.8-012.000');
      expect(findings).toHaveLength(1);
      expect(findings[0].type).toBe('npwp');
      expect(findings[0].value).toBe('01.234.567.8-012.000');
      expect(findings[0].confidence).toBe('high');
    });

    it('should detect phone number in national format', () => {
      const findings = scanPII('Telpon Budi: 081234567890');
      expect(findings).toHaveLength(1);
      expect(findings[0].type).toBe('phone');
      expect(findings[0].value).toBe('081234567890');
      expect(findings[0].confidence).toBe('high');
    });

    it('should detect phone number in international format', () => {
      const findings = scanPII('Telpon: +6281234567890');
      expect(findings).toHaveLength(1);
      expect(findings[0].type).toBe('phone');
      expect(findings[0].value).toBe('+6281234567890');
      expect(findings[0].confidence).toBe('high');
    });

    it('should detect email in text', () => {
      const findings = scanPII('Email: budi@contoh.com');
      expect(findings).toHaveLength(1);
      expect(findings[0].type).toBe('email');
      expect(findings[0].value).toBe('budi@contoh.com');
      expect(findings[0].confidence).toBe('high');
    });

    it('should detect passport in text', () => {
      const findings = scanPII('Passport: AB1234567');
      expect(findings).toHaveLength(1);
      expect(findings[0].type).toBe('passport');
      expect(findings[0].value).toBe('AB1234567');
      expect(findings[0].confidence).toBe('high');
    });

    it('should detect BPJS in text', () => {
      const findings = scanPII('BPJS: 0001234567891');
      expect(findings).toHaveLength(1);
      expect(findings[0].type).toBe('bpjs');
      expect(findings[0].value).toBe('0001234567891');
      expect(findings[0].confidence).toBe('high');
    });

    it('should detect multiple PII types in text', () => {
      const findings = scanPII('Budi NIK: 3171034567890123, HP: 081234567890, Email: budi@contoh.com');
      expect(findings).toHaveLength(3);
    });

    it('should return sorted findings by startIndex', () => {
      const findings = scanPII('NIK: 3171034567890123, Email: test@example.com');
      expect(findings[0].startIndex).toBeLessThan(findings[1].startIndex);
    });
  });

  describe('invalid inputs', () => {
    it('should return empty array for empty string', () => {
      expect(scanPII('')).toHaveLength(0);
    });

    it('should return empty array for null', () => {
      expect(scanPII(null as any)).toHaveLength(0);
    });

    it('should return empty array for undefined', () => {
      expect(scanPII(undefined as any)).toHaveLength(0);
    });

    it('should return empty array for non-string input', () => {
      expect(scanPII(123 as any)).toHaveLength(0);
    });

    it('should return empty array for text without PII', () => {
      expect(scanPII('Tidak ada PII di sini')).toHaveLength(0);
    });
  });

  describe('confidence scoring', () => {
    it('should assign high confidence for 16-digit number', () => {
      const findings = scanPII('1234567890123456');
      expect(findings[0].confidence).toBe('high');
    });

    it('should assign high confidence for valid phone', () => {
      const findings = scanPII('081212345678');
      expect(findings[0].confidence).toBe('high');
    });
  });

  describe('edge cases', () => {
    it('should handle PII at start of text', () => {
      const findings = scanPII('3171034567890123 adalah NIK');
      expect(findings[0].startIndex).toBe(0);
    });

    it('should handle PII at end of text', () => {
      const findings = scanPII('NIK adalah 3171034567890123');
      expect(findings[0].endIndex).toBe(27);
    });

    it('should handle 17-digit number with no matches', () => {
      const text = '12345678901234567';
      const findings = scanPII(text);
      expect(findings.length).toBe(0);
    });

    it('should handle multiple same-type PII', () => {
      const findings = scanPII('NIK1: 3171034567890123, NIK2: 3171034567890124');
      expect(findings.filter(f => f.type === 'nik')).toHaveLength(2);
    });
  });
});