import { EMAIL_REGEX, DISPOSABLE_DOMAINS } from './constants';
import type { EmailValidationOptions, EmailMaskOptions, EmailInfo } from './types';

/**
 * List of common global email providers.
 */
const COMMON_PROVIDERS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

/**
 * The maximum length of an email address according to RFC 5321.
 */
const MAX_EMAIL_LENGTH = 254;

/**
 * Validates if a string is a properly formatted email address based on RFC 5322.
 * 
 * Performs checks for:
 * - Proper email format (regex).
 * - RFC specific rules (no double dots, username length < 64).
 * - Maximum total length (254 characters).
 * - Optional: disposable email detection.
 * 
 * @param email - The email string to validate.
 * @param options - Optional validation configuration.
 * @returns `true` if valid, `false` otherwise.
 * 
 * @example
 * ```typescript
 * import { validateEmail } from '@indodev/toolkit/email-validator';
 * 
 * validateEmail('user@example.com'); // true
 * validateEmail('invalid-email'); // false
 * validateEmail('spam@mailinator.com', { blockDisposable: true }); // false
 * ```
 */
export function validateEmail(email: string, options?: EmailValidationOptions): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    return false;
  }

  const parts = trimmedEmail.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [username, domain] = parts;

  if (!username || !domain) {
    return false;
  }

  if (username.length > 64) {
    return false;
  }

  if (
    username.includes('..') ||
    username.startsWith('.') ||
    username.endsWith('.') ||
    domain.startsWith('.') ||
    domain.endsWith('.') ||
    domain.includes('..')
  ) {
    return false;
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return false;
  }

  if (options?.blockDisposable) {
    if (DISPOSABLE_DOMAINS.includes(domain)) {
      return false;
    }
  }

  return true;
}

/**
 * Parses an email address to extract useful metadata.
 * 
 * @param email - The email address to parse.
 * @returns `EmailInfo` object containing details or `null` if the email is invalid.
 * 
 * @example
 * ```typescript
 * import { getEmailInfo } from '@indodev/toolkit/email-validator';
 * 
 * const info = getEmailInfo('adam@gmail.com');
 * // { username: 'adam', domain: 'gmail.com', isCommonProvider: true, isDisposable: false }
 * ```
 */
export function getEmailInfo(email: string): EmailInfo | null {
  if (!validateEmail(email)) return null;

  const [username, domain] = email.trim().toLowerCase().split('@');

  return {
    username,
    domain,
    isCommonProvider: COMMON_PROVIDERS.includes(domain),
    isDisposable: DISPOSABLE_DOMAINS.includes(domain),
  };
}

/**
 * Masks the username portion of an email for privacy protection.
 * 
 * Falls back to a standard mask if the username is too short to respect visibleStart/visibleEnd.
 * 
 * @param email - The email address to mask.
 * @param options - Optional masking configuration.
 * @returns Masked email string or original if invalid.
 * 
 * @example
 * ```typescript
 * import { maskEmail } from '@indodev/toolkit/email-validator';
 * 
 * maskEmail('user@example.com'); // 'u**r@example.com'
 * maskEmail('user@example.com', { maskChar: '#' }); // 'u##r@example.com'
 * ```
 */
export function maskEmail(email: string, options?: EmailMaskOptions): string {
  if (!validateEmail(email)) return email;

  const { visibleStart = 1, visibleEnd = 1, maskChar = '*' } = options || {};
  const [username, domain] = email.split('@');

  // Fallback for very short usernames
  if (username.length <= 3) {
    return `${username[0]}${maskChar.repeat(3)}@${domain}`;
  }

  // Calculate masked length
  const maskedLength = username.length - (visibleStart + visibleEnd);

  // If the result of masking would be empty or negative, use fallback
  if (maskedLength <= 0) {
    return `${username[0]}${maskChar.repeat(3)}@${domain}`;
  }

  const start = username.slice(0, visibleStart);
  const end = username.slice(username.length - visibleEnd);

  return `${start}${maskChar.repeat(maskedLength)}${end}@${domain}`;
}

/**
 * Normalizes an email address by trimming whitespace and converting to lowercase.
 * 
 * @param email - The email to normalize.
 * @returns Normalized email string.
 * 
 * @example
 * ```typescript
 * import { normalizeEmail } from '@indodev/toolkit/email-validator';
 * 
 * normalizeEmail('  USER@Example.COM  '); // 'user@example.com'
 * ```
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
