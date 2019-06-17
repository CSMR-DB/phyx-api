import { sumArray } from './sumArray'

describe('sumArray', () => {
  const CASES = [
    { input: [ 2, 2 ], expected: 4 },
    { input: [ 16, 4, 128, 64 ], expected: 212 }
  ]

  test.each(CASES)('[2, 2] should return 4', ({ input, expected }) => {
    expect(sumArray(input)).toEqual(expected)
  })
})
