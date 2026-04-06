/**
 * Error thrown when an invalid VIN is provided to a function.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   requireVIN('invalid');
 * } catch (error) {
 *   if (error instanceof InvalidVINError) {
 *     console.log(error.code); // 'INVALID_VIN'
 *   }
 * }
 * ```
 *
 * @public
 */
export class InvalidVINError extends Error {
  readonly code = 'INVALID_VIN' as const;

  constructor(message: string = 'Invalid VIN provided') {
    super(message);
    this.name = 'InvalidVINError';
  }
}
