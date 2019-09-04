// const path = require('path');

module.exports = {
  // reporters: [
  //   'default',
  //   [
  //     'jest-junit',
  //     {
  //       outputDirectory: '../../report',
  //       outputName: 'core-ui-junit.xml'
  //     }
  //   ]
  // ],
  collectCoverage: false,
  // collectCoverageFrom: ['src/components/**/*.{ts,tsx}', '!src/components/**/*.{spec,e2e}.ts', '!src/components/**/*.d.ts'],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: './report/coverage/jest',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  // setupFilesAfterEnv: [path.join(__dirname, '..', '/utils/base-testSetup.ts')]
};
