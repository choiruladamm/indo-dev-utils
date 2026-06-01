/**
 * Strips all non-numeric characters from a BPJS number string.
 *
 * @param number - Raw input string
 * @returns Digits-only string, or empty string for null/empty input
 *
 * @example
 * cleanBPJS('0001-2345-67890') // '0001234567890'
 * cleanBPJS('BPJS: 12345678901') // '12345678901'
 * cleanBPJS('') // ''
 */
export function cleanBPJS(number: string): string {
  if (!number || typeof number !== 'string') return '';
  return number.replace(/[^\d]/g, '');
}
