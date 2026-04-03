/**
 * Email validation options.
 */
export interface EmailValidationOptions {
  /**
   * Whether to block known disposable email domains.
   * @default false
   */
  blockDisposable?: boolean;
}

/**
 * Detailed email validation result.
 */
export interface EmailValidationResult {
  isValid: boolean;
  domain?: string;
  isDisposable?: boolean;
}

/**
 * Options for email masking.
 */
export interface EmailMaskOptions {
  /**
   * Number of characters to keep visible at the start of the username.
   * @default 1
   */
  visibleStart?: number;
  /**
   * Number of characters to keep visible at the end of the username.
   * @default 1
   */
  visibleEnd?: number;
  /**
   * Character used for masking.
   * @default '*'
   */
  maskChar?: string;
}

/**
 * Detailed email information.
 */
export interface EmailInfo {
  username: string;
  domain: string;
  isCommonProvider: boolean;
  isDisposable: boolean;
}
