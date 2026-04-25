/**
 * Email validation utilities for Indonesian context.
 *
 * Provides validation, normalization, and masking functions
 * for email addresses.
 *
 * @example
 * ```typescript
 * import { validateEmail, maskEmail, normalizeEmail } from '@indodev/toolkit/email-validator';
 *
 * validateEmail('user@example.com');     // true
 * maskEmail('user@example.com');        // 'u***@example.com'
 * normalizeEmail('User@Example.COM');    // 'user@example.com'
 * ```
 *
 * @module email-validator
 * @packageDocumentation
 */

export {
  validateEmail,
  getEmailInfo,
  maskEmail,
  normalizeEmail,
} from './email-validator';
export type {
  EmailValidationOptions,
  EmailValidationResult,
  EmailMaskOptions,
  EmailInfo,
} from './types';
export { InvalidEmailError } from './errors';