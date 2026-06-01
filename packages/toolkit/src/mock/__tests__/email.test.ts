import { describe, it, expect } from 'vitest';
import { generateEmail } from '../generators/email';
import { validateEmail } from '../../email-validator';

describe('generateEmail', () => {
  it('generated email passes validateEmail() — 20 seed verification', () => {
    for (let seed = 1; seed <= 20; seed++) {
      expect(validateEmail(generateEmail({ seed }))).toBe(true);
    }
  });

  it('email contains @ separator', () => {
    expect(generateEmail({ seed: 1 })).toContain('@');
  });

  it('email local part is lowercase', () => {
    const email = generateEmail({ seed: 1 });
    const localPart = email.split('@')[0];
    expect(localPart).toBe(localPart.toLowerCase());
  });

  it('email contains dot before domain', () => {
    const email = generateEmail({ seed: 1 });
    const localPart = email.split('@')[0];
    expect(localPart).toContain('.');
  });

  it('provided domain is used', () => {
    const email = generateEmail({ domain: 'gmail.com', seed: 1 });
    expect(email.endsWith('@gmail.com')).toBe(true);
  });

  it('same seed produces same email', () => {
    expect(generateEmail({ seed: 42 })).toBe(generateEmail({ seed: 42 }));
  });
});
