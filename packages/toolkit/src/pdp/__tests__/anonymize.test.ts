import { describe, it, expect } from 'vitest';
import { anonymizeString, anonymizePDP } from '../anonymize';

describe('anonymizeString', () => {
  describe('valid inputs', () => {
    it('should mask NIK in text', () => {
      const result = anonymizeString('NIK: 3171034567890123');
      expect(result).toBe('NIK: 3171********0123');
    });

    it('should mask NPWP in text', () => {
      const result = anonymizeString('NPWP: 01.234.567.8-012.000');
      expect(result).toBe('NPWP: 01.2************.000');
    });

    it('should mask phone in text', () => {
      const result = anonymizeString('HP: 081234567890');
      expect(result).toBe('HP: 081******890');
    });

    it('should mask email in text', () => {
      const result = anonymizeString('Email: budi@contoh.com');
      expect(result).toBe('Email: budi*******.com');
    });

    it('should mask BPJS in text', () => {
      const result = anonymizeString('BPJS: 0001234567891');
      expect(result).toBe('BPJS:000*******8911');
    });

    it('should mask passport in text', () => {
      const result = anonymizeString('Passport: AB1234567');
      expect(result).toBe('Passport: AB*****67');
    });

    it('should mask multiple PII types', () => {
      const result = anonymizeString('NIK: 3171034567890123, HP: 081234567890');
      expect(result).toContain('****');
      expect(result).not.toContain('3171034567890123');
    });

    it('should return same text when no PII detected', () => {
      const result = anonymizeString('Tidak ada PII di sini');
      expect(result).toBe('Tidak ada PII di sini');
    });
  });

  describe('options', () => {
    it('should use replacementText when provided', () => {
      const result = anonymizeString('NIK: 3171034567890123', { replacementText: '[REDACTED]' });
      expect(result).toBe('NIK: [REDACTED]');
    });

    it('should use custom maskChar', () => {
      const result = anonymizeString('NIK: 3171034567890123', { maskChar: 'X' });
      expect(result).toBe('NIK: 3171XXXXXXXX0123');
    });

    it('should use full maskStrategy', () => {
      const result = anonymizeString('NIK: 3171034567890123', { maskStrategy: 'full' });
      expect(result).toBe('NIK: ****************');
    });

    it('should escape for log', () => {
      const result = anonymizeString('Line1\nLine2', { escapeForLog: true });
      expect(result).toBe('Line1\\nLine2');
    });

    it('should escape quotes for log', () => {
      const result = anonymizeString('Say "hello"', { escapeForLog: true });
      expect(result).toBe('Say \\"hello\\"');
    });
  });

  describe('invalid inputs', () => {
    it('should return same for empty string', () => {
      expect(anonymizeString('')).toBe('');
    });

    it('should return same for null', () => {
      expect(anonymizeString(null as any)).toBe(null);
    });

    it('should return same for undefined', () => {
      expect(anonymizeString(undefined as any)).toBe(undefined);
    });
  });
});

describe('anonymizePDP', () => {
  describe('valid inputs', () => {
    it('should mask NIK in object', () => {
      const result = anonymizePDP({ name: 'Budi', nik: '3171034567890123' });
      expect(result.name).toBe('Budi');
      expect(result.nik).toBe('3171********0123');
    });

    it('should mask NPWP in object', () => {
      const result = anonymizePDP({ name: 'Budi', npwp: '01.234.567.8-012.000' });
      expect(result.npwp).toBe('01.2************.000');
    });

    it('should mask phone in object', () => {
      const result = anonymizePDP({ name: 'Budi', phone: '081234567890' });
      expect(result.phone).toBe('081******890');
    });

    it('should mask email in object', () => {
      const result = anonymizePDP({ name: 'Budi', email: 'budi@contoh.com' });
      expect(result.email).toBe('budi*******.com');
    });

    it('should preserve non-PII fields', () => {
      const result = anonymizePDP({ name: 'Budi', age: 25, active: true });
      expect(result.name).toBe('Budi');
      expect(result.age).toBe(25);
      expect(result.active).toBe(true);
    });

    it('should handle nested objects', () => {
      const result = anonymizePDP({
        user: { name: 'Budi', nik: '3171034567890123' }
      });
      expect(result.user.name).toBe('Budi');
      expect(result.user.nik).toBe('3171********0123');
    });

    it('should handle arrays', () => {
      const result = anonymizePDP([
        { name: 'Budi', nik: '3171034567890123' },
        { name: 'Ani', nik: '3171034567890124' }
      ]);
      expect(result[0].nik).toBe('3171********0123');
      expect(result[1].nik).toBe('3171********0124');
    });
  });

  describe('explicitKeys', () => {
    it('should mask explicit string keys', () => {
      const result = anonymizePDP(
        { password: 'secret123', name: 'Budi' },
        { explicitKeys: ['password'] }
      );
      expect(result.password).toBe('*********');
      expect(result.name).toBe('Budi');
    });

    it('should mask explicit RegExp keys', () => {
      const result = anonymizePDP(
        { token: 'abc123', token_secret: 'def456', name: 'Budi' },
        { explicitKeys: [/^token/] }
      );
      expect(result.token).toBe('******');
      expect(result.token_secret).toBe('******');
      expect(result.name).toBe('Budi');
    });

    it('should mask key regardless of autoDetectPII when explicitKeys provided', () => {
      const result = anonymizePDP(
        { secret: 'xyz789' },
        { explicitKeys: ['secret'], autoDetectPII: false }
      );
      expect(result.secret).toBe('******');
    });

    it('should mask explicit RegExp keys', () => {
      const result = anonymizePDP(
        { token: 'abc123', token_secret: 'def456', name: 'Budi' },
        { explicitKeys: [/^token/] }
      );
      expect(result.token).toBe('******');
      expect(result.token_secret).toBe('******');
      expect(result.name).toBe('Budi');
    });

    it('should mask key regardless of autoDetectPII when explicitKeys provided', () => {
      const result = anonymizePDP(
        { secret: 'xyz789' },
        { explicitKeys: ['secret'], autoDetectPII: false }
      );
      expect(result.secret).toBe('******');
    });
  });

  describe('edge cases', () => {
    it('should return null as-is', () => {
      const result = anonymizePDP(null);
      expect(result).toBe(null);
    });

    it('should return undefined as-is', () => {
      const result = anonymizePDP(undefined);
      expect(result).toBe(undefined);
    });

    it('should handle empty object', () => {
      const result = anonymizePDP({});
      expect(Object.keys(result).length).toBe(0);
    });

    it('should handle empty array', () => {
      const result = anonymizePDP([]);
      expect(result).toEqual([]);
    });

    it('should handle deep nesting (>10 levels)', () => {
      const obj: any = {};
      let current = obj;
      for (let i = 0; i < 15; i++) {
        current.level = i;
        current.data = { nested: { value: '3171034567890123' } };
        current = current.data;
      }
      const result = anonymizePDP(obj);
      expect(result).toBeDefined();
    });

    it('should handle cyclical references', () => {
      const cyclical: any = { name: 'Budi' };
      cyclical.self = cyclical;
      cyclical.nik = '3171034567890123';

      const result = anonymizePDP(cyclical);
      expect(result.name).toBe('Budi');
      expect(result.nik).toBe('3171********0123');
    });

    it('should handle object referencing another object', () => {
      const target = { nik: '3171034567890123' };
      const source = { ref: target, name: 'Budi' };

      const result = anonymizePDP(source);
      expect(result.name).toBe('Budi');
    });
  });

  describe('options', () => {
    it('should use replacementText when provided', () => {
      const result = anonymizePDP(
        { nik: '3171034567890123' },
        { replacementText: '[REDACTED_NIK]' }
      );
      expect(result.nik).toBe('[REDACTED_NIK]');
    });

    it('should use custom maskChar', () => {
      const result = anonymizePDP(
        { nik: '3171034567890123' },
        { maskChar: 'X' }
      );
      expect(result.nik).toBe('3171XXXXXXXX0123');
    });

    it('should use full maskStrategy', () => {
      const result = anonymizePDP(
        { nik: '3171034567890123' },
        { maskStrategy: 'full' }
      );
      expect(result.nik).toBe('****************');
    });
  });

  describe('falsy inputs', () => {
    it('should handle null', () => {
      expect(anonymizePDP(null)).toBe(null);
    });

    it('should handle undefined', () => {
      expect(anonymizePDP(undefined)).toBe(undefined);
    });

    it('should handle false', () => {
      expect(anonymizePDP(false)).toBe(false);
    });

    it('should handle 0', () => {
      expect(anonymizePDP(0)).toBe(0);
    });

    it('should handle empty string', () => {
      expect(anonymizePDP('')).toBe('');
    });
  });

  describe('types', () => {
    it('should handle numbers', () => {
      const result = anonymizePDP({ age: 25 });
      expect(result.age).toBe(25);
    });

    it('should handle booleans', () => {
      const result = anonymizePDP({ active: true });
      expect(result.active).toBe(true);
    });

    it('should handle functions', () => {
      const fn = () => 'test';
      const result = anonymizePDP({ fn });
      expect(result.fn).toBe(fn);
    });
  });
});