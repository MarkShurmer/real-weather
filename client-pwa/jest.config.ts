import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    clearMocks: true,
    collectCoverageFrom: [
        './src/**/*.{js,jsx}',
        './src/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/test-utils/**',
        '!**/index.{ts,tsx}',
        '!./src/api/api-contracts.ts',
    ],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
        '.(css|less)$': '<rootDir>/test-utils/styleMock.js',
    },
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
    setupFilesAfterEnv: ['<rootDir>/test-utils/jest-setup.ts'],
};

export default jestConfig;
