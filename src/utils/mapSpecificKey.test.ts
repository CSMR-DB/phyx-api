import { mapSpecificKey } from './mapSpecificKey'

interface ICostTest {
  cost?: number
}

const testArray = [
  {
    cost: 200,
    name: 'Flash',
    id: 'FLASHGRENADE',
    side: 'UNI'
  },
  {
    cost: 200,
    name: 'Flash',
    id: 'FLASHGRENADE',
    side: 'UNI'
  },
  {
    cost: 300,
    name: 'Frag',
    id: 'FRAGGRENADE',
    side: 'UNI'
  },
  {
    cost: 300,
    name: 'Smoke',
    id: 'SMOKEGRENADE',
    side: 'UNI'
  }
]

const testArrayWithMissingValue = [
  {
    cost: 200
  },
  {},
  {
    cost: 300
  },
  {
    cost: 300
  }
]

const testArrayWithIncorrectType = [
  {
    cost: 200
  },
  { cost: 'hey' },
  {
    cost: 300
  },
  {
    cost: 300
  }
]

const testCases = [
  { input: testArray, field: 'cost', expected: [ 200, 200, 300, 300 ] },
  { input: testArrayWithMissingValue, field: 'cost', expected: [ 200, 300, 300 ] }
  // { input: testArrayWithIncorrectType, field: 'cost',  expected: [ 200, 300, 300 ] }
]

describe.skip('mapSpecificKey<number>', () => {
  test.each(testCases)('case', ({ input, field, expected }) => {
    expect(mapSpecificKey<ICostTest, keyof ICostTest>(input, field)).toEqual(
      expected
    )
  })
})
