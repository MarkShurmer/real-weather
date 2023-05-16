import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',
    collectCoverageFrom: [
        './src/**/*.{js,jsx}',
        './src/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/test-utils/**',
        '!**/index.{ts,tsx}',
    ],
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
        '.(css|less)$': '<rootDir>/test-utils/styleMock.js',
    },
    //fakeTimers: { enableGlobally: true },
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
    setupFilesAfterEnv: ['<rootDir>/test-utils/jest-setup.ts'],
};

export default jestConfig;
