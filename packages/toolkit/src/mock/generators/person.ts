import { createLCG, LCGInstance } from '../lcg';
import {
  FIRST_NAMES_MALE, FIRST_NAMES_FEMALE, LAST_NAMES, EMAIL_DOMAINS,
  PROVINCE_CODES, OPERATOR_SAMPLE_PREFIXES, PRIVATE_PLATE_PREFIXES,
} from '../constants';
import { KESEHATAN_LENGTH, KETENAGAKERJAAN_LENGTH } from '../../bpjs/constants';
import {
  VIN_LENGTH as VIN_LENGTH_LOCAL,
  VIN_CHECK_DIGIT_INDEX as VIN_CHECK_DIGIT_INDEX_LOCAL,
  VIN_MODULUS as VIN_MODULUS_LOCAL,
  VIN_CHECK_DIGIT_X as VIN_CHECK_DIGIT_X_LOCAL,
  VIN_WEIGHTS as VIN_WEIGHTS_LOCAL,
  VIN_CHAR_VALUES as VIN_CHAR_VALUES_LOCAL,
  EXCLUDED_VIN_CHARS as EXCLUDED_VIN_CHARS_LOCAL,
} from '../../vin/constants';
import { MockGender, MockPerson, MockPersonOptions, MockFactory, PhoneOperator, BPJSScheme } from '../types';

const OPERATOR_NAMES = Object.keys(OPERATOR_SAMPLE_PREFIXES) as PhoneOperator[];
const PLATE_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXY';
const SCHEME_LENGTH: Record<BPJSScheme, number> = {
  kesehatan: KESEHATAN_LENGTH,
  ketenagakerjaan: KETENAGAKERJAAN_LENGTH,
};

const VIN_CHARS_LOCAL = Object.keys(VIN_CHAR_VALUES_LOCAL);
const EXCLUDED_SET_LOCAL = new Set(EXCLUDED_VIN_CHARS_LOCAL);

function computeCheckDigitLocal(chars: readonly string[]): string {
  let sum = 0;
  for (let i = 0; i < VIN_LENGTH_LOCAL; i++) {
    if (i === VIN_CHECK_DIGIT_INDEX_LOCAL) continue;
    const val = VIN_CHAR_VALUES_LOCAL[chars[i]];
    sum += val * VIN_WEIGHTS_LOCAL[i];
  }
  const value = sum % VIN_MODULUS_LOCAL;
  return value === 10 ? VIN_CHECK_DIGIT_X_LOCAL : value.toString();
}

function isValidVinCharLocal(c: string): boolean {
  return c.length === 1 && !EXCLUDED_SET_LOCAL.has(c) && c in VIN_CHAR_VALUES_LOCAL;
}

function buildPerson(
  lcg: LCGInstance,
  genderOverride?: MockGender,
  includeBPJS = false,
  bpjsScheme: BPJSScheme = 'kesehatan',
): MockPerson {
  // 1. Gender
  const gender: MockGender = genderOverride ?? (lcg.nextInt(2) === 0 ? 'M' : 'F');

  // 2. Birth date (day 1–28, month 1–12, year 1960–2005)
  const day = lcg.nextRange(1, 28);
  const month = lcg.nextRange(1, 12);
  const year = lcg.nextRange(1960, 2005);

  const birthDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // 3. Name
  const firstNames = gender === 'M' ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE;
  const firstName = lcg.nextElement(firstNames);
  const lastName = lcg.nextElement(LAST_NAMES);
  const name = `${firstName} ${lastName}`;

  // 4. NIK (reuses day/month/year from step 2)
  const province = lcg.nextElement(PROVINCE_CODES);
  const encodedDay = gender === 'F' ? day + 40 : day;
  const dd = String(encodedDay).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yy = String(year).slice(-2);
  // NIK format: PP KK SS YY MM DD SEQ (validator reads positions 6-11 as YY-MM-DD)
  const nik = `${province}0101${yy}${mm}${dd}0001`;

  // 5. NPWP
  const npwpDigits = lcg.nextDigits(15);
  const npwp =
    `${npwpDigits.slice(0, 2)}.${npwpDigits.slice(2, 5)}.${npwpDigits.slice(5, 8)}` +
    `.${npwpDigits[8]}-${npwpDigits.slice(9, 12)}.${npwpDigits.slice(12, 15)}`;

  // 6. Phone
  const operator = lcg.nextElement(OPERATOR_NAMES);
  const phonePrefix = OPERATOR_SAMPLE_PREFIXES[operator];
  const phoneSuffix = lcg.nextDigits(7);
  const phone = `${phonePrefix}${phoneSuffix}`;

  // 7. Email (gender-neutral: uses male first names)
  const emailFirst = lcg.nextElement(FIRST_NAMES_MALE).toLowerCase();
  const emailLast = lcg.nextElement(LAST_NAMES).toLowerCase();
  const emailNum = lcg.nextRange(10, 99);
  const emailDomain = lcg.nextElement(EMAIL_DOMAINS);
  const email = `${emailFirst}.${emailLast}${emailNum}@${emailDomain}`;

  // 8. Plate
  const platePrefix = lcg.nextElement(PRIVATE_PLATE_PREFIXES);
  const plateNumber = lcg.nextRange(1000, 9999).toString();
  const suffixLen = lcg.nextRange(2, 3);
  let plateSuffix = '';
  for (let i = 0; i < suffixLen; i++) {
    plateSuffix += PLATE_LETTERS[lcg.nextInt(PLATE_LETTERS.length)];
  }
  const plate = `${platePrefix} ${plateNumber} ${plateSuffix}`;

  if (includeBPJS) {
    const bpjs = lcg.nextDigits(SCHEME_LENGTH[bpjsScheme]);
    return { name, gender, birthDate, nik, npwp, phone, email, plate, bpjs };
  }

  return { name, gender, birthDate, nik, npwp, phone, email, plate };
}

/**
 * Generates a complete consistent fake Indonesian person.
 * The NIK birth date and gender always match the birthDate and gender fields.
 *
 * Set `includeBPJS: true` to add a valid BPJS number (default scheme: `kesehatan`).
 * Default output matches the v0.9.0 shape — the `bpjs` field is omitted unless opted in.
 *
 * @example
 * generateMockPerson({ seed: 42 })
 * // { name: '...', gender: 'M', birthDate: '1990-03-15', nik: '...', ... }
 */
export function generateMockPerson(options: MockPersonOptions = {}): MockPerson {
  const { gender, includeBPJS = false, bpjsScheme = 'kesehatan', seed } = options;
  const lcg = createLCG(seed);
  return buildPerson(lcg, gender, includeBPJS, bpjsScheme);
}

/**
 * Creates a mock factory pre-bound to a seed.
 * The factory maintains a single LCG state shared across all calls,
 * producing a reproducible sequence of mock data.
 *
 * Note: Providing birthDate to factory.generateNIK() skips the random
 * date generation step, advancing the LCG differently than omitting it.
 * This is expected behavior — LCG state depends on which options are passed.
 *
 * @example
 * const factory = createMockFactory(42);
 * const person1 = factory.generateMockPerson();
 * const person2 = factory.generateMockPerson(); // different from person1
 */
export function createMockFactory(seed: number): MockFactory {
  const lcg = createLCG(seed);

  // Each generator on the factory uses the shared LCG (no new seed per call)
  return {
    generateNIK(options = {}) {
      const { gender, birthDate, provinceCode } = options;
      const resolvedGender: MockGender = gender ?? (lcg.nextInt(2) === 0 ? 'M' : 'F');
      const province = provinceCode ?? lcg.nextElement(PROVINCE_CODES);
      let day: number, month: number, year: number;
      if (birthDate) {
        day = birthDate.getDate();
        month = birthDate.getMonth() + 1;
        year = birthDate.getFullYear();
      } else {
        day = lcg.nextRange(1, 28);
        month = lcg.nextRange(1, 12);
        year = lcg.nextRange(1960, 2005);
      }
      const encodedDay = resolvedGender === 'F' ? day + 40 : day;
      const dd = String(encodedDay).padStart(2, '0');
      const mm = String(month).padStart(2, '0');
      const yy = String(year).slice(-2);
      return `${province}0101${yy}${mm}${dd}0001`;
    },

    generatePhone(options = {}) {
      const { format = 'national', operator } = options;
      const resolvedOperator: PhoneOperator = operator ?? lcg.nextElement(OPERATOR_NAMES);
      const prefix = OPERATOR_SAMPLE_PREFIXES[resolvedOperator];
      const suffix = lcg.nextDigits(7);
      const national = `${prefix}${suffix}`;
      if (format === 'national') return national;
      return `+62${national.slice(1)}`;
    },

    generateNPWP(options = {}) {
      const { format = 'formatted' } = options;
      const digits = lcg.nextDigits(15);
      if (format === 'raw') return digits;
      return (
        `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}` +
        `.${digits[8]}-${digits.slice(9, 12)}.${digits.slice(12, 15)}`
      );
    },

    generatePlate(options = {}) {
      const { region } = options;
      const prefix = region ?? lcg.nextElement(PRIVATE_PLATE_PREFIXES);
      const number = lcg.nextRange(1000, 9999).toString();
      const suffixLen = lcg.nextRange(2, 3);
      let suffix = '';
      for (let i = 0; i < suffixLen; i++) {
        suffix += PLATE_LETTERS[lcg.nextInt(PLATE_LETTERS.length)];
      }
      return `${prefix} ${number} ${suffix}`;
    },

    generateEmail(options = {}) {
      const { domain } = options;
      const resolvedDomain = domain ?? lcg.nextElement(EMAIL_DOMAINS);
      const first = lcg.nextElement(FIRST_NAMES_MALE).toLowerCase();
      const last = lcg.nextElement(LAST_NAMES).toLowerCase();
      const num = lcg.nextRange(10, 99);
      return `${first}.${last}${num}@${resolvedDomain}`;
    },

    generateName(options = {}) {
      const { gender, parts = 'full' } = options;
      const resolvedGender: MockGender = gender ?? (lcg.nextInt(2) === 0 ? 'M' : 'F');
      const firstNames = resolvedGender === 'M' ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE;
      if (parts === 'first') return lcg.nextElement(firstNames);
      if (parts === 'last') return lcg.nextElement(LAST_NAMES);
      return `${lcg.nextElement(firstNames)} ${lcg.nextElement(LAST_NAMES)}`;
    },

    generateMockPerson(options = {}) {
      const { gender, includeBPJS = false, bpjsScheme = 'kesehatan' } = options;
      return buildPerson(lcg, gender, includeBPJS, bpjsScheme);
    },

    generateBPJS(options = {}) {
      const { scheme = 'kesehatan' } = options;
      return lcg.nextDigits(SCHEME_LENGTH[scheme]);
    },

    generateVIN(options = {}) {
      const { manufacturerPrefix } = options;
      const usePrefix =
        typeof manufacturerPrefix === 'string' &&
        manufacturerPrefix.length === 3 &&
        [...manufacturerPrefix].every(isValidVinCharLocal);

      const chars: string[] = new Array(VIN_LENGTH_LOCAL);
      if (usePrefix) {
        for (let i = 0; i < 3; i++) {
          chars[i] = (manufacturerPrefix as string)[i].toUpperCase();
        }
      } else {
        for (let i = 0; i < 3; i++) {
          chars[i] = lcg.nextElement(VIN_CHARS_LOCAL);
        }
      }

      for (let i = 3; i < VIN_LENGTH_LOCAL; i++) {
        if (i === VIN_CHECK_DIGIT_INDEX_LOCAL) continue;
        chars[i] = lcg.nextElement(VIN_CHARS_LOCAL);
      }

      chars[VIN_CHECK_DIGIT_INDEX_LOCAL] = computeCheckDigitLocal(chars);
      return chars.join('');
    },
  };
}
