module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',
    },
    extends: [
        'plugin:@typescript-eslint/recommended', // recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' || process.env.CI ? 'error' : 'warn',
    },
    overrides: [
        {
            files: ['*.test.ts'],
            rules: {},
        },
    ],
};
