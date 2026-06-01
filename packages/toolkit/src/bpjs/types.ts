export type BPJSType = 'kesehatan' | 'ketenagakerjaan';

export interface BPJSInfo {
  type: BPJSType;
  /** Digits-only string, no separators */
  raw: string;
  /** Formatted with standard separators */
  formatted: string;
}

export interface BPJSMaskOptions {
  /** Characters to keep visible at start. Default: 4 */
  visibleStart?: number;
  /** Characters to keep visible at end. Default: 2 */
  visibleEnd?: number;
  /** Replacement character. Default: '*' */
  maskChar?: string;
}

export class InvalidBPJSError extends Error {
  readonly code = 'INVALID_BPJS' as const;

  constructor(message = 'Invalid BPJS number') {
    super(message);
    this.name = 'InvalidBPJSError';
  }
}
