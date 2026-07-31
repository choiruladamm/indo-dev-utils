import { describe, it, expect } from 'vitest';
import { generateBPJS } from '../generators/bpjs';
import { validateBPJS, detectBPJSType } from '../../bpjs';

describe('generateBPJS', () => {
  it('AC-1: default scheme is kesehatan and is 13 digits', () => {
    const value = generateBPJS();
    expect(value).toMatch(/^\d{13}$/);
    expect(validateBPJS(value, 'kesehatan')).toBe(true);
  });

  it('AC-2: explicit Ketenagakerjaan is 11 digits and is detected as Ketenagakerjaan', () => {
    const value = generateBPJS({ scheme: 'ketenagakerjaan' });
    expect(value).toMatch(/^\d{11}$/);
    expect(validateBPJS(value, 'ketenagakerjaan')).toBe(true);
    expect(detectBPJSType(value)).toBe('ketenagakerjaan');
  });

  it('default Kesehatan is detected as Kesehatan', () => {
    const value = generateBPJS();
    expect(detectBPJSType(value)).toBe('kesehatan');
  });

  it('AC-4: same seed produces identical output', () => {
    expect(generateBPJS({ seed: 1 })).toBe(generateBPJS({ seed: 1 }));
    expect(generateBPJS({ scheme: 'ketenagakerjaan', seed: 7 })).toBe(
      generateBPJS({ scheme: 'ketenagakerjaan', seed: 7 }),
    );
  });

  it('different seeds produce different output', () => {
    expect(generateBPJS({ seed: 1 })).not.toBe(generateBPJS({ seed: 2 }));
  });

  it('generated values pass validator across 20 seeds for both schemes', () => {
    for (let seed = 1; seed <= 20; seed++) {
      expect(validateBPJS(generateBPJS({ seed }), 'kesehatan')).toBe(true);
      expect(validateBPJS(generateBPJS({ scheme: 'ketenagakerjaan', seed }), 'ketenagakerjaan')).toBe(true);
    }
  });
});
