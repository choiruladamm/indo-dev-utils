import { createLCG } from '../lcg';
import { FIRST_NAMES_MALE, FIRST_NAMES_FEMALE, LAST_NAMES } from '../constants';
import { MockGender, NameMockOptions } from '../types';

/**
 * Generates a realistic Indonesian name from a curated static list.
 * Email is gender-neutral by design — local part uses male first names
 * regardless of the person's gender. This is intentional to avoid
 * gender inference in email addresses.
 *
 * @example
 * generateName({ gender: 'M', seed: 1 }) // 'Budi Santoso'
 * generateName({ gender: 'F', parts: 'first', seed: 2 }) // 'Siti'
 */
export function generateName(options: NameMockOptions = {}): string {
  const { gender, parts = 'full', seed } = options;
  const lcg = createLCG(seed);

  const resolvedGender: MockGender = gender ?? (lcg.nextInt(2) === 0 ? 'M' : 'F');
  const firstNames = resolvedGender === 'M' ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE;

  if (parts === 'first') return lcg.nextElement(firstNames);
  if (parts === 'last') return lcg.nextElement(LAST_NAMES);

  return `${lcg.nextElement(firstNames)} ${lcg.nextElement(LAST_NAMES)}`;
}
