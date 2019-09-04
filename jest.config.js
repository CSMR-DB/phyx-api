// const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig')

const { resolve } = require('path')

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  },
  moduleDirectories: ['node_modules', 'src'],

  // FIXME: Why is this not necessary?

  moduleNameMapper: {
    '^~src/(.*)$': resolve(__dirname, './src/$1')
  }

  // OR

  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
}
