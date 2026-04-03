/**
 * The standard length of a VIN (ISO 3779).
 */
export const VIN_LENGTH = 17;

/**
 * The 0-based index of the check digit in the VIN (Position 9).
 */
export const VIN_CHECK_DIGIT_INDEX = 8;

/**
 * The modulus used in the VIN checksum calculation.
 */
export const VIN_MODULUS = 11;

/**
 * The character representing a checksum value of 10.
 */
export const VIN_CHECK_DIGIT_X = 'X';

/**
 * Weights used in the VIN checksum calculation.
 * Each position (1-17) is multiplied by its corresponding weight.
 * Position 9 is the check digit itself (weight 0).
 */
export const VIN_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * Values assigned to each valid character for VIN calculation.
 * Invalid characters: I, O, Q are not allowed in VIN.
 */
export const VIN_CHAR_VALUES: Record<string, number> = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9,
  'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
};

/**
 * Characters excluded from VIN (I, O, Q).
 */
export const EXCLUDED_VIN_CHARS = ['I', 'O', 'Q'];

/**
 * Version of the VIN utility module.
 */
export const VIN_VERSION = '1.0.0';

