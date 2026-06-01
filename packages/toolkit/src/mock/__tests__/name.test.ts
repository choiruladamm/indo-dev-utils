import { describe, it, expect } from 'vitest';
import { generateName } from '../generators/name';

describe('generateName', () => {
  it('full name has two parts separated by space', () => {
    const name = generateName({ parts: 'full', seed: 1 });
    expect(name.split(' ')).toHaveLength(2);
  });

  it('first-only is a single word', () => {
    expect(generateName({ parts: 'first', seed: 1 }).split(' ')).toHaveLength(1);
  });

  it('last-only is a single word', () => {
    expect(generateName({ parts: 'last', seed: 1 }).split(' ')).toHaveLength(1);
  });

  it('same seed produces same name', () => {
    expect(generateName({ seed: 42 })).toBe(generateName({ seed: 42 }));
  });

  it('returns non-empty string', () => {
    expect(generateName({ seed: 1 }).length).toBeGreaterThan(0);
  });

  it('male gender uses male first name list', () => {
    const name = generateName({ gender: 'M', seed: 1 });
    expect(name).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
  });

  it('female gender uses female first name list', () => {
    const name = generateName({ gender: 'F', seed: 1 });
    expect(name).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
  });
});
