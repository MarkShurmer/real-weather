import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

export default {
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts?$': ['ts-jest', {}],
    },
    clearMocks: true,
    collectCoverageFrom: [
        './src/**/*.{js,jsx}',
        './src/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/test-utils/**',
        '!**/index.{ts,tsx}',
        '!**/*-types.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    testMatch: ['**/*.test.ts'],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePathIgnorePatterns: ['<rootDir>/.aws-sam', '<rootDir>/old-src'],
} as JestConfigWithTsJest;