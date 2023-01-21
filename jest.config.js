module.exports = {
  clearMocks: true,
  testTimeout: 20000,
  collectCoverage: false,
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~types/(.*)$': '<rootDir>/@types/$1',
    '^~tests/(.*)$': '<rootDir>/tests/$1',
  },
  // reporters: ['default', 'github-actions'],
  reporters: ['default'],
  setupFilesAfterEnv: ['dotenv/config', 'jest-extended/all'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.spec.ts|'],
  testEnvironment: 'node',
};
