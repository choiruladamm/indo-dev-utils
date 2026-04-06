import { toE164 } from './format';
import { validatePhoneNumber, isMobileNumber } from './validate';

/**
 * Generates a WhatsApp click-to-chat link.
 *
 * WhatsApp only works on mobile numbers, so landlines will return empty string.
 *
 * @param phone - The Indonesian mobile phone number
 * @param message - Optional pre-filled message
 * @returns WhatsApp link, or empty string if phone is invalid or landline
 *
 * @example
 * ```typescript
 * generateWALink('081234567890', 'Halo!');
 * // 'https://wa.me/6281234567890?text=Halo%21'
 * ```
 *
 * @example
 * Landlines return empty string (WhatsApp doesn't work on landlines):
 * ```typescript
 * generateWALink('0212345678'); // ''
 * ```
 *
 * @public
 */
export function generateWALink(phone: string, message?: string): string {
  if (!validatePhoneNumber(phone) || !isMobileNumber(phone)) {
    return '';
  }

  const e164 = toE164(phone);
  let link = `https://wa.me/${e164}`;

  if (message) {
    link += `?text=${encodeURIComponent(message)}`;
  }

  return link;
}

/**
 * Generates an SMS link (sms:).
 *
 * SMS only works on mobile numbers, so landlines will return empty string.
 *
 * @param phone - The Indonesian mobile phone number
 * @param body - Optional SMS body
 * @returns SMS link, or empty string if phone is invalid or landline
 *
 * @example
 * ```typescript
 * generateSmsLink('081234567890', 'Pesan ini');
 * // 'sms:+6281234567890?body=Pesan%20ini'
 * ```
 *
 * @example
 * Landlines return empty string (SMS doesn't work on landlines):
 * ```typescript
 * generateSmsLink('0212345678'); // ''
 * ```
 *
 * @public
 */
export function generateSmsLink(phone: string, body?: string): string {
  if (!validatePhoneNumber(phone) || !isMobileNumber(phone)) {
    return '';
  }

  const e164 = toE164(phone);
  let link = `sms:+${e164}`;

  if (body) {
    link += `?body=${encodeURIComponent(body)}`;
  }

  return link;
}

/**
 * Generates a telephone link (tel:).
 *
 * @param phone - The Indonesian phone number
 * @returns Tel link, or empty string if phone is invalid
 *
 * @example
 * ```typescript
 * generateTelLink('081234567890');
 * // 'tel:+6281234567890'
 * ```
 *
 * @public
 */
export function generateTelLink(phone: string): string {
  if (!validatePhoneNumber(phone)) {
    return '';
  }

  const e164 = toE164(phone);
  return `tel:+${e164}`;
}
