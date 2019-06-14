module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'node',
  roots: ['src'],
  testRegex: '(/__tests__/.*|(\\.|/)(unit.test|unit.spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '~src/(.*)': '<rootDir>/src/$1',
    '~csgo/(.*)': '<rootDir>/src/features/csgo/$1',
    '~r6siege/(.*)': '<rootDir>/src/features/r6siege/$1'
  }
}
