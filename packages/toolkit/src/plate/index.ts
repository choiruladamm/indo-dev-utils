export { validatePlate, getRegionFromPlate, formatPlate } from './utils';
export { PLATE_REGIONS } from './regions';
export { InvalidPlateError } from './errors';
export { parsePlate } from './parse';
export { maskPlate } from './mask';
export { cleanPlate } from './clean';
export { isPrivatePlate, isPublicPlate, isDiplomatPlate } from './type-check';
export type { PlateInfo, PlateMaskOptions } from './types';
