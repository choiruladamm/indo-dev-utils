/**
 * Indonesian mock data generator for testing.
 *
 * Generates structurally valid fake Indonesian data using a seeded
 * Linear Congruential Generator (LCG). Same seed = same output, always.
 *
 * All generated values pass their corresponding validators:
 * - generateNIK() → passes validateNIK()
 * - generatePhone() → passes validatePhoneNumber()
 * - generateNPWP() → passes validateNPWP()
 * - generatePlate() → passes validatePlate()
 * - generateEmail() → passes validateEmail()
 *
 * @example
 * ```typescript
 * import { generateMockPerson, createMockFactory } from '@indodev/toolkit/mock';
 *
 * // One-shot with seed
 * const person = generateMockPerson({ seed: 42 });
 *
 * // Factory for reproducible sequences in test suites
 * const factory = createMockFactory(12345);
 * const p1 = factory.generateMockPerson();
 * const p2 = factory.generateMockPerson();
 * ```
 *
 * @module mock
 * @packageDocumentation
 */

export { generateNIK } from './generators/nik';
export { generatePhone } from './generators/phone';
export { generateNPWP } from './generators/npwp';
export { generatePlate } from './generators/plate';
export { generateEmail } from './generators/email';
export { generateName } from './generators/name';
export { generateMockPerson, createMockFactory } from './generators/person';

export type {
  MockGender,
  PhoneOperator,
  PhoneFormat,
  NPWPFormat,
  PlateType,
  NameParts,
  NIKMockOptions,
  PhoneMockOptions,
  NPWPMockOptions,
  PlateMockOptions,
  EmailMockOptions,
  NameMockOptions,
  MockPersonOptions,
  MockPerson,
  MockFactory,
} from './types';
