import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    rules: {
      // 👇 Allow use of 'any' (remove this if you want to enforce strong typing)
      '@typescript-eslint/no-explicit-any': 'off',

      // 👇 Allow unused vars if prefixed with _ (e.g., `_action`)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // 👇 Optional: Other useful relaxed rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default eslintConfig;
