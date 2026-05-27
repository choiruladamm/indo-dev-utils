import { describe, it, expect } from 'vitest';
import { tokenizeIndo } from '../tokenizer';

describe('tokenizeIndo', () => {
  describe('valid inputs', () => {
    it('splits on sentence-ending periods', () => {
      const result = tokenizeIndo('Halo dunia. Selamat pagi.');
      expect(result).toHaveLength(2);
      expect(result[0]).toBe('Halo dunia');
      expect(result[1]).toBe('Selamat pagi');
    });

    it('ignores period in Yth.', () => {
      const result = tokenizeIndo('Kpd Yth. Bpk. Budi. Harap datang.');
      expect(result).toHaveLength(2);
      expect(result[0]).toBe('Kpd Yth. Bpk. Budi');
    });

    it('ignores period in Bpk.', () => {
      const result = tokenizeIndo('Kpd Yth. Bpk. Budi di Jl. Sudirman. Harap datang.');
      expect(result).toHaveLength(2);
    });

    it('ignores period in S.Kom.', () => {
      const result = tokenizeIndo('Dokumen S.Kom. sudah jadi. Silakan diambil.');
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result[0]).toContain('Dokumen S.Kom');
    });

    it('handles text with abbreviation and sentence end', () => {
      const result = tokenizeIndo('Dr. Smith will arrive. Meeting at 10am.');
      expect(result[0]).toContain('Dr.');
    });

    it('ignores period in Jl.', () => {
      const result = tokenizeIndo('Alamat di Jl. Sudirman. Cek peta.');
      expect(result).toHaveLength(2);
    });
  });

  describe('invalid inputs', () => {
    it('returns empty array for empty string', () => {
      expect(tokenizeIndo('')).toEqual([]);
    });

    it('returns empty array for null', () => {
      expect(tokenizeIndo(null as unknown as string)).toEqual([]);
    });

    it('returns empty array for undefined', () => {
      expect(tokenizeIndo(undefined as unknown as string)).toEqual([]);
    });
  });

  describe('edge cases', () => {
    it('handles text with no periods', () => {
      const result = tokenizeIndo('Tidak ada titik');
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('Tidak ada titik');
    });

    it('handles multiple spaces', () => {
      const result = tokenizeIndo('Satu.   Dua.');
      expect(result).toHaveLength(2);
    });

    it('handles trailing period', () => {
      const result = tokenizeIndo('Satu dua tiga.');
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('Satu dua tiga');
    });
  });
});