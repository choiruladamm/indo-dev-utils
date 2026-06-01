import { describe, it, expect } from 'vitest';
import { createLCG } from '../lcg';

describe('createLCG', () => {
  it('same seed produces same sequence', () => {
    const a = createLCG(42);
    const b = createLCG(42);
    expect(a.next()).toBe(b.next());
    expect(a.next()).toBe(b.next());
    expect(a.next()).toBe(b.next());
  });

  it('different seeds produce different first values (probabilistic)', () => {
    expect(createLCG(1).next()).not.toBe(createLCG(2).next());
  });

  it('nextFloat returns value in [0, 1)', () => {
    const lcg = createLCG(99);
    for (let i = 0; i < 100; i++) {
      const v = lcg.nextFloat();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('nextInt(n) returns value in [0, n)', () => {
    const lcg = createLCG(7);
    for (let i = 0; i < 100; i++) {
      const v = lcg.nextInt(10);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(10);
    }
  });

  it('nextElement picks from array', () => {
    const arr = ['a', 'b', 'c'];
    const lcg = createLCG(5);
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(lcg.nextElement(arr));
    }
  });

  it('nextRange(min, max) returns value in [min, max] inclusive', () => {
    const lcg = createLCG(3);
    for (let i = 0; i < 100; i++) {
      const v = lcg.nextRange(1960, 2005);
      expect(v).toBeGreaterThanOrEqual(1960);
      expect(v).toBeLessThanOrEqual(2005);
    }
  });

  it('nextDigits(n) returns string of length n with only digits', () => {
    const lcg = createLCG(11);
    const d = lcg.nextDigits(15);
    expect(d).toHaveLength(15);
    expect(d).toMatch(/^\d{15}$/);
  });
});
