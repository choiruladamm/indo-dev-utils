/**
 * VIN (Vehicle Identification Number) validation utilities.
 *
 * Provides validation, parsing, and masking functions for VINs
 * following the ISO 3779 standard.
 *
 * @example
 * ```typescript
 * import { validateVIN, parseVIN, maskVIN } from '@indodev/toolkit/vin';
 *
 * validateVIN('1G1YY22G965103518'); // true
 * parseVIN('1G1YY22G965103518');    // { ... }
 * maskVIN('1G1YY22G965103518');      // '1G1Y********'
 * ```
 *
 * @module vin
 * @packageDocumentation
 */

export { validateVIN } from './validate';
export type {
  VINOptions,
  VINMaskOptions,
  VINValidationResult,
  VINInfo,
} from './types';
export { InvalidVINError } from './errors';
export { parseVIN } from './parse';
export { maskVIN } from './mask';
export { cleanVIN } from './clean';