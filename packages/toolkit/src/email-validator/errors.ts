/**
 * Error thrown when an invalid email is provided to a function.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   requireEmail('invalid');
 * } catch (error) {
 *   if (error instanceof InvalidEmailError) {
 *     console.log(error.code); // 'INVALID_EMAIL'
 *   }
 * }
 * ```
 *
 * @public
 */
export class InvalidEmailError extends Error {
  readonly code = 'INVALID_EMAIL' as const;

  constructor(message: string = 'Invalid email provided') {
    super(message);
    this.name = 'InvalidEmailError';
  }
}
