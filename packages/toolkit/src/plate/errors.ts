/**
 * Error thrown when an invalid vehicle plate is provided to a function.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   requirePlate('invalid');
 * } catch (error) {
 *   if (error instanceof InvalidPlateError) {
 *     console.log(error.code); // 'INVALID_PLATE'
 *   }
 * }
 * ```
 *
 * @public
 */
export class InvalidPlateError extends Error {
  readonly code = 'INVALID_PLATE' as const;

  constructor(message: string = 'Invalid plate provided') {
    super(message);
    this.name = 'InvalidPlateError';
  }
}
