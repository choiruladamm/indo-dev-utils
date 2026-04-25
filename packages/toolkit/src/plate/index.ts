/**
 * Indonesian vehicle license plate (plat nomor) utilities.
 *
 * Provides validation, parsing, formatting, and region detection
 * for Indonesian vehicle license plates.
 *
 * @example
 * ```typescript
 * import { validatePlate, parsePlate, maskPlate } from '@indodev/toolkit/plate';
 *
 * validatePlate('B 1234 ABC'); // true
 * parsePlate('B 1234 ABC');    // { ... }
 * maskPlate('B 1234 ABC');     // 'B 1*** ABC'
 * ```
 *
 * @module plate
 * @packageDocumentation
 */

export { validatePlate, getRegionFromPlate, formatPlate } from './utils';
export { PLATE_REGIONS } from './regions';
export { InvalidPlateError } from './errors';
export { parsePlate } from './parse';
export { maskPlate } from './mask';
export { cleanPlate } from './clean';
export { isPrivatePlate, isPublicPlate, isDiplomatPlate } from './type-check';
export type { PlateInfo, PlateMaskOptions } from './types';
