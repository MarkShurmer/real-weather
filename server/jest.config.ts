import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'json-summary'],

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ['node_modules', '<rootDir>/src/app.ts'],

    preset: 'ts-jest',
    setupFilesAfterEnv: ['jest-extended/all'],

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: [compilerOptions.baseUrl],

    // The glob patterns Jest uses to detect test files
    testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default jestConfig;
