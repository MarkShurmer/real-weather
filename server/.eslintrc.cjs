module.exports = {
  env: {
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'vitest'],
  parserOptions: {
    ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended',
    // "plugin:@typescript-eslint/eslint-recommended",
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production' || process.env.CI
        ? 'error'
        : 'warn',
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {},
    },
  ],
};
