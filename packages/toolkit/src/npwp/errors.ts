/**
 * Error thrown when an invalid NPWP is provided to a function.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   requireNPWP('invalid');
 * } catch (error) {
 *   if (error instanceof InvalidNPWPError) {
 *     console.log(error.code); // 'INVALID_NPWP'
 *   }
 * }
 * ```
 *
 * @public
 */
export class InvalidNPWPError extends Error {
  readonly code = 'INVALID_NPWP' as const;

  constructor(message: string = 'Invalid NPWP provided') {
    super(message);
    this.name = 'InvalidNPWPError';
  }
}
