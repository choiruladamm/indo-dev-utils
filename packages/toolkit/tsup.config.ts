import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'nik/index': 'src/nik/index.ts',
    'phone/index': 'src/phone/index.ts',
    'currency/index': 'src/currency/index.ts',
    'text/index': 'src/text/index.ts',
    'npwp/index': 'src/npwp/index.ts',
    'plate/index': 'src/plate/index.ts',
    'vin/index': 'src/vin/index.ts',
    'email-validator/index': 'src/email-validator/index.ts',
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
