import { idGenerator } from './idGenerator'

describe('idGenerator', () => {
  const someWordToId: string = 'Some-word18%~'

  test('should return a string with all non-word-characters removed', () => {
    expect(idGenerator(someWordToId)).toEqual('Someword18')
  })

  describe('idGenerator options object', () => {
    test('should return an object', () => {
      expect(idGenerator(someWordToId, { uppercase: true })).toEqual(
        'SOMEWORD18'
      )
    })

    test('should return an id with prefix', () => {
      expect(idGenerator(someWordToId, { prefix: 'kek' })).toEqual(
        'kekSomeword18'
      )
    })
  })
})
