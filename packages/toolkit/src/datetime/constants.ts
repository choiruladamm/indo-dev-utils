/**
 * Constants for Indonesian datetime formatting
 *
 * @module datetime/constants
 * @packageDocumentation
 */

/** Full Indonesian month names (1-indexed: index 0 = empty, 1 = Januari) */
export const MONTH_NAMES: readonly string[] = [
  '', // Placeholder for 0-index
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

/** Short Indonesian month names (3-letter abbreviation) */
export const MONTH_NAMES_SHORT: readonly string[] = [
  '', // Placeholder for 0-index
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

/** Full Indonesian day names */
export const DAY_NAMES: readonly string[] = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

/** Short Indonesian day names (3-letter abbreviation) */
export const DAY_NAMES_SHORT: readonly string[] = [
  'Min',
  'Sen',
  'Sel',
  'Rab',
  'Kam',
  'Jum',
  'Sab',
];

/** Mapping of IANA timezone names to Indonesian abbreviations */
export const TIMEZONE_MAP: Readonly<Record<string, 'WIB' | 'WITA' | 'WIT'>> = {
  // UTC+7 - WIB
  'Asia/Jakarta': 'WIB',
  'Asia/Pontianak': 'WIB',

  // UTC+8 - WITA
  'Asia/Makassar': 'WITA',
  'Asia/Denpasar': 'WITA',
  'Asia/Manado': 'WITA',
  'Asia/Palu': 'WITA',

  // UTC+9 - WIT
  'Asia/Jayapura': 'WIT',
};

/** Valid UTC offset hours that map to Indonesian timezones */
export const VALID_UTC_OFFSETS: readonly number[] = [7, 8, 9];
