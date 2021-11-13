// jest.config.js
module.exports = {
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  globalSetup: '<rootDir>/test/utils/setupEnv.js',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
}
