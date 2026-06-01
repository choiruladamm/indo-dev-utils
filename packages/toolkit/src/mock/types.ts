export type MockGender = 'M' | 'F';

export type PhoneOperator = 'Telkomsel' | 'XL' | 'Indosat' | 'Axis' | 'Tri' | 'Smartfren';

export type PhoneFormat = 'national' | 'international' | 'e164';

export type NPWPFormat = 'formatted' | 'raw';

export type PlateType = 'private' | 'public';

export type NameParts = 'first' | 'last' | 'full';

export interface NIKMockOptions {
  gender?: MockGender;
  birthDate?: Date;
  provinceCode?: string;
  seed?: number;
}

export interface PhoneMockOptions {
  format?: PhoneFormat;
  operator?: PhoneOperator;
  seed?: number;
}

export interface NPWPMockOptions {
  format?: NPWPFormat;
  seed?: number;
}

export interface PlateMockOptions {
  type?: PlateType;
  region?: string;
  seed?: number;
}

export interface EmailMockOptions {
  domain?: string;
  seed?: number;
}

export interface NameMockOptions {
  gender?: MockGender;
  parts?: NameParts;
  seed?: number;
}

export interface MockPersonOptions {
  gender?: MockGender;
  seed?: number;
}

export interface MockPerson {
  name: string;
  gender: MockGender;
  /** ISO 8601 date string: 'YYYY-MM-DD' */
  birthDate: string;
  nik: string;
  npwp: string;
  phone: string;
  email: string;
  plate: string;
}

export interface MockFactory {
  generateNIK(options?: Omit<NIKMockOptions, 'seed'>): string;
  generatePhone(options?: Omit<PhoneMockOptions, 'seed'>): string;
  generateNPWP(options?: Omit<NPWPMockOptions, 'seed'>): string;
  generatePlate(options?: Omit<PlateMockOptions, 'seed'>): string;
  generateEmail(options?: Omit<EmailMockOptions, 'seed'>): string;
  generateName(options?: Omit<NameMockOptions, 'seed'>): string;
  generateMockPerson(options?: Omit<MockPersonOptions, 'seed'>): MockPerson;
}
