/**
 * Privacy Data Protection (PDP) Module
 *
 * Indonesian PII scanning and anonymization utilities for
 * compliance with UU PDP (Pelindungan Data Pribadi).
 *
 * @module PDP
 */

/**
 * Supported PII (Personally Identifiable Information) types
 * for Indonesian data.
 *
 * @example
 * ```typescript
 * const piiType: PIIType = 'nik';
 * ```
 *
 * @public
 */
export type PIIType = 'nik' | 'npwp' | 'phone' | 'email' | 'passport' | 'bpjs' | 'bank-account';

/**
 * Confidence level for PII detection.
 *
 * - `high`: Valid format + checksum/validation passed
 * - `medium`: Valid format + prefix matched
 * - `low`: Pattern match only (no validation)
 *
 * @public
 */
export type PIIConfidence = 'high' | 'medium' | 'low';

/**
 * Result of a PII scan operation.
 *
 * Contains information about a detected PII element including
 * its type, value, position in the text, and detection confidence.
 *
 * @public
 */
export interface PIIFinding {
  /**
   * The type of PII detected.
   */
  type: PIIType;

  /**
   * The actual PII value that was detected.
   */
  value: string;

  /**
   * Start index of the PII in the original text (0-based).
   */
  startIndex: number;

  /**
   * End index of the PII in the original text (exclusive).
   */
  endIndex: number;

  /**
   * Confidence level of the detection.
   */
  confidence: PIIConfidence;
}

/**
 * Options for PII scanning and masking operations.
 *
 * @public
 */
export interface PIIOptions {
  /**
   * Explicit keys to mask in objects (supports strings and RegExp).
   * If provided, these keys will be masked regardless of autoDetectPII.
   *
   * @example
   * ```typescript
   * { explicitKeys: ['password', 'secret', /^token$/i] }
   * ```
   */
  explicitKeys?: Array<string | RegExp>;

  /**
   * Whether to auto-detect PII in string values.
   * @default true
   */
  autoDetectPII?: boolean;

  /**
   * Character to use for masking.
   * @default '*'
   */
  maskChar?: string;

  /**
   * Masking strategy to use.
   * - `full`: Replace entire value with maskChar
   * - `partial`: Preserve first and last few characters
   *
   * @default 'partial'
   */
  maskStrategy?: 'full' | 'partial';

  /**
   * Optional replacement text instead of maskChar.
   * Example: `[REDACTED_NIK]`
   */
  replacementText?: string;

  /**
   * Whether to escape special characters for JSON-safe logging.
   * Escapes: \n → \\n, \t → \\t, " → \"
   *
   * @default false
   */
  escapeForLog?: boolean;
}

/**
 * Internal options with resolved defaults.
 */
export interface ResolvedPIIOptions extends Required<PIIOptions> {
  explicitKeys: Array<string | RegExp>;
  autoDetectPII: boolean;
  maskChar: string;
  maskStrategy: 'full' | 'partial';
  replacementText: string;
  escapeForLog: boolean;
}