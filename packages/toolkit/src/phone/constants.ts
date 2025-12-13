/**
 * Phone number constants for Indonesian operators and area codes.
 *
 * Data sources:
 * - Operator prefixes: Official operator documentation and Wikipedia
 * - Area codes: Ministry of Communication and Information Technology (Kemendagri)
 *
 * Last updated: December 2025
 *
 * @see {@link https://en.wikipedia.org/wiki/Telephone_numbers_in_Indonesia Wikipedia - Telephone numbers in Indonesia}
 * @internal
 */

/**
 * Mobile operator prefix mapping.
 *
 * Maps 4-digit prefixes (e.g., '0812') to operator names.
 * Used for operator detection in mobile numbers.
 *
 * **Important Notes:**
 * - Tri (3 Indonesia) has merged with Indosat as of 2024
 * - Axis has been acquired by XL but maintains separate branding
 * - Some operators have both prepaid and postpaid services
 *
 * @example
 * ```typescript
 * OPERATOR_PREFIXES['0812']; // 'Telkomsel'
 * OPERATOR_PREFIXES['0817']; // 'XL'
 * OPERATOR_PREFIXES['0895']; // 'Indosat'
 * ```
 *
 * @internal
 */
export const OPERATOR_PREFIXES: Record<string, string> = {
  // Telkomsel (Halo, Simpati, by.U)
  '0811': 'Telkomsel',
  '0812': 'Telkomsel',
  '0813': 'Telkomsel',
  '0821': 'Telkomsel',
  '0822': 'Telkomsel',
  '0823': 'Telkomsel',
  '0851': 'Telkomsel',
  '0852': 'Telkomsel',
  '0853': 'Telkomsel',

  // XL Axiata (XL Prepaid, XL Prioritas, LIVE.ON)
  '0817': 'XL',
  '0818': 'XL',
  '0819': 'XL',
  '0859': 'XL',
  '0877': 'XL',
  '0878': 'XL',
  '0879': 'XL',

  // Indosat Ooredoo (IM3, Mentari)
  // Note: Tri (3 Indonesia) merged with Indosat
  '0814': 'Indosat',
  '0815': 'Indosat',
  '0816': 'Indosat',
  '0855': 'Indosat',
  '0856': 'Indosat',
  '0857': 'Indosat',
  '0858': 'Indosat',
  '0895': 'Indosat',
  '0896': 'Indosat',
  '0897': 'Indosat',
  '0898': 'Indosat',
  '0899': 'Indosat',

  // Smartfren (Smartfren Power Up)
  '0881': 'Smartfren',
  '0882': 'Smartfren',
  '0883': 'Smartfren',
  '0884': 'Smartfren',
  '0885': 'Smartfren',
  '0886': 'Smartfren',
  '0887': 'Smartfren',
  '0888': 'Smartfren',
  '0889': 'Smartfren',

  // Axis (Acquired by XL but maintains separate branding)
  '0831': 'Axis',
  '0832': 'Axis',
  '0833': 'Axis',
  '0838': 'Axis',
};

/**
 * Landline area code mapping.
 *
 * Maps area codes to city/region names for landline numbers.
 * Includes both 3-digit (e.g., '021') and 4-digit (e.g., '0274') codes.
 *
 * This mapping covers all provinces in Indonesia including:
 * - Jakarta, Banten, West Java, Central Java, Yogyakarta
 * - East Java, Bali, Nusa Tenggara
 * - Sulawesi, Kalimantan
 * - Sumatra, Maluku, Papua
 *
 * @example
 * ```typescript
 * AREA_CODES['021']; // 'Jakarta'
 * AREA_CODES['0274']; // 'Yogyakarta'
 * AREA_CODES['0361']; // 'Denpasar'
 * ```
 *
 * @internal
 */
export const AREA_CODES: Record<string, string> = {
  // ========================================
  // JAKARTA, BANTEN & WEST JAVA
  // ========================================

  // Jakarta & Greater Jakarta
  '021': 'Jakarta',

  // Banten
  '0252': 'Lebak',
  '0253': 'Pandeglang',
  '0254': 'Cilegon & Serang',

  // West Java
  '022': 'Bandung',
  '0231': 'Cirebon',
  '0232': 'Kuningan',
  '0233': 'Majalengka',
  '0234': 'Indramayu',
  '0251': 'Bogor',
  '0260': 'Subang',
  '0261': 'Sumedang',
  '0262': 'Garut',
  '0263': 'Cianjur',
  '0264': 'Purwakarta',
  '0265': 'Tasikmalaya',
  '0266': 'Sukabumi',
  '0267': 'Karawang',

  // ========================================
  // CENTRAL JAVA & YOGYAKARTA
  // ========================================

  // Central Java
  '024': 'Semarang',
  '0271': 'Solo',
  '0272': 'Klaten',
  '0273': 'Wonogiri',
  '0275': 'Purworejo',
  '0276': 'Boyolali',
  '0280': 'Cilacap',
  '0281': 'Banyumas & Purbalingga',
  '0282': 'Cilacap',
  '0283': 'Tegal & Brebes',
  '0284': 'Pemalang',
  '0285': 'Pekalongan',
  '0286': 'Banjarnegara & Wonosobo',
  '0287': 'Kebumen',
  '0289': 'Bumiayu',
  '0291': 'Kudus & Jepara',
  '0292': 'Grobogan',
  '0293': 'Magelang',
  '0294': 'Kendal',
  '0295': 'Pati & Rembang',
  '0296': 'Blora',
  '0297': 'Karimun Jawa',
  '0298': 'Salatiga',

  // Yogyakarta
  '0274': 'Yogyakarta',

  // ========================================
  // EAST JAVA, BALI & NUSA TENGGARA
  // ========================================

  // East Java
  '031': 'Surabaya',
  '0321': 'Mojokerto & Jombang',
  '0322': 'Lamongan',
  '0323': 'Sampang',
  '0324': 'Pamekasan',
  '0325': 'Bawean',
  '0326': 'Masalembu',
  '0327': 'Kangean',
  '0328': 'Sumenep',
  '0331': 'Jember',
  '0332': 'Bondowoso',
  '0333': 'Banyuwangi',
  '0334': 'Lumajang',
  '0335': 'Probolinggo',
  '0336': 'Jember',
  '0338': 'Situbondo',
  '0341': 'Malang',
  '0342': 'Blitar',
  '0343': 'Pasuruan',
  '0351': 'Madiun',
  '0352': 'Ponorogo',
  '0353': 'Bojonegoro',
  '0354': 'Kediri',
  '0355': 'Tulungagung',
  '0356': 'Tuban',
  '0357': 'Pacitan',
  '0358': 'Nganjuk',

  // Bali
  '0361': 'Denpasar',
  '0362': 'Singaraja',
  '0363': 'Amlapura',
  '0365': 'Negara',
  '0366': 'Tabanan',
  '0368': 'Gianyar',

  // Nusa Tenggara Barat (NTB)
  '0370': 'Mataram',
  '0371': 'Sumbawa',
  '0372': 'West Sumbawa',
  '0373': 'Dompu',
  '0374': 'Bima',
  '0376': 'East Lombok',

  // Nusa Tenggara Timur (NTT)
  '0379': 'Alor',
  '0380': 'Kupang',
  '0381': 'Ende',
  '0382': 'Sikka',
  '0383': 'East Flores',
  '0384': 'Ngada',
  '0385': 'Manggarai',
  '0386': 'West Manggarai',
  '0387': 'Sumba',
  '0388': 'North & South Central Timor',
  '0389': 'Belu',

  // ========================================
  // SULAWESI
  // ========================================

  // South Sulawesi
  '0410': 'Pangkajene',
  '0411': 'Makassar',
  '0413': 'Bantaeng & Bulukumba',
  '0414': 'Selayar',
  '0417': 'Malino',
  '0418': 'Takalar',
  '0419': 'Jeneponto',
  '0420': 'Enrekang',
  '0421': 'Pare Pare',
  '0423': 'Tana Toraja',
  '0427': 'Barru',
  '0471': 'Luwu',
  '0472': 'Wajo (Pitumpanua)',
  '0473': 'North Luwu',
  '0474': 'East Luwu',
  '0475': 'Sorowako',
  '0481': 'Bone',
  '0482': 'Sinjai',
  '0484': 'Soppeng',
  '0485': 'Wajo',

  // West Sulawesi
  '0422': 'Majene',
  '0426': 'Mamuju',
  '0428': 'Polewali',
  '0429': 'Central Mamuju',

  // Central Sulawesi
  '0409': 'Morowali',
  '0445': 'Buol',
  '0450': 'Parigi Moutong',
  '0451': 'Palu',
  '0452': 'Poso',
  '0453': 'Toli-Toli',
  '0454': 'Tinombo',
  '0455': 'Moutong',
  '0457': 'Donggala',
  '0458': 'Tentena',
  '0461': 'Banggai',
  '0462': 'Banggai Island',
  '0463': 'Bunta',
  '0464': 'Tojo Una-Una',
  '0465': 'North Morowali',

  // Southeast Sulawesi
  '0401': 'Kendari',
  '0402': 'Buton',
  '0403': 'Muna',
  '0404': 'Wakatobi',
  '0405': 'Kolaka',
  '0408': 'Konawe',

  // North Sulawesi
  '0430': 'South Minahasa',
  '0431': 'Manado',
  '0432': 'Sangihe',
  '0433': 'Talaud',
  '0434': 'Bolaang Mongondow',
  '0438': 'Bitung',

  // Gorontalo
  '0435': 'Gorontalo',
  '0442': 'North Gorontalo',
  '0443': 'Pohuwato',

  // ========================================
  // KALIMANTAN
  // ========================================

  // West Kalimantan
  '0534': 'Ketapang',
  '0535': 'Kayong Utara',
  '0561': 'Pontianak',
  '0562': 'Sambas & Singkawang',
  '0563': 'Landak',
  '0564': 'Sanggau',
  '0565': 'Sintang',
  '0567': 'Kapuas Hulu',
  '0568': 'Melawi',

  // Central Kalimantan
  '0513': 'Kapuas',
  '0519': 'North Barito',
  '0526': 'South & East Barito',
  '0528': 'Murung Raya',
  '0531': 'East Kotawaringin',
  '0532': 'West Kotawaringin',
  '0536': 'Palangka Raya',
  '0537': 'Gunung Mas',
  '0538': 'Seruyan',
  '0539': 'Seruyan & East Kotawaringin',

  // South Kalimantan
  '0511': 'Banjarmasin',
  '0512': 'Tanah Laut',
  '0517': 'Hulu Sungai Selatan',
  '0518': 'Tanah Bumbu',
  '0527': 'Hulu Sungai Utara',

  // East Kalimantan
  '0541': 'Samarinda',
  '0542': 'Balikpapan',
  '0543': 'Paser',
  '0545': 'West Kutai',
  '0548': 'Bontang',
  '0549': 'East Kutai',
  '0554': 'Berau',

  // North Kalimantan
  '0551': 'Tarakan',
  '0552': 'Bulungan',
  '0553': 'Malinau',
  '0556': 'Nunukan',

  // ========================================
  // SUMATRA
  // ========================================

  // Aceh
  '0627': 'Subulussalam & Dairi (North Sumatra)',
  '0629': 'Southeast Aceh',
  '0641': 'Langsa',
  '0642': 'Gayo Lues',
  '0643': 'Central Aceh',
  '0644': 'Bireuen',
  '0645': 'Lhokseumawe',
  '0646': 'East Aceh',
  '0650': 'Simeulue',
  '0651': 'Banda Aceh',
  '0652': 'Sabang',
  '0653': 'Pidie',
  '0654': 'Aceh Jaya',
  '0655': 'West Aceh',
  '0656': 'South Aceh',
  '0657': 'South Aceh',
  '0658': 'Singkil',
  '0659': 'Southwest Aceh',

  // North Sumatra
  '061': 'Medan',
  '0620': 'Pangkalan Brandan',
  '0621': 'Tebing Tinggi',
  '0622': 'Pematang Siantar',
  '0623': 'Asahan',
  '0624': 'Labuhan Batu',
  '0625': 'Parapat',
  '0626': 'Samosir',
  // '0627': 'Dairi', // for this prefix, it same with Subulussalam (Aceh)
  '0628': 'Karo',
  '0630': 'South Nias',
  '0631': 'Sibolga',
  '0632': 'Toba Samosir',
  '0633': 'North Tapanuli',
  '0634': 'Padang Sidempuan',
  '0635': 'South Tapanuli',
  '0636': 'Mandailing Natal',
  '0638': 'Barus',
  '0639': 'Nias',

  // West Sumatra
  '0751': 'Padang',
  '0752': 'Bukittinggi',
  '0753': 'Pasaman',
  '0754': 'Sawahlunto',
  '0755': 'Solok',
  '0756': 'South Pesisir',
  '0757': 'South Pesisir',
  '0759': 'Mentawai',

  // Riau
  '0760': 'Kuantan Singingi',
  '0761': 'Pekanbaru',
  '0762': 'Kampar',
  '0763': 'Bengkalis',
  '0764': 'Siak',
  '0765': 'Dumai',
  '0766': 'Bengkalis',
  '0767': 'Rokan Hulu',
  '0768': 'Indragiri Hilir',
  '0769': 'Indragiri Hulu',

  // Riau Islands
  '0770': 'Muka Kuning Batamindo',
  '0771': 'Tanjungpinang',
  '0772': 'Anambas',
  '0773': 'Natuna',
  '0776': 'Lingga',
  '0777': 'Great Karimun',
  '0778': 'Batam',
  '0779': 'Kundur',

  // Jambi
  '0741': 'Jambi',
  '0742': 'West Tanjung Jabung',
  '0743': 'Batanghari',
  '0744': 'Tebo',
  '0745': 'Sarolangun',
  '0746': 'Merangin',
  '0747': 'Bungo',
  '0748': 'Kerinci',

  // South Sumatra
  '0702': 'Empat Lawang',
  '0711': 'Palembang',
  '0712': 'Ogan Komering Ilir',
  '0713': 'Prabumulih',
  '0714': 'Musi Banyuasin',
  '0730': 'Pagar Alam',
  '0731': 'Lahat',
  '0733': 'Lubuklinggau',
  '0734': 'Muara Enim',
  '0735': 'Ogan Komering Ulu',

  // Bangka Belitung
  '0715': 'Belinyu',
  '0716': 'West Bangka',
  '0717': 'Pangkal Pinang',
  '0718': 'Central & South Bangka',
  '0719': 'Belitung',

  // Bengkulu
  '0732': 'Rejang Lebong',
  '0736': 'Bengkulu',
  '0737': 'North Bengkulu',
  '0739': 'South Bengkulu',

  // Lampung
  '0721': 'Bandar Lampung',
  '0722': 'Tanggamus',
  '0723': 'Way Kanan',
  '0724': 'North Lampung',
  '0725': 'Metro',
  '0726': 'Tulang Bawang',
  '0727': 'South Lampung',
  '0728': 'West Lampung',
  '0729': 'Pringsewu',

  // ========================================
  // MALUKU & PAPUA
  // ========================================

  // Maluku
  '0910': 'Ambon',
  '0911': 'Southeast Maluku',
  '0913': 'Tual',
  '0914': 'Saumlaki',
  '0916': 'Namlea',
  '0918': 'Ternate',
  '0921': 'Sanana',
  '0924': 'Tobelo',

  // Papua & West Papua
  '0901': 'Timika',
  '0902': 'Agats',
  '0951': 'Sorong',
  '0952': 'South Sorong',
  '0967': 'Manokwari',
  '0969': 'Sorong',
  '0971': 'Merauke',
  '0975': 'Boven Digoel',
  '0979': 'Tembagapura',
  '0981': 'Jayapura',
  '0986': 'Wamena',
};

/**
 * Valid mobile number prefixes (first 4 digits after country code).
 *
 * Used for quick validation without operator detection.
 *
 * @internal
 */
export const VALID_MOBILE_PREFIXES = Object.keys(OPERATOR_PREFIXES);

/**
 * Valid area codes for landline numbers.
 *
 * Used for landline validation.
 *
 * @internal
 */
export const VALID_AREA_CODES = Object.keys(AREA_CODES);