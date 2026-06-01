import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'bpjs/index': 'src/bpjs/index.ts',
    'currency/index': 'src/currency/index.ts',
    'datetime/index': 'src/datetime/index.ts',
    'email-validator/index': 'src/email-validator/index.ts',
    'mock/index': 'src/mock/index.ts',
    'nlp/index': 'src/nlp/index.ts',
    'nik/index': 'src/nik/index.ts',
    'npwp/index': 'src/npwp/index.ts',
    'pdp/index': 'src/pdp/index.ts',
    'phone/index': 'src/phone/index.ts',
    'plate/index': 'src/plate/index.ts',
    'text/index': 'src/text/index.ts',
    'vin/index': 'src/vin/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
});