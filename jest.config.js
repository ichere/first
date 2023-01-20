const isCI = process.env.CI === 'true';

module.exports = {
  clearMocks: true,
  testTimeout: isCI ? 60000 : 20000, // 1 minute for CI, 20 local
  collectCoverage: false,
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
      isolatedModules: true,
    },
  },
  globalSetup: '<rootDir>/tests/setup/setup.ts',
  globalTeardown: '<rootDir>/tests/setup/teardown.ts',
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~types/(.*)$': '<rootDir>/@types/$1',
    '^~tests/(.*)$': '<rootDir>/tests/$1',
  },
  // reporters: ['default', 'github-actions'],
  reporters: ['default'],
  setupFilesAfterEnv: [
    'dotenv/config',
    '<rootDir>/tests/setup/beforeEachTestFile.ts',
    'jest-extended/all',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.spec.ts|'],
  testEnvironment: 'node',
};
