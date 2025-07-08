import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      'prettier': prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error'
      /*
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      */
    },
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.js",
      "*.mjs",
      "prisma/seed.ts",
      "**/prisma/*.ts",
      "!**/prisma/client.ts"
    ]
  },
];
