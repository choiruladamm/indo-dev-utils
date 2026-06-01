export const FIRST_NAMES_MALE: readonly string[] = [
  'Agus', 'Andi', 'Bayu', 'Budi', 'Cahyo', 'Dani', 'Eko', 'Fajar',
  'Gilang', 'Hendra', 'Irwan', 'Ivan', 'Joko', 'Krisna', 'Lukman',
  'Mahmud', 'Nanda', 'Oki', 'Pandu', 'Putra', 'Reza', 'Rizky',
  'Sandi', 'Tri', 'Umar', 'Wahyu', 'Yoga', 'Yusuf', 'Fauzi', 'Dian',
];

export const FIRST_NAMES_FEMALE: readonly string[] = [
  'Ani', 'Ayu', 'Bunga', 'Citra', 'Dewi', 'Dita', 'Erna', 'Fitri',
  'Hani', 'Indah', 'Lestari', 'Maya', 'Nita', 'Nurul', 'Putri',
  'Ratna', 'Rina', 'Rini', 'Selvi', 'Siti', 'Sri', 'Tari', 'Umi',
  'Vina', 'Wati', 'Widya', 'Yanti', 'Yuni', 'Zahra', 'Clara',
];

export const LAST_NAMES: readonly string[] = [
  'Budiman', 'Darmawan', 'Firmansyah', 'Gunawan', 'Haryanto', 'Hartono',
  'Hidayat', 'Kurniawan', 'Kusuma', 'Mahendra', 'Mulyadi', 'Nugroho',
  'Prasetyo', 'Prabowo', 'Purnama', 'Rahayu', 'Ramadan', 'Santoso',
  'Saputra', 'Setiawan', 'Suharto', 'Sulistyo', 'Supriadi', 'Surya',
  'Suryadi', 'Susanto', 'Utomo', 'Wahyudi', 'Wibowo', 'Wijaya',
];

export const EMAIL_DOMAINS: readonly string[] = [
  'gmail.com', 'yahoo.co.id', 'outlook.com', 'hotmail.com', 'ymail.com',
];

/** Valid province codes from NIK format. Mirrors keys of PROVINCES in nik/constants.ts. */
export const PROVINCE_CODES: readonly string[] = [
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '21',
  '31', '32', '33', '34', '35', '36',
  '51', '52', '53',
  '61', '62', '63', '64', '65',
  '71', '72', '73', '74', '75', '76',
  '81', '82',
  '91', '92', '93', '94', '95', '96',
];

/** Operator name → one representative 4-digit prefix for mobile number generation */
export const OPERATOR_SAMPLE_PREFIXES: Record<string, string> = {
  Telkomsel: '0812',
  XL: '0817',
  Indosat: '0814',
  Axis: '0831',
  Tri: '0896',
  Smartfren: '0881',
};

/** Plate prefixes that represent single-char private vehicle regions */
export const PRIVATE_PLATE_PREFIXES: readonly string[] = [
  'A', 'B', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N',
  'P', 'R', 'S', 'T',
];
