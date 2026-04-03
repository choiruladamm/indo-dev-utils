import { describe, it, expect } from 'vitest';
import { validateEmail, normalizeEmail, maskEmail, getEmailInfo } from '../email-validator';

describe('validateEmail', () => {
  describe('Standard Formats', () => {
    it('should return true for common valid emails', () => {
      const validEmails = [
        'simple@example.com',
        'very.common@example.com',
        'disposable.style.email.with+symbol@example.com',
        'other.email-with-dash@example.com',
        'fully-qualified-domain@example.com',
        'user.name+tag+sorting@example.com',
        'x@example.com',
        'example-indeed@strange-example.com',
        'admin@mailserver1', // internal domains can be valid in some contexts
        '#!$%&\'*+-/=?^_`{}|~@example.org',
        "example@s.solutions",
        'user@localserver',
      ];
      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should return false for invalid formats', () => {
      const invalidEmails = [
        'Abc.example.com', // no @
        'A@b@c@example.com', // multiple @
        'a"b(c)d,e:f;g<h>i[j\\k]l@example.com', // invalid characters
        'just"not"right@example.com',
        'this is"not\\allowed@example.com',
        'this\\ still\\"not\\\\allowed@example.com',
        '1234567890123456789012345678901234567890123456789012345678901234+x@example.com', // too long username
        'i_like_underscore@but_its_not_allowed_in_this_part.example.com',
      ];
      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('RFC & Boundary Cases', () => {
    it('should return false for double dots', () => {
      expect(validateEmail('John..Doe@example.com')).toBe(false);
    });

    it('should return false for starting/ending with dots', () => {
      expect(validateEmail('.user@example.com')).toBe(false);
      expect(validateEmail('user.@example.com')).toBe(false);
    });

    it('should handle maximum length (254 characters)', () => {
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(180) + '.com'; // ~245 chars
      expect(validateEmail(longEmail)).toBe(true);
      
      const tooLongEmail = 'a'.repeat(64) + '@' + 'b'.repeat(200) + '.com'; // > 254 chars
      expect(validateEmail(tooLongEmail)).toBe(false);
    });
  });

  describe('Disposable Domain Logic', () => {
    it('should allow disposable domains by default', () => {
      expect(validateEmail('test@mailinator.com')).toBe(true);
      expect(validateEmail('user@10minutemail.com')).toBe(true);
    });

    it('should block disposable domains when blockDisposable is true', () => {
      expect(validateEmail('test@mailinator.com', { blockDisposable: true })).toBe(false);
      expect(validateEmail('user@10minutemail.com', { blockDisposable: true })).toBe(false);
      expect(validateEmail('real@gmail.com', { blockDisposable: true })).toBe(true);
    });
  });
});

describe('getEmailInfo', () => {
  it('should extract correct info from common providers', () => {
    const gmail = getEmailInfo('john.doe@gmail.com');
    expect(gmail).toEqual({
      username: 'john.doe',
      domain: 'gmail.com',
      isCommonProvider: true,
      isDisposable: false,
    });

    const yahoo = getEmailInfo('user@yahoo.com');
    expect(yahoo?.isCommonProvider).toBe(true);
  });

  it('should identify disposable domains correctly', () => {
    const disposable = getEmailInfo('temp@temp-mail.org');
    expect(disposable?.isDisposable).toBe(true);
    expect(disposable?.isCommonProvider).toBe(false);
  });

  it('should return null for garbage input', () => {
    expect(getEmailInfo('not-an-email')).toBe(null);
    expect(getEmailInfo('  ')).toBe(null);
  });
});

describe('maskEmail', () => {
  it('should respect visibleStart and visibleEnd options', () => {
    const email = 'indodev@example.com';
    expect(maskEmail(email, { visibleStart: 2, visibleEnd: 2 })).toBe('in***ev@example.com');
    expect(maskEmail(email, { visibleStart: 3, visibleEnd: 1 })).toBe('ind***v@example.com');
  });

  it('should handle different mask characters', () => {
    expect(maskEmail('user@gmail.com', { maskChar: '#' })).toBe('u##r@gmail.com');
    expect(maskEmail('user@gmail.com', { maskChar: '•' })).toBe('u••r@gmail.com');
  });

  it('should fallback gracefully for very short usernames', () => {
    expect(maskEmail('a@b.com')).toBe('a***@b.com');
    expect(maskEmail('ab@c.com')).toBe('a***@c.com');
    expect(maskEmail('abc@d.com')).toBe('a***@d.com');
  });

  it('should not mask if input is invalid', () => {
    expect(maskEmail('invalid')).toBe('invalid');
  });
});

describe('normalizeEmail', () => {
  it('should handle various whitespace characters', () => {
    expect(normalizeEmail('  user@example.com\n')).toBe('user@example.com');
    expect(normalizeEmail('\tuser@example.com ')).toBe('user@example.com');
  });

  it('should lowercase properly', () => {
    expect(normalizeEmail('USER.NAME@DOMAIN.CO.ID')).toBe('user.name@domain.co.id');
  });
});
