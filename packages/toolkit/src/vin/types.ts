/**
 * VIN Validation options.
 */
export interface VINOptions {
  /**
   * Whether to include error messages in the validation result.
   */
  includeDetails?: boolean;
}

/**
 * Options for masking a VIN.
 */
export interface VINMaskOptions {
  /**
   * Number of characters visible at the start (default: 11).
   */
  visibleStart?: number;
  /**
   * Number of characters visible at the end (default: 0).
   */
  visibleEnd?: number;
  /**
   * Character to use for masking (default: '*').
   */
  maskChar?: string;
}

/**
 * Detailed validation result.
 */
export interface VINValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Information extracted from a valid Vehicle Identification Number (VIN).
 *
 * Contains parsed data including the world manufacturer identifier (WMI),
 * vehicle descriptor section (VDS), check digit, model year code, plant code,
 * and serial number.
 *
 * @example
 * ```typescript
 * const info: VINInfo = {
 *   wmi: '1HB',
 *   vds: 'HA82L7',
 *   checkDigit: 'Z',
 *   modelYearCode: 'B',
 *   plantCode: '7',
 *   serialNumber: 'ZB000001',
 *   isValid: true,
 * };
 * ```
 *
 * @public
 */
export interface VINInfo {
  /**
   * World manufacturer identifier (positions 1-3).
   * Identifies the manufacturer and vehicle type.
   */
  wmi: string;

  /**
   * Vehicle descriptor section (positions 4-9).
   * Contains information about the vehicle attributes.
   */
  vds: string;

  /**
   * Check digit (position 9).
   * Used for VIN validation checksum.
   */
  checkDigit: string;

  /**
   * Model year code (position 10).
   * Indicates the vehicle's model year.
   */
  modelYearCode: string;

  /**
   * Plant code (position 11).
   * Identifies the manufacturing plant.
   */
  plantCode: string;

  /**
   * Serial number (positions 12-17).
   * Uniquely identifies the vehicle.
   */
  serialNumber: string;

  /**
   * Whether the VIN passed validation.
   * If `false`, other fields may contain partial data.
   */
  isValid: boolean;
}
