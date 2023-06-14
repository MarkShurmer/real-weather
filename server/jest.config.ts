import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    // coveragePathIgnorePatterns: [
    //   "/node_modules/"
    // ],

    preset: 'ts-jest',
    setupFilesAfterEnv: ['jest-extended/all'],

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A list of reporter names that Jest uses when writing coverage reports
    // coverageReporters: ['json', 'html'],

    modulePaths: [compilerOptions.baseUrl],

    // An object that configures minimum threshold enforcement for coverage results
    // coverageThreshold: undefined,

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default jestConfig;
