/**
 * Information extracted from an NPWP string.
 */
export interface NPWPInfo {
  /** The full 15 or 16 digit numeric string */
  npwp: string;
  /** Taxpayer type (e.g., 01-03 for individual, etc.) */
  type: string;
  /** Serial number */
  serial: string;
  /** Checksum digit */
  checksum: string;
  /** Tax office code */
  taxOfficeCode: string;
  /** Branch code (usually 000 for head office) */
  branchCode: string;
  /** Whether the NPWP is a 16-digit (NIK-based) NPWP */
  isNikBased: boolean;
}

/**
 * Options for NPWP masking.
 */
export interface MaskOptions {
  /** Number of characters to keep visible at the start (default: 2) */
  visibleStart?: number;
  /** Number of characters to keep visible at the end (default: 3) */
  visibleEnd?: number;
  /** Character to use for masking (default: '*') */
  maskChar?: string;
}
