const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';

const isCI = process.env.CI === 'true';

module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist'],
  plugins: ['simple-import-sort'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ERROR : WARN,
    'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : WARN,
    'no-warning-comments': WARN,
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    'import/prefer-default-export': OFF,
    'class-methods-use-this': OFF,
    '@typescript-eslint/interface-name-prefix': [OFF],
    'max-classes-per-file': OFF,
    '@typescript-eslint/no-explicit-any': WARN,
    'no-shadow': OFF,
    '@typescript-eslint/no-shadow': ERROR,
    'simple-import-sort/imports': ERROR,
    'simple-import-sort/exports': ERROR,
    '@typescript-eslint/no-non-null-assertion': OFF,
    camelcase: OFF,
    // allows unused variables if prefixed with '_'
    '@typescript-eslint/no-unused-vars': [ERROR, { argsIgnorePattern: '^_' }],
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/no-shadow': WARN,

    // imports / exports
    'sort-imports': OFF,
    'import/order': OFF,
    'import/no-cycle': isCI ? ERROR : OFF,
    'simple-import-sort/imports': ERROR,
    'simple-import-sort/exports': ERROR,
    'import/prefer-default-export': OFF,
    // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    // classes
    // note you must disable the base rule as it can report incorrect errors
    'no-useless-constructor': OFF,
    '@typescript-eslint/no-useless-constructor': [WARN],
    '@typescript-eslint/explicit-member-accessibility': [WARN],
    '@typescript-eslint/member-ordering': WARN,
    'max-classes-per-file': OFF,
    'class-methods-use-this': OFF,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: 'webpack.config.js',
    },
  },
};
