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
 * Detailed validation result.
 */
export interface VINValidationResult {
  isValid: boolean;
  error?: string;
}
