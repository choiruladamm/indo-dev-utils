/**
 * Indonesian province codes and names
 * Based on Dukcapil Kemendagri data
 */
export const PROVINCES: Record<string, string> = {
  '11': 'Aceh',
  '12': 'Sumatera Utara',
  '13': 'Sumatera Barat',
  '14': 'Riau',
  '15': 'Jambi',
  '16': 'Sumatera Selatan',
  '17': 'Bengkulu',
  '18': 'Lampung',
  '19': 'Kepulauan Bangka Belitung',
  '21': 'Kepulauan Riau',
  '31': 'DKI Jakarta',
  '32': 'Jawa Barat',
  '33': 'Jawa Tengah',
  '34': 'DI Yogyakarta',
  '35': 'Jawa Timur',
  '36': 'Banten',
  '51': 'Bali',
  '52': 'Nusa Tenggara Barat',
  '53': 'Nusa Tenggara Timur',
  '61': 'Kalimantan Barat',
  '62': 'Kalimantan Tengah',
  '63': 'Kalimantan Selatan',
  '64': 'Kalimantan Timur',
  '65': 'Kalimantan Utara',
  '71': 'Sulawesi Utara',
  '72': 'Sulawesi Tengah',
  '73': 'Sulawesi Selatan',
  '74': 'Sulawesi Tenggara',
  '75': 'Gorontalo',
  '76': 'Sulawesi Barat',
  '81': 'Maluku',
  '82': 'Maluku Utara',
  '91': 'Papua',
  '92': 'Papua Barat',
  '93': 'Papua Selatan',
  '94': 'Papua Tengah',
  '95': 'Papua Pegunungan',
  '96': 'Papua Barat Daya',
};

/**
 * Regency codes for each province (simplified - only major ones)
 * In a real implementation, you'd have complete data
 */
export const REGENCIES: Record<string, Record<string, string>> = {
  '32': {
    '01': 'Kab. Bogor',
    '02': 'Kab. Sukabumi',
    '03': 'Kab. Cianjur',
    '71': 'Kota Bandung',
    '72': 'Kota Bekasi',
    '73': 'Kota Depok',
  },
  '31': { 
    '01': 'Kota Jakarta Selatan',
    '02': 'Kota Jakarta Timur',
    '03': 'Kota Jakarta Pusat',
    '04': 'Kota Jakarta Barat',
    '05': 'Kota Jakarta Utara',
  },
};