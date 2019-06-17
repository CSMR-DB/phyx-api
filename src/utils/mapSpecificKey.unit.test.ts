import { mapSpecificKey } from './mapSpecificKey'

interface ITestArray {
  cost?: number | string | undefined
}

const testArray: (ITestArray & { [key: string]: any })[] = [
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

const testArrayWithMissingValue: ITestArray[] = [
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

const testArrayWithIncorrectType: ITestArray[] = [
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

const testCases: {
  input: ITestArray[]
  field: keyof ITestArray
  expected: any[]
}[] = [
  { input: testArray, field: 'cost', expected: [ 200, 200, 300, 300 ] },
  {
    input: testArrayWithMissingValue,
    field: 'cost',
    expected: [ 200, 300, 300 ]
  },
  {
    input: testArrayWithIncorrectType,
    field: 'cost',
    expected: [ 200, 'hey', 300, 300 ]
  }
]

describe('mapSpecificKey<number>', () => {
  test.each(testCases)('case', ({ input, field, expected }) => {
    expect(mapSpecificKey(input, field)).toEqual(expected)
  })
})
