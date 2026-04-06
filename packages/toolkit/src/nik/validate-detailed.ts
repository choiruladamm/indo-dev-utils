import { PROVINCES } from './constants';
import { NIKValidationResult, NIKValidationError, NIKErrorCode } from './types';
import { cleanNIK } from './clean';
import { parseNIK } from './parse';

function createError(code: NIKErrorCode, message: string): NIKValidationError {
  return { code, message };
}

/**
 * Validates a NIK and returns detailed error information.
 *
 * Unlike `validateNIK` which returns a boolean, this function provides
 * structured error reporting for form validation use cases.
 *
 * @param nik - The NIK string to validate (accepts any format with separators)
 * @returns Detailed validation result with errors array
 *
 * @example
 * ```typescript
 * const result = validateNIKDetailed('3201018901310123');
 * if (!result.isValid) {
 *   result.errors.forEach(err => {
 *     console.log(`${err.code}: ${err.message}`);
 *   });
 * }
 * ```
 *
 * @public
 */
export function validateNIKDetailed(nik: string): NIKValidationResult {
  const cleaned = cleanNIK(nik);

  if (cleaned === '') {
    return {
      isValid: false,
      errors: [createError('INVALID_FORMAT', 'NIK must be exactly 16 digits')],
      nik: null,
    };
  }

  const provinceCode = cleaned.substring(0, 2);
  if (!PROVINCES[provinceCode]) {
    return {
      isValid: false,
      errors: [
        createError(
          'INVALID_PROVINCE',
          `Province code ${provinceCode} not found`
        ),
      ],
      nik: null,
    };
  }

  const info = parseNIK(cleaned);
  if (!info) {
    return {
      isValid: false,
      errors: [createError('INVALID_DATE', 'Invalid date components')],
      nik: null,
    };
  }

  const birthDate = info.birthDate;
  if (!birthDate) {
    return {
      isValid: false,
      errors: [createError('INVALID_DATE', 'Invalid birth date')],
      nik: null,
    };
  }

  const now = new Date();
  if (birthDate > now) {
    return {
      isValid: false,
      errors: [
        createError('FUTURE_DATE', 'Birth date cannot be in the future'),
      ],
      nik: null,
    };
  }

  return {
    isValid: true,
    errors: [],
    nik: cleaned,
  };
}
