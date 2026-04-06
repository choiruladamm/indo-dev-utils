/**
 * Error thrown when an invalid phone number is provided to a function.
 * Extends native Error with a `code` property for programmatic error handling.
 *
 * @example
 * ```typescript
 * try {
 *   requirePhone('invalid');
 * } catch (error) {
 *   if (error instanceof InvalidPhoneError) {
 *     console.log(error.code); // 'INVALID_PHONE'
 *   }
 * }
 * ```
 *
 * @public
 */
export class InvalidPhoneError extends Error {
  readonly code = 'INVALID_PHONE' as const;

  constructor(message: string = 'Invalid phone number provided') {
    super(message);
    this.name = 'InvalidPhoneError';
  }
}
