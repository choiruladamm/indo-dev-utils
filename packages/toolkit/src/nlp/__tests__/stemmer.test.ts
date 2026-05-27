import { describe, it, expect } from 'vitest';
import { stemText } from '../stemmer';

describe('stemText', () => {
  describe('valid inputs', () => {
    it('stems word with prefix me-', () => {
      expect(stemText('membuat')).toBe('buat');
    });

    it('removes ber- prefix', () => {
      const result = stemText('berkewarganegaraan');
      expect(result.length).toBeLessThan(17);
    });

    it('handles word with kan suffix', () => {
      const result = stemText('mempertanggungjawabkan');
      expect(result.length).toBeLessThan('mempertanggungjawabkan'.length);
    });

    it('handles word with an suffix', () => {
      const result = stemText('ujian');
      expect(result).toBeTruthy();
    });

    it('removes nya suffix', () => {
      const result = stemText('rumahnya');
      expect(result.length).toBeLessThan('rumahnya'.length);
    });

    it('handles multiple affixes', () => {
      const result = stemText('diwijakter');
      expect(result).toBeTruthy();
    });
  });

  describe('invalid inputs', () => {
    it('returns empty string as-is', () => {
      expect(stemText('')).toBe('');
    });

    it('returns null as-is', () => {
      expect(stemText(null as unknown as string)).toBe(null);
    });

    it('returns undefined as-is', () => {
      expect(stemText(undefined as unknown as string)).toBe(undefined);
    });

    it('returns short words unchanged', () => {
      expect(stemText('aku')).toBe('aku');
      expect(stemText('di')).toBe('di');
    });
  });

  describe('edge cases', () => {
    it('handles already stemmed words', () => {
      expect(stemText('budi')).toBe('budi');
    });

    it('handles mixed case', () => {
      expect(stemText('MEMBUAT')).toBe('BUAT');
    });
  });
});