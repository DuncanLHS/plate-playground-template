import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules/**', '.next/**'],
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: ['src/**/*.tsx', 'src/**/use*.ts'],
    languageOptions: { parser: tsParser },
  },
]);
