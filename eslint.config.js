import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            // React
            'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
            'react/prop-types': 'off', // Using plain JS, not TypeScript — skip prop-types for MVP
            'react/jsx-no-target-blank': 'error',

            // React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // General quality
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
        },
    },
    {
        // Test files
        files: ['**/*.test.{js,jsx}', '**/setupTests.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
                vi: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
            },
        },
    },
    {
        ignores: ['dist/', 'node_modules/', '*.config.js', '*.config.cjs'],
    },
];
