import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

/** @type {import('eslint').Config} */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '**/src/components/ui/**']),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      curly: 'error',
      'object-shorthand': ['error', 'always'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.config.mjs'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
    },
  },
])

export default eslintConfig
