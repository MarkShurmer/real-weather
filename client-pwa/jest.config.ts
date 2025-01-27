import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    clearMocks: true,
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    collectCoverage: true,
    collectCoverageFrom: [
        './src/**/*.{js,jsx}',
        './src/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/test-utils/**',
        '!**/index.{ts,tsx}',
        '!./src/api/api-contracts.ts',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: [['text', { file: './coverage.txt' }], 'text'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
        '^.+\\.css$': 'jest-transform-css',
    },
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
        '^recoil$': 'recoil-mock',
    },
    setupFilesAfterEnv: ['<rootDir>/test-utils/jest-setup.ts'],
};

export default jestConfig;
