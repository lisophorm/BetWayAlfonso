// .eslintrc.cjs
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        // omit "project" to avoid type-aware parsing issues across tools
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
    ],
    ignorePatterns: [
        '.next/**',
        'node_modules/**',
        'coverage/**',
        'jest_output.json',
        'test/__mocks__/**',
    ],
    rules: {
        // keep this light; you can tighten later
    },
};
