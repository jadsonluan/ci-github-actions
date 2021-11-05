const { resolve } = require('path');
const root = resolve(__dirname, '..', '..', '..');
const rootConfig = require(`${root}/jest.config.js`);

const rootDir = '<rootDir>/src/__tests__';

/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...rootConfig,
  rootDir: root,
  displayName: 'FUNCTIONAL TESTS',
  globalSetup: `${rootDir}/functional/setup.ts`,
  testMatch: [`${rootDir}/functional/**/*.test.ts`],
  testEnvironment: `${rootDir}/functional/environment.ts`,
};
