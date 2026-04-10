import { parsePlate } from './parse';

/**
 * Checks if a license plate is a private vehicle plate.
 *
 * Private plates follow the standard format: letters-numbers-letters
 * (e.g., B 1234 ABC).
 *
 * @param plate - The license plate to check
 * @returns true if valid private plate, false otherwise
 *
 * @example
 * ```typescript
 * isPrivatePlate('B 1234 ABC'); // true
 * isPrivatePlate('B 1234 U');  // false (public suffix)
 * isPrivatePlate('CD 1234 AB'); // false (diplomat)
 * isPrivatePlate('invalid');    // false
 * ```
 *
 * @public
 */
export function isPrivatePlate(plate: string): boolean {
  if (!plate || typeof plate !== 'string') {
    return false;
  }

  const info = parsePlate(plate);
  return info?.type === 'private' && info.isValid;
}

/**
 * Checks if a license plate is a public transportation plate.
 *
 * Public plates typically have specific suffix indicators
 * (single letters like U, T, H, K, R).
 *
 * @param plate - The license plate to check
 * @returns true if valid public plate, false otherwise
 *
 * @example
 * ```typescript
 * isPublicPlate('B 1234 U');  // true
 * isPublicPlate('B 1234 T'); // true
 * isPublicPlate('B 1234 ABC'); // false (private)
 * isPublicPlate('invalid');    // false
 * ```
 *
 * @public
 */
export function isPublicPlate(plate: string): boolean {
  if (!plate || typeof plate !== 'string') {
    return false;
  }

  const info = parsePlate(plate);
  return info?.type === 'public' && info.isValid;
}

/**
 * Checks if a license plate is a diplomat plate.
 *
 * Diplomat plates start with 'CD', 'CC', or 'KL' prefix.
 *
 * @param plate - The license plate to check
 * @returns true if valid diplomat plate, false otherwise
 *
 * @example
 * ```typescript
 * isDiplomatPlate('CD 1234 12'); // true
 * isDiplomatPlate('CC 1234 AB'); // true
 * isDiplomatPlate('KL 1234 XY'); // true
 * isDiplomatPlate('B 1234 ABC'); // false
 * isDiplomatPlate('invalid');    // false
 * ```
 *
 * @public
 */
export function isDiplomatPlate(plate: string): boolean {
  if (!plate || typeof plate !== 'string') {
    return false;
  }

  const info = parsePlate(plate);
  return info?.type === 'diplomat' && info.isValid;
}
