import { describe, it, expect } from 'vitest';
import { expandAbbreviation, contractAbbreviation } from '../abbreviation';

describe('expandAbbreviation', () => {
  describe('basic functionality', () => {
    it('expands single abbreviation', () => {
      expect(expandAbbreviation('Jl. Sudirman')).toBe('Jalan Sudirman');
    });

    it('expands multiple abbreviations', () => {
      expect(expandAbbreviation('Jl. Sudirman No. 123'))
        .toBe('Jalan Sudirman Nomor 123');
    });

    it('handles text without abbreviations', () => {
      expect(expandAbbreviation('Hello World')).toBe('Hello World');
    });

    it('handles empty string', () => {
      expect(expandAbbreviation('')).toBe('');
    });
  });

  describe('address abbreviations', () => {
    it('expands Jl. to Jalan', () => {
      expect(expandAbbreviation('Jl. Merdeka')).toBe('Jalan Merdeka');
    });

    it('expands Gg. to Gang', () => {
      expect(expandAbbreviation('Gg. Mawar')).toBe('Gang Mawar');
    });

    it('expands No. to Nomor', () => {
      expect(expandAbbreviation('No. 123')).toBe('Nomor 123');
    });

    it('expands Kab. to Kabupaten', () => {
      expect(expandAbbreviation('Kab. Bogor')).toBe('Kabupaten Bogor');
    });

    it('expands Kec. to Kecamatan', () => {
      expect(expandAbbreviation('Kec. Ciawi')).toBe('Kecamatan Ciawi');
    });

    it('expands Prov. to Provinsi', () => {
      expect(expandAbbreviation('Prov. Jawa Barat'))
        .toBe('Provinsi Jawa Barat');
    });

    it('expands complex address', () => {
      expect(expandAbbreviation('Jl. Merdeka Gg. 5 No. 10'))
        .toBe('Jalan Merdeka Gang 5 Nomor 10');
    });

    it('expands full address with multiple levels', () => {
      expect(expandAbbreviation('Kab. Bogor, Kec. Ciawi, Ds. Bojong'))
        .toBe('Kabupaten Bogor, Kecamatan Ciawi, Desa Bojong');
    });
  });

  describe('academic titles', () => {
    it('expands Dr. to Doktor', () => {
      expect(expandAbbreviation('Dr. Ahmad')).toBe('Doktor Ahmad');
    });

    it('expands Ir. to Insinyur', () => {
      expect(expandAbbreviation('Ir. Joko')).toBe('Insinyur Joko');
    });

    it('expands Prof. to Profesor', () => {
      expect(expandAbbreviation('Prof. Budi')).toBe('Profesor Budi');
    });

    it('expands S.H. to Sarjana Hukum', () => {
      expect(expandAbbreviation('Ahmad, S.H.'))
        .toBe('Ahmad, Sarjana Hukum');
    });

    it('expands S.E. to Sarjana Ekonomi', () => {
      expect(expandAbbreviation('Budi, S.E.'))
        .toBe('Budi, Sarjana Ekonomi');
    });

    it('expands S.T. to Sarjana Teknik', () => {
      expect(expandAbbreviation('Citra, S.T.'))
        .toBe('Citra, Sarjana Teknik');
    });

    it('expands M.M. to Magister Manajemen', () => {
      expect(expandAbbreviation('Dewi, M.M.'))
        .toBe('Dewi, Magister Manajemen');
    });

    it('expands multiple titles', () => {
      expect(expandAbbreviation('Prof. Dr. Ir. Ahmad'))
        .toBe('Profesor Doktor Insinyur Ahmad');
    });

    it('expands name with multiple degrees', () => {
      expect(expandAbbreviation('Dr. Joko, S.H., M.M.'))
        .toBe('Doktor Joko, Sarjana Hukum, Magister Manajemen');
    });
  });

  describe('honorifics', () => {
    it('expands Bpk. to Bapak', () => {
      expect(expandAbbreviation('Bpk. Ahmad')).toBe('Bapak Ahmad');
    });

    it('expands Yth. to Yang Terhormat', () => {
      expect(expandAbbreviation('Yth. Direktur'))
        .toBe('Yang Terhormat Direktur');
    });

    it('expands H. to Haji', () => {
      expect(expandAbbreviation('H. Ahmad')).toBe('Haji Ahmad');
    });

    it('expands Hj. to Hajjah', () => {
      expect(expandAbbreviation('Hj. Fatimah')).toBe('Hajjah Fatimah');
    });

    it('expands Sdr. to Saudara', () => {
      expect(expandAbbreviation('Sdr. Budi')).toBe('Saudara Budi');
    });

    it('expands combined honorifics', () => {
      expect(expandAbbreviation('Yth. Bpk. H. Ahmad'))
        .toBe('Yang Terhormat Bapak Haji Ahmad');
    });
  });

  describe('organizations', () => {
    it('expands PT. to Perseroan Terbatas', () => {
      expect(expandAbbreviation('PT. Maju Jaya'))
        .toBe('Perseroan Terbatas Maju Jaya');
    });

    it('expands CV. to Commanditaire Vennootschap', () => {
      expect(expandAbbreviation('CV. Sukses'))
        .toBe('Commanditaire Vennootschap Sukses');
    });

    it('expands Tbk. to Terbuka', () => {
      expect(expandAbbreviation('PT. Mandiri Tbk.'))
        .toBe('Perseroan Terbatas Mandiri Terbuka');
    });

    it('expands UD. to Usaha Dagang', () => {
      expect(expandAbbreviation('UD. Berkah'))
        .toBe('Usaha Dagang Berkah');
    });

    it('expands PD. to Perusahaan Daerah', () => {
      expect(expandAbbreviation('PD. Air Minum'))
        .toBe('Perusahaan Daerah Air Minum');
    });
  });

  describe('common abbreviations', () => {
    it('expands dll. to dan lain-lain', () => {
      expect(expandAbbreviation('apel, jeruk, dll.'))
        .toBe('apel, jeruk, dan lain-lain');
    });

    it('expands dst. to dan seterusnya', () => {
      expect(expandAbbreviation('1, 2, 3, dst.'))
        .toBe('1, 2, 3, dan seterusnya');
    });

    it('expands dsb. to dan sebagainya', () => {
      expect(expandAbbreviation('buah, sayur, dsb.'))
        .toBe('buah, sayur, dan sebagainya');
    });

    it('expands a.n. to atas nama', () => {
      expect(expandAbbreviation('a.n. Ahmad'))
        .toBe('atas nama Ahmad');
    });

    it('expands Tlp. to Telepon', () => {
      expect(expandAbbreviation('Tlp. 08123456789'))
        .toBe('Telepon 08123456789');
    });
  });

  describe('case insensitivity', () => {
    it('matches lowercase abbreviation', () => {
      expect(expandAbbreviation('jl. sudirman'))
        .toBe('Jalan sudirman');
    });

    it('matches uppercase abbreviation', () => {
      expect(expandAbbreviation('JL. SUDIRMAN'))
        .toBe('Jalan SUDIRMAN');
    });

    it('matches mixed case abbreviation', () => {
      expect(expandAbbreviation('Jl. Sudirman'))
        .toBe('Jalan Sudirman');
    });

    it('handles multiple case variations', () => {
      expect(expandAbbreviation('jl. Merdeka NO. 123'))
        .toBe('Jalan Merdeka Nomor 123');
    });
  });

  describe('word boundaries', () => {
    it('only matches whole words', () => {
      expect(expandAbbreviation('Jakarta')).toBe('Jakarta');
      // Should not match 'Jl.' inside 'Jakarta'
    });

    it('matches at start of string', () => {
      expect(expandAbbreviation('Jl. Sudirman')).toBe('Jalan Sudirman');
    });

    it('matches at end of string', () => {
      expect(expandAbbreviation('Joko, S.H.'))
        .toBe('Joko, Sarjana Hukum');
    });

    it('matches in middle of string', () => {
      expect(expandAbbreviation('tinggal di Jl. Merdeka'))
        .toBe('tinggal di Jalan Merdeka');
    });

    it('does not match partial words', () => {
      expect(expandAbbreviation('hello')).toBe('hello');
      // Should not match 'H.' in 'hello'
    });
  });

  describe('multiple occurrences', () => {
    it('expands same abbreviation multiple times', () => {
      expect(expandAbbreviation('Jl. A dan Jl. B'))
        .toBe('Jalan A dan Jalan B');
    });

    it('expands different abbreviations', () => {
      expect(expandAbbreviation('Dr. A dan Ir. B'))
        .toBe('Doktor A dan Insinyur B');
    });

    it('handles many abbreviations', () => {
      expect(expandAbbreviation('Jl. A No. 1 Kec. B Kab. C'))
        .toBe('Jalan A Nomor 1 Kecamatan B Kabupaten C');
    });
  });

  describe('options - mode: address', () => {
    it('expands only address abbreviations', () => {
      expect(expandAbbreviation('Dr. Joko di Jl. Sudirman', { mode: 'address' }))
        .toBe('Dr. Joko di Jalan Sudirman');
    });

    it('ignores title abbreviations in address mode', () => {
      expect(expandAbbreviation('Prof. tinggal di Kab. Bogor', { mode: 'address' }))
        .toBe('Prof. tinggal di Kabupaten Bogor');
    });

    it('expands multiple address abbreviations', () => {
      expect(expandAbbreviation('Jl. A No. 1', { mode: 'address' }))
        .toBe('Jalan A Nomor 1');
    });
  });

  describe('options - mode: title', () => {
    it('expands only title abbreviations', () => {
      expect(expandAbbreviation('Prof. Dr. di Jl. Sudirman', { mode: 'title' }))
        .toBe('Profesor Doktor di Jl. Sudirman');
    });

    it('ignores address abbreviations in title mode', () => {
      expect(expandAbbreviation('Ir. Ahmad di Kab. Bogor', { mode: 'title' }))
        .toBe('Insinyur Ahmad di Kab. Bogor');
    });

    it('expands academic titles only', () => {
      expect(expandAbbreviation('Dr. A, S.H., M.M.', { mode: 'title' }))
        .toBe('Doktor A, Sarjana Hukum, Magister Manajemen');
    });
  });

  describe('options - mode: org', () => {
    it('expands only organization abbreviations', () => {
      expect(expandAbbreviation('PT. Maju di Jl. A', { mode: 'org' }))
        .toBe('Perseroan Terbatas Maju di Jl. A');
    });

    it('ignores other abbreviations in org mode', () => {
      expect(expandAbbreviation('Dr. kerja di CV. Sukses', { mode: 'org' }))
        .toBe('Dr. kerja di Commanditaire Vennootschap Sukses');
    });

    it('expands organization types', () => {
      expect(expandAbbreviation('PT. A Tbk.', { mode: 'org' }))
        .toBe('Perseroan Terbatas A Terbuka');
    });
  });

  describe('options - customMap', () => {
    it('applies custom mapping', () => {
      expect(expandAbbreviation('BUMN perusahaan', {
        customMap: { 'BUMN': 'Badan Usaha Milik Negara' },
      })).toBe('Badan Usaha Milik Negara perusahaan');
    });

    it('custom mapping overrides built-in', () => {
      expect(expandAbbreviation('Jl. Sudirman', {
        customMap: { 'Jl.': 'Jalanan' },
      })).toBe('Jalanan Sudirman');
    });

    it('applies multiple custom mappings', () => {
      expect(expandAbbreviation('ABC dan XYZ', {
        customMap: { 'ABC': 'Alpha Beta Charlie', 'XYZ': 'X Y Z' },
      })).toBe('Alpha Beta Charlie dan X Y Z');
    });

    it('combines custom and built-in', () => {
      expect(expandAbbreviation('BUMN di Jl. Sudirman', {
        customMap: { 'BUMN': 'Badan Usaha Milik Negara' },
      })).toBe('Badan Usaha Milik Negara di Jalan Sudirman');
    });
  });

  describe('options - preserveCase', () => {
    it('preserves case by default (false)', () => {
      expect(expandAbbreviation('jl. sudirman'))
        .toBe('Jalan sudirman');
    });

    it('matches case when preserveCase: true', () => {
      expect(expandAbbreviation('JL. SUDIRMAN', { preserveCase: true }))
        .toBe('JALAN SUDIRMAN');
    });

    it('handles lowercase with preserveCase', () => {
      expect(expandAbbreviation('jl. sudirman', { preserveCase: true }))
        .toBe('jalan sudirman');
    });

    it('handles title case with preserveCase', () => {
      expect(expandAbbreviation('Jl. Sudirman', { preserveCase: true }))
        .toBe('Jalan Sudirman');
    });
  });

  describe('edge cases - punctuation', () => {
    it('handles abbreviation followed by comma', () => {
      expect(expandAbbreviation('Jl. Sudirman, Jakarta'))
        .toBe('Jalan Sudirman, Jakarta');
    });

    it('handles abbreviation followed by period', () => {
      expect(expandAbbreviation('Tinggal di Jl. Merdeka.'))
        .toBe('Tinggal di Jalan Merdeka.');
    });

    it('handles abbreviation with exclamation', () => {
      expect(expandAbbreviation('Ke Jl. Sudirman!'))
        .toBe('Ke Jalan Sudirman!');
    });

    it('handles abbreviation in parentheses', () => {
      expect(expandAbbreviation('alamat (Jl. Merdeka)'))
        .toBe('alamat (Jalan Merdeka)');
    });
  });

  describe('edge cases - numbers', () => {
    it('handles abbreviation with numbers', () => {
      expect(expandAbbreviation('No. 123'))
        .toBe('Nomor 123');
    });

    it('handles numbers before abbreviation', () => {
      expect(expandAbbreviation('123 Jl. Merdeka'))
        .toBe('123 Jalan Merdeka');
    });

    it('preserves decimal numbers', () => {
      expect(expandAbbreviation('Rp. 1.500.000'))
        .toBe('Rp. 1.500.000');
      // Periods in numbers are not abbreviations
    });
  });

  describe('real-world examples', () => {
    it('expands complete address', () => {
      expect(expandAbbreviation('Jl. Sudirman No. 123, Kec. Menteng, Kab. Jakarta'))
        .toBe('Jalan Sudirman Nomor 123, Kecamatan Menteng, Kabupaten Jakarta');
    });

    it('expands professional title', () => {
      expect(expandAbbreviation('Prof. Dr. Ir. Ahmad, S.T., M.Kom.'))
        .toBe('Profesor Doktor Insinyur Ahmad, Sarjana Teknik, Magister Komputer');
    });

    it('expands formal letter', () => {
      expect(expandAbbreviation('Yth. Bpk. Direktur PT. Maju Jaya'))
        .toBe('Yang Terhormat Bapak Direktur Perseroan Terbatas Maju Jaya');
    });

    it('expands mixed content', () => {
      expect(expandAbbreviation('Dr. Ahmad tinggal di Jl. Merdeka No. 10, bekerja di PT. Sukses Tbk.'))
        .toBe('Doktor Ahmad tinggal di Jalan Merdeka Nomor 10, bekerja di Perseroan Terbatas Sukses Terbuka');
    });
  });

  describe('performance', () => {
    it('handles long text efficiently', () => {
      const longText = 'Jl. Sudirman No. 123 '.repeat(1000);
      const start = performance.now();
      expandAbbreviation(longText);
      const end = performance.now();
      expect(end - start).toBeLessThan(50); // < 50ms for 1000 addresses
    });

    it('handles many different abbreviations', () => {
      const text = 'Dr. Ir. Prof. Jl. No. Kab. Kec. PT. CV. '.repeat(100);
      const start = performance.now();
      expandAbbreviation(text);
      const end = performance.now();
      expect(end - start).toBeLessThan(50);
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'Jl. Sudirman';
      const result = expandAbbreviation(original);
      
      expect(original).toBe('Jl. Sudirman');
      expect(result).toBe('Jalan Sudirman');
    });

    it('does not modify options object', () => {
      const options = { mode: 'address' as const, customMap: { 'TEST': 'Testing' } };
      expandAbbreviation('test', options);
      
      expect(options).toEqual({ mode: 'address', customMap: { 'TEST': 'Testing' } });
    });
  });
});

describe('contractAbbreviation', () => {
  describe('basic functionality', () => {
    it('contracts single expansion', () => {
      expect(contractAbbreviation('Jalan Sudirman'))
        .toBe('Jl. Sudirman');
    });

    it('contracts multiple expansions', () => {
      expect(contractAbbreviation('Jalan Sudirman Nomor 123'))
        .toBe('Jl. Sudirman No. 123');
    });

    it('handles text without expansions', () => {
      expect(contractAbbreviation('Hello World')).toBe('Hello World');
    });

    it('handles empty string', () => {
      expect(contractAbbreviation('')).toBe('');
    });
  });

  describe('address contractions', () => {
    it('contracts Jalan to Jl.', () => {
      expect(contractAbbreviation('Jalan Merdeka')).toBe('Jl. Merdeka');
    });

    it('contracts Gang to Gg.', () => {
      expect(contractAbbreviation('Gang Mawar')).toBe('Gg. Mawar');
    });

    it('contracts Nomor to No.', () => {
      expect(contractAbbreviation('Nomor 123')).toBe('No. 123');
    });

    it('contracts Kabupaten to Kab.', () => {
      expect(contractAbbreviation('Kabupaten Bogor')).toBe('Kab. Bogor');
    });

    it('contracts complex address', () => {
      expect(contractAbbreviation('Jalan Merdeka Gang 5 Nomor 10'))
        .toBe('Jl. Merdeka Gg. 5 No. 10');
    });
  });

  describe('academic title contractions', () => {
    it('contracts Doktor to Dr.', () => {
      expect(contractAbbreviation('Doktor Ahmad')).toBe('Dr. Ahmad');
    });

    it('contracts Profesor to Prof.', () => {
      expect(contractAbbreviation('Profesor Budi')).toBe('Prof. Budi');
    });

    it('contracts Sarjana Hukum to S.H.', () => {
      expect(contractAbbreviation('Ahmad, Sarjana Hukum'))
        .toBe('Ahmad, S.H.');
    });

    it('contracts multiple titles', () => {
      expect(contractAbbreviation('Profesor Doktor Insinyur Ahmad'))
        .toBe('Prof. Dr. Ir. Ahmad');
    });
  });

  describe('round-trip conversion', () => {
    it('expands then contracts returns similar result', () => {
      const original = 'Jl. Sudirman No. 123';
      const expanded = expandAbbreviation(original);
      const contracted = contractAbbreviation(expanded);
      expect(contracted).toBe(original);
    });

    it('contracts then expands returns similar result', () => {
      const original = 'Jalan Sudirman Nomor 123';
      const contracted = contractAbbreviation(original);
      const expanded = expandAbbreviation(contracted);
      expect(expanded).toBe(original);
    });
  });

  describe('mode filtering', () => {
    it('contracts only address in address mode', () => {
      expect(contractAbbreviation('Doktor Joko di Jalan Sudirman', { mode: 'address' }))
        .toBe('Doktor Joko di Jl. Sudirman');
    });

    it('contracts only titles in title mode', () => {
      expect(contractAbbreviation('Profesor di Jalan Sudirman', { mode: 'title' }))
        .toBe('Prof. di Jalan Sudirman');
    });
  });

  describe('immutability', () => {
    it('does not modify original string', () => {
      const original = 'Jalan Sudirman';
      const result = contractAbbreviation(original);
      
      expect(original).toBe('Jalan Sudirman');
      expect(result).toBe('Jl. Sudirman');
    });
  });
});