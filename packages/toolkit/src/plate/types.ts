/**
 * Options for masking a license plate.
 */
export interface PlateMaskOptions {
  /**
   * Number of characters visible at the start (default: 1).
   */
  visibleStart?: number;
  /**
   * Number of characters visible at the end (default: 3).
   */
  visibleEnd?: number;
  /**
   * Character to use for masking (default: '*').
   */
  maskChar?: string;
}

/**
 * Information extracted from a valid Indonesian license plate number.
 *
 * Contains parsed data including the plate prefix, number, suffix,
 * type classification, and formatted representation.
 *
 * @example
 * ```typescript
 * const info: PlateInfo = {
 *   prefix: 'B',
 *   number: '1234',
 *   suffix: 'ABC',
 *   type: 'private',
 *   formatted: 'B 1234 ABC',
 *   isValid: true,
 * };
 * ```
 *
 * @public
 */
export interface PlateInfo {
  /**
   * Plate prefix (letters before number).
   * Indicates the region where the vehicle is registered.
   */
  prefix: string;

  /**
   * Plate number (digits).
   */
  number: string;

  /**
   * Plate suffix (letters after number, if any).
   */
  suffix: string;

  /**
   * Type of vehicle registration.
   * - 'private': Private vehicle
   * - 'public': Public transportation
   * - 'diplomat': Diplomatic vehicle
   * - `null`: Unknown or invalid type
   */
  type: 'private' | 'public' | 'diplomat' | null;

  /**
   * Formatted plate string with proper spacing.
   * @example 'B 1234 ABC'
   */
  formatted: string;

  /**
   * Whether the plate passed validation.
   * If `false`, other fields may contain partial data.
   */
  isValid: boolean;
}
