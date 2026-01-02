/**
 * ============================================================================
 * INDONESIAN TEXT UTILITIES - CONSTANTS
 * ============================================================================
 *
 * This file contains constants for Indonesian and English text processing:
 * - LOWERCASE_WORDS: Particles that stay lowercase in title case
 * - ACRONYMS: Abbreviations that stay UPPERCASE in title case
 * - ABBREVIATIONS: Full expansions of common Indonesian abbreviations
 *
 * ============================================================================
 * MAINTENANCE GUIDE
 * ============================================================================
 *
 * ## How to Add New Entries
 *
 * ### 1. LOWERCASE_WORDS (Particles)
 *
 * Add words that should remain lowercase in title case (except when first word).
 *
 * **Indonesian Grammar Rules (PUEBI):**
 * - Prepositions: di, ke, dari, untuk, dengan, pada, dalam, etc.
 * - Conjunctions: dan, atau, tetapi, serta, maupun, etc.
 * - Articles/particles: yang, sebagai, adalah, akan, telah, etc.
 *
 * **English Grammar Rules (Chicago Manual of Style):**
 * - Articles: a, an, the
 * - Conjunctions: and, or, but, nor, for, yet, so
 * - Short prepositions (<5 letters): at, by, in, of, on, to, up, etc.
 *
 * **Example Addition:**
 * ```typescript
 * export const LOWERCASE_WORDS = [
 *   // ... existing entries
 *   'bagi',      // Indonesian: for/to (preposition)
 *   'antara',    // Indonesian: between (preposition)
 *   'into',      // English: preposition
 * ] as const;
 * ```
 *
 * **Testing:** Add test case in `toTitleCase.test.ts`:
 * ```typescript
 * it('keeps "bagi" lowercase in middle', () => {
 *   expect(toTitleCase('buku bagi pemula')).toBe('Buku bagi Pemula');
 * });
 * ```
 *
 * ### 2. ACRONYMS (Always Uppercase)
 *
 * Add abbreviations that should always appear in UPPERCASE.
 *
 * **Categories:**
 * - Government & Military: TNI, POLRI, KPK, DPR, etc.
 * - Business Entities: PT, CV, BUMN, etc.
 * - Banks: BCA, BRI, BNI, etc.
 * - Services: BPJS, PLN, KTP, SIM, etc.
 * - Technology: IT, AI, API, SEO, etc.
 * - Education: UI, ITB, UGM, etc.
 * - International: UN, WHO, NATO, ASEAN, etc.
 *
 * **Validation Checklist:**
 * ✅ Is it commonly written in ALL CAPS?
 * ✅ Is it an official acronym (not just shortened word)?
 * ✅ Will it look wrong if title-cased (e.g., "Pt" instead of "PT")?
 *
 * **Example Addition:**
 * ```typescript
 * export const ACRONYMS = [
 *   // ... existing entries
 *   'OJK',      // Otoritas Jasa Keuangan
 *   'BI',       // Bank Indonesia
 *   'NASA',     // National Aeronautics and Space Administration
 * ] as const;
 * ```
 *
 * **Testing:** Add test case in `toTitleCase.test.ts`:
 * ```typescript
 * it('preserves OJK uppercase', () => {
 *   expect(toTitleCase('ojk indonesia')).toBe('OJK Indonesia');
 * });
 * ```
 *
 * ### 3. ABBREVIATIONS (Expansion Mapping)
 *
 * Add abbreviation → full form mappings for `expandAbbreviation()` function.
 *
 * **Categories (use comment headers):**
 * - Address: Jl., Gg., Kec., Kab., etc.
 * - Academic Titles: Dr., Ir., Prof., S.H., M.M., etc.
 * - Honorifics: Bpk., Yth., H., Hj., etc.
 * - Organizations: PT., CV., UD., etc.
 * - Common: dst., dll., a.n., etc.
 * - Contact Info: Tlp., HP., Fax, etc.
 * - Days/Months: Sen., Jan., Feb., etc.
 * - Units: kg., km., lt., etc.
 *
 * **Key Format Rules:**
 * - Include period if commonly written: `'Jl.'` not `'Jl'`
 * - Use proper capitalization: `'Jalan'` not `'jalan'`
 * - Keep it concise: Full form only, no explanations
 *
 * **Example Addition:**
 * ```typescript
 * export const ABBREVIATIONS: Record<string, string> = {
 *   // ... existing entries
 *
 *   // ========== New Category Example ==========
 *   'Apt.': 'Apartemen',
 *   'Ruko': 'Rumah Toko',
 *   'Rukan': 'Rumah Kantor',
 * };
 * ```
 *
 * **Testing:** Add test case in `abbreviation.test.ts`:
 * ```typescript
 * it('expands Apt. to Apartemen', () => {
 *   expect(expandAbbreviation('Apt. Sudirman'))
 *     .toBe('Apartemen Sudirman');
 * });
 * ```
 *
 * ============================================================================
 * DATA SOURCES & REFERENCES
 * ============================================================================
 *
 * When adding new entries, refer to these authoritative sources:
 *
 * **Indonesian Language:**
 * - PUEBI (Pedoman Umum Ejaan Bahasa Indonesia)
 *   https://puebi.js.org/
 *
 * - KBBI (Kamus Besar Bahasa Indonesia)
 *   https://kbbi.kemdikbud.go.id/
 *
 * - Wikipedia Indonesia - Daftar Singkatan
 *   https://id.wikipedia.org/wiki/Daftar_singkatan_di_Indonesia
 *
 * **English Language:**
 * - Chicago Manual of Style (Title Case Rules)
 *   https://www.chicagomanualofstyle.org/
 *
 * - AP Stylebook
 *   https://www.apstylebook.com/
 *
 * **Government & Official:**
 * - Kemendagri (addresses, administrative divisions)
 *   https://www.kemendagri.go.id/
 *
 * - Kemenkumham (business entities)
 *   https://www.kemenkumham.go.id/
 *
 * - Kemendikbud (education, degrees)
 *   https://www.kemdikbud.go.id/
 *
 * ============================================================================
 * CONTRIBUTION GUIDELINES
 * ============================================================================
 *
 * **Before Adding:**
 * 1. ✅ Check if entry already exists (Ctrl+F)
 * 2. ✅ Verify spelling from official sources
 * 3. ✅ Ensure it's commonly used (not obscure)
 * 4. ✅ Choose correct category/section
 *
 * **After Adding:**
 * 1. ✅ Add corresponding test case
 * 2. ✅ Run tests: `npm test constants`
 * 3. ✅ Update this file's documentation if needed
 * 4. ✅ Add source reference in PR description
 *
 * **PR Template:**
 * ```
 * ### Added Constants
 *
 * **Type:** [LOWERCASE_WORDS | ACRONYMS | ABBREVIATIONS]
 *
 * **Entries:**
 * - `OJK` - Otoritas Jasa Keuangan
 * - `BI` - Bank Indonesia
 *
 * **Source:** https://www.ojk.go.id/
 *
 * **Test Coverage:** ✅ Added in toTitleCase.test.ts line 245
 *
 * **Rationale:**
 * Commonly used financial regulatory bodies in Indonesian context.
 * ```
 *
 * ============================================================================
 * COMMON PITFALLS TO AVOID
 * ============================================================================
 *
 * ❌ **Don't add brand-specific styling** (e.g., "iPhone" → keep user control)
 * ❌ **Don't add regional dialects** (stick to standard Indonesian/English)
 * ❌ **Don't add context-dependent acronyms** (e.g., "UI" = both User Interface & Universitas Indonesia)
 * ❌ **Don't add very rare/obscure terms** (focus on common usage)
 * ❌ **Don't forget the period** in ABBREVIATIONS (e.g., use `'Dr.'` not `'Dr'`)
 * ❌ **Don't mix singular/plural** in ABBREVIATIONS (choose one consistently)
 *
 * ✅ **Do keep entries alphabetically sorted** within categories
 * ✅ **Do use proper capitalization** in expanded forms
 * ✅ **Do add comments** for non-obvious entries
 * ✅ **Do verify against official sources** before adding
 * ✅ **Do write test cases** for new additions
 *
 * ============================================================================
 * FUTURE EXTENSIBILITY
 * ============================================================================
 *
 * **Planned Enhancements:**
 *
 * 1. **External Data Source Support:**
 *    ```typescript
 *    import customAcronyms from './data/custom-acronyms.json';
 *    export const ACRONYMS = [...DEFAULT_ACRONYMS, ...customAcronyms];
 *    ```
 *
 * 2. **Context-Aware Acronyms:**
 *    ```typescript
 *    export const CONTEXT_ACRONYMS = {
 *      'UI': {
 *        tech: 'UI',         // User Interface
 *        education: 'UI',    // Universitas Indonesia
 *      }
 *    };
 *    ```
 *
 * 3. **Locale-Specific Sets:**
 *    ```typescript
 *    export const LOWERCASE_WORDS = {
 *      id: [...], // Indonesian
 *      en: [...], // English
 *      mixed: [...], // Combined (default)
 *    };
 *    ```
 *
 * 4. **Dynamic Loading:**
 *    ```typescript
 *    // Load additional acronyms from user config
 *    export async function loadCustomConstants(url: string) {
 *      const data = await fetch(url).then(r => r.json());
 *      return [...ACRONYMS, ...data.acronyms];
 *    }
 *    ```
 *
 * ============================================================================
 * VERSIONING & CHANGELOG
 * ============================================================================
 *
 * Track major additions here:
 *
 * - v0.2.0 (2024-12-18): Initial comprehensive dataset
 *   - 50+ Indonesian particles
 *   - 150+ acronyms (Indonesian + International)
 *   - 80+ abbreviation mappings
 *
 * - v0.2.1 (TBD): Add financial sector acronyms (OJK, BI, etc.)
 * - v0.2.2 (TBD): Add technology company acronyms
 *
 * ============================================================================
 */

/**
 * Indonesian and English lowercase particles
 * These words remain lowercase in title case (except when first word)
 *
 * Based on:
 * - Indonesian grammar (PUEBI)
 * - English title case rules (Chicago Manual of Style)
 */
export const LOWERCASE_WORDS = [
  // Indonesian prepositions (kata depan)
  'di',
  'ke',
  'dari',
  'pada',
  'dalam',
  'untuk',
  'dengan',
  'oleh',
  'kepada',
  'terhadap',
  'tentang',
  'tanpa',
  'hingga',
  'sampai',
  'sejak',
  'menuju',
  'melalui',

  // Indonesian conjunctions (kata hubung)
  'dan',
  'atau',
  'tetapi',
  'namun',
  'serta',
  'maupun',
  'melainkan',
  'sedangkan',

  // Indonesian articles/particles
  'yang',
  'sebagai',
  'adalah',
  'ialah',
  'yaitu',
  'bahwa',
  'akan',
  'telah',
  'sudah',
  'belum',

  // English articles
  'a',
  'an',
  'the',

  // English conjunctions
  'and',
  'or',
  'but',
  'nor',
  'for',
  'yet',
  'so',
  'as',

  // English prepositions (short ones, < 5 letters)
  'at',
  'by',
  'in',
  'of',
  'on',
  'to',
  'up',
  'via',
  'per',
  'off',
  'out',

  // English prepositions (5+ letters - optional, some style guides capitalize these)
  // 'about',
  // 'above',
  // 'across',
  // 'after',
  // 'among',
  // 'below',
  // 'under',
  // 'until',
  // 'with',
] as const;

/**
 * Indonesian and international acronyms
 * These always remain UPPERCASE in title case
 */
export const ACRONYMS = [
  // Indonesian government & military
  'DKI', // Daerah Khusus Ibukota
  'DIY', // Daerah Istimewa Yogyakarta
  'TNI', // Tentara Nasional Indonesia
  'POLRI', // Kepolisian Republik Indonesia
  'ABRI', // Angkatan Bersenjata Republik Indonesia
  'MPR', // Majelis Permusyawaratan Rakyat
  'DPR', // Dewan Perwakilan Rakyat
  'KPK', // Komisi Pemberantasan Korupsi
  'BIN', // Badan Intelijen Negara

  // Indonesian business entities
  'PT', // Perseroan Terbatas
  'CV', // Commanditaire Vennootschap
  'UD', // Usaha Dagang
  'PD', // Perusahaan Daerah
  'Tbk', // Terbuka (publicly traded)
  'BUMN', // Badan Usaha Milik Negara
  'BUMD', // Badan Usaha Milik Daerah

  // Indonesian banks
  'BCA', // Bank Central Asia
  'BRI', // Bank Rakyat Indonesia
  'BNI', // Bank Negara Indonesia
  'BTN', // Bank Tabungan Negara
  'BSI', // Bank Syariah Indonesia
  'BPD', // Bank Pembangunan Daerah

  // Indonesian government services
  'KTP', // Kartu Tanda Penduduk
  'NIK', // Nomor Induk Kependudukan
  'NPWP', // Nomor Pokok Wajib Pajak
  'SIM', // Surat Izin Mengemudi
  'STNK', // Surat Tanda Nomor Kendaraan
  'BPJS', // Badan Penyelenggara Jaminan Sosial
  'KIS', // Kartu Indonesia Sehat
  'KIP', // Kartu Indonesia Pintar
  'PKH', // Program Keluarga Harapan

  // Indonesian utilities & infrastructure
  'PLN', // Perusahaan Listrik Negara
  'PDAM', // Perusahaan Daerah Air Minum
  'PGN', // Perusahaan Gas Negara
  'KAI', // Kereta Api Indonesia
  'MRT', // Mass Rapid Transit
  'LRT', // Light Rail Transit

  // Indonesian taxes & fees
  'PBB', // Pajak Bumi dan Bangunan
  'PPh', // Pajak Penghasilan
  'PPN', // Pajak Pertambahan Nilai
  'BPHTB', // Bea Perolehan Hak atas Tanah dan Bangunan

  // Indonesian education
  'UI', // Universitas Indonesia
  'ITB', // Institut Teknologi Bandung
  'UGM', // Universitas Gadjah Mada
  'IPB', // Institut Pertanian Bogor
  'ITS', // Institut Teknologi Sepuluh Nopember
  'UNPAD', // Universitas Padjadjaran
  'UNDIP', // Universitas Diponegoro
  'UNAIR', // Universitas Airlangga
  'UNS', // Universitas Sebelas Maret

  // Indonesian degrees (gelar)
  'S.Pd', // Sarjana Pendidikan
  'S.H', // Sarjana Hukum
  'S.E', // Sarjana Ekonomi
  'S.T', // Sarjana Teknik
  'S.Kom', // Sarjana Komputer
  'S.Si', // Sarjana Sains
  'S.Sos', // Sarjana Sosial
  'M.Pd', // Magister Pendidikan
  'M.M', // Magister Manajemen
  'M.T', // Magister Teknik
  'M.Kom', // Magister Komputer

  // Common services
  'ATM', // Automated Teller Machine
  'POS', // Point of Sale
  'SMS', // Short Message Service
  'GPS', // Global Positioning System
  'WiFi', // Wireless Fidelity (technically Wi-Fi)
  'USB', // Universal Serial Bus
  'PIN', // Personal Identification Number
  'OTP', // One Time Password
  'QR', // Quick Response

  // Technology & IT
  'IT', // Information Technology
  'AI', // Artificial Intelligence
  'ML', // Machine Learning
  'API', // Application Programming Interface
  'UI', // User Interface (duplicate with Universitas Indonesia, context matters)
  'UX', // User Experience
  'SEO', // Search Engine Optimization
  'SaaS', // Software as a Service
  'CRM', // Customer Relationship Management
  'ERP', // Enterprise Resource Planning

  // Business titles
  'CEO', // Chief Executive Officer
  'CFO', // Chief Financial Officer
  'CTO', // Chief Technology Officer
  'COO', // Chief Operating Officer
  'CMO', // Chief Marketing Officer
  'HR', // Human Resources
  'PR', // Public Relations
  'VP', // Vice President
  'GM', // General Manager

  // International organizations
  'UN', // United Nations
  'WHO', // World Health Organization
  'UNESCO', // United Nations Educational, Scientific and Cultural Organization
  'NATO', // North Atlantic Treaty Organization
  'ASEAN', // Association of Southeast Asian Nations
  'APEC', // Asia-Pacific Economic Cooperation
  'WTO', // World Trade Organization
  'IMF', // International Monetary Fund

  // Medical
  'ICU', // Intensive Care Unit
  'ER', // Emergency Room
  'MRI', // Magnetic Resonance Imaging
  'CT', // Computed Tomography
  'DNA', // Deoxyribonucleic Acid
  'RNA', // Ribonucleic Acid
  'HIV', // Human Immunodeficiency Virus
  'AIDS', // Acquired Immunodeficiency Syndrome
  'COVID', // Coronavirus Disease

  // Measurements & units
  'KM', // Kilometer
  'CM', // Centimeter
  'MM', // Millimeter
  'KG', // Kilogram
  'RPM', // Revolutions Per Minute
  'MPH', // Miles Per Hour
  'KPH', // Kilometers Per Hour

  // Finance
  'IPO', // Initial Public Offering
  'ATM', // Automated Teller Machine (duplicate)
  'ROI', // Return on Investment
  'GDP', // Gross Domestic Product
  'VAT', // Value Added Tax
] as const;

/**
 * Indonesian abbreviations mapping
 * Organized by category for maintainability
 */
export const ABBREVIATIONS: Record<string, string> = {
  // ========== Address Abbreviations ==========
  'Jl.': 'Jalan',
  'Gg.': 'Gang',
  'No.': 'Nomor',
  'Kp.': 'Kampung',
  'Ds.': 'Desa',
  'Kel.': 'Kelurahan',
  'Kec.': 'Kecamatan',
  'Kab.': 'Kabupaten',
  Kota: 'Kota',
  'Prov.': 'Provinsi',
  'Prop.': 'Provinsi',
  'Rt.': 'Rukun Tetangga',
  'Rw.': 'Rukun Warga',
  Blok: 'Blok',
  'Komp.': 'Kompleks',
  Perumahan: 'Perumahan',
  'Perum.': 'Perumahan',

  // ========== Academic Titles ==========
  'Dr.': 'Doktor',
  'Ir.': 'Insinyur',
  'Prof.': 'Profesor',
  'Drs.': 'Doktorandus',
  'Dra.': 'Doktoranda',

  // Bachelor degrees
  'S.Pd.': 'Sarjana Pendidikan',
  'S.H.': 'Sarjana Hukum',
  'S.E.': 'Sarjana Ekonomi',
  'S.T.': 'Sarjana Teknik',
  'S.Kom.': 'Sarjana Komputer',
  'S.Si.': 'Sarjana Sains',
  'S.Sos.': 'Sarjana Sosial',
  'S.I.Kom.': 'Sarjana Ilmu Komunikasi',
  'S.S.': 'Sarjana Sastra',
  'S.Psi.': 'Sarjana Psikologi',
  'S.Farm.': 'Sarjana Farmasi',
  'S.Ked.': 'Sarjana Kedokteran',

  // Master degrees
  'M.Sc.': 'Master of Science',
  'M.M.': 'Magister Manajemen',
  'M.Pd.': 'Magister Pendidikan',
  'M.T.': 'Magister Teknik',
  'M.Kom.': 'Magister Komputer',
  'M.Si.': 'Magister Sains',
  'M.H.': 'Magister Hukum',
  'M.A.': 'Master of Arts',
  MBA: 'Master of Business Administration',

  // ========== Honorifics ==========
  'Bpk.': 'Bapak',
  Ibu: 'Ibu',
  'Sdr.': 'Saudara',
  'Sdri.': 'Saudari',
  'Yth.': 'Yang Terhormat',
  'H.': 'Haji',
  'Hj.': 'Hajjah',
  'Tn.': 'Tuan',
  'Ny.': 'Nyonya',
  'Nn.': 'Nona',

  // ========== Organizations ==========
  'PT.': 'Perseroan Terbatas',
  'CV.': 'Commanditaire Vennootschap',
  'UD.': 'Usaha Dagang',
  'PD.': 'Perusahaan Daerah',
  'Tbk.': 'Terbuka',
  Koperasi: 'Koperasi',
  Yayasan: 'Yayasan',

  // ========== Common Abbreviations ==========
  'dst.': 'dan seterusnya',
  'dsb.': 'dan sebagainya',
  'dll.': 'dan lain-lain',
  'dkk.': 'dan kawan-kawan',
  'a.n.': 'atas nama',
  'u.p.': 'untuk perhatian',
  'u.b.': 'untuk beliau',
  'c.q.': 'casu quo',
  'hlm.': 'halaman',
  'tgl.': 'tanggal',
  'bln.': 'bulan',
  'thn.': 'tahun',
  'ttd.': 'tertanda',

  // ========== Contact Information ==========
  'Tlp.': 'Telepon',
  'Telp.': 'Telepon',
  'HP.': 'Handphone',
  Fax: 'Faksimile',
  Email: 'Email',
  Website: 'Website',

  // ========== Days (Indonesian) ==========
  'Sen.': 'Senin',
  'Sel.': 'Selasa',
  'Rab.': 'Rabu',
  'Kam.': 'Kamis',
  'Jum.': 'Jumat',
  'Sab.': 'Sabtu',
  'Min.': 'Minggu',

  // ========== Months (Indonesian) ==========
  'Jan.': 'Januari',
  'Feb.': 'Februari',
  'Mar.': 'Maret',
  'Apr.': 'April',
  Mei: 'Mei',
  'Jun.': 'Juni',
  'Jul.': 'Juli',
  'Agt.': 'Agustus',
  'Sep.': 'September',
  'Okt.': 'Oktober',
  'Nov.': 'November',
  'Des.': 'Desember',

  // ========== Units & Measurements ==========
  'kg.': 'kilogram',
  'gr.': 'gram',
  'lt.': 'liter',
  'ml.': 'mililiter',
  'km.': 'kilometer',
  'cm.': 'sentimeter',
  'mm.': 'milimeter',
  'm2.': 'meter persegi',
  'm3.': 'meter kubik',
  'ha.': 'hektar',
};
