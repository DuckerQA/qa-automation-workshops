import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-console': 'warn',
      'no-var': 'error',
      'playwright/no-nested-steps': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error'
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'no-console': 'warn',
      'no-var': 'error'
    }
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.spec.ts', 'tests/**/*.spec.js', 'e2e/**/*.spec.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-page-pause': 'error',
      'playwright/no-element-handle': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
);