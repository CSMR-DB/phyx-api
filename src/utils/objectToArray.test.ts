import { objectToArray } from './objectToArray'

const testCases = [
  {
    input: {
      player_1: {
        name: 'Zombie'
      },
      player_2: {
        name: 'Cookie'
      }
    },
    expected: [
      {
        name: 'Zombie'
      },
      {
        name: 'Cookie'
      }
    ]
  }
]

describe('objectToArray()', () => {
  test.each(testCases)('should turn team.players object into an array of players', ({ input, expected }) => {
    expect(objectToArray(input)).toEqual(expected)
  })
})
